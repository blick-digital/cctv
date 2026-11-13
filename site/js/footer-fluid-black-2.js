/* Effect from https://pupupuuuy.tilda.ws/.
   Adaptation: data-fluid-text selector and bundled effect CSS.
   Typography is read from the element; no fonts or libraries are loaded.
   Uses the original artwork from [data-fluid-text] and [data-fluid-logo].
*/
(function () {
  var style = document.createElement('style');
  style.textContent = "\n.pf-name-line{display:block;white-space:nowrap}\n.pf-fluid-host{position:relative}\n.pf-name-base{display:block}\n.pf-fluid-canvas{position:absolute;left:-32px;top:-32px;display:none;pointer-events:none}\n.pf-fluid-drawing .pf-fluid-canvas{display:block}\n.pf-fluid-drawing .pf-name-base{opacity:0}\n.pf-enter{animation:pf-rise .9s cubic-bezier(.22,1,.36,1) both}\n.pf-enter:nth-child(2){animation-delay:.08s}\n@keyframes pf-rise{from{opacity:.45;transform:translateY(16px)}to{opacity:1;transform:none}}\n@media(max-width:959px),(hover:none),(pointer:coarse),(prefers-reduced-motion:reduce){.pf-fluid-canvas{display:none!important}.pf-name-base{opacity:1!important}}\n@media(prefers-reduced-motion:reduce){.pf-enter{animation:none}}\n@media print{.pf-fluid-canvas{display:none!important}.pf-name-base{opacity:1!important}}\n";
  document.head.appendChild(style);
})();
/* Continuous contour morph. Native Zero text stays the editable source. */
(function () {
  'use strict';
  // Exact squared Euclidean distance transform, two separable linear passes.
  function distances(mask, width, height, inside) {
    var data = new Float32Array(width * height), length = Math.max(width, height);
    var f = new Float32Array(length), d = new Float32Array(length);
    var v = new Int32Array(length), z = new Float64Array(length + 1);
    for (var i = 0; i < data.length; i++) data[i] = !!mask[i] === inside ? 0 : 1e9;
    function line(n) {
      var k = 0; v[0] = 0; z[0] = -Infinity; z[1] = Infinity;
      for (var q = 1; q < n; q++) {
        var s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * (q - v[k]));
        while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * (q - v[k])); }
        k++; v[k] = q; z[k] = s; z[k + 1] = Infinity;
      }
      k = 0;
      for (var x = 0; x < n; x++) { while (z[k + 1] < x) k++; d[x] = (x - v[k]) * (x - v[k]) + f[v[k]]; }
    }
    for (var x = 0; x < width; x++) { for (var y = 0; y < height; y++) f[y] = data[y * width + x]; line(height); for (var y = 0; y < height; y++) data[y * width + x] = d[y]; }
    for (var y = 0; y < height; y++) { for (var x = 0; x < width; x++) f[x] = data[y * width + x]; line(width); for (var x = 0; x < width; x++) data[y * width + x] = d[x]; }
    return data;
  }
  function signedDistance(mask, width, height) {
    var ink = distances(mask, width, height, true), paper = distances(mask, width, height, false);
    for (var i = 0; i < ink.length; i++) ink[i] = Math.sqrt(paper[i]) - Math.sqrt(ink[i]);
    return ink;
  }
  function init() {
    if (/^(www\.)?tilda\.(ru|cc)$/.test(location.hostname)) return;
    document.querySelectorAll('[data-fluid-text], [data-fluid-logo]').forEach(initHost);
  }
  function initHost(name) {
    if (name.dataset.fluidName) return;
    var logo = name.querySelector('.logo-svg');
    var svg = name.querySelector('svg[data-wordmark]');
    var outline = svg && svg.querySelector('path');
    if (svg && (!outline || typeof Path2D !== 'function')) return;
    var original = name.innerHTML, originalLabel = name.getAttribute('aria-label');
    var desktop = matchMedia('(min-width:960px) and (hover:hover) and (pointer:fine)');
    var reduced = matchMedia('(prefers-reduced-motion: reduce)');
    var canvas, gl, program, texture, artwork, base, uniforms, ratio, width, height, range, color;
    var pad = 32, frame = 0, previous = 0, strength = 0, over = false;
    var mouseX = 0, mouseY = 0, followX = 0, followY = 0, dragX = 0, dragY = 0;
    var resizeTimer, introTimer, introRunning = false, unavailable = false;
    var visible = false, fontsReady = false, needsBuild = true;
    function enabled() { return visible && desktop.matches && !reduced.matches && !document.hidden; }
    function restore() {
      cancelAnimationFrame(frame); clearTimeout(introTimer); introRunning = false; frame = 0; previous = 0; strength = 0; over = false;
      name.classList.remove('pf-fluid-drawing', 'pf-fluid-host');
      if (svg || logo) {
        if (canvas) canvas.remove();
      } else {
        name.innerHTML = original;
        if (originalLabel === null) name.removeAttribute('aria-label'); else name.setAttribute('aria-label', originalLabel);
      }
      name.dataset.fluidName = 'native'; base = null;
    }
    function createRenderer() {
      canvas = document.createElement('canvas'); canvas.className = 'pf-fluid-canvas'; canvas.setAttribute('aria-hidden', 'true');
      gl = canvas.getContext('webgl', {alpha:true, premultipliedAlpha:false, antialias:false, depth:false, stencil:false});
      if (!gl) throw new Error('WebGL unavailable');
      function shader(type, code) { var s = gl.createShader(type); gl.shaderSource(s, code); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error('Shader unavailable'); return s; }
      var vs = shader(gl.VERTEX_SHADER, 'attribute vec2 a; varying vec2 uv; void main(){uv=a*.5+.5;gl_Position=vec4(a,0.,1.);}');
      var fs = shader(gl.FRAGMENT_SHADER, [
        'precision highp float; varying vec2 uv; uniform sampler2D field;',
        logo ? 'uniform sampler2D artwork;' : '',
        'uniform vec2 size, pointer, drag; uniform vec3 ink;',
        'uniform float radius, strength, band, pixel;',
        'void main(){',
        'vec2 tex=vec2(uv.x,1.-uv.y); vec2 p=tex*size;',
        'float t=clamp(1.-length(p-pointer)/radius,0.,1.);',
        'float influence=t*t*t*(t*(t*6.-15.)+10.)*strength;',
        'vec2 q=tex-drag*influence/size;',
        'vec3 sampleField=texture2D(field,q).rgb; vec2 fields=(sampleField.rg-.5)*(2.*band);',
        'float contour=mix(fields.r,fields.g,influence);',
        'float softness=(' + (logo ? '.55+.35*influence' : svg ? '.85+1.8*influence' : '.65+1.8*influence') + ')*pixel;',
        'float alpha=smoothstep(-softness,softness,contour);',
        'alpha=mix(sampleField.b,alpha,smoothstep(0.,.12,influence));',
        logo ? 'gl_FragColor=vec4(texture2D(artwork,q).rgb,alpha);}' : 'gl_FragColor=vec4(ink,alpha);}'
      ].join('\n'));
      program = gl.createProgram(); gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
      gl.deleteShader(vs); gl.deleteShader(fs);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Renderer unavailable');
      gl.useProgram(program);
      var buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
      var location = gl.getAttribLocation(program, 'a'); gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
      texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      if (logo) {
        artwork = gl.createTexture();
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, artwork);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.uniform1i(gl.getUniformLocation(program, 'artwork'), 1);
        gl.activeTexture(gl.TEXTURE0);
      }
      uniforms = {}; ['size','pointer','drag','ink','radius','strength','band','pixel'].forEach(function (key) { uniforms[key] = gl.getUniformLocation(program, key); });
      canvas.addEventListener('webglcontextlost', function (event) { event.preventDefault(); unavailable = true; restore(); });
    }
    function build() {
      if (!visible || !fontsReady || (logo && !logo.naturalWidth)) { needsBuild = true; return; }
      needsBuild = false;
      restore();
      if (unavailable || !desktop.matches || reduced.matches) return;
      // Unusual rich typography remains native instead of being approximated.
      if (!svg && !logo && Array.from(name.children).some(function (el) { return el.tagName !== 'BR'; })) return;
      try {
        var rect = name.getBoundingClientRect(), scale = rect.width / name.offsetWidth || 1, style = getComputedStyle(name);
        // Keep the distance-field allocation bounded on wide desktop displays.
        var paddedWidth = name.offsetWidth + pad * 2, paddedHeight = name.offsetHeight + pad * 2;
        if (!gl) createRenderer();
        var textureLimit = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        ratio = svg || logo
          ? Math.min(2.5, Math.max(2, devicePixelRatio || 1), Math.sqrt(2400000 / (paddedWidth * paddedHeight)), textureLimit / Math.max(paddedWidth, paddedHeight))
          : Math.min(2, devicePixelRatio || 1, Math.sqrt(1800000 / (paddedWidth * paddedHeight)));
        width = Math.ceil(paddedWidth * ratio); height = Math.ceil(paddedHeight * ratio); range = 28 * ratio;
        if (width > textureLimit || height > textureLimit) throw new Error('Text texture too large');
        var source = document.createElement('canvas'), thick = document.createElement('canvas'), blurred = document.createElement('canvas');
        source.width = thick.width = blurred.width = width; source.height = thick.height = blurred.height = height;
        var ctx = source.getContext('2d', {willReadFrequently:true}), wet = thick.getContext('2d'), blur = blurred.getContext('2d', {willReadFrequently:true});
        var font = style.fontStyle + ' ' + style.fontWeight + ' ' + style.fontSize + ' ' + style.fontFamily;
        [ctx,wet].forEach(function (c) { c.scale(ratio,ratio); c.font = font; c.textBaseline = 'alphabetic'; c.fillStyle = '#000'; c.strokeStyle = '#000'; c.lineJoin = 'round'; c.lineCap = 'round'; c.lineWidth = 4; });
        if (logo) {
          var logoRect = logo.getBoundingClientRect();
          var left = (logoRect.left - rect.left) / scale + pad;
          var top = (logoRect.top - rect.top) / scale + pad;
          var logoWidth = logoRect.width / scale, logoHeight = logoRect.height / scale;
          if (!logoWidth || !logoHeight) { needsBuild = true; return; }
          ctx.drawImage(logo, left, top, logoWidth, logoHeight);
          // Extend the original colors into the pixels the contour will grow into.
          for (var angle = 0; angle < 8; angle++) {
            var theta = angle * Math.PI / 4;
            wet.drawImage(logo, left + 2 * Math.cos(theta), top + 2 * Math.sin(theta), logoWidth, logoHeight);
          }
          wet.drawImage(logo, left, top, logoWidth, logoHeight);
        } else if (svg) {
          var view = svg.viewBox.baseVal, svgRect = svg.getBoundingClientRect();
          var svgScale = svgRect.width / (scale * view.width);
          if (!svgScale) return;
          var path = new Path2D(outline.getAttribute('d'));
          [ctx, wet].forEach(function (c) {
            c.translate((svgRect.left - rect.left) / scale + pad, (svgRect.top - rect.top) / scale + pad);
            c.scale(svgScale, svgScale);
            c.translate(-view.x, -view.y);
            c.lineWidth = 4 / svgScale;
            c.fill(path);
          });
          wet.stroke(path);
        } else {
          var ascent = ctx.measureText('H').fontBoundingBoxAscent;
          if (!Number.isFinite(ascent)) return;
          Array.from(name.childNodes).forEach(function (node) {
            if (node.nodeType !== 3) return;
            for (var i = 0; i < node.textContent.length; i++) {
              var ch = node.textContent[i]; if (!ch.trim()) continue;
              var selection = document.createRange(); selection.setStart(node,i); selection.setEnd(node,i+1);
              var box = selection.getBoundingClientRect();
              var x = (box.left - rect.left) / scale + pad, y = (box.top - rect.top) / scale + ascent + pad;
              if (style.textTransform === 'uppercase') ch = ch.toUpperCase();
              ctx.fillText(ch,x,y); wet.strokeText(ch,x,y); wet.fillText(ch,x,y);
            }
          });
        }
        // Smooth the whole outline first. Morphing signed distances then keeps
        // one contour at every intermediate state, without overlapping copies.
        blur.filter = 'blur(' + ((logo ? .7 : 7.2) * ratio).toFixed(2) + 'px)'; blur.drawImage(thick,0,0);
        var normalPixels = ctx.getImageData(0,0,width,height).data, softPixels = blur.getImageData(0,0,width,height).data;
        var normalMask = new Uint8Array(width*height), softMask = new Uint8Array(width*height);
        for (var i = 0; i < normalMask.length; i++) { normalMask[i] = normalPixels[i*4+3] > 127 ? 1 : 0; softMask[i] = softPixels[i*4+3] > 105 ? 1 : 0; }
        var normal = signedDistance(normalMask,width,height), soft = signedDistance(softMask,width,height), pixels = new Uint8Array(width*height*4);
        var maxGrowth = (logo ? 1.15 : 4) * ratio;
        for (var i = 0; i < normal.length; i++) { soft[i] = Math.min(soft[i],normal[i]+maxGrowth); pixels[i*4] = Math.round(Math.max(0,Math.min(255,127.5+normal[i]*127.5/range))); pixels[i*4+1] = Math.round(Math.max(0,Math.min(255,127.5+soft[i]*127.5/range))); pixels[i*4+2] = normalPixels[i*4+3]; pixels[i*4+3] = 255; }
        canvas.width = width; canvas.height = height; canvas.style.width = (width/ratio) + 'px'; canvas.style.height = (height/ratio) + 'px';
        gl.viewport(0,0,width,height); gl.useProgram(program); gl.bindTexture(gl.TEXTURE_2D,texture);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,width,height,0,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
        color = (style.color.match(/[\d.]+/g) || [15,15,15]).slice(0,3).map(function (n) { return Number(n)/255; });
        if (logo) {
          // Keep the visible colors intact at rest and along the expanding edge.
          wet.drawImage(source, 0, 0, width / ratio, height / ratio);
          gl.activeTexture(gl.TEXTURE1);
          gl.bindTexture(gl.TEXTURE_2D, artwork);
          gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,thick);
          gl.activeTexture(gl.TEXTURE0);
        }
        if (svg || logo) {
          base = svg || logo;
          name.append(canvas);
        } else {
          name.setAttribute('aria-label',name.innerText.replace(/\s+/g,' '));
          base = document.createElement('span'); base.className = 'pf-name-base'; base.innerHTML = original; base.setAttribute('aria-hidden','true');
          name.textContent = ''; name.append(base,canvas);
        }
        name.classList.add('pf-fluid-host'); name.dataset.fluidName = 'ready';
      } catch (_) { unavailable = true; restore(); }
    }
    function paint(time) {
      frame = 0; if (!base || !gl) return;
      var target = enabled() && over && !introRunning ? 1 : 0;
      var dt = Math.min(time-previous || 16.67,50); previous = time;
      var follow = 1-Math.exp(-dt/165), fade = 1-Math.exp(-dt/(target ? 220 : 290));
      followX += (mouseX-followX)*follow; followY += (mouseY-followY)*follow;
      strength += (target-strength)*fade;
      var r = name.getBoundingClientRect(), scale = r.width/name.offsetWidth || 1;
      var dragLimit = logo ? .7 : 3;
      var dx = Math.max(-dragLimit,Math.min(dragLimit,(mouseX-followX)/scale*.035)), dy = Math.max(-dragLimit,Math.min(dragLimit,(mouseY-followY)/scale*.035));
      dragX += (dx-dragX)*follow; dragY += (dy-dragY)*follow;
      if (!target && strength < .002) { name.classList.remove('pf-fluid-drawing'); name.dataset.fluidName = 'ready'; strength = 0; previous = 0; return; }
      gl.uniform2f(uniforms.size,width,height); gl.uniform2f(uniforms.pointer,((followX-r.left)/scale+pad)*ratio,((followY-r.top)/scale+pad)*ratio);
      gl.uniform2f(uniforms.drag,dragX*ratio,dragY*ratio); gl.uniform3f(uniforms.ink,color[0],color[1],color[2]);
      gl.uniform1f(uniforms.radius,(logo ? 70 : 235)*ratio/scale); gl.uniform1f(uniforms.strength,strength); gl.uniform1f(uniforms.band,range); gl.uniform1f(uniforms.pixel,ratio/scale);
      gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLES,0,6);
      name.classList.add('pf-fluid-drawing'); name.dataset.fluidName = 'active';
      if (Math.abs(target-strength)>.001 || Math.abs(mouseX-followX)+Math.abs(mouseY-followY)>.12 || Math.abs(dx-dragX)+Math.abs(dy-dragY)>.01) frame=requestAnimationFrame(paint);
      else previous=0;
    }
    function schedule() { if (!frame && base) frame=requestAnimationFrame(paint); }
    name.addEventListener('pointerenter',function(e){if(!enabled()||!base)return;over=true;mouseX=e.clientX;mouseY=e.clientY;if(strength<.01){followX=mouseX;followY=mouseY;}schedule();});
    name.addEventListener('pointermove',function(e){if(!enabled()||!base)return;mouseX=e.clientX;mouseY=e.clientY;schedule();});
    name.addEventListener('pointerleave',function(){over=false;schedule();});
    addEventListener('blur',function(){over=false;schedule();});
    addEventListener('scroll',function(){if(strength)schedule();},{passive:true});
    addEventListener('resize',function(){clearTimeout(resizeTimer);resizeTimer=setTimeout(build,220);},{passive:true});
    desktop.addEventListener('change',build); reduced.addEventListener('change',build);
    document.addEventListener('visibilitychange',function(){if(document.hidden){over=false;cancelAnimationFrame(frame);frame=0;strength=0;previous=0;name.classList.remove('pf-fluid-drawing');name.dataset.fluidName=base?'ready':'native';}});
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) { if (needsBuild) build(); }
      else { over = false; cancelAnimationFrame(frame); frame = 0; strength = 0; previous = 0; name.classList.remove('pf-fluid-drawing'); }
    }, { rootMargin: '200px 0px' }).observe(name);
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { fontsReady = true; build(); });
    if (logo && !logo.naturalWidth) logo.addEventListener('load', build, { once: true });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
