/* ═══════════════════════════════════════════════════════════
   EcoInsight Pro · CORE — i18n, scroll helpers, icons, data
   ═══════════════════════════════════════════════════════════ */
const { useState, useEffect, useRef, useReducer } = React;

/* i18n */
window.makeL = (lang) => (es, en) => (lang === 'en' ? en : es);

/* reduced-motion guard */
const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.REDUCED = REDUCED;

/* ── Reveal: adds .in when scrolled into view (CSS does the rest) ── */
function Reveal({ children, variant='reveal', delay=0, className='', style={}, as='div', id }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (REDUCED) { el.classList.add('in'); return; }
    let done = false, settle;
    const show = () => {
      if (done) return; done = true;
      el.style.transitionDelay = delay + 'ms';
      el.classList.add('in'); el.style.opacity = '1'; el.style.transform = 'none';
      // safety: guarantee the final state lands even where the compositor pauses
      // transitions (e.g. background/preview frames). No-op in a normal browser
      // since the .9s transition has already finished by then.
      settle = setTimeout(() => { el.style.transition = 'none'; el.style.opacity = '1'; el.style.transform = 'none'; }, 1100 + delay);
    };
    const vh = () => window.innerHeight || document.documentElement.clientHeight || 0;
    // already in (or near) viewport at mount → reveal on the next frame
    if (el.getBoundingClientRect().top < vh() * 0.96) requestAnimationFrame(() => requestAnimationFrame(show));
    // IntersectionObserver for off-screen items (when it actually fires)
    let io;
    if (window.IntersectionObserver) {
      io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { show(); io.disconnect(); } }), { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
      io.observe(el);
    }
    // reveal on scroll (covers iframes where IO never fires) + safety-net timeout
    const onScroll = () => { if (el.getBoundingClientRect().top < vh() * 0.96) { show(); cleanupScroll(); } };
    const targets = [window, document, document.documentElement, document.body];
    targets.forEach(tg => tg.addEventListener && tg.addEventListener('scroll', onScroll, { passive: true }));
    const cleanupScroll = () => targets.forEach(tg => tg.removeEventListener && tg.removeEventListener('scroll', onScroll));
    const t = setTimeout(show, 700 + delay);
    return () => { if (io) io.disconnect(); clearTimeout(t); clearTimeout(settle); cleanupScroll(); };
  }, [delay]);
  const Tag = as;
  return <Tag id={id} ref={ref} className={`${variant} ${className}`} style={style}>{children}</Tag>;
}
window.Reveal = Reveal;

/* ── CountUp: animates a number when scrolled into view ── */
window.CountUp = function CountUp({ value, dur=1700, format, prefix='', suffix='' }) {
  const ref = useRef(null);
  const [n, setN] = useState(REDUCED ? value : 0);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (REDUCED) { setGo(true); return; }
    let done = false;
    const fire = () => { if (done) return; done = true; setGo(true); };
    const vh = () => window.innerHeight || document.documentElement.clientHeight || 0;
    if (el.getBoundingClientRect().top < vh() * 0.96) fire();
    let io;
    if (window.IntersectionObserver) { io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { fire(); io.disconnect(); } }), { threshold: .4 }); io.observe(el); }
    const onScroll = () => { if (el.getBoundingClientRect().top < vh() * 0.96) fire(); };
    const targets = [window, document, document.documentElement, document.body];
    targets.forEach(tg => tg.addEventListener && tg.addEventListener('scroll', onScroll, { passive: true }));
    const t = setTimeout(fire, 800);
    return () => { if (io) io.disconnect(); clearTimeout(t); targets.forEach(tg => tg.removeEventListener && tg.removeEventListener('scroll', onScroll)); };
  }, []);
  useEffect(() => {
    if (!go || REDUCED) { if (REDUCED) setN(value); return; }
    const start = performance.now(); let raf;
    const tick = now => { const p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 3); setN(value * e); if (p < 1) raf = requestAnimationFrame(tick); else setN(value); };
    raf = requestAnimationFrame(tick);
    const settle = setTimeout(() => setN(value), dur + 200); // ensure final value where rAF is throttled
    return () => { cancelAnimationFrame(raf); clearTimeout(settle); };
  }, [go, value, dur]);
  return <span ref={ref}>{prefix}{format ? format(n) : Math.round(n)}{suffix}</span>;
};

/* ── scroll position hook (for nav shrink + progress) ── */
window.useScrollY = function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true }); fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return y;
};

/* ── Icons (inline stroke SVG, professional line set) ── */
const Ic = (p) => <svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.w||1.7} strokeLinecap="round" strokeLinejoin="round" style={p.style}>{p.children}</svg>;
window.ICONS = {
  leaf:    (p={}) => <Ic {...p}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></Ic>,
  chart:   (p={}) => <Ic {...p}><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="5" rx="1"/><rect x="12" y="8" width="3" height="9" rx="1"/><rect x="17" y="4" width="3" height="13" rx="1"/></Ic>,
  scope:   (p={}) => <Ic {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></Ic>,
  globe:   (p={}) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></Ic>,
  bolt:    (p={}) => <Ic {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></Ic>,
  doc:     (p={}) => <Ic {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></Ic>,
  check:   (p={}) => <Ic {...p}><path d="M20 6 9 17l-5-5"/></Ic>,
  download:(p={}) => <Ic {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></Ic>,
  building:(p={}) => <Ic {...p}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h6"/></Ic>,
  ruler:   (p={}) => <Ic {...p}><path d="M5 3 21 19l-2 2L3 5Z"/><path d="M8 6l1.5 1.5M11 9l1.5 1.5M14 12l1.5 1.5"/></Ic>,
  users:   (p={}) => <Ic {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><path d="M16 5.2A3.2 3.2 0 0 1 16 11M21 20c0-2.6-1.6-4.6-4-5.2"/></Ic>,
  shield:  (p={}) => <Ic {...p}><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6Z"/><path d="m9 12 2 2 4-4"/></Ic>,
  spark:   (p={}) => <Ic {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></Ic>,
  arrow:   (p={}) => <Ic {...p}><path d="M5 12h14m-6-6 6 6-6 6"/></Ic>,
  plus:    (p={}) => <Ic {...p}><path d="M12 5v14M5 12h14"/></Ic>,
  star:    (p={}) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.5 7 .9-5 4.8 1.3 7L12 18l-6.6 3.2L6.7 14l-5-4.8 7-.9Z"/></svg>,
};

/* ── DATA ── */
window.STORE = { url:'https://www.etsy.com/es/shop/EcoInsight?ref=profile_header', rating:4.0, sales:12, wa:'56900000000' };

window.PRODUCTS = [
  {
    id:'calc', img:(window.__resources&&window.__resources.prodCalc)||'uploads/etsy-2.png', badge:{es:'Más vendido',en:'Best seller'}, fmt:'Excel · GHG Protocol',
    price:20.28, old:28.97,
    name:{es:'Calculadora de Huella de Carbono',en:'Carbon Footprint Calculator'},
    desc:{es:'Plantilla Excel bajo GHG Protocol para calcular Alcances 1, 2 y 3 con factores de emisión LATAM. Lista para tu reporte ESG.',
          en:'Excel template under the GHG Protocol to compute Scopes 1, 2 & 3 with LATAM emission factors. Ready for your ESG report.'},
    feats:{es:['Alcances 1, 2 y 3','Factores LATAM','Equivalencias automáticas','Descarga instantánea'],
           en:['Scopes 1, 2 & 3','LATAM factors','Automatic equivalences','Instant download']},
    url:{es:'https://www.etsy.com/es/listing/4443295460/hoja-de-calculo-huella-de-carbono-ghg',en:'https://www.etsy.com/es/listing/4447014903/carbon-footprint-spreadsheet-corporate'},
  },
  {
    id:'dash', img:(window.__resources&&window.__resources.prodDash)||'uploads/etsy-1.png', badge:{es:'Excel + Power BI',en:'Excel + Power BI'}, fmt:'Power BI · Dashboard',
    price:8.10, old:11.58,
    name:{es:'Panel de Huella de Carbono',en:'Carbon Footprint Dashboard'},
    desc:{es:'Dashboard en Excel + Power BI para monitorear y visualizar las emisiones de tu empresa en tiempo real, con desglose por alcance.',
          en:'Excel + Power BI dashboard to monitor and visualise your company emissions in real time, broken down by scope.'},
    feats:{es:['Visualización en tiempo real','Desglose por alcance','KPIs ambientales','Ideal para Pymes'],
           en:['Real-time visualisation','Breakdown by scope','Environmental KPIs','Ideal for SMEs']},
    url:{es:'https://www.etsy.com/es/listing/4376732622/seguimiento-de-co2-huella-de-carbono',en:'https://www.etsy.com/es/listing/4373813587/carbon-footprint-tracker-dashboard-scope'},
  },
  {
    id:'pack', img:(window.__resources&&window.__resources.prodPack)||'uploads/etsy-4.png', badge:{es:'Mejor valor',en:'Best value'}, fmt:{es:'Pack profesional',en:'Pro bundle'},
    price:24.99, old:28.38, highlight:true,
    name:{es:'Pack Profesional',en:'Professional Pack'},
    desc:{es:'Calculadora + Panel juntos. La solución completa para medir, visualizar y reportar la huella de carbono de extremo a extremo.',
          en:'Calculator + Dashboard together. The complete solution to measure, visualise and report your carbon footprint end to end.'},
    feats:{es:['Ambas plantillas incluidas','Flujo medir → reportar','Soporte por WhatsApp','Mejor precio combinado'],
           en:['Both templates included','Measure → report flow','WhatsApp support','Best combined price']},
    url:{es:'https://www.etsy.com/es/shop/EcoInsight?ref=profile_header',en:'https://www.etsy.com/es/shop/EcoInsight?ref=profile_header'},
  },
];

window.STANDARDS = ['GHG Protocol','ISO 14064','ISO 14001','GRI Standards','TCFD','SBTi','ISSB · NIIF S1/S2','CDP','HuellaChile'];

window.PERSONAS = [
  { icon:'building', title:{es:'Empresas y Pymes',en:'Companies & SMEs'},
    body:{es:'Cumple la normativa, responde a clientes e inversionistas y mide tu huella sin contratar un equipo completo.',
          en:'Meet regulations, respond to clients and investors, and measure your footprint without hiring a full team.'} },
  { icon:'ruler', title:{es:'Ingenieros ambientales',en:'Environmental engineers'},
    body:{es:'Acelera tus inventarios GEI con plantillas estructuradas y factores listos, en vez de partir de una hoja en blanco.',
          en:'Speed up your GHG inventories with structured templates and ready factors, instead of starting from a blank sheet.'} },
  { icon:'users', title:{es:'Consultores',en:'Consultants'},
    body:{es:'Entrega informes profesionales a tus clientes y escala tu práctica con herramientas reutilizables y confiables.',
          en:'Deliver professional reports to your clients and scale your practice with reliable, reusable tools.'} },
];

window.FEATURES = [
  { icon:'shield', title:{es:'Metodología GHG Protocol',en:'GHG Protocol methodology'}, body:{es:'Estructura alineada al estándar corporativo más usado del mundo.',en:'Structure aligned to the world\u2019s most-used corporate standard.'} },
  { icon:'scope', title:{es:'Alcances 1, 2 y 3',en:'Scopes 1, 2 & 3'}, body:{es:'Emisiones directas, energía comprada y cadena de valor en un solo lugar.',en:'Direct emissions, purchased energy and value chain in one place.'} },
  { icon:'globe', title:{es:'Factores LATAM',en:'LATAM factors'}, body:{es:'Factores de emisión regionales para resultados realistas y locales.',en:'Regional emission factors for realistic, local results.'} },
  { icon:'chart', title:{es:'Excel + Power BI',en:'Excel + Power BI'}, body:{es:'Calcula en Excel y visualiza en dashboards profesionales de Power BI.',en:'Compute in Excel and visualise in professional Power BI dashboards.'} },
  { icon:'download', title:{es:'Descarga instantánea',en:'Instant download'}, body:{es:'Recibes los archivos al instante tras la compra. Sin esperas.',en:'Get the files instantly after purchase. No waiting.'} },
  { icon:'doc', title:{es:'Reporte visual',en:'Visual report'}, body:{es:'Equivalencias y gráficos listos para presentar a dirección o clientes.',en:'Equivalences and charts ready to present to leadership or clients.'} },
];

window.STEPS = [
  { n:'01', title:{es:'Descarga la plantilla',en:'Download the template'}, body:{es:'Compra en Etsy y recibe tus archivos Excel / Power BI al instante.',en:'Buy on Etsy and receive your Excel / Power BI files instantly.'} },
  { n:'02', title:{es:'Ingresa tus datos',en:'Enter your data'}, body:{es:'Completa consumos de energía, combustibles y transporte. La plantilla calcula sola.',en:'Fill in energy, fuel and transport use. The template does the math.'} },
  { n:'03', title:{es:'Reporta tu huella',en:'Report your footprint'}, body:{es:'Obtén tu resultado por alcance, equivalencias y gráficos listos para tu informe ESG.',en:'Get your result by scope, equivalences and charts ready for your ESG report.'} },
];

window.FAQ = [
  { q:{es:'¿Qué incluye la descarga?',en:'What does the download include?'}, a:{es:'Recibes el archivo Excel y/o la plantilla de Power BI según el producto, con instrucciones de uso y factores de emisión ya cargados.',en:'You receive the Excel file and/or Power BI template depending on the product, with usage instructions and emission factors already loaded.'} },
  { q:{es:'¿Necesito Power BI para usarlo?',en:'Do I need Power BI to use it?'}, a:{es:'La calculadora funciona solo con Excel. El panel requiere Power BI Desktop (gratuito) para la visualización interactiva.',en:'The calculator works with Excel alone. The dashboard requires Power BI Desktop (free) for interactive visualisation.'} },
  { q:{es:'¿Sirve para mi país?',en:'Does it work for my country?'}, a:{es:'Sí. Incluye factores de emisión para LATAM y puedes ajustar el factor de red eléctrica de tu país.',en:'Yes. It includes emission factors for LATAM and you can adjust your country\u2019s grid factor.'} },
  { q:{es:'¿Cómo recibo el archivo?',en:'How do I receive the file?'}, a:{es:'La entrega es digital e instantánea a través de Etsy, con pago seguro. No se envía nada físico.',en:'Delivery is digital and instant through Etsy, with secure payment. Nothing physical is shipped.'} },
  { q:{es:'¿Ofrecen soporte o personalización?',en:'Do you offer support or customization?'}, a:{es:'Sí. Escríbenos por WhatsApp para dudas de uso o para solicitar una versión adaptada a tu organización.',en:'Yes. Message us on WhatsApp for usage questions or to request a version tailored to your organization.'} },
];
