/* ═══════════════════════════════════════════════════════════
   EcoInsight · APP SHELL — context, hash router, intro gating
   ═══════════════════════════════════════════════════════════ */
function parseHash() {
  const h = (location.hash||'').replace(/^#\/?/,'');
  const m = h.match(/^noticia\/(\d+)/);
  if (m) return {name:'article', id:parseInt(m[1],10)};
  if (h.startsWith('reporte')) return {name:'report'};
  if (h.startsWith('calculadora')) return {name:'calculator'};
  if (h.startsWith('normativa')) return {name:'regulations'};
  return {name:'home'};
}

function App() {
  const [theme, setTheme] = React.useState(() => localStorage.getItem('ei_theme') || 'navy');
  const [lang, setLang] = React.useState(() => localStorage.getItem('ei_lang') || 'es');
  const [route, setRoute] = React.useState(() => {
    const r = parseHash();
    return r.name==='report' ? {name:'home'} : r;   // report needs live data; ignore on cold load
  });
  const [reportData, setReportData] = React.useState(null);
  const [intro, setIntro] = React.useState(() => {
    try { return sessionStorage.getItem('ei_intro_seen') !== '1'; } catch(e){ return true; }
  });
  const t = window.THEMES[theme] || window.THEMES.navy;

  React.useEffect(()=>{ localStorage.setItem('ei_theme',theme); document.body.style.background=t.bg; document.body.style.color=t.text; document.body.style.setProperty('--ei-accent',t.accent); },[theme,t]);
  React.useEffect(()=>{ localStorage.setItem('ei_lang',lang); document.documentElement.lang=lang; },[lang]);

  const go = React.useCallback((name, arg) => {
    if (name==='article') {
      setRoute({name:'article', id:arg});
      history.pushState(null,'',`#/noticia/${arg}`);
      window.scrollTo(0,0);
    } else if (name==='report') {
      setReportData(arg);
      setRoute({name:'report'});
      history.pushState(null,'',`#/reporte`);
      window.scrollTo(0,0);
    } else if (name==='calculator' || name==='regulations') {
      setRoute({name});
      history.pushState(null,'',name==='calculator'?'#/calculadora':'#/normativa');
      window.scrollTo(0,0);
    } else {
      setRoute({name:'home'});
      if (location.hash) history.pushState(null,'','#top');
      if (arg) setTimeout(()=>{ const el=document.querySelector(arg); el&&el.scrollIntoView({behavior:'smooth',block:'start'}); }, 60);
    }
  }, []);

  // browser back/forward
  React.useEffect(()=>{
    const onPop = () => {
      const r = parseHash();
      if (r.name==='report' && !reportData) { setRoute({name:'home'}); return; }
      setRoute(r);
      window.scrollTo(0,0);
    };
    window.addEventListener('popstate', onPop);
    return ()=>window.removeEventListener('popstate', onPop);
  }, [reportData]);

  const base = {background:t.bg,color:t.text,minHeight:'100vh',fontFamily:'DM Sans,sans-serif',transition:'background .35s,color .25s'};

  return (
    <React.Fragment>
      {intro && <window.EcoIntro lang={lang} onDone={()=>setIntro(false)}/>}
      <div style={base}>
        <a className="ei-skip" href="#main">{lang==='en'?'Skip to content':'Saltar al contenido'}</a>
        <window.EcoScrollProgress t={t}/>
        <window.EcoHeader t={t} theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} go={go}/>
        <main id="main">
        {route.name==='home' && (
          <React.Fragment>
            <window.EcoHero t={t} lang={lang} go={go}/>
            <window.EcoNews t={t} lang={lang} go={go}/>
            <window.EcoSolutions t={t} lang={lang} go={go}/>
            <window.EcoMarketplace t={t} lang={lang}/>
            <window.EcoConversion t={t} lang={lang}/>
          </React.Fragment>
        )}
        {route.name==='calculator' && <window.EcoCalculator t={t} lang={lang} go={go}/>}
        {route.name==='regulations' && <window.EcoRegulations t={t} lang={lang}/>}
        {route.name==='article' && <window.EcoArticle t={t} lang={lang} id={route.id} go={go}/>}
        {route.name==='report' && <window.EcoReport t={t} lang={lang} data={reportData} go={go}/>}
        </main>
        <window.EcoFooter t={t} lang={lang}/>
        <window.EcoBackToTop t={t} lang={lang}/>
        <window.EcoWhatsApp t={t} lang={lang}/>
      </div>
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
