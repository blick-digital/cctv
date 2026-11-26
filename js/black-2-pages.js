
/* ---------- Данные ---------- */
const PHONE = '8 (812) 925-44-40', EMAIL = 'info@cctv.plus';
const ADDRESS = 'Санкт-Петербург, наб. Обводного канала, 134–136–138, лит. ВМ, офис 3';

const DIRS = {
  contract:{brand:'CCTV CONTRACT', title:'Крупные объекты под ключ', card:'Девелоперам, социальным и промышленным объектам',
    lead:'Фасады, отделка и инженерные системы на жилых комплексах, школах, поликлиниках и заводах. Работаем по тендерам и прямым договорам.',
    subs:[['developers','Девелоперам','Жилые комплексы и многоквартирные дома'],['social','Социальные объекты','Школы, поликлиники, больницы'],['industrial','Промышленные объекты','Заводы и производства']],
    cta:'Запросить КП', form:'tender', steps:'b2b',
    faq:[["Какие объёмы работ вы берёте?","Рассматриваем отдельные виды работ и комплексные участки строительства. Пришлите проект, ведомость объёмов и плановый график. По этим материалам определим состав команды, последовательность работ и условия выхода на объект."],["Работаете ли с госзаказом?","Рассматриваем участие в закупках и работу в составе команды генерального подрядчика. Для оценки нужны закупочная документация, требования к участнику, проект договора и сроки исполнения. Решение об участии принимаем после изучения условий конкретной закупки."],['Есть ли СРО и страхование ответственности?','Да. ООО «ЦЦТВ Плюс» — член СРО «Союз строителей «Газораспределительная система. Строительство» с 2022 года, ответственность застрахована.'],['В каких регионах работаете?','Основные регионы — Санкт-Петербург, Московская область и Ижевск. Для объектов в других городах рассматриваем состав работ, логистику и возможность размещения команды.']]},
  business:{brand:'CCTV BUSINESS', title:'Строительство и ремонт коммерческих объектов', card:'Торговым центрам, коммерческим помещениям, складам и АЗС',
    lead:'Отделка, фасады, кровля и инженерные системы для коммерческой недвижимости. Считаем смету и выезжаем на объект.',
    subs:[['malls','Торговые центры','Отделка фасадов<br>Инженерия'],['commercial','Коммерческие помещения','Офисы, магазины, кафе'],['warehouses','Склады','Кровля,<br>инженерные системы,<br>отделка'],['gas-stations','АЗС','Строительство<br>и ремонт']],
    cta:'Рассчитать смету', form:'quiz', steps:'b2b',
    faq:[["Можно ли работать, не закрывая объект?","Объект можно разделить на рабочие зоны и согласовать график с управляющей командой. Шумные и пыльные этапы планируем отдельно, учитываем маршруты посетителей и поставки. Возможность работы без закрытия оцениваем после осмотра и проверки требований безопасности."],["Сколько стоит ремонт помещения?","Стоимость складывается из состояния помещения, площади, состава инженерных систем и требований к отделке. Для первого расчёта подойдут план, фотографии и описание задачи. После осмотра составляем смету с объёмами, материалами и отдельными этапами."],["Даёте ли гарантию на работы?","Гарантийные обязательства фиксируем в договоре с учётом видов работ и выбранных материалов. Вместе с результатом передаём акты и рекомендации по эксплуатации. Если возникает вопрос по качеству, обращение рассматривает руководитель проекта."]]},
  home:{brand:'CCTV HOME', title:'Ремонт квартир и загородных домов', card:'Частным заказчикам: квартиры и загородные дома',
    lead:'Подход крупных строек в частном ремонте: проект, смета, контроль каждого этапа и внимание к деталям.',
    subs:[['apartments','Ремонт квартир','Новостройки<br>Вторичное жильё'],['houses','Загородные дома','Отделка, инженерия, фасады, кровля'],['design','Дизайн-проект','Планировка, визуализация, рабочие чертежи']],
    cta:'Записаться на замер', form:'booking', steps:'home',
    faq:[["Сколько стоит ремонт квартиры?","Смета зависит от исходного состояния квартиры, планировки, инженерных решений и выбранных покрытий. На замере фиксируем объёмы и обсуждаем материалы. В расчёте отдельно показываем работы и комплектацию, чтобы бюджет было удобно проверять."],["Нужен ли дизайн-проект?","Для изменения планировки, сложного освещения и встроенной мебели полезен комплект рабочих чертежей. Если задача проще, можно начать с обмерного плана, схем электрики и перечня отделки. На консультации определим, какой документации достаточно для вашего ремонта."],["Как вы контролируете качество?","Руководитель проекта проверяет этапы по рабочей документации. Скрытые работы осматриваем до того, как их закроет отделка, а изменения согласовываем с заказчиком. Фотоотчёты и перечень следующих задач помогают видеть состояние объекта между встречами."],["Сколько длится ремонт?","График составляем после замера и согласования состава работ. На сроки влияют перепланировка, высыхание материалов, поставки и готовность проектных решений. В календарном плане отмечаем этапы, контрольные точки и даты решений со стороны заказчика."]]},
  telecom:{brand:'CCTV TELECOM', title:'Работы для операторов связи', card:'Операторам связи: Ростелеком, МГТС, МТС',
    lead:'Самостоятельное направление группы. Выполняем работы для операторов связи по их требованиям и регламентам.',
    subs:[['lines','Строительство линий связи','Прокладка кабелей и организация вводов'],['cable-ducts','Кабельная канализация','Подготовка каналов и протяжка кабеля'],['equipment','Монтаж оборудования','Установка шкафов, стоек и оборудования узлов связи'],['low-current','Слаботочные сети','СКС, видеонаблюдение,<br>контроль доступа и связь']],
    cta:'Запросить КП', form:'tender', steps:'b2b',
    faq:[["Какие работы выполняете для операторов?","Прорабатываем трассы связи, прокладку кабеля, кабельную канализацию, монтаж узлов и слаботочных систем. Состав работ определяем по техническому заданию оператора. Отдельно согласовываем порядок переключений, измерения и комплект исполнительной документации."],["Есть ли допуски для работы на сетях операторов?","Требования зависят от сети, площадки и состава работ. До выхода на объект согласовываем с оператором перечень разрешений, квалификацию специалистов и порядок допуска. Документы для проверки передаём по запросу вместе с коммерческим предложением."],["Как пригласить вас в тендер?","Отправьте приглашение на info@cctv.plus или заполните форму запроса КП. Приложите техническое задание, объёмы, сроки и требования к участнику. В ответ согласуем контактное лицо и перечень материалов, необходимых для расчёта."]]},
};
const DKEYS = Object.keys(DIRS);

const SERVICES = [
  {slug:'project-docs',name:'Проектная документация',g:'ПИР',dirs:['contract','business','telecom'],desc:'Разработка проектной и рабочей документации по разделам.'},
  {slug:'estimates',name:'Сметная документация',g:'ПИР',dirs:['contract','business','home','telecom'],desc:'Сметы, ведомости объёмов работ, расчёт стоимости.'},
  {slug:'design',name:'Дизайн-проекты',g:'ПИР',dirs:['home','business'],desc:'Планировки, визуализации, рабочие чертежи для ремонта.'},
  {slug:'site',name:'Устройство стройплощадки',g:'СМР',dirs:['contract','business'],desc:'Подготовка площадки, ограждение, бытовой городок, временные сети.'},
  {slug:'monolith',name:'Монолитные работы',g:'СМР',dirs:['contract','business'],desc:'Фундаменты, перекрытия, стены из монолитного железобетона.'},
  {slug:'windows',name:'Окна и витражи',g:'СМР',dirs:['contract','business','home'],desc:'Монтаж окон, витражей и светопрозрачных конструкций.'},
  {slug:'roofing',name:'Кровельные работы',g:'СМР',dirs:['contract','business','home'],desc:'Устройство и ремонт плоских и скатных кровель, кровель паркингов.'},
  {slug:'facades',name:'Фасады и НВФ',g:'СМР',key:true,dirs:['contract','business','home'],desc:'Навесные вентилируемые фасады: подсистема, утепление, облицовка.'},
  {slug:'electric',name:'Электрика',g:'СМР',dirs:['contract','business','home'],desc:'Электромонтаж, щиты, освещение.'},
  {slug:'water-heating',name:'Отопление, водоснабжение и канализация (ОВ и ВК)',short:'ОВ и ВК',g:'СМР',dirs:['contract','business','home'],desc:'Системы отопления, водоснабжения и канализации.'},
  {slug:'ventilation',name:'Вентиляция',g:'СМР',dirs:['contract','business','home'],desc:'Монтаж систем вентиляции и кондиционирования.'},
  {slug:'low-current',name:'Слаботочные сети',g:'СМР',dirs:['contract','business','home','telecom'],desc:'СКС, видеонаблюдение, контроль доступа, связь.'},
  {slug:'rough-finish',name:'Черновая отделка',g:'СМР',key:true,dirs:['contract','business','home'],desc:'Стяжка, штукатурка, перегородки, подготовка под чистовую отделку.'},
  {slug:'fine-finish',name:'Чистовая отделка',g:'СМР',key:true,dirs:['contract','business','home'],desc:'Финишные покрытия стен, полов и потолков.'},
];
const S = Object.fromEntries(SERVICES.map(s=>[s.slug,s]));
const sname = s => S[s].short || S[s].name;
const SGROUPS = [
  {k:'pir',name:'Проектирование',tag:'ПИР',desc:'Готовим проектную и сметную документацию, делаем дизайн-проекты интерьеров.',items:['project-docs','estimates','design']},
  {k:'general',name:'Общестроительные работы',tag:'СМР',desc:'Готовим площадку и возводим несущие конструкции.',items:['site','monolith']},
  {k:'envelope',name:'Фасады, кровля, окна',tag:'СМР',desc:'Закрываем контур здания: навесные фасады, кровля, окна и витражи.',items:['facades','roofing','windows']},
  {k:'engineering',name:'Инженерные системы',tag:'СМР',desc:'Монтируем внутренние инженерные сети здания.',items:['electric','water-heating','ventilation','low-current']},
  {k:'finish',name:'Отделка',tag:'СМР',desc:'Черновая и чистовая отделка: от стяжки до финишных покрытий.',items:['rough-finish','fine-finish']},
];
const grpOf = s => SGROUPS.find(g=>g.items.includes(s));

const PROJECTS = [
  {slug:'school-lobnya',name:'Школа на 2200 мест',city:'Лобня',type:'Школа',dir:'contract',sub:'social',works:['facades','rough-finish','fine-finish']},
  {slug:'zhk-severny-veter',name:'ЖК «Северный ветер»',city:'Санкт-Петербург',type:'Жилой комплекс',dir:'contract',sub:'developers',works:['rough-finish','roofing']},
  {slug:'polyclinic-balashikha',name:'Поликлиника',city:'Балашиха',type:'Поликлиника',dir:'contract',sub:'social',works:['rough-finish','fine-finish']},
  {slug:'school-molokovo',name:'Школа в Молоково',city:'Молоково',type:'Школа',dir:'contract',sub:'social',works:['rough-finish','fine-finish']},
  {slug:'mkd-izhevsk',name:'Многоквартирный дом, заказчик «Аспек Инжиниринг»',city:'Ижевск',type:'Жилой дом',dir:'contract',sub:'developers',works:['electric','facades']},
  {slug:'hotel-zoom',name:'Отель Zoom на Чёрной речке',city:'Санкт-Петербург',type:'Отель',dir:'business',sub:'commercial',works:['facades']},
];
// Supplementary illustrations for the six original projects.
const PROJECT_PHOTOS = {
  'school-molokovo': 'assets/img/draft-school.jpg',
  'mkd-izhevsk': 'assets/img/draft-housing.jpg',
  'hotel-zoom': 'assets/img/zoom-cover-v2.webp'
};
PROJECTS.forEach(project => {
  project.img = window.CCTV.PROJECTS.find(item => item.slug === project.slug)?.img || PROJECT_PHOTOS[project.slug];
  project.illustration = Boolean(PROJECT_PHOTOS[project.slug]);
});

// Each object owns its gallery; exterior illustrations follow that object's cover architecture.
const PROJECT_STAGE_SETS = {
  rough:{title:'Черновая отделка',works:['rough-finish'],images:[
    ['rough-before.webp','Перегородки и основания до отделки'],
    ['rough-during.webp','Штукатурка стен и подготовка оснований'],
    ['rough-after-v2.webp','Готовая штукатурка и ровная стяжка под чистовую отделку']
  ]},
  roofing:{title:'Кровельные работы',works:['roofing'],images:[
    ['roof-before.webp','Основание кровли перед устройством гидроизоляции'],
    ['severny-roof-process-v3.webp','Прокатка и прижим шва кровельной мембраны'],
    ['roof-after-v2.webp','Готовое покрытие и примыкания кровли']
  ]},
  clinic:{title:'Черновая и чистовая отделка поликлиники',works:['rough-finish','fine-finish'],images:[
    ['clinic-before.webp','Помещения перед началом отделочных работ'],
    ['clinic-during-v2.webp','Подготовка стен, полов и потолков'],
    ['clinic-after-v2.webp','Готовые покрытия стен, пола и потолка']
  ]},
  molokovoInterior:{title:'Черновая и чистовая отделка школы',works:['rough-finish','fine-finish'],images:[
    ['school-before.webp','Учебное помещение до отделки'],
    ['school-during-v2.webp','Штукатурка, подготовка пола и отделка помещения'],
    ['school-after-v2.webp','Помещение с готовой чистовой отделкой']
  ]},
  electric:{title:'Электромонтажные работы',works:['electric'],images:[
    ['electric-before.webp','Щит и кабельные трассы до монтажа'],
    ['electric-during-v2.webp','Сборка щита и прокладка кабелей'],
    ['electric-after-v2.webp','Готовый распределительный щит и кабельные трассы']
  ]},
  lobnyaInterior:{title:'Отделка общих пространств школы',works:['rough-finish','fine-finish'],images:[
    ['lobnya-interior-before.webp','Холл и лестничная зона перед отделкой'],
    ['lobnya-interior-during.webp','Подготовка стен, устройство стяжки и монтаж потолочной системы'],
    ['lobnya-interior-after.webp','Готовая отделка холла и лестничной зоны']
  ]},
  lobnyaFacades:{title:'Фасады школы на 2200 мест',works:['facades'],images:[
    ['lobnya-facade-before.webp','Подготовка основания и оконных примыканий школы'],
    ['lobnya-facade-during.webp','Монтаж светлой мелкоформатной облицовки'],
    ['lobnya-facade-after.webp','Готовый светлый фасад с тёмными оконными вставками']
  ]},
  izhevskFacades:{title:'Фасады жилого дома в Ижевске',works:['facades'],images:[
    ['izhevsk-facade-before.webp','Подготовка фасадного участка жилого дома'],
    ['izhevsk-facade-during.webp','Монтаж утепления, светлых панелей и тёмных фасадных полос'],
    ['izhevsk-facade-after.webp','Готовая облицовка и угловое остекление жилого дома']
  ]},
  zoomFacades:{title:'Фасады отеля Zoom',works:['facades'],images:[
    ['zoom-facade-before-v2.webp','Подготовка облицовки входной группы отеля'],
    ['zoom-facade-during-v2.webp','Монтаж графитовой облицовки и узлов примыкания к остеклению'],
    ['zoom-facade-after-v2.webp','Готовый тёмный фасад и входной козырёк отеля']
  ]}
};
const PROJECT_STAGE_GALLERIES = {
  'school-lobnya':['lobnyaInterior','lobnyaFacades'],
  'zhk-severny-veter':['rough','roofing'],
  'polyclinic-balashikha':['clinic'],
  'school-molokovo':['molokovoInterior'],
  'mkd-izhevsk':['electric','izhevskFacades'],
  'hotel-zoom':['zoomFacades']
};
function projectGallery(project) {
  const photos = (PROJECT_STAGE_GALLERIES[project.slug] || []).flatMap(key=>{
    const set = PROJECT_STAGE_SETS[key];
    return set.images.map(([file,description])=>({file,description,title:set.title}));
  });
  return `<section class="direction-section case-process" aria-label="Процесс работы"><div class="grid">
    <div class="case-process-side" data-inner-enter><span class="label">/ Фотогалерея</span><div class="case-process-copy"><h2 class="h2">Процесс<br class="desktop-break"> работы</h2><p>Показываем участки работ и детали их выполнения.</p></div></div>
    <div class="case-photo-gallery" data-project-gallery data-index="0" role="region" aria-roledescription="карусель" aria-label="Галерея работ: ${project.name.replaceAll('"','&quot;')}" data-inner-enter>
      <div class="case-photo-slides">${photos.map((photo,index)=>`<figure class="case-photo-slide" data-project-photo data-description="${photo.description}"${index ? ' hidden' : ''} role="group" aria-roledescription="слайд" aria-label="${index+1} из ${photos.length}"><img src="assets/img/project-stages/${photo.file}" alt="${photo.title}: ${photo.description}. Иллюстрация" width="1536" height="1024" loading="lazy"></figure>`).join('')}</div>
      <div class="case-photo-controls"><div class="case-photo-meta" role="status" aria-live="polite" aria-atomic="true"><span class="case-photo-count">01/${String(photos.length).padStart(2,'0')}</span><p class="case-photo-description">${photos[0].description}</p></div><span class="case-photo-rule" aria-hidden="true"></span><div class="review-controls"><button class="circ review-prev" type="button" data-project-gallery-step="-1" aria-label="Предыдущее фото"><svg aria-hidden="true"><use href="#i-arrow"/></svg></button><button class="circ review-next" type="button" data-project-gallery-step="1" aria-label="Следующее фото"><svg aria-hidden="true"><use href="#i-arrow"/></svg></button></div></div>
    </div>
  </div></section>`;
}
function stepProjectGallery(gallery, step) {
  const slides = [...gallery.querySelectorAll('[data-project-photo]')];
  if (!slides.length) return;
  const index = (Number(gallery.dataset.index) + step + slides.length) % slides.length;
  slides.forEach((slide,i)=>{slide.hidden = i !== index;});
  gallery.dataset.index = String(index);
  gallery.querySelector('.case-photo-count').textContent = `${String(index+1).padStart(2,'0')}/${String(slides.length).padStart(2,'0')}`;
  gallery.querySelector('.case-photo-description').textContent = slides[index].dataset.description;
}
function initProjectGallerySwipe() {
  app.querySelectorAll('[data-project-gallery]').forEach(gallery=>{
    const surface = gallery.querySelector('.case-photo-slides');
    let start = null;
    surface.addEventListener('pointerdown',event=>{
      if (event.pointerType !== 'touch' || !event.isPrimary) return;
      start = {id:event.pointerId,x:event.clientX,y:event.clientY};
      surface.setPointerCapture(event.pointerId);
    },{passive:true});
    surface.addEventListener('pointerup',event=>{
      if (!start || event.pointerId !== start.id) return;
      const dx = event.clientX-start.x, dy = event.clientY-start.y;
      start = null;
      if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)*1.25) stepProjectGallery(gallery,dx < 0 ? 1 : -1);
    },{passive:true});
    surface.addEventListener('pointercancel',()=>{start=null;},{passive:true});
  });
}


const P = Object.fromEntries(PROJECTS.map(p=>[p.slug,p]));
const CLIENTS = ['Брусника','Глоракс','МСУ-1','Инжиниринг групп'];
const DOCS = [
  {name:'Членство в СРО',kind:'СРО',file:'assets/documents/sro-extract.pdf',preview:'assets/documents/sro-extract.webp',meta:'Союз строителей «Газораспределительная система. Строительство»',text:'Выписка из реестра от 19 октября 2026 года. Регистрационный номер СРО-С-048-12102009. ООО «ЦЦТВ Плюс» состоит в реестре членов с 21 января 2022 года.'},
  {name:'Страхование ответственности',kind:'Полис',file:'assets/documents/liability-insurance.pdf',preview:'assets/documents/liability-insurance.webp',meta:'ООО «СК «Экспресс-страхование»',text:'Страхование гражданской ответственности и финансовых рисков членов СРО. Срок действия по документу: с 9 декабря 2025 года по 1 ноября 2026 года.'},
  {name:'Документы для допуска',kind:'Допуск',meta:'Комплект под требования объекта',text:'Перечень формируем по техническому заданию заказчика. В него могут входить сведения о специалистах, документы по охране труда, программа производства работ и формы исполнительной документации.'}
];

const STEPS = {
  b2b:[['Запрос или тендер','Получаем ТЗ или приглашение'],['Расчёт','Смета и коммерческое предложение'],['Договор','Фиксируем объём, сроки и цену'],['Работы','Свои инженеры и проверенные подрядчики'],['Сдача','Акты и исполнительная документация']],
  home:[['Замер','Инженер приезжает на объект'],['Дизайн-проект','Если нужен: планировка и визуализации'],['Смета и договор','Фиксируем стоимость и сроки'],['Ремонт','Контроль этапов и фотоотчёты'],['Сдача','Приёмка и гарантия']],
};

/* ---------- Помощники ---------- */
const app = document.getElementById('app');
const SECTION_PHOTOS = {
  'Девелоперам':'assets/img/prj-zhk.jpg',
  'Социальные объекты':'assets/img/prj-school.jpg',
  'Промышленные объекты':'assets/img/svc-general.jpg',
  'Торговые центры':'assets/img/dir-business.jpg',
  'Коммерческие помещения':'assets/img/about-engineering-dark.png',
  'Склады':'assets/img/draft-warehouse.jpg',
  'АЗС':'assets/img/draft-station.jpg',
  'Ремонт квартир':'assets/img/dir-home.jpg',
  'Загородные дома':'assets/img/draft-house.jpg',
  'Дизайн-проект':'assets/img/svc-design.jpg',
  'Виды работ':'assets/img/draft-network.jpg',
  'Допуски и регламенты':'assets/img/svc-engineering.jpg',
  'Строительство линий связи':'assets/img/dir-telecom.jpg',
  'Кабельная канализация':'assets/img/svc-general.jpg',
  'Монтаж оборудования':'assets/img/draft-network.jpg',
  'Слаботочные сети':'assets/img/draft-network.jpg',
  'Фото: инженер на замере':'assets/img/draft-team.jpg'
};
const ph = (title,ratio='16/10') => {
  const hash = location.hash.slice(1), direction = hash.split('-')[0];
  const project = P[hash.replace(/^project-/, '')];
  const image = title === 'Главное фото объекта' ? project?.img
    : SECTION_PHOTOS[title] || window.CCTV.DIRS[direction]?.img || 'assets/img/draft-team.jpg';
  const illustration = title === 'Главное фото объекта' && (project?.illustration);
  return `<figure class="page-photo" style="aspect-ratio:${ratio}"><img src="${image}" alt="${illustration ? 'Иллюстрация для макета. ' : ''}${title}" loading="lazy">${illustration ? '<figcaption class="photo-caption">Иллюстрация для макета</figcaption>' : ''}</figure>`;
};
const blk = (label,html) => `<section class="blk" data-label="${label}"><div class="ct">${html}</div></section>`;

// Shared photographic first screen for internal pages; About keeps its approved standalone layout.
function innerHero({title, section, lead='', actions='', image, direction='', tag='', meta='', illustration=false}) {
  return `<section class="inner-hero ${direction}" aria-labelledby="inner-page-title">
    <div class="inner-hero-media" aria-hidden="true"><img src="${image}" alt="" width="1440" height="700" fetchpriority="high"></div>
    <div class="grid inner-hero-grid">
      <div class="inner-hero-side" data-inner-enter><span class="label">/ ${section}</span></div>
      <div class="inner-hero-content">
        <h1 id="inner-page-title" data-inner-enter>${title}</h1>
        ${meta || tag ? `<div class="inner-hero-meta" data-inner-enter>${meta ? `<p>${meta}</p>` : ''}${tag ? `<span class="inner-hero-tag">${tag}</span>` : ''}</div>` : ''}
        ${lead ? `<p class="inner-hero-lead" data-inner-enter>${lead}</p>` : ''}
        ${actions ? `<div class="inner-hero-actions" data-inner-enter>${actions}</div>` : ''}
        ${illustration ? '<p class="inner-hero-note" data-inner-enter>Иллюстрация для макета</p>' : ''}
      </div>
    </div>
  </section>`;
}

const badge = d => `<span class="badge ${d}">${DIRS[d].brand}</span>`;
const secH = (title,sub,right='') => `<div class="sec-h"><div><h2>${title}</h2>${sub?`<p class="mut">${sub}</p>`:''}</div>${right}</div>`;
const chipsSvc = list => `<div class="chips">${list.map(s=>`<a class="chip${S[s].key?' key':''}" href="${serviceURL('service-' + s)}">${sname(s)}</a>`).join('')}</div>`;
function pcard(project) {
  const photo = project.img;
  const cover = `<img src="${photo}" alt="${project.illustration ? 'Иллюстрация. ' : ''}${project.name}, ${project.city}" loading="lazy">`;
  return `<a class="prj" href="#project-${project.slug}">
    <div class="prj-img">${cover}<span class="circ"><svg aria-hidden="true"><use href="#i-arrow"/></svg></span></div>
    <p class="prj-meta">${project.city} · ${project.type}${project.illustration ? ' · Иллюстрация' : ''}</p>
    <h3 class="prj-name">${project.name}</h3>
    <ul class="tags">${project.works.map(key => `<li>${sname(key)}</li>`).join('')}</ul>
  </a>`;
}
function pgrid(list) {
  if (!list.length) return `<div class="empty-state"><h3>Подберём решение для вашего объекта</h3><p>Расскажите о вашей задаче, и мы подберём примеры работ.</p>${Black2.pill('Обсудить проект', 'data-open="lead"')}</div>`;
  return `<div class="project-collection">${list.map(pcard).join('')}</div>`;
}
const faq = list => `<div class="stack">${list.map(q=>`<details class="faq"><summary><span class="faq-question">${q[0]}</span><svg class="faq-arrow" aria-hidden="true"><use href="#i-arrow"/></svg></summary><p>${q[1]}</p></details>`).join('')}</div>`;
const logos = () => `<div class="clients-grid">${Black2.clientLogos.flat().map(Black2.clientLogo).join('')}</div>`;
const docsList = (documents = DOCS, infoLabel = 'Информация о документе') => `<div class="g3">${documents.map((document, index) => {
  const downloadIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const download = document.file
    ? `<a class="document-download" href="${document.file}" download aria-label="Скачать: ${document.name}" title="Скачать документ">${downloadIcon}</a>`
    : `<button class="document-download" type="button" disabled aria-label="Скачать: ${document.name} — файл пока не добавлен" title="Файл пока не добавлен">${downloadIcon}</button>`;
  return `<article class="card document-card" aria-label="${document.name}">
    <div class="document-cover">
      <span>${document.coverLabel || 'CCTV GROUP'}</span>
      <div class="document-title">
        ${document.preview ? `<button class="document-kind" type="button" aria-describedby="document-preview-${index}">${document.kind}</button>
        <div class="document-preview" role="tooltip" id="document-preview-${index}"><img src="${document.preview}" alt="${document.name} — первая страница" width="745" height="1053" loading="lazy"></div>` : `<b class="document-kind">${document.kind}</b>`}
      </div>
      <div class="document-footer">
        <div class="document-info">
          <button class="document-info-trigger" type="button" aria-describedby="document-description-${index}">${infoLabel}</button>
          <div class="document-tooltip" role="tooltip" id="document-description-${index}">
            <h3>${document.name}</h3>
            <p class="svc-desc">${document.meta}</p>
            <p class="svc-desc">${document.text}</p>
          </div>
        </div>
        ${download}
      </div>
    </div>
  </article>`;
}).join('')}</div>`;


let fid = 0;
function directionChips() {
  return `<fieldset class="chips-field"><legend>Направление</legend><div class="chips">${[['','Не знаю, подскажите'], ...DKEYS.map(key=>[key,DIRS[key].brand])].map(([key,label])=>`<button type="button" class="chip ${key}" data-chip="${key}" aria-pressed="${key === ''}">${label}</button>`).join('')}<input type="hidden" name="dir"></div></fieldset>`;
}
function formHTML(type,dir){
  const id = 'f'+(++fid);
  const fld = (n,l,t='text',req,extra='') => `<label class="field" for="${id}-${n}"><span>${l}</span><input id="${id}-${n}" name="${n}" type="${t}"${req?' required':''}${extra}></label>`;
  const sel = (n,l,opts) => `<label class="field" for="${id}-${n}"><span>${l}</span><select id="${id}-${n}" name="${n}">${opts.map(o=>`<option>${o}</option>`).join('')}</select></label>`;
  const area = (n,l) => `<label class="field" for="${id}-${n}"><span>${l}</span><textarea id="${id}-${n}" name="${n}"></textarea></label>`;
  const nameph = `<div class="form-row">${fld('name','Имя','text',1,' autocomplete="name"')}${fld('phone','Телефон','tel',1,' autocomplete="tel" placeholder="+7"')}</div>`;
  const consent = Black2.consent();
  const T = {
    callback:['Обратный звонок','Перезвоним в рабочее время',nameph],
    general:['Оставить заявку','Заявка попадёт менеджеру нужного направления',nameph+sel('dir','Направление',['Не знаю, подскажите',...DKEYS.map(d=>DIRS[d].brand)])+area('msg','Задача')],
    tender:['Запрос КП или приглашение в тендер','Приложите ТЗ или проект — рассчитаем стоимость',`<div class="form-row">${fld('company','Компания','text',1)}${fld('name','Контактное лицо','text',1)}</div><div class="form-row">${fld('phone','Телефон','tel',1)}${fld('email','Почта','email')}</div>${sel('object','Тип объекта',dir&&DIRS[dir]?DIRS[dir].subs.map(s=>s[1]).concat('Другое'):['Жилой комплекс','Социальный объект','Промышленный объект','Коммерческий объект','Другое'])}<label class="field" for="${id}-file"><span>ТЗ, проект или ведомость объёмов</span><input id="${id}-file" name="file" type="file" multiple></label>${area('msg','Комментарий')}`],
    engineer:['Выезд инженера на объект','Инженер осмотрит объект и подготовит смету',nameph+`<div class="form-row">${sel('object','Объект',['Торговый центр','Коммерческое помещение','Склад','АЗС','Другое'])}${fld('addr','Адрес объекта')}</div>`+area('msg','Что нужно сделать')],
    partner:['Анкета подрядчика','Расскажите о компании и видах работ',`<div class="form-row">${fld('company','Компания или ИП','text',1)}${fld('name','Контактное лицо','text',1)}</div><div class="form-row">${fld('phone','Телефон','tel',1)}${fld('email','Почта','email')}</div><div class="form-row">${sel('work','Основной вид работ',SERVICES.filter(s=>s.g==='СМР').map(s=>s.name))}${fld('region','Регион работы')}</div>${area('msg','Опыт и объекты')}`],
    vacancy:['Отклик на вакансию','Пришлите резюме — свяжемся',nameph+`<div class="direction-upload"><label class="direction-upload-button" for="${id}-cv"><input id="${id}-cv" name="cv" type="file" aria-label="Выбрать резюме" aria-describedby="${id}-cv-hint"><span class="direction-upload-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m-4-4 4 4 4-4M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>Выбрать резюме</span></label><p class="direction-upload-hint" id="${id}-cv-hint" aria-live="polite" data-empty-text="Загрузите своё готовое резюме">Загрузите своё готовое резюме</p></div>`+area('msg','Сопроводительное письмо')],
  };
  const t = T[type]||T.callback;
  return `<form class="form form--dark js-form" data-title="${t[0]}"><div class="stack" style="gap:4px"><h3 id="${id}-t">${t[0]}</h3><p class="sm mut">${t[1]}</p></div>${t[2]}<div class="form-foot">${consent}${Black2.pill(`Отправить`, `type="submit"`, 'button', 'cta')}</div></form>`;
}

/* ---------- Шапка и подвал ---------- */

function ctaFor(d) {
  if (!d) return Black2.pill('Оставить заявку', 'data-open="lead"');
  if (d === 'home') return Black2.pill(DIRS[d].cta, 'data-open="booking"');
  if (d === 'business') return Black2.pill(DIRS[d].cta, 'data-quiz="business"');
  return Black2.pill(DIRS[d].cta, `data-form="tender" data-dir="${d}"`);
}
// Direction pages share the composition of the supplied Contract layout.
const DIRECTION_LAYOUT = {
  contract:{title:'Крупные объекты<br>под ключ',projects:'Школы, жилые<br>комплексы,<br>поликлиники, отели'},
  business:{title:'Строительство и ремонт<br>коммерческих объектов',projects:'Коммерческие<br>пространства<br>и объекты бизнеса'},
  home:{title:'Ремонт квартир<br>и загородных домов',projects:'Квартиры<br>и загородные дома'},
  telecom:{title:'Работы для<br>операторов связи',projects:'Объекты<br>операторов связи'}
};
function directionHead(label,title,action='') {
  return `<div class="grid direction-head"><div class="c1-2 direction-side"><span class="label">/ ${label}</span>${action}</div><h2 class="h2 c3-5" data-inner-enter>${title}</h2></div>`;
}
function directionServicesBlock() {
  const groups=SGROUPS.map(g=>({...g,items:g.items.filter(key=>svcOnly.includes(key))})).filter(g=>g.items.length);
  if(!groups.some(g=>g.k===svcTab)) svcTab=groups[0].k;
  const index=groups.findIndex(g=>g.k===svcTab), group=groups[index];
  const photo=window.CCTV.SGROUPS.find(g=>g.k===group.k);
  const telecomEngineering=svcDir==='telecom'&&group.k==='engineering';
  const image=telecomEngineering?'assets/img/draft-network.jpg':group.k==='finish'?'assets/img/svc-finish-dark.png':photo.img;
  if(telecomEngineering)group.desc='Монтируем слаботочные сети: СКС, видеонаблюдение, контроль доступа и связь.';
  return `<div class="grid b2-service-selector">
    <div class="c1-2 b2-service-index"><div class="b2-service-tabs" role="tablist" aria-label="Группы услуг">${groups.map(g=>`<button type="button" class="svc-tab" role="tab" id="direction-tab-${g.k}" aria-selected="${g.k===svcTab}" aria-controls="service-${g.k}" tabindex="${g.k===svcTab?0:-1}" data-svc-tab="${g.k}">${g.name}</button>`).join('')}</div><p class="b2-service-number" aria-hidden="true">${String(index+1).padStart(2,'0')} / ${String(groups.length).padStart(2,'0')}　${group.tag}</p></div>
    <div class="c3-5 b2-service-panels">${Black2.servicePanel({...group,img:image},{labelledBy:'direction-tab-'+group.k,services:Object.fromEntries(group.items.map(key=>[key,[S[key].name,S[key].desc]]))})}</div>
  </div>`;
}
function directionSteps(key) {
  return `<div class="steps-wrap"><div class="steps-rail" aria-hidden="true"><i data-direction-steps-bar></i></div><ol class="steps-list">${STEPS[key].map(([title,description],i)=>`<li class="step"><span class="step-num" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><i class="step-dot" aria-hidden="true"></i><div class="step-body"><span class="step-k">Этап ${i+1}</span><h3 class="step-t">${title}</h3><p class="step-d">${description}</p></div></li>`).join('')}</ol></div>`;
}
function directionApplication(d) {
  const heading=d==='home'?'Начнём с замера':d==='business'?'Выезд инженера<br>на объект':d==='telecom'?'<span>Пригласите</span><span>нас в тендер</span>':'<span>Запрос КП</span><span>или приглашение</span><span>в тендер</span>';
  const intro=d==='home'?'Запишитесь на удобное время или ответьте на несколько вопросов — посчитаем ремонт.':d==='business'?'Инженер осмотрит объект и подготовит смету.':'Приложите техническое задание, проект или ведомость объёмов работ.';
  let form=d==='home'?`<div class="direction-booking"><h2 class="h2">${heading}</h2><p>${intro}</p><div class="row">${ctaFor(d)}${Black2.pill('Рассчитать ремонт','type="button" data-quiz="home"')}</div></div>`:formHTML(d==='business'?'engineer':'tender',d);
  if(d!=='home') {
    form=form.replace(/<div class="stack" style="gap:4px">.*?<\/div>/,'');
    const types=DIRS[d].subs.map((sub,index)=>`<label class="direction-object-choice"><input type="radio" name="object" value="${sub[1]}"${index===0?' checked':''}><span>${sub[1]}</span></label>`).join('')+'<label class="direction-object-choice"><input type="radio" name="object" value="Другое"><span>Другое</span></label>';
    const choices=`<fieldset class="chips-field direction-object-choices"><legend>${d==='telecom'?'Выберите вид работ:':'Выберите тип объекта:'}</legend><div>${types}</div></fieldset>`;
    form=form.replace(/<label class="field" for="[^"]+-object">.*?<\/label>/,'');
    form=form.replace(/(<form[^>]*>)/,'$1'+choices);
    if(d==='business')form=form.replace(/<div class="form-row">(<label class="field" for="[^"]+-addr">.*?<\/label>)<\/div>/,'<div class="form-row direction-address-row">$1</div>');
    form=form.replace(/<label class="field" for="([^"]+-file)"><span>.*?<\/span><input([^>]*type="file"[^>]*)><\/label>/,(_,id,attributes)=>`<div class="direction-upload"><label class="direction-upload-button" for="${id}"><input${attributes} aria-label="Выбор файлов"><span class="direction-upload-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m-4-4 4 4 4-4M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>Выбор файлов</span></label><p class="direction-upload-hint" aria-live="polite">Загрузите ТЗ,<br>проект или ведомость объёмов</p></div>`);

  }
  return `<section class="direction-section direction-application" aria-label="Заявка"><div class="grid direction-application-grid"><div class="c1-2 direction-application-side" data-inner-enter><span class="label">/ Заявка</span>${d==='home'?'':`<h2 class="h2">${heading}</h2><p class="direction-application-intro">${intro}</p>`}<address><a href="tel:+78129254440">${PHONE}</a><a href="mailto:${EMAIL}">${EMAIL}</a><p>${ADDRESS}</p></address></div><div class="c3-5 direction-application-form" data-inner-enter>${form}</div></div></section>`;
}
function directionObjectHeading(direction,key,description) {
  if(description.includes('<br>')) {
    return `<h3 data-fit-card-lines>${description.split('<br>').map(line=>`<span class="direction-object-line">${line}</span>`).join('\n')}</h3>`;
  }
  return `<h3>${description}</h3>`;
}
function telecomCardHeading(key,name) {
  const text=key==='lines'?'Строительство<br>линий связи':key==='low-current'?'Слаботочные<br>сети':name;
  return directionObjectHeading('telecom',key,text);
}
function directionProjectCards(projects) {
  return Array.from({length:3},(_,index)=>projects[index]?pcard(projects[index]):
    `<article class="prj prj--pending" aria-label="Проект в работе"><div class="prj-img"><span class="project-pending-status">В работе</span></div><div class="project-pending-lines" aria-hidden="true"><i></i><i></i></div></article>`).join('');
}
function pgDir(d){
  setSvcScope(d);
  const D=DIRS[d], layout=DIRECTION_LAYOUT[d], projects=PROJECTS.filter(p=>p.dir===d);
  return `<div class="direction-page ${d}">`+innerHero({title:layout.title,section:D.brand,lead:D.lead,direction:d,image:window.CCTV.DIRS[d].img,
    actions:ctaFor(d)+Black2.pill('Кейсы',`href="#projects?dir=${d}"`,'a','line')})
  + `<section class="direction-section direction-objects" aria-label="${d==='telecom'?'Виды работ':'Типы объектов'}"><h2 class="h2" data-inner-enter>${d==='telecom'?'Виды работ<br>для операторов связи':'С какими<br>объектами<br class="mobile-break"> работаем'}</h2><div class="direction-object-grid" style="--object-count:${D.subs.length}">${D.subs.map(([key,name,description])=>`<article class="direction-object" data-inner-enter><div class="dcard-bg"><img src="assets/img/direction-objects/${d}-${key}.jpg" alt="" loading="lazy"><i class="dcard-tint"></i></div><ul class="dcard-subs"><li>${d==='telecom'?'Для операторов связи':name}</li></ul>${d==='telecom'?`<div class="direction-object-copy">${telecomCardHeading(key,name)}<p${key==='lines'?' class="direction-object-nowrap"':''}>${description}</p></div>`:directionObjectHeading(d,key,description)}</article>`).join('')}</div></section>`
  + `<section class="direction-section b2-services" aria-label="Что делаем">${directionHead('Что делаем','Полный цикл:<br>проектирование и<br>строительно-монтажные<br>работы',Black2.pill('Обсудить проект',`data-open="lead" data-dir="${d}"`))}<div id="svc-wrap">${directionServicesBlock()}</div></section>`
  + `<section class="direction-section direction-projects" aria-label="Проекты ${D.brand}">${directionHead('Проекты '+D.brand,layout.projects,Black2.pill('Все проекты',`href="#projects?dir=${d}"`,'a'))}<div class="direction-project-grid" tabindex="0" aria-label="Проекты направления" data-inner-enter>${directionProjectCards(projects)}</div></section>`
  + `<section class="direction-section direction-process" aria-label="Как мы работаем">${directionHead('Как мы работаем',d==='home'?'От замера до новоселья —<br>пять шагов':'От запроса до сдачи<br>объекта — пять шагов')}${directionSteps(D.steps)}</section>`
  + directionApplication(d)
  + reviewsSection()
  + `<section class="direction-section direction-faq" aria-label="Частые вопросы">${directionHead('FAQ','Частые вопросы')}<div class="grid direction-faq-grid"><p class="direction-faq-note">Собрали ответы на вопросы, которые чаще всего возникают перед началом работ.<br><br>Если не нашли нужную информацию — свяжитесь с нами, и мы подробно разберём вашу задачу.</p><div class="c3-5" data-inner-enter>${faq(D.faq)}</div></div></section></div>`;
}

let svcTab='pir';
function svcItem(slug,open){
  const s=S[slug], n=PROJECTS.filter(p=>p.works.includes(slug)).length;
  return `<details class="svc-item" id="svc-${slug}"${open?' open':''}><summary><span>${s.name}</span><i aria-hidden="true">+</i></summary><div class="svc-body"><p>${s.desc}</p><div class="chips">${s.dirs.map(d=>`<a class="badge ${d}" href="#${d}" style="text-decoration:none">${DIRS[d].brand}</a>`).join('')}</div>${n?`<a href="#projects?work=${slug}">Проекты с этой работой: ${n} →</a>`:'<span class="sm mut">Проектов с этой работой пока нет</span>'}</div></details>`;
}
let svcOnly=null, svcDir=null;
function svcBlock(open){
  if (svcDir && DKEYS.includes(location.hash.slice(1))) return directionServicesBlock();
  const groups=SGROUPS.map(g=>({...g,items:svcOnly?g.items.filter(x=>svcOnly.includes(x)):g.items})).filter(g=>g.items.length);
  if(open) svcTab=grpOf(open).k;
  if(!groups.some(g=>g.k===svcTab)) svcTab=groups[0].k;
  const g=groups.find(x=>x.k===svcTab);
  const cta = svcDir ? '' : Black2.pill('Обсудить проект', 'data-open="lead"');
  return `<div class="svc-tabs" role="tablist" aria-label="Группы услуг">${groups.map(x=>`<button type="button" class="svc-tab" role="tab" aria-selected="${x.k===svcTab}" data-svc-tab="${x.k}">${x.name}</button>`).join('')}</div>
  <div class="svc-panel"><div class="stack svc-left"><span class="lbl">${g.tag}</span>${cta}</div>
  <div class="svc-list"><h2>${g.name}</h2><p class="mut svc-description">${g.desc}</p>${g.items.map(s=>svcItem(s,s===open)).join('')}</div></div>`;
}
const svcWrap=()=>`<div id="svc-wrap" class="stack" style="gap:28px">${svcBlock()}</div>`;
const svcList=list=>`<div class="svc-list" style="max-width:760px">${list.map(s=>svcItem(s)).join('')}</div>`;
function setSvcScope(d){svcDir=d||null;svcOnly=d?SERVICES.filter(s=>s.dirs.includes(d)).map(s=>s.slug):null;if(d)svcTab=null}

let flt = {dir:'',work:'',type:''};
function readProjectFilters(query) {
  const params=new URLSearchParams(query);
  const dir=params.get('dir')||'',work=params.get('work')||'',type=params.get('type')||'';
  flt={dir:DKEYS.includes(dir)?dir:'',work:SERVICES.some(service=>service.slug===work)?work:'',type:PROJECTS.some(project=>project.type===type)?type:''};
}
function syncProjectFilterURL() {
  const params=new URLSearchParams();
  for(const [key,value] of Object.entries(flt))if(value)params.set(key,value);
  history.replaceState(null,'','#projects'+(params.size?'?'+params.toString():''));
}

function projGrid(){
  const list=PROJECTS.filter(p=>(!flt.dir||p.dir===flt.dir)&&(!flt.work||p.works.includes(flt.work))&&(!flt.type||p.type===flt.type));
  return `<p class="sm mut">Найдено: ${list.length}</p>${list.length?pgrid(list,0):`<div class="card"><h3>Нет проектов по этим фильтрам</h3><p class="sm mut">Выберите другие параметры или сбросьте фильтры, чтобы увидеть весь каталог.</p></div>`}`;
}
function projectFilter(key, label, options) {
  const choices = [['', 'Все'], ...options];
  const selected = choices.find(([value]) => value === flt[key]) || choices[0];
  return `<div class="fl project-filter" data-project-filter>
    <span id="flt-${key}-label">${label}</span>
    <button type="button" class="filter-trigger" role="combobox" aria-haspopup="listbox"
      aria-expanded="false" aria-controls="flt-${key}-options" aria-labelledby="flt-${key}-label flt-${key}-value">
      <span id="flt-${key}-value" data-filter-label>${selected[1]}</span><i aria-hidden="true"></i>
    </button>
    <div class="filter-options" id="flt-${key}-options" role="listbox" aria-labelledby="flt-${key}-label" hidden>
      ${choices.map(([value,text],index) => `<button type="button" role="option" tabindex="-1"
        id="flt-${key}-option-${index}" data-filter-value="${value}" aria-selected="${value === selected[0]}">${text}</button>`).join('')}
    </div>
    <select id="flt-${key}" data-flt="${key}" aria-label="${label}" hidden>
      ${choices.map(([value,text]) => `<option value="${value}"${value === selected[0] ? ' selected' : ''}>${text}</option>`).join('')}
    </select>
  </div>`;
}
function pgProjects(){
  const types = [...new Set(PROJECTS.map(project => project.type))];
  return innerHero({title:'Результаты<br>нашей работы',section:'Проекты',image:'assets/img/about-building.jpg',
    lead:'От жилых комплексов<br class="mobile-break"> до коммерческих пространств.<br>Объекты и выполненные работы'})
    + blk('Фильтры и сетка',`<div class="filters">
      ${projectFilter('dir','Направление',DKEYS.map(key => [key,DIRS[key].brand]))}
      ${projectFilter('work','Вид работ',SERVICES.map(service => [service.slug,sname(service.slug)]))}
      ${projectFilter('type','Тип объекта',types.map(type => [type,type]))}
      <button type="button" class="filter-reset" id="flt-reset">Сбросить</button>
    </div><div id="pgrid" aria-live="polite" aria-atomic="true">${projGrid()}</div>`);
}

function pgProject(slug){
  const project = P[slug];
  const descriptions = {
    'school-lobnya':'Фасады и внутренняя отделка учебного здания. Работы объединены в последовательный цикл от подготовки оснований до финишных покрытий.',
    'zhk-severny-veter':'Черновая отделка и кровельные работы на жилом комплексе. Внутренние помещения и защитный контур здания рассматриваются как связанные участки общего строительного графика.',
    'polyclinic-balashikha':'Черновая и чистовая отделка помещений поликлиники. Особое внимание в проектном описании уделено ровности оснований, аккуратности примыканий и последовательности отделочных этапов.',
    'school-molokovo':'Внутренняя отделка учебных помещений и общих пространств. Комплекс включает подготовку оснований, устройство покрытий и проверку готовности помещений к следующему этапу.',
    'mkd-izhevsk':'Электромонтаж и навесные вентилируемые фасады жилого дома. Инженерные работы и наружная облицовка требуют согласования узлов и очередности монтажа.',
    'hotel-zoom':'Фасадные работы на гостиничном объекте. Описание охватывает подготовку основания, монтаж элементов облицовки и аккуратную проработку примыканий.'
  };
  const description = descriptions[slug];
  const samples = {
    'Школа':['12 400 м²','8 месяцев'], 'Жилой комплекс':['18 600 м²','10 месяцев'],
    'Поликлиника':['6 800 м²','6 месяцев'], 'Жилой дом':['9 200 м²','7 месяцев'],
    'Отель':['4 600 м²','5 месяцев']
  };
  const [area, duration] = samples[project.type];
  const exterior = project.works.some(work => ['facades','roofing','windows','site','monolith'].includes(work));
  const directions = project.dirs || [project.dir];
  const related = PROJECTS.filter(item => item.slug !== slug && ((item.dirs || [item.dir]).some(dir => directions.includes(dir)) || item.works.some(work => project.works.includes(work)))).slice(0,3);
  const task = slug === 'zhk-severny-veter'
    ? 'Подготовить внутренние помещения к последующей чистовой отделке: выполнить перегородки, штукатурку и стяжку. Отдельный участок проекта — устройство кровельного покрытия и примыканий.'
    : exterior
    ? 'Подготовить строительный контур к эксплуатации, согласовать узлы примыканий и организовать работы по участкам. Состав работ и поставки должны быть связаны с общим графиком объекта.'
    : 'Подготовить помещения к использованию, увязать инженерные системы с отделкой и заранее согласовать решения, влияющие на эксплуатацию. Заказчику нужен понятный порядок этапов и контроль качества.';
  const solution = slug === 'zhk-severny-veter'
    ? 'Работы разделили на внутреннюю отделку и кровлю. В помещениях подготовили перегородки, стены и полы под финишные покрытия. На кровле выполнили гидроизоляцию, стыки и примыкания.'
    : exterior
    ? 'Разделили объект на захватки, определили последовательность монтажа и контрольные точки. Подготовку оснований, крепления и закрываемые узлы проверяли до перехода к следующему этапу. В описание сдачи включили исполнительные схемы и акты.'
    : 'Собрали рабочие схемы, согласовали материалы и последовательность работ. Скрытые коммуникации проверяли до закрытия конструкций, поверхности принимали перед финишной отделкой. Ход работ фиксировали в фотоотчётах.';
  return `<div class="project-page"><div class="case-intro">` + innerHero({title:project.name,section:'Проект',lead:description,image:project.img,
    meta:project.city+' · '+project.type,illustration:project.illustration})
    + blk('Параметры проекта',`<div class="case-facts">${[
      ['Город',project.city],['Объект',project.type],['Направление',directions.map(dir=>`<a class="case-direction ${dir}" href="#${dir}">${DIRS[dir].brand}</a>`).join(' · ')],
      ['Площадь работ',area],['Срок работ',duration]
    ].map(([label,value])=>`<div><span class="lbl">${label}</span><p>${value}</p></div>`).join('')}</div>`) + `</div>`
    + `<section class="direction-section direction-faq case-works" aria-label="Выполненные работы">
      ${directionHead('Работы','Выполненные<br class="mobile-break"> работы')}
      <div class="grid direction-faq-grid">
        <p class="direction-faq-note" data-inner-enter>Здесь собраны работы, выполненные на объекте. Раскройте пункт, чтобы узнать подробнее о каждом виде работ.</p>
        <div class="c3-5" data-inner-enter>${faq(project.works.map(slug=>[S[slug].name,S[slug].desc]))}</div>
      </div>
    </section>`
    + blk('Описание проекта',`<div class="case-story"><article><div class="case-task-heading"><h2>Задача</h2><svg class="case-story-arrow" viewBox="0 0 160 28" preserveAspectRatio="none" aria-hidden="true"><path d="M1 14H158 M146 2Q146 14 158 14 M146 26Q146 14 158 14" fill="none" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg></div><p>${task}</p></article><article><h2>Решение</h2><p>${solution}</p></article></div>`)
    + projectGallery(project)
    + `<section class="direction-section case-related" aria-label="Похожие проекты">
      <div class="grid direction-head case-related-head"><h2 class="h2" data-inner-enter>Похожие проекты</h2>${Black2.pill('Все проекты','href="#projects"','a')}</div>
      <div class="project-collection case-related-grid" tabindex="0" aria-label="Похожие проекты" data-inner-enter>${Array.from({length:3},(_,index)=>related[index]?pcard(related[index]):`<article class="prj prj--pending" aria-label="Место для проекта"><div class="prj-img" aria-hidden="true"></div><div class="project-pending-lines" aria-hidden="true"><i></i><i></i></div></article>`).join('')}</div>
    </section>`
    + contactApplication() + `</div>`;

}

// Original photographs supplied by the user, stored locally with the About page assets.
const ABOUT_ASSETS = {
  hero: 'assets/img/about-v2/hero.jpg',
  partners: 'assets/img/about-v2/partners.png',
  portrait: 'assets/img/about-v2/director.png'
};
// Fictional team for the local mockup; replace with the client's staff before publishing.
const ABOUT_TEAM = [
  {name:'Владимир Петров',role:'Руководитель проекта',photo:'project-manager'},
  {name:'Анна Соколова',role:'Инженер-проектировщик',photo:'design-engineer'},
  {name:'Сергей Орлов',role:'Инженер ПТО',photo:'pto-engineer'},
  {name:'Екатерина Морозова',role:'Инженер-сметчик',photo:'cost-engineer'}
];
function pgAbout(){
  return `<div class="about-page">
  <section class="about-page-hero" aria-labelledby="about-title">
    <img class="about-page-cover" src="${ABOUT_ASSETS.hero}" alt="Современный загородный дом с панорамными окнами и бассейном" width="1440" height="700" fetchpriority="high">
    <div class="grid about-page-hero-grid">
      <span class="label c1" data-about-enter>/ О группе</span>
      <h1 id="about-title" class="statement c3-5" data-about-enter><span class="desktop-copy">Строим крупные объекты<br>и&nbsp;делаем частный ремонт<br>с&nbsp;одинаковым вниманием<br>к&nbsp;деталям</span><span class="mobile-copy"><span>Строим крупные объекты</span><span>Делаем частный ремонт</span><span>С одинаковым вниманием</span><span>К деталям</span></span></h1>
    </div>
  </section>
  <section class="about-overview" aria-label="О CCTV Group">
    <div class="grid about-body">
      <span class="about-accent" aria-hidden="true"></span>
      <figure class="about-img about-img--engineering">
        <img src="assets/img/about-engineering-dark.png" alt="Современный общественный интерьер с бетонными колоннами и интегрированными инженерными системами" loading="eager">
      </figure>
      <div class="about-text">
        <p class="lead" data-about-copy><span class="about-copy-line">CCTV Group 10 лет работает на жилых комплексах,</span> <span class="about-copy-line">школах, поликлиниках и коммерческих объектах.</span> <span class="about-copy-line">Ведём полный цикл: проектируем, считаем смету</span> <span class="about-copy-line">и выполняем работы от фасадов до чистовой отделки.</span></p>
        <a class="pill pill--line" href="#projects" data-reveal><span>Наши проекты</span><i class="pill-dot"><img src="assets/img/about-arrow.svg" alt="" width="26.7" height="26.7"></i></a>
      </div>
      <dl class="nums about-nums about-nums--primary">
        <div class="num" data-reveal><dt><b data-count="10">10</b><em>лет</em></dt><dd>на рынке</dd></div>
        <div class="num" data-reveal><dt><b data-count="100">100</b><em class="plus">+</em></dt><dd>сданных объектов</dd></div>
      </dl>
      <figure class="about-img about-img--building">
        <img src="assets/img/about-building.jpg" alt="Фасад современного жилого комплекса в вечернем освещении" loading="lazy">
      </figure>
      <dl class="nums about-nums about-nums--secondary">
        <div class="num" data-reveal><dt><b data-count="3">3</b><em class="plus">+</em></dt><dd>региона:<br>СПб, Мособласть, Ижевск</dd></div>
        <div class="num" data-reveal><dt><b>СРО</b></dt><dd>член с 2022 года,<br>ответственность застрахована</dd></div>
      </dl>
    </div>

  </section>
  <section class="about-page-directions" aria-label="Направления группы">
    <div class="dirs">${Black2.directionsContent(key => '#' + key)}</div>
  </section>
  <section class="about-page-team" aria-labelledby="about-team-title">
    <div class="grid about-team-layout">
      <div class="about-team-side">
        <h2 id="about-team-title" class="label" data-about-enter>/ Наша команда</h2>
        <div class="about-team-side-bottom">
          <p data-about-enter>Инженеры ПТО,<br>руководители проектов в штате.</p>
          <div class="review-controls about-team-controls">
            <button class="circ team-prev" type="button" aria-label="Предыдущий сотрудник"><svg aria-hidden="true"><use href="#i-arrow"/></svg></button>
            <button class="circ team-next" type="button" aria-label="Следующий сотрудник"><svg aria-hidden="true"><use href="#i-arrow"/></svg></button>
          </div>
        </div>
      </div>
      <div class="about-team-carousel" role="group" aria-roledescription="карусель" aria-label="Сотрудники команды">
        <div class="about-team-track" tabindex="0">
          ${ABOUT_TEAM.map(person => `<figure class="about-team-card" data-about-enter>
            <img src="assets/img/about-v2/team/${person.photo}.jpg" alt="${person.name}, ${person.role.toLowerCase()}" width="800" height="800" loading="lazy">
            <figcaption><h3>${person.name}</h3><p>${person.role}</p></figcaption>
          </figure>`).join('')}
        </div>
      </div>
    </div>
  </section>
  <section class="about-page-partners" aria-labelledby="about-partners-title">
    <figure class="about-partners-photo" aria-hidden="true"><img src="${ABOUT_ASSETS.partners}" alt="" width="1672" height="941" loading="lazy"></figure>
    <div class="grid about-partners-grid"><div class="about-partners-copy">
      <h2 id="about-partners-title" data-about-enter>Проверенные подрядчики</h2>
      <p data-about-enter>Работаем своей командой. При необходимости привлекаем проверенных субподрядчиков и контролируем их работу.</p>
      <a class="pill pill--line" href="#partners" data-about-enter><span>Стать подрядчиком</span><i class="pill-dot"><img src="assets/img/about-arrow.svg" alt="" width="26.7" height="26.7"></i></a>
    </div></div>
  </section>
  <section class="grid about-page-documents" aria-labelledby="about-documents-title">
    <h2 id="about-documents-title" data-about-enter>Реквизиты<br class="mobile-break"> и документы</h2>
    <div class="about-company-details" data-about-enter>
      <p>ООО «ЦЦТВ Плюс»</p><p>ИНН 7839120090</p><p>ОГРН 1197847164998</p>
      <p>Санкт-Петербург,<br>наб.Обводного канала,<br>134–136–138, лит. ВМ, офис 3</p>
    </div>
    <nav class="about-documents-links" aria-label="Документы компании">
      ${['Выписка СРО','Полис страхования','Допуски'].map((label, i) => `<a href="#documents" data-document="${i}" data-about-enter><img src="assets/img/about-v2/document.svg" alt="" width="40" height="40"><span>${label}</span></a>`).join('')}
    </nav>
  </section>
  </div>`;
}
const pgDocuments = () => innerHero({title:'Документы',section:'Документы',image:'assets/img/about-engineering-dark.png',
  lead:'Членство в СРО, страхование ответственности, допуски и сертификаты.'})+blk('Документы',docsList(),1);
const DRAFT_LETTERS = [
  [
    "Отделка жилого комплекса",
    "Благодарим команду за организацию работ на нескольких секциях. Единый график и регулярные обходы позволили согласовывать смежные этапы и вовремя готовить помещения к передаче.",
    "Руководитель строительного проекта"
  ],
  [
    "Ремонт коммерческого помещения",
    "Отмечаем внимание к действующему бизнесу. Команда согласовала зоны работ, время поставок и порядок уборки. Благодаря этому мы сохранили доступ к основным помещениям на протяжении ремонта.",
    "Управляющий коммерческим объектом"
  ],
  [
    "Ремонт квартиры",
    "Спасибо за подробное обсуждение проекта до начала ремонта. Рабочие схемы, понятная смета и фотографии этапов помогали принимать решения и видеть ход работ между выездами на объект.",
    "Частный заказчик"
  ]
];

const DRAFT_VACANCIES = [
  [
    "Руководитель проекта",
    "Координировать подрядчиков, поставки и график объекта, вести рабочие встречи с заказчиком, контролировать бюджет и приёмку этапов.",
    "Опыт управления строительством или ремонтом, умение читать проект и работать со сметой. Важны последовательность и понятная коммуникация.",
    "Объекты в Санкт-Петербурге и области. Формат занятости, график и вознаграждение обсуждаются по итогам встречи."
  ],
  [
    "Инженер ПТО",
    "Готовить исполнительные схемы и акты, проверять ведомости объёмов, собирать документы от подрядчиков и сопровождать сдачу работ.",
    "Профильное образование или практический опыт, уверенная работа с чертежами и таблицами, внимательность к деталям.",
    "Работа с проектной командой и выездами на объекты. Состав задач и условия согласовываются индивидуально."
  ],
  [
    "Прораб отделочных работ",
    "Планировать ежедневные задания, организовывать рабочие места, проверять качество отделки и готовность материалов, вести журнал работ.",
    "Опыт на отделочных объектах, знание технологии работ, умение организовать бригаду и взаимодействовать со смежниками.",
    "Проектная занятость на объектах компании. В отклике укажите опыт, специализацию и удобное время для разговора."
  ]
];

// Demonstration testimonials for the local design; replace with client-approved reviews before publication.
const REVIEWS = [
      ['Алексей','Руководитель проекта','Благодарим команду CCTV за отделку помещений. Этажи передали готовыми к приёмке: ровные стены, аккуратные стыки и чистовая отделка по проекту. Спасибо за качественную работу и результат, который можно спокойно передавать заказчику.'],
      ['Анна','Частный заказчик','После ремонта стало светло и уютно, на кухне удобно готовить, а розетки и освещение оказались именно там, где нужны. Заехали с мебелью и сразу начали жить — всё уже было готово.'],
      ['Сергей','Управляющий объектом','Благодарим CCTV за ремонт магазина. Обновлённый зал стал светлее, входная зона — аккуратнее, а пространство для покупателей — удобнее. Особенно приятно, что получили готовый результат, продолжая работать во время ремонта.'],
      ['Михаил','Представитель заказчика','Спасибо команде за подготовку коммерческого объекта к открытию. Получили помещения с готовой отделкой и работающими инженерными системами. После приёмки смогли сразу устанавливать оборудование и готовиться к запуску.'],
      ['Елена','Заказчик ремонта дома','Спасибо за ремонт нашего дома! В комнатах стало тепло и уютно, санузлы полностью готовы, освещение подчёркивает интерьер. Особенно радует аккуратная отделка: теперь дом выглядит так, как мы представляли его в самом начале.']
    ];
function reviewsSection() {
  const controls='<div class="review-controls"><button type="button" class="circ review-prev" aria-label="Предыдущий отзыв"><svg aria-hidden="true"><use href="#i-arrow"/></svg></button><button type="button" class="circ review-next" aria-label="Следующий отзыв"><svg aria-hidden="true"><use href="#i-arrow"/></svg></button></div>';
  return `<section class="testimonials-section direction-section" aria-label="Отзывы"><div class="grid testimonials-grid" data-inner-enter><div class="testimonials-side"><span class="label">/ Отзывы</span><div class="testimonials-bottom"><h2>Что говорят<br>о нас наши<br>клиенты</h2>${controls}</div></div><div class="review-carousel" aria-label="Отзывы клиентов"><div class="review-list" tabindex="0">${REVIEWS.map(([name,role,quote],index)=>`<div class="review-slide"><figure class="review" tabindex="0"><figcaption><span class="review-portrait portrait-${index}" aria-hidden="true"></span><span><b>${name}</b><small>${role}</small></span></figcaption><blockquote>${quote}</blockquote><div class="review-full" aria-hidden="true">${quote}</div></figure></div>`).join('')}</div></div></div></section>`;
}

const pgClients = () => innerHero({title:'Клиенты и отзывы',section:'Клиенты',image:'assets/img/about-engineering-dark.png',
  lead:'Компании, с которыми работаем.<br>Отзывы заказчиков и благодарственные письма.'})
  + blk('Логотипы клиентов',logos(),1)
  + reviewsSection()
  + blk('Благодарственные письма',secH('Благодарственные письма','Тексты для макета. Авторы и описанные ситуации вымышлены.')
    + docsList(DRAFT_LETTERS.map(([name,text,meta]) => ({name,text,meta,kind:'Письмо',coverLabel:name})), 'Информация о письме'));

function partnerWorkCards() {
  return SERVICES.filter(service => service.g === 'СМР').map(service => {
    const heading = service.slug === 'water-heating' ? 'Отопление,<br>водоснабжение<br>и канализация<br>(ОВ и ВК)' : service.name;
    const count = PROJECTS.filter(project => project.works.includes(service.slug)).length;
    const projects = count ? `<a class="partner-work-project" href="#projects?work=${service.slug}" title="Выполненные проекты: ${count}" aria-label="Выполненные проекты: ${service.name}"><span>Выполненные проекты</span><span class="partner-project-icon"><svg aria-hidden="true"><use href="#i-arrow"/></svg></span></a>` : '';
    return `<article class="direction-object partner-work-card" data-inner-enter>
      <div class="partner-work-copy"><h3>${heading}</h3><p>${service.desc}</p></div>
      <div class="partner-work-bottom"><div class="partner-work-tags">${service.dirs.map(direction => `<a class="partner-direction-tag ${direction}" href="#${direction}">${DIRS[direction].brand}</a>`).join('')}</div>${projects}</div>
    </article>`;
  }).join('');
}
const pgPartners = () => `<div class="partners-page">` + innerHero({title:'Партнёрам<br>и подрядчикам',section:'Партнёрам',image:'assets/img/about-v2/partners.png',
  lead:'Ищем субподрядчиков на объекты Петербурга,<br>Московской области и регионов.'})
  + `<section class="direction-section partner-works" aria-labelledby="partner-works-title">
    <div class="grid"><div class="c1-2 partner-works-intro" data-inner-enter><h2 class="h2" id="partner-works-title">Кого ищем</h2><p>Приглашаем команды с опытом строительных,<br>инженерных и отделочных работ.</p></div></div>
    <div class="direction-object-grid partner-work-grid" style="--object-count:4">${partnerWorkCards()}</div>
  </section>`
  + `<section class="direction-section direction-application partner-application" aria-label="Заявка подрядчика">
    <div class="grid direction-application-grid">
      <div class="c1-2 direction-application-side" data-inner-enter><span class="label">/ Заявка</span><h2 class="h2">Рассказать<br>о себе</h2><p class="direction-application-intro">Свяжемся, когда появится подходящий объект.</p></div>
      <div class="c3-5 direction-application-form" data-inner-enter>${formHTML('partner')}</div>
    </div>
  </section></div>`;
const pgCareers = () => `<div class="careers-page">` + innerHero({title:'Ищем специалистов<br>в команду',section:'Карьера',image:'assets/img/draft-team.jpg',
  lead:'Работа на крупных объектах, в частных проектах.'})
  + `<section class="direction-section direction-objects career-vacancies" aria-labelledby="career-vacancies-title">
    <h2 class="h2" id="career-vacancies-title" data-inner-enter>Открытые<br class="mobile-break"> вакансии</h2>
    <div class="direction-object-grid" style="--object-count:3">${DRAFT_VACANCIES.map(([title,duties,requirements,conditions])=>`<article class="direction-object partner-work-card vacancy-card" data-inner-enter><div class="partner-work-copy"><h3>${title}</h3><div class="vacancy-body"><p><b>Задачи</b>${duties}</p><p><b>Опыт</b>${requirements}</p><p><b>Условия</b>${conditions}</p></div></div><button class="partner-work-project" type="button" data-scroll="career-application"><span>Откликнуться на вакансию</span><span class="partner-project-icon"><svg aria-hidden="true"><use href="#i-arrow"/></svg></span></button></article>`).join('')}</div>
  </section>`
  + `<section class="direction-section direction-application career-application" id="career-application" aria-label="Заявка на вакансию">
    <div class="grid direction-application-grid">
      <div class="c1-2 direction-application-side" data-inner-enter><span class="label">/ Заявка</span><h2 class="h2">Не нашли<br>вакансию?</h2><p class="direction-application-intro">Пришлите резюме — сохраним его.</p></div>
      <div class="c3-5 direction-application-form" data-inner-enter>${formHTML('vacancy')}</div>
    </div>
  </section></div>`;
function contactApplication() {
  return `<section class="sec contact" id="write-us" aria-labelledby="contact-title">
  <div class="contact-bg" aria-hidden="true"><img src="assets/img/form-bg.jpg" alt="" loading="lazy"><i></i></div>
  <div class="grid contact-grid">
    <div class="c1-2 contact-side">
      <span class="label" data-reveal>/ Заявка</span>
      <h2 class="contact-title" id="contact-title" data-split>Расскажите<br>о&nbsp;задаче</h2>
      <p class="contact-text" data-reveal>Укажите направление —<br>заявка сразу попадёт нужному менеджеру.</p>
      <div class="contact-links" data-reveal>
        <a class="phone-big" href="${window.CCTV.PHONE_HREF}">${PHONE}</a>
        <a href="mailto:${EMAIL}">${EMAIL}</a>
        <span class="sm" data-address>Набережная Обводного канала, Санкт-Петербург<br>134 — 136, 138, лит. ВМ, офис 3</span>
      </div>
    </div>
    <form class="c3-5 form form--dark js-form" data-title="Заявка" novalidate>
      ${directionChips()}
      <div class="form-row">
        <label class="field"><span>Имя</span><input name="name" type="text" autocomplete="name" required></label>
        <label class="field"><span>Телефон</span><input name="phone" type="tel" autocomplete="tel" placeholder="+7" required></label>
      </div>
      <label class="field"><span>Задача</span><textarea name="msg" rows="3"></textarea></label>
      <div class="form-foot">
        ${Black2.consent()}
        <button class="pill pill--cta" type="submit"><span>Отправить</span><i class="pill-dot"><svg><use href="#i-arrow"/></svg></i></button>
      </div>
    </form>
  </div>
</section>`;
}
const pgContacts = () => `<section class="sec contacts-hero" aria-labelledby="contacts-page-title">
  <div class="contacts-map"><img src="assets/img/office-map-dark.svg" alt="Карта расположения офиса CCTV Group на набережной Обводного канала" width="1200" height="800"></div>
  <p class="contacts-map-credits">© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a></p>
  <div class="grid contacts-info">
    <h1 class="h2 c1-2" id="contacts-page-title" data-inner-enter>Контакты</h1>
    <address class="office-details c1-2"><a class="phone-big" href="${window.CCTV.PHONE_HREF}">${PHONE}</a>
      <a href="mailto:${EMAIL}">${EMAIL}</a><p>${ADDRESS.replace('наб.', 'набережная').replace(', 134', '<br>134')}</p>
      <p class="sm">Приезд в офис и встречу на объекте согласуйте<br>с менеджером по телефону или через форму ниже.</p>
    </address>
  </div>
</section>` + contactApplication();
const pgPrivacy = () => blk('Документ',`<div class="stack"><h1>Политика обработки персональных данных</h1><p class="lead">Проект текста для сайта CCTV Group. Описывает обращения через формы сайта и порядок связи с компанией.</p></div>`)
  + blk('Текст политики',`<article class="policy-copy">
    <h2>Оператор и контакты</h2><p>В материалах проекта оператором указан ООО «ЦЦТВ Плюс», ИНН 7839120090, ОГРН 1197847164998. Адрес для обращений — ${ADDRESS}. Вопросы о персональных данных можно направить на ${EMAIL}.</p>
    <h2>Какие данные используются</h2><p>Формы предусматривают имя, номер телефона, электронную почту и сведения, которые посетитель сообщает о своей задаче. Для приглашения в тендер могут использоваться название организации и приложенные рабочие материалы. В анкете подрядчика — специализация и опыт. В отклике на вакансию — резюме и сопроводительное письмо.</p>
    <h2>Для чего нужны данные</h2><p>Сведения предназначены для ответа на обращение, обсуждения состава работ, подготовки предложения, согласования встречи, рассмотрения заявки подрядчика или отклика кандидата. Данные одной заявки используются для её рассмотрения и связанной с ней переписки.</p>
    <h2>Работа локальной версии</h2><p>В текущей демонстрационной версии формы проверяют поля и показывают результат на экране. Заявки, файлы и выбранные даты через эти формы на сервер не отправляются. При переходе по ссылке электронной почты письмо отправляется из почтового приложения посетителя. Карта офиса отображается как статичное изображение и не загружает интерактивный виджет.</p>
    <h2>Порядок для рабочей версии</h2><p>Перед подключением приёма заявок необходимо определить используемые сервисы, получателей данных, фактические сроки хранения и меры защиты. В этом проекте предполагается доступ сотрудников, участвующих в рассмотрении обращения, и использование данных в объёме соответствующей задачи. Конкретный срок обработки определяется целью обращения и применимыми основаниями хранения.</p>
    <h2>Обращения посетителей</h2><p>На ${EMAIL} можно направить просьбу уточнить данные, прекратить обработку или отозвать согласие. В письме укажите контакт, использованный при обращении, и содержание просьбы. Это поможет найти нужную переписку и подготовить ответ.</p>
    <p class="sm mut">Текст подготовлен для согласования макета. Для рабочей версии его нужно сверить с фактической обработкой данных. Правовая основа изложена в Федеральном законе № 152-ФЗ «О персональных данных».</p>
  </article>`);


const pg404 = () => blk('Нет страницы',`<div class="stack"><h1>Страница не найдена</h1>${Black2.pill(`На главную`, `href="#main"`, 'a', 'line')}</div>`);

/* ---------- Роутер ---------- */
function serviceURL(route) {
  const param = route.startsWith('service-') ? 'work' : 'group';
  const key = route.slice(route.indexOf('-') + 1);
  const query = route === 'services' ? '' : '?' + new URLSearchParams({ [param]: key });
  return 'index.html' + query + '#services';
}
let reviewObserver;
let teamAlignmentCleanup;
let aboutObserver;
let syncInnerHeader;
const aboutRevealed = new Set();
let innerPageObserver;
const innerRevealed = new Set();

let directionCardTextObserver, directionCardTextFrame=0, directionCardTextVersion=0;
function clearDirectionCardText() {
  directionCardTextVersion++;
  directionCardTextObserver?.disconnect();
  directionCardTextObserver=null;
  if(directionCardTextFrame)cancelAnimationFrame(directionCardTextFrame);
  directionCardTextFrame=0;
}
function initDirectionCardText() {
  clearDirectionCardText();
  const grid=app.querySelector('.direction-object-grid');
  if(!grid)return;
  const cards=[...grid.querySelectorAll('.direction-object')];
  const titles=[...grid.querySelectorAll('h3')];
  if(!titles.length)return;
  const measure=document.createElement('canvas').getContext('2d');
  const version=directionCardTextVersion;
  const fit=()=>{
    directionCardTextFrame=0;
    if(version!==directionCardTextVersion)return;
    const unit=innerWidth/1440;
    const base=innerWidth>=1024?26*unit:22;
    const columns=innerWidth>=1024?4:innerWidth>680?2:1;
    const gridStyle=getComputedStyle(grid), cardStyle=getComputedStyle(cards[0]);
    const available=(grid.getBoundingClientRect().width-(parseFloat(gridStyle.columnGap)||0)*(columns-1))/columns
      -(parseFloat(cardStyle.paddingLeft)||0)-(parseFloat(cardStyle.paddingRight)||0);
    measure.font=`400 ${base}px ${getComputedStyle(titles[0]).fontFamily}`;
    // Every direction uses the same benchmark as the three-line Business warehouse card.
    const benchmark=Math.max(...['КРОВЛЯ,','ИНЖЕНЕРНЫЕ СИСТЕМЫ,','ОТДЕЛКА'].map(line=>measure.measureText(line).width));
    if(available<=0||benchmark<=0)return;
    const size=Math.floor(Math.min(base,base*available/benchmark)*100)/100;
    titles.forEach(title=>title.style.fontSize=size+'px');
  };
  const schedule=()=>{if(!directionCardTextFrame)directionCardTextFrame=requestAnimationFrame(fit);};
  fit();
  document.fonts?.ready.then(()=>{if(version===directionCardTextVersion)schedule();});
  directionCardTextObserver=new ResizeObserver(schedule);
  directionCardTextObserver.observe(grid);
}

let directionProcessCleanup;
function clearDirectionProcess() {
  directionProcessCleanup?.();
  directionProcessCleanup=null;
}
function initDirectionProcess() {
  clearDirectionProcess();
  const wrap=app.querySelector('.direction-process .steps-wrap');
  if(!wrap) return;
  const steps=[...wrap.querySelectorAll('.step')], bar=wrap.querySelector('[data-direction-steps-bar]');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const paint=progress=>{
    const vertical=innerWidth<1024;
    bar.style.transform=vertical?`scaleY(${progress})`:`scaleX(${progress})`;
    const count=Math.min(steps.length,Math.floor(progress*steps.length+.35));
    steps.forEach((step,index)=>step.classList.toggle('is-on',index<count));
  };
  let stopAnimation=()=>{};
  const setup=()=>{
    stopAnimation();
    if(reduced.matches){paint(1);stopAnimation=()=>{};return;}
    if(window.gsap&&window.ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);
      const trigger=ScrollTrigger.create({trigger:wrap,start:'top 72%',end:'bottom 55%',scrub:.6,onUpdate:self=>paint(self.progress),onRefresh:self=>paint(self.progress)});
      paint(trigger.progress);
      stopAnimation=()=>trigger.kill();
      return;
    }
    let frame=0;
    const update=()=>{
      frame=0;
      const rect=wrap.getBoundingClientRect();
      paint(Math.min(1,Math.max(0,(innerHeight*.72-rect.top)/(rect.height+innerHeight*.17))));
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    update();
    stopAnimation=()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
  };
  reduced.addEventListener('change',setup);
  setup();
  directionProcessCleanup=()=>{stopAnimation();reduced.removeEventListener('change',setup);};
}

function clearInnerMotion() {
  teamAlignmentCleanup?.();
  teamAlignmentCleanup=null;
  clearDirectionCardText();
  clearDirectionProcess();
  innerPageObserver?.disconnect();
  innerPageObserver = null;
}

const innerRevealCards = '.direction-object, .document-card, .prj, .logo-cell, .dcard, .review-slide, .about-team-card, .card';
function setInnerRevealDelay(element) {
  Black2.revealMotion.setDelay(element);
  if (!element.matches(innerRevealCards)) return;
  element.setAttribute('data-inner-card', '');
  // Staggered project cards still belong to one row despite their decorative top margins.
  const rowTop = card => card.offsetTop - (parseFloat(getComputedStyle(card).marginTop) || 0);
  const row = [...element.parentElement.children]
    .filter(sibling => sibling.matches(innerRevealCards) && Math.abs(rowTop(sibling) - rowTop(element)) < 1)
    .sort((left,right) => left.offsetLeft - right.offsetLeft);
  element.style.setProperty('--rd', `${Math.min(560, Math.max(0, row.indexOf(element)) * 140)}ms`);
}

function initInnerMotion(route) {
  clearInnerMotion();
  if (route === 'about' || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const items = [...app.querySelectorAll(`[data-inner-enter], [data-reveal], [data-split], .direction-side, .testimonials-side, .blk > .ct > .section-heading, .direction-process .step-body, ${innerRevealCards}`)]
    .filter(item => !item.matches('.direction-project-grid, .case-related-grid, .testimonials-grid'));
  innerPageObserver = new IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting}) => {
      if (!isIntersecting) return;
      target.classList.add('is-in');
      innerRevealed.add(target.dataset.innerMotionKey);
      innerPageObserver.unobserve(target);
    });
  }, Black2.revealMotion.observerOptions);
  items.forEach((item,index) => {
    const key = route + ':' + index;
    item.dataset.innerMotionKey = key;
    item.setAttribute('data-reveal', '');
    if (innerRevealed.has(key)) { item.classList.add('is-in'); return; }
    setInnerRevealDelay(item);
    innerPageObserver.observe(item);
  });
}

function clearAboutMotion() {
  aboutObserver?.disconnect();
  aboutObserver = null;

}

function initAboutMotion() {
  const page = app.querySelector('.about-page');
  if (!page || aboutObserver) return;
  // Same masked-photo and upward text entrance as the homepage; never replay on scrolling back.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const elements = page.querySelectorAll('[data-about-enter], [data-reveal], .about-img, .about-accent, [data-about-copy], .num, .dirs-head > *, .dcard');
  aboutObserver = new IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting}) => {
      if (!isIntersecting) return;
      target.classList.remove('is-pending');
      target.classList.add('is-in');
      aboutRevealed.add(target.dataset.aboutMotionKey);
      aboutObserver.unobserve(target);
    });
  }, Black2.revealMotion.observerOptions);
  elements.forEach((element, index) => {
    const key = 'about-' + index;
    element.dataset.aboutMotionKey = key;
    const masked = element.matches('.about-img, .about-accent, [data-about-copy]');
    if (aboutRevealed.has(key)) { if (!masked) element.classList.add('is-in'); return; }
    if (masked) element.classList.add('is-pending');
    else {
      element.setAttribute('data-reveal', '');
      setInnerRevealDelay(element);
    }
    aboutObserver.observe(element);
  });
}

function route(){
  clearAboutMotion();
  clearInnerMotion();
  const [page,query='']=(location.hash||'#about').slice(1).split('?');
  const h=page||'about';
  if(h==='main'||h==='dirs'){location.replace('index.html'+(h==='dirs'?'#directions':''));return;}
  let html, dir=null;
  const m=h.match(/^([a-z]+)-(.+)$/);
  if(DIRS[h]){dir=h;html=pgDir(h)}
  else if(m&&DIRS[m[1]]&&m[2]==='projects'){location.replace('#projects?dir='+m[1]);return;}
  else if(h==='home-booking'){location.replace('#home');return;}
  else if(m&&DIRS[m[1]]&&(DIRS[m[1]].subs.some(s=>s[0]===m[2])||(m[1]==='telecom'&&['services','documents'].includes(m[2])))){location.replace('#'+m[1]);return;}
  else if(h==='services' || h.startsWith('services-') || h.startsWith('service-')) {
    location.replace(serviceURL(h)); return;
  }
  else if(h==='projects'){readProjectFilters(query);html=pgProjects();}
  else if(h.startsWith('project-')&&P[h.slice(8)]) html=pgProject(h.slice(8));
  else html=({about:pgAbout,documents:pgDocuments,clients:pgClients,partners:pgPartners,careers:pgCareers,contacts:pgContacts,privacy:pgPrivacy}[h]||pg404)();
  if(!dir) setSvcScope(null);

  app.innerHTML=html; finishPage(h);
  window.scrollTo(0,0);
  syncInnerHeader?.(true);
  if (h === 'about') initAboutMotion();
}

/* Page-specific filters and service groups. Overlay interactions are shared. */
document.addEventListener('click',e=>{
  closeProjectFilters(e.target.closest('[data-project-filter]'));
  const t=e.target.closest('#app button,#app a'); if(!t) return;
  if(t.dataset.projectGalleryStep){stepProjectGallery(t.closest('[data-project-gallery]'),Number(t.dataset.projectGalleryStep));return;}
  if(t.dataset.scroll){document.getElementById(t.dataset.scroll)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});return;}
  if(t.dataset.svcTab){svcTab=t.dataset.svcTab;document.getElementById('svc-wrap').innerHTML=svcBlock();updateServiceImage()}
  if(t.id==='flt-reset'){flt={dir:'',work:'',type:''};syncProjectFilterURL();app.innerHTML=pgProjects();finishPage('projects')}
});
document.addEventListener('change',e=>{
  if(e.target.matches('.direction-upload input[type="file"]')){
    const label=e.target.closest('.direction-upload').querySelector('.direction-upload-hint');
    label.textContent=e.target.files.length?[...e.target.files].map(file=>file.name).join(', '):(label.dataset.emptyText || 'Загрузите ТЗ, проект или ведомость объёмов');
  }
  const s=e.target.closest('[data-flt]'); if(!s) return;
  flt[s.dataset.flt]=s.value;
  syncProjectFilterURL();
  syncProjectFilter(s.closest('[data-project-filter]'));
  document.getElementById('pgrid').innerHTML=projGrid();
});
window.addEventListener('hashchange', () => { Black2.closeDialogs(); route(); });

// Match the homepage: ignore tiny scroll changes, hide after 300px, reveal on upward scroll.
function initInnerHeader() {
  const header = document.getElementById('hdr');
  let lastY = window.scrollY;
  syncInnerHeader = (reset = false) => {
    const y = window.scrollY;
    const down = y > lastY + 4, up = y < lastY - 4;
    document.body.classList.toggle('about-is-scrolled', y > 40);
    header.classList.toggle('is-light', y > 40);
    if (reset || document.body.classList.contains('menu-open')) header.classList.remove('is-hidden');
    else if (down && y > 300) header.classList.add('is-hidden');
    else if (up || y < 300) header.classList.remove('is-hidden');
    lastY = y;
  };
  window.addEventListener('scroll', () => syncInnerHeader(), { passive:true });
  syncInnerHeader(true);
}

function initShell(){
 if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) document.documentElement.classList.add('anim');
 initInnerHeader();
 const D=window.CCTV;
 document.querySelectorAll('[data-phone]').forEach(a=>{a.textContent=D.PHONE;a.href=D.PHONE_HREF});
 document.querySelectorAll('[data-email]').forEach(a=>{a.textContent=D.EMAIL;a.href='mailto:'+D.EMAIL});
 document.querySelectorAll('[data-address]').forEach(a=>a.textContent=D.ADDRESS);
 document.querySelectorAll('[data-proto]').forEach(a=>a.href='#'+a.dataset.proto);
 document.querySelectorAll('[data-legal]').forEach(a=>a.href='#privacy');
 document.querySelectorAll('.logo').forEach(a=>a.href='index.html');
 document.querySelector('.nav a[href="#services"]').href = serviceURL('services');
 document.querySelector('[data-ftr-dirs]').innerHTML=D.DKEYS.map(k=>`<li><a href="#${k}">${D.DIRS[k].brand}</a></li>`).join('');
 document.querySelector('[data-ftr-company]').innerHTML=D.COMPANY.filter(([k])=>k!=='contacts').map(([k,t])=>`<li><a href="#${k}">${t}</a></li>`).join('');
 Black2.renderMenu(key => '#' + key, serviceURL('services'));
 Black2.installInteractions({
   lock: locked => { document.documentElement.style.overflow = locked ? 'hidden' : ''; },
   reduce: matchMedia('(prefers-reduced-motion: reduce)').matches,
   hasGsap: false
 });
 document.querySelector('#menu').addEventListener('click', event => {
   if (event.target.closest('a')) Black2.closeMenu(false);
 });
 document.querySelector('.skip').onclick=e=>{e.preventDefault();app.focus()};
}
function finishPage(h){
 updateServiceImage();
 const pageNames={about:'О группе',projects:'Проекты',documents:'Документы',clients:'Клиенты и отзывы',partners:'Партнёрам и подрядчикам',careers:'Карьера',contacts:'Контакты',privacy:'Политика обработки персональных данных'};
 const pageTitle=P[h.replace(/^project-/,'')]?.name||DIRS[h]?.title||pageNames[h]||app.querySelector('h1')?.textContent||'Страница';
 document.title=pageTitle+' — CCTV Group';
 document.body.dataset.route=h;
 document.body.classList.toggle('has-inner-hero', Boolean(app.querySelector('.inner-hero, .contacts-hero')));
 const isProject = h.startsWith('project-') && Boolean(P[h.slice(8)]);
 const direction = h.split('-')[0];
 app.className = isProject ? 'is-case' : DKEYS.includes(direction) ? 'detail-' + direction : '';
 alignPageSections();
 initProjectFilters();
 initReviews();
 initTeamCarousel();
 initProjectGallerySwipe();
 placeContactLinks();
 initInnerMotion(h);
 initDirectionProcess();
 initDirectionCardText();
 app.querySelectorAll('a[href="#main"]').forEach(a=>a.href='index.html');
 app.querySelectorAll('b.phone').forEach(b=>{const a=document.createElement('a');a.href='tel:+78129254440';a.textContent=b.textContent;b.replaceWith(a)});
}

function closeProjectFilters(except) {
  app.querySelectorAll('[data-project-filter]').forEach(filter => {
    if (filter === except) return;
    filter.querySelector('.filter-trigger').setAttribute('aria-expanded','false');
    filter.querySelector('.filter-trigger').removeAttribute('aria-activedescendant');
    filter.querySelector('.filter-options').hidden = true;
  });
}
function syncProjectFilter(filter) {
  const select = filter.querySelector('select');
  filter.querySelector('[data-filter-label]').textContent = select.selectedOptions[0].textContent;
  filter.querySelectorAll('[data-filter-value]').forEach(option => {
    option.setAttribute('aria-selected',option.dataset.filterValue === select.value);
  });
}
function initProjectFilters() {
  app.querySelectorAll('[data-project-filter]').forEach(filter => {
    const trigger = filter.querySelector('.filter-trigger');
    const list = filter.querySelector('.filter-options');
    const select = filter.querySelector('select');
    const options = [...list.querySelectorAll('[role="option"]')];
    let active = 0, search = '', searchTime = 0;
    const highlight = index => {
      active = (index + options.length) % options.length;
      options.forEach((option,i) => option.classList.toggle('is-active',i === active));
      trigger.setAttribute('aria-activedescendant',options[active].id);
      options[active].scrollIntoView({block:'nearest'});
    };
    const open = () => {
      closeProjectFilters(filter);
      list.hidden = false;
      trigger.setAttribute('aria-expanded','true');
      highlight(Math.max(0,options.findIndex(option => option.dataset.filterValue === select.value)));
    };
    const choose = index => {
      select.value = options[index].dataset.filterValue;
      select.dispatchEvent(new Event('change',{bubbles:true}));
      closeProjectFilters();
      trigger.focus({preventScroll:true});
    };
    trigger.addEventListener('click',() => list.hidden ? open() : closeProjectFilters());
    options.forEach((option,index) => {
      option.addEventListener('click',() => choose(index));
      option.addEventListener('pointermove',() => highlight(index));
    });
    trigger.addEventListener('keydown',event => {
      const key = event.key;
      if (key === 'Escape' || key === 'Tab') { closeProjectFilters(); return; }
      if (['ArrowDown','ArrowUp','Home','End','Enter',' '].includes(key)) {
        event.preventDefault();
        if (list.hidden) {
          open();
          if (key === 'Home') highlight(0);
          if (key === 'End') highlight(options.length - 1);
          return;
        }
        if (key === 'Enter' || key === ' ') { choose(active); return; }
        if (key === 'Home') highlight(0);
        else if (key === 'End') highlight(options.length - 1);
        else highlight(active + (key === 'ArrowDown' ? 1 : -1));
        return;
      }
      if (key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return;
      event.preventDefault();
      if (list.hidden) open();
      search = Date.now() - searchTime > 700 ? key : search + key;
      searchTime = Date.now();
      const index = options.findIndex(option => option.textContent.trim().toLocaleLowerCase('ru').startsWith(search.toLocaleLowerCase('ru')));
      if (index >= 0) highlight(index);
    });
  });
}

function alignPageSections() {
  app.querySelectorAll('.blk').forEach(section => {
    if (section.querySelector('.js-form, #bk, .cta-band')) section.classList.add('feedback-section');
  });
  app.querySelectorAll('.blk > .ct').forEach(container => {
    const title = container.querySelector('h1, h2');
    let heading = title;
    while (heading && heading.parentElement !== container) heading = heading.parentElement;
    if (!heading || heading.matches('.page-hero, .cta-band')) return;
    heading.style.gridRow = 1;
    heading.classList.add('section-heading');
  });
}

function initTeamAlignment(section,track) {
  teamAlignmentCleanup?.();
  const side=section.querySelector('.about-team-side');
  if(!side)return ()=>{};
  let active=true,frame=0;
  const update=()=>{
    frame=0;
    if(!active)return;
    const card=track.firstElementChild;
    const photo=card?.querySelector('img'),role=card?.querySelector('figcaption p');
    if(!photo||!role)return;
    // Layout offsets ignore entrance-animation transforms, so the final baselines stay fixed.
    const layoutTop=element=>{let top=0;for(let node=element;node;node=node.offsetParent)top+=node.offsetTop;return top;};
    const origin=layoutTop(side);
    side.style.setProperty('--team-photo-bottom',(layoutTop(photo)+photo.offsetHeight-origin)+'px');
    side.style.setProperty('--team-role-bottom',(layoutTop(role)+role.offsetHeight-origin)+'px');
  };
  const schedule=()=>{if(active&&!frame)frame=requestAnimationFrame(update);};
  const observer=new ResizeObserver(schedule);
  observer.observe(track);
  [...track.children].forEach(card=>{observer.observe(card.querySelector('img'));observer.observe(card.querySelector('figcaption'));});
  document.fonts?.ready.then(schedule);
  update();
  teamAlignmentCleanup=()=>{active=false;observer.disconnect();if(frame)cancelAnimationFrame(frame);};
  return schedule;
}

function initTeamCarousel() {
  const section=app.querySelector('.about-page-team');
  if(!section)return;
  const track=section.querySelector('.about-team-track');
  const align=initTeamAlignment(section,track);
  const previous=section.querySelector('.team-prev'),next=section.querySelector('.team-next');
  const move=direction=>{
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gap=parseFloat(getComputedStyle(track).columnGap)||0;
    const stride=track.firstElementChild.getBoundingClientRect().width+gap;
    const end=track.scrollWidth-track.clientWidth;
    if(end<=1){
      // Four visible portraits can still cycle; no duplicates or fictitious extra staff.
      [...track.children].forEach(card=>card.style.animation='none');
      if(direction>0)track.append(track.firstElementChild);else track.prepend(track.lastElementChild);
      align();
      if(!reduced&&track.animate)track.animate([{opacity:.5,transform:`translateX(${direction*10}px)`},{opacity:1,transform:'translateX(0)'}],{duration:260,easing:'ease-out'});
      return;
    }
    const target=direction>0?(track.scrollLeft>=end-1?0:Math.min(end,track.scrollLeft+stride))
      :(track.scrollLeft<=1?end:Math.max(0,track.scrollLeft-stride));
    track.scrollTo({left:target,behavior:reduced?'instant':'smooth'});
  };
  previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
  track.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();move(event.key==='ArrowRight'?1:-1);
  });
}

function initReviews() {
  reviewObserver?.disconnect();
  const carousel = app.querySelector('.review-carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.review-list');
  const cards = [...track.querySelectorAll('.review-slide')];
  const controls = carousel.closest('.testimonials-section').querySelector('.review-controls');
  const previous = controls.querySelector('.review-prev');
  const next = controls.querySelector('.review-next');
  const stride = () => cards[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
  const update = () => {
    cards.forEach(card => {
      const review = card.querySelector('.review'), quote = review.querySelector('blockquote');
      review.classList.toggle('has-long-review', quote.scrollHeight > quote.clientHeight + 1);
    });
    previous.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
  };
  const move = direction => track.scrollBy({
    left: direction * stride(),
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  });
  previous.addEventListener('click',()=>move(-1));
  next.addEventListener('click',()=>move(1));
  track.addEventListener('scroll',update,{passive:true});
  reviewObserver = new ResizeObserver(update);
  reviewObserver.observe(track);
  document.fonts?.ready.then(update);
  update();
}

function updateServiceImage(){const panel=document.querySelector('.svc-left');const group=window.CCTV.SGROUPS.find(g=>g.k===svcTab);if(panel&&group)panel.style.setProperty('--service-image',`url('${group.k==='finish'?'assets/img/svc-finish-dark.png':group.img}')`);}
function placeContactLinks() {
  const grid = app.querySelector('.contact-grid');
  if (!grid) return;
  const parent = matchMedia('(max-width: 1023px)').matches ? grid : grid.querySelector('.contact-side');
  parent.append(grid.querySelector('.contact-links'));
}
matchMedia('(max-width: 1023px)').addEventListener('change', placeContactLinks);
document.addEventListener('DOMContentLoaded', initAboutMotion, { once: true });
initShell();
route();

document.addEventListener('keydown',e=>{const tab=e.target.closest('.svc-tab');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;const tabs=[...tab.parentElement.querySelectorAll('.svc-tab')];const i=tabs.indexOf(tab);const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;e.preventDefault();tabs[next].click();document.querySelector(`[data-svc-tab="${tabs[next].dataset.svcTab}"]`)?.focus()});
