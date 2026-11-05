/* Velaris shader from the supplied component, adapted to the site's beige palette. */
(() => {
  const footer = document.querySelector('.ftr');
  if (!footer) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.createElement('canvas');
  canvas.className = 'ftr-motion';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false });
  if (!gl) return;

  const vertexSource = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;
  const fragmentSource = `
precision highp float;
varying vec2 vUv;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_grain;
uniform vec2  u_pointer;
uniform float u_pointerStrength;
uniform vec3  u_trail[6];
uniform float u_scroll;
uniform vec3  u_colors[4];
uniform vec3  u_bg;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float ratio = u_resolution.x / u_resolution.y;
  vec2 p = uv - 0.5;
  p.x *= ratio;
  vec2 pointer = (u_pointer - 0.5) * vec2(ratio, 1.0);
  vec2 delta = p - pointer;
  float influence = exp(-dot(delta, delta) * 1.8);
  vec2 flow = p - pointer * 0.24 * u_pointerStrength
    + delta * influence * 0.2 * u_pointerStrength;
  flow.y += u_scroll * 0.22;

  float t = u_time * 0.1;

  float n1 = snoise(flow * 0.4 + vec2(t * 0.2, -t * 0.3));
  float n2 = snoise(flow * 0.55 + vec2(-t * 0.15, t * 0.25) + n1 * 0.25);
  float n3 = snoise(flow * 0.75 + vec2(t * 0.1, -t * 0.2) + n2 * 0.2);

  vec3 col = u_bg;

  float dist = length(p) * 1.5;
  float vignette = 1.0 - smoothstep(0.3, 1.2, dist);

  col = mix(col, u_colors[0], smoothstep(-0.2, 0.5, n1) * 0.85);
  col = mix(col, u_colors[1], smoothstep(-0.1, 0.6, n2) * 0.7);
  col = mix(col, u_colors[2], smoothstep(-0.3, 0.4, n3) * 0.6);
  col = mix(col, u_colors[3], smoothstep(0.0, 0.7, n1 * n2) * 0.5);

  float glow = (1.0 - smoothstep(0.0, 0.8, dist)) * 0.3;
  col += u_colors[1] * glow;

  col = mix(col * 0.2, col, vignette);

  float cleared = 0.0;
  for (int i = 0; i < 6; i++) {
    vec2 trailDelta = (uv - u_trail[i].xy) * vec2(ratio, 1.0);
    float brush = exp(-dot(trailDelta, trailDelta) / 0.035);
    cleared = max(cleared, brush * u_trail[i].z);
  }
  col = mix(col, u_bg, min(0.94, cleared * 0.92 + abs(u_scroll) * 0.12));

  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + u_time);
  col += (grain - 0.5) * u_grain * 0.1;

  gl_FragColor = vec4(col, 1.0);
}
`;
  const css = getComputedStyle(footer);
  const rgb = hex => hex.replace('#', '').match(/.{2}/g).map(value => parseInt(value, 16) / 255);
  const background = rgb(css.getPropertyValue('--night').trim() || '#07090E');
  const colors = new Float32Array([
    css.getPropertyValue('--blue').trim() || '#B49A79',
    '#D6C1A2', '#7A644A', '#100D0A',
  ].flatMap(rgb));
  let program, buffer, uniforms;
  let frame = 0, last = 0, elapsed = 0;
  let visible = false, lost = false, suspended = false;
  const pointer = { x: .5, y: .5, strength: 0, targetX: .5, targetY: .5, targetStrength: 0 };
  const trail = Array.from({ length: 6 }, () => ({ x: .5, y: .5, time: -100 }));
  const trailData = new Float32Array(18);
  let trailIndex = 0, previousMark = null, lastScrollY = window.scrollY, scrollWind = 0, footerHeight = 1;

  function compile(type, source) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function setup() {
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      return false;
    }
    const next = gl.createProgram();
    if (!next) { gl.deleteShader(vertex); gl.deleteShader(fragment); return false; }
    gl.attachShader(next, vertex);
    gl.attachShader(next, fragment);
    gl.linkProgram(next);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(next, gl.LINK_STATUS)) { gl.deleteProgram(next); return false; }
    const nextBuffer = gl.createBuffer();
    if (!nextBuffer) { gl.deleteProgram(next); return false; }
    program = next;
    buffer = nextBuffer;
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      pointer: gl.getUniformLocation(program, 'u_pointer'),
      strength: gl.getUniformLocation(program, 'u_pointerStrength'),
      trail: gl.getUniformLocation(program, 'u_trail[0]'),
      scroll: gl.getUniformLocation(program, 'u_scroll'),
    };
    gl.uniform3fv(gl.getUniformLocation(program, 'u_colors[0]'), colors);
    gl.uniform3fv(gl.getUniformLocation(program, 'u_bg'), background);
    gl.uniform1f(gl.getUniformLocation(program, 'u_grain'), .5);
    return true;
  }

  function paint() {
    if (lost || !program) return;
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.time, elapsed * 2);
    gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
    gl.uniform1f(uniforms.strength, pointer.strength);
    trail.forEach((point, i) => {
      trailData[i * 3] = point.x;
      trailData[i * 3 + 1] = point.y;
      trailData[i * 3 + 2] = Math.exp(-Math.max(0, elapsed - point.time) * 2.2);
    });
    gl.uniform3fv(uniforms.trail, trailData);
    gl.uniform1f(uniforms.scroll, scrollWind);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function resize() {
    if (lost || !program) return;
    const width = Math.max(1, footer.clientWidth);
    const height = Math.max(1, footer.clientHeight);
    footerHeight = height;
    // Soft gradients stay smooth with a bounded rendering resolution.
    const ratio = Math.min(devicePixelRatio || 1, 1.25, 1600 / width, Math.sqrt(1200000 / (width * height)));
    const w = Math.max(1, Math.round(width * ratio));
    const h = Math.max(1, Math.round(height * ratio));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    paint();
  }

  function draw(now) {
    frame = requestAnimationFrame(draw);
    if (last && now - last < 1000 / 30) return;
    const dt = last ? Math.min((now - last) / 1000, .1) : 1 / 30;
    elapsed += dt;
    const follow = 1 - Math.exp(-dt * 4.5);
    const scrollDelta = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    const wind = Math.max(-1, Math.min(1, scrollDelta / Math.max(1, footerHeight * .12)));
    scrollWind += (wind - scrollWind) * follow;
    pointer.x += (pointer.targetX - pointer.x) * follow;
    pointer.y += (pointer.targetY - pointer.y) * follow;
    pointer.strength += (pointer.targetStrength - pointer.strength) * follow;
    last = now;
    paint();
  }

  function sync() {
    const active = visible && !document.hidden && !motion.matches && !lost && !suspended;
    if (!active) { pointer.targetStrength = 0; scrollWind = 0; }
    if (active && !frame) { last = 0; lastScrollY = window.scrollY; frame = requestAnimationFrame(draw); }
    if (!active && frame) { cancelAnimationFrame(frame); frame = 0; }
  }

  if (!setup()) return;
  footer.prepend(canvas);
  const followPointer = event => {
    if (event.pointerType === 'touch' || motion.matches) return;
    const rect = footer.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.targetX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    pointer.targetY = 1 - Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    pointer.targetStrength = 1;
    if (!previousMark || Math.hypot(
      (pointer.targetX - previousMark.x) * rect.width / rect.height,
      pointer.targetY - previousMark.y,
    ) > .025) {
      const point = trail[trailIndex];
      point.x = pointer.targetX; point.y = pointer.targetY; point.time = elapsed;
      previousMark = point;
      trailIndex = (trailIndex + 1) % trail.length;
    }
  };
  footer.addEventListener('pointerenter', followPointer, { passive: true });
  footer.addEventListener('pointermove', followPointer, { passive: true });
  footer.addEventListener('pointerleave', () => {
    pointer.targetX = .5; pointer.targetY = .5; pointer.targetStrength = 0;
    previousMark = null;
  });
  new ResizeObserver(resize).observe(footer);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(footer);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  addEventListener('pagehide', () => { suspended = true; sync(); });
  addEventListener('pageshow', () => { suspended = false; sync(); });
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    lost = true; canvas.style.visibility = 'hidden'; sync();
  });
  canvas.addEventListener('webglcontextrestored', () => {
    lost = false;
    if (!setup()) { lost = true; return; }
    canvas.style.visibility = '';
    resize(); sync();
  });
  resize();
})();
