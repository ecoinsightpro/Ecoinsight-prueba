/* ═══════════════════════════════════════════════════════════
   EcoInsight · CHROME — Reveal helper, Header, Hero, Footer
   ═══════════════════════════════════════════════════════════ */

/* scroll-reveal wrapper */
function Reveal({children, delay=0, y=22, style}) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver((es)=>{
      es.forEach(e=>{ if(e.isIntersecting){ setSeen(true); io.disconnect(); } });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    io.observe(el);
    return ()=>io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{...style, opacity:seen?1:0, transform:seen?'translateY(0)':`translateY(${y}px)`,
      transition:`opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .8s cubic-bezier(.16,1,.3,1) ${delay}ms`}}>
      {children}
    </div>
  );
}
window.Reveal = Reveal;

/* keyboard activation helper for clickable non-button elements (Enter / Space) */
window.openKey = (fn) => (e) => { if(e.key==='Enter' || e.key===' '){ e.preventDefault(); fn(); } };

/* reduced-motion guard */
const REDUCED = typeof window!=='undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* animate a number toward a moving target (used by the live calculator) */
window.useTween = function useTween(target, dur=650){
  const [val,setVal] = React.useState(target);
  const cur = React.useRef(target), raf = React.useRef(0), to = React.useRef(0);
  React.useEffect(()=>{
    if(REDUCED){ cur.current=target; setVal(target); return; }
    const from = cur.current, start = performance.now();
    cancelAnimationFrame(raf.current); clearTimeout(to.current);
    const tick = now => {
      const p = Math.min(1,(now-start)/dur), e = 1-Math.pow(1-p,3);
      const nv = from+(target-from)*e; cur.current=nv; setVal(nv);
      if(p<1) raf.current=requestAnimationFrame(tick); else { cur.current=target; setVal(target); }
    };
    raf.current = requestAnimationFrame(tick);
    // safety net: snap to the exact target even if rAF is throttled (e.g. background tab)
    to.current = setTimeout(()=>{ cur.current=target; setVal(target); }, dur+120);
    return ()=>{ cancelAnimationFrame(raf.current); clearTimeout(to.current); };
  },[target,dur]);
  return val;
};

/* count-up number that fires once when scrolled into view */
window.CountUp = function CountUp({value, dur=1500, format, prefix='', suffix=''}){
  const ref = React.useRef(null);
  const [n,setN] = React.useState(REDUCED?value:0);
  const [go,setGo] = React.useState(false);
  React.useEffect(()=>{
    const el = ref.current; if(!el) return;
    const vh = () => window.innerHeight || document.documentElement.clientHeight || 0;
    const fire = () => setGo(true);
    if(el.getBoundingClientRect().top < vh()*0.96) fire();
    let io;
    if(window.IntersectionObserver){ io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ fire(); io.disconnect(); } }),{threshold:.4}); io.observe(el); }
    const onScroll = () => { if(el.getBoundingClientRect().top < vh()*0.96) fire(); };
    const targets = [window, document, document.documentElement, document.body];
    targets.forEach(tg=>tg.addEventListener && tg.addEventListener('scroll',onScroll,{passive:true}));
    const t0 = setTimeout(fire, 900);
    return ()=>{ if(io) io.disconnect(); clearTimeout(t0); targets.forEach(tg=>tg.removeEventListener && tg.removeEventListener('scroll',onScroll)); };
  },[]);
  React.useEffect(()=>{
    if(!go) return;
    if(REDUCED){ setN(value); return; }
    const start = performance.now(); let raf;
    const tick = now => { const p=Math.min(1,(now-start)/dur), e=1-Math.pow(1-p,3); setN(value*e); if(p<1) raf=requestAnimationFrame(tick); else setN(value); };
    raf = requestAnimationFrame(tick);
    const settle = setTimeout(()=>setN(value), dur+200); // ensure final value where rAF is throttled
    return ()=>{ cancelAnimationFrame(raf); clearTimeout(settle); };
  },[go,value,dur]);
  const disp = format ? format(n) : Math.round(n).toString();
  return <span ref={ref}>{prefix}{disp}{suffix}</span>;
};

/* thin gradient scroll-progress bar pinned to the top of the viewport */
function EcoScrollProgress({t}){
  const [p,setP] = React.useState(0);
  React.useEffect(()=>{
    const fn = () => { const h=document.documentElement.scrollHeight-window.innerHeight; setP(h>0?Math.min(1,window.scrollY/h):0); };
    window.addEventListener('scroll',fn,{passive:true}); fn();
    return ()=>window.removeEventListener('scroll',fn);
  },[]);
  return (
    <div aria-hidden="true" style={{position:'fixed',top:0,left:0,right:0,height:3,zIndex:300,pointerEvents:'none'}}>
      <div style={{height:'100%',width:`${p*100}%`,background:`linear-gradient(90deg,${t.accent},${t.accent2})`,transition:'width .12s linear',boxShadow:`0 0 10px ${t.accent}88`}}/>
    </div>
  );
}
window.EcoScrollProgress = EcoScrollProgress;

/* floating back-to-top control */
function EcoBackToTop({t, lang}){
  const L = window.makeL(lang);
  const [show,setShow] = React.useState(false);
  React.useEffect(()=>{
    const fn = () => setShow(window.scrollY>720);
    window.addEventListener('scroll',fn,{passive:true}); fn();
    return ()=>window.removeEventListener('scroll',fn);
  },[]);
  return (
    <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label={L('Volver arriba','Back to top')} title={L('Volver arriba','Back to top')}
      style={{position:'fixed',right:24,bottom:24,zIndex:250,width:48,height:48,borderRadius:'50%',border:`1px solid ${t.borderStrong}`,background:t.card,color:t.text,fontSize:19,cursor:'pointer',
        display:'flex',alignItems:'center',justifyContent:'center',
        boxShadow:t.dark?'0 12px 34px rgba(0,0,0,.55)':'0 12px 30px rgba(0,0,0,.16)',
        opacity:show?1:0,transform:show?'translateY(0) scale(1)':'translateY(18px) scale(.9)',pointerEvents:show?'auto':'none',transition:'all .32s cubic-bezier(.16,1,.3,1)'}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.color=t.accent;}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=t.borderStrong;e.currentTarget.style.color=t.text;}}>↑</button>
  );
}
window.EcoBackToTop = EcoBackToTop;

/* floating WhatsApp contact */
function EcoWhatsApp({t, lang}){
  const L = window.makeL(lang);
  const phone = '56900000000'; // ← placeholder +56 9 0000 0000
  const msg = encodeURIComponent(L('Hola, quiero información sobre EcoInsight','Hi, I would like information about EcoInsight'));
  const href = `https://wa.me/${phone}?text=${msg}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="ei-wa"
      aria-label={L('Contáctanos por WhatsApp','Contact us on WhatsApp')} title={L('Escríbenos por WhatsApp','Message us on WhatsApp')}
      style={{position:'fixed',right:24,bottom:84,zIndex:250,width:52,height:52,borderRadius:'50%',background:t.accent,display:'flex',alignItems:'center',justifyContent:'center',
        boxShadow:t.dark?'0 12px 34px rgba(0,0,0,.5)':'0 12px 30px rgba(0,0,0,.2)',textDecoration:'none'}}
      onMouseEnter={e=>e.currentTarget.style.transform='scale(1.09)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
      <svg viewBox="0 0 32 32" width="29" height="29" aria-hidden="true">
        <path fill="#fff" d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.3.9.9-4.2-.2-.4c-1-1.6-1.5-3.4-1.5-5.3 0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8zm5.4-7.3c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/>
      </svg>
    </a>
  );
}
window.EcoWhatsApp = EcoWhatsApp;

/* footer newsletter capture (no native <form>; controlled + client validation) */
function Newsletter({t, lang}){
  const L = window.makeL(lang);
  const [email, setEmail] = React.useState('');
  const [err, setErr] = React.useState(null);
  const [ok, setOk] = React.useState(false);
  const submit = () => {
    const v = email.trim();
    if(!v){ setErr(L('Ingresa tu email.','Enter your email.')); return; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){ setErr(L('Email no válido.','Invalid email.')); return; }
    setErr(null);
    // TODO conectar a endpoint/Formspree (p.ej. fetch('https://formspree.io/f/XXXX',{method:'POST',body:...}))
    setOk(true);
  };
  return (
    <div style={{borderTop:`1px solid ${t.border}`,paddingTop:26,marginBottom:26,display:'flex',justifyContent:'space-between',alignItems:'center',gap:24,flexWrap:'wrap'}}>
      <div style={{maxWidth:420}}>
        <div style={{fontSize:15,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,marginBottom:5}}>{L('Newsletter ambiental','Environmental newsletter')}</div>
        <div style={{fontSize:13,color:t.textMuted,lineHeight:1.55,fontFamily:'DM Sans'}}>{L('Noticias ESG, regulación y huella de carbono — directo a tu correo.','ESG news, regulation and carbon footprint — straight to your inbox.')}</div>
      </div>
      {ok ? (
        <div role="status" style={{display:'inline-flex',alignItems:'center',gap:9,background:t.accentDim,border:`1px solid ${t.accent}44`,borderRadius:10,padding:'12px 18px',color:t.accent,fontSize:13.5,fontWeight:700,fontFamily:'Plus Jakarta Sans'}}>
          ✓ {L('¡Listo! Revisa tu correo para confirmar.','Done! Check your inbox to confirm.')}
        </div>
      ) : (
        <div style={{flex:'1 1 320px',maxWidth:440}}>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <label htmlFor="nl-email" style={{position:'absolute',width:1,height:1,overflow:'hidden',clip:'rect(0 0 0 0)'}}>{L('Tu email','Your email')}</label>
            <input id="nl-email" type="email" value={email} onChange={e=>{setEmail(e.target.value); setErr(null);}}
              onKeyDown={e=>{ if(e.key==='Enter') submit(); }}
              placeholder={L('tu@email.com','you@email.com')} aria-invalid={!!err} aria-describedby={err?'nl-err':undefined}
              style={{flex:'1 1 200px',minWidth:0,background:t.surface,border:`1px solid ${err?t.critical:t.border}`,color:t.text,borderRadius:9,padding:'12px 14px',fontSize:13.5,fontFamily:'DM Sans',outline:'none'}}/>
            <button onClick={submit} style={{flexShrink:0,background:t.cta,color:t.ctaText,border:'none',borderRadius:9,padding:'12px 20px',fontSize:13.5,fontWeight:700,cursor:'pointer',fontFamily:'Plus Jakarta Sans'}}>{L('Suscribirme','Subscribe')}</button>
          </div>
          {err && <span id="nl-err" role="alert" style={{display:'block',fontSize:11.5,color:t.critical,marginTop:6,fontFamily:'DM Sans'}}>{err}</span>}
        </div>
      )}
    </div>
  );
}
window.Newsletter = Newsletter;

/* ═══ HEADER ═══ */
function EcoHeader({t, theme, setTheme, lang, setLang, go}) {
  const L = window.makeL(lang);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const nav = [
    [L('Plataforma','Platform'),'#top'],
    [L('Noticias','News'),'#noticias'],
    [L('Soluciones','Solutions'),'#soluciones'],
    [L('Normativa','Regulation'),'#normativa'],
    [L('Calculadora','Calculator'),'#calculadora'],
    [L('Plantillas','Templates'),'#marketplace'],
  ];
  const logoBox = {display:'flex', alignItems:'center'};
  const onNav = (e,href) => {
    e.preventDefault();
    if (href==='#calculadora') { go('calculator'); return; }
    if (href==='#normativa') { go('regulations'); return; }
    go('home');
    setTimeout(()=>{ const el=document.querySelector(href==='#top'?'body':href); el&&el.scrollIntoView({behavior:'smooth',block:'start'}); }, href==='#top'?0:40);
    if(href==='#top') window.scrollTo({top:0,behavior:'smooth'});
  };
  return (
    <header style={{position:'fixed',top:0,left:0,right:0,zIndex:200,background:scrolled?t.bg+'F4':'transparent',backdropFilter:scrolled?'blur(18px)':'none',borderBottom:`1px solid ${scrolled?t.border:'transparent'}`,transition:'all .3s'}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:'0 32px',display:'flex',alignItems:'center',justifyContent:'space-between',height:80,gap:18}}>
        <a href="#top" onClick={(e)=>onNav(e,'#top')} style={{display:'flex',alignItems:'center',gap:11,textDecoration:'none',flexShrink:0}}>
          <div style={logoBox}><img src={(window.__resources&&window.__resources.logo)||"uploads/logo-ei.png"} alt="EcoInsight" style={{height:66,width:'auto'}}/></div>
          <span style={{fontFamily:'Plus Jakarta Sans,sans-serif',fontWeight:800,fontSize:35,color:t.text,letterSpacing:'-.022em'}}>
            <span style={{color:t.accent}}>Eco</span>Insight
          </span>
        </a>
        <nav style={{display:'flex',gap:2}}>
          {nav.map(([l,href]) => (
            <a key={l} href={href} onClick={(e)=>onNav(e,href)}
              style={{color:t.textMuted,textDecoration:'none',fontSize:15,fontWeight:500,padding:'7px 13px',borderRadius:7,transition:'all .18s',fontFamily:'DM Sans,sans-serif',whiteSpace:'nowrap'}}
              onMouseEnter={e=>{e.currentTarget.style.color=t.text;e.currentTarget.style.background=t.border}}
              onMouseLeave={e=>{e.currentTarget.style.color=t.textMuted;e.currentTarget.style.background='transparent'}}
            >{l}</a>
          ))}
        </nav>
        <div style={{display:'flex',alignItems:'center',gap:14,flexShrink:0}}>
          {/* language toggle */}
          <div style={{display:'flex',alignItems:'center',gap:1,background:t.card,border:`1px solid ${t.border}`,borderRadius:20,padding:3}}>
            {[['es','ES'],['en','EN']].map(([code,lbl])=>(
              <button key={code} onClick={()=>setLang(code)} aria-pressed={lang===code} aria-label={code==='es'?'Español':'English'}
                style={{border:'none',cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif',fontWeight:700,fontSize:13,
                  padding:'6px 13px',borderRadius:16,transition:'all .2s',
                  background:lang===code?t.accent:'transparent',color:lang===code?t.ctaText:t.textMuted}}>{lbl}</button>
            ))}
          </div>
          {/* theme dots */}
          <div style={{display:'flex',gap:5,alignItems:'center'}} title={L('Cambiar variación visual','Switch visual variant')}>
            {Object.values(window.THEMES).map(th => (
              <button key={th.id} onClick={()=>setTheme(th.id)} title={`${th.label} · ${th.tagline}`}
                aria-label={L('Tema visual','Visual theme')+': '+th.label} aria-pressed={theme===th.id}
                style={{width:theme===th.id?24:11,height:11,borderRadius:6,background:th.dot,border:'none',cursor:'pointer',opacity:theme===th.id?1:.38,transition:'all .28s',padding:0}}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
window.EcoHeader = EcoHeader;

/* ═══ HERO ═══ */
function EcoHero({t, lang, go}) {
  const L = window.makeL(lang);
  const DashCard = () => (
    <div className="dash-card" style={{background:t.card,border:`1px solid ${t.borderStrong}`,borderRadius:20,padding:'24px 26px',width:308,boxShadow:t.dark?'0 40px 90px rgba(0,0,0,.5)':'0 40px 80px rgba(0,0,0,.13)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div style={{display:'flex',alignItems:'center',gap:7}}>
          <div style={{width:7,height:7,borderRadius:'50%',background:t.positive}}/>
          <span style={{fontSize:10,fontWeight:700,color:t.textMuted,textTransform:'uppercase',letterSpacing:'.09em',fontFamily:'Plus Jakarta Sans'}}>{L('Dashboard ESG · 2026','ESG Dashboard · 2026')}</span>
        </div>
        <span style={{fontSize:10,color:t.textFaint,fontFamily:'DM Mono,monospace'}}>GHG Protocol</span>
      </div>
      <div style={{fontSize:10,color:t.textMuted,textTransform:'uppercase',letterSpacing:'.07em',fontWeight:600,marginBottom:4}}>{L('Total Emisiones GEI','Total GHG Emissions')}</div>
      <div style={{display:'flex',alignItems:'baseline',gap:10,marginBottom:18}}>
        <span style={{fontSize:36,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1}}>847.3</span>
        <span style={{fontSize:11,color:t.textMuted,fontFamily:'DM Mono'}}>tCO₂e/{L('año','yr')}</span>
        <span style={{background:t.positive+'25',color:t.positive,padding:'3px 8px',borderRadius:20,fontSize:11,fontWeight:700}}>↓12.4%</span>
      </div>
      {[[L('Alcance 1','Scope 1'),412,t.accent],[L('Alcance 2','Scope 2'),287,t.accent2],[L('Alcance 3','Scope 3'),148,t.warning]].map(([l,v,c])=>(
        <div key={l} style={{marginBottom:11}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
            <span style={{fontSize:11,color:t.textMuted,display:'flex',alignItems:'center',gap:5}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:c,display:'inline-block'}}/>{l}
            </span>
            <span style={{fontSize:11,fontFamily:'DM Mono',color:t.text}}>{v} t</span>
          </div>
          <div style={{height:4,borderRadius:2,background:t.border}}>
            <div style={{height:'100%',width:`${Math.round(v/847*100)}%`,background:c,borderRadius:2}}/>
          </div>
        </div>
      ))}
      <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${t.border}`,display:'flex',alignItems:'center',gap:8}}>
        <span style={{background:t.positive+'22',color:t.positive,padding:'2px 8px',borderRadius:5,fontSize:11,fontWeight:800,fontFamily:'Plus Jakarta Sans'}}>A</span>
        <span style={{fontSize:11,color:t.textMuted}}>{L('Clasificación ESG · En objetivo anual','ESG rating · On annual target')}</span>
      </div>
    </div>
  );
  const goCalc = () => go('calculator');
  const stats = [
    {node:<window.CountUp value={2400} format={x=>Math.round(x).toLocaleString(lang==='en'?'en-US':'es-CL')} suffix="+"/>, l:L('Empresas','Companies')},
    {node:<window.CountUp value={28}/>, l:L('Países','Countries')},
    {node:<window.CountUp value={12} suffix="M"/>, l:L('tCO₂e analizadas','tCO₂e analyzed')},
    {node:'WCAG AA', l:L('Accesibilidad','Accessibility')},
  ];
  return (
    <section style={{position:'relative',overflow:'hidden',minHeight:'100vh',display:'flex',alignItems:'center',background:t.heroBg,paddingTop:132,paddingBottom:70}}>
      <div aria-hidden="true" style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>
        <div className="aurora aurora-1" style={{background:t.accent}}/>
        <div className="aurora aurora-2" style={{background:t.accent2}}/>
      </div>
      <div style={{position:'relative',zIndex:1,maxWidth:1180,margin:'0 auto',padding:'0 32px',width:'100%'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:54,alignItems:'center'}}>
          <div>
            <div className="ha1" style={{display:'inline-flex',alignItems:'center',gap:8,background:t.accentDim,border:`1px solid ${t.accent}35`,borderRadius:20,padding:'5px 14px',marginBottom:24,whiteSpace:'nowrap'}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:t.accent,display:'inline-block',flexShrink:0}}/>
              <span style={{color:t.accent,fontSize:11,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',fontFamily:'Plus Jakarta Sans'}}>Climate Tech · ESG · LATAM</span>
            </div>
            <h1 className="ha2" style={{fontSize:56,fontWeight:800,lineHeight:1.08,letterSpacing:'-.03em',fontFamily:'Plus Jakarta Sans,sans-serif',color:t.text,marginBottom:20}}>
              {lang==='en'
                ? <>Turning<br/>environmental data<br/>into <em style={{fontStyle:'normal',color:t.accent}}>sustainable</em><br/>decisions.</>
                : <>Transformando<br/>datos ambientales<br/>en <em style={{fontStyle:'normal',color:t.accent}}>decisiones</em><br/>sostenibles.</>}
            </h1>
            <p className="ha3" style={{fontSize:17,lineHeight:1.65,color:t.textMuted,marginBottom:32,maxWidth:520,fontFamily:'DM Sans'}}>
              {L('La plataforma que unifica medición de carbono, reporting ESG y soluciones ambientales para minería, construcción y agroindustria.',
                 'The platform unifying carbon measurement, ESG reporting and environmental solutions for mining, construction and agribusiness.')}
            </p>
            <div className="ha4" style={{display:'flex',gap:12,marginBottom:44,flexWrap:'wrap'}}>
              <button onClick={goCalc} style={{background:t.cta,color:t.ctaText,border:'none',borderRadius:10,padding:'14px 28px',fontSize:15,fontWeight:700,cursor:'pointer',fontFamily:'Plus Jakarta Sans',letterSpacing:'-.01em',transition:'opacity .2s'}}
                onMouseEnter={e=>e.currentTarget.style.opacity='.82'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                {L('Calcular mis emisiones','Calculate my emissions')} →
              </button>
              <a href="#marketplace" onClick={(e)=>{e.preventDefault();document.querySelector('#marketplace').scrollIntoView({behavior:'smooth'});}} style={{display:'flex',alignItems:'center',gap:8,color:t.text,border:`1.5px solid ${t.borderStrong}`,borderRadius:10,padding:'13px 22px',fontSize:15,fontWeight:600,cursor:'pointer',textDecoration:'none',fontFamily:'Plus Jakarta Sans',transition:'all .2s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.color=t.accent}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=t.borderStrong;e.currentTarget.style.color=t.text}}>
                {L('Ver plantillas ESG','View ESG templates')}
              </a>
            </div>
            <div className="ha5" style={{display:'flex',gap:28,flexWrap:'wrap'}}>
              {stats.map(({node,l})=>(
                <div key={l} style={{borderLeft:`2px solid ${t.borderStrong}`,paddingLeft:14}}>
                  <div style={{fontSize:20,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,letterSpacing:'-.02em'}}>{node}</div>
                  <div style={{fontSize:11,color:t.textMuted,marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'center'}}><window.EcoDashboard t={t} lang={lang}/></div>
        </div>
      </div>
    </section>
  );
}
window.EcoHero = EcoHero;

/* ═══ FOOTER ═══ */
function EcoFooter({t, lang}) {
  const L = window.makeL(lang);
  const logoBox={display:'flex',alignItems:'center'};
  const links=[
    [L('Plataforma','Platform'),[L('Calculadora GEI','GHG Calculator'),L('Dashboard ESG','ESG Dashboard'),L('Soluciones','Solutions'),L('SaaS Empresarial','Enterprise SaaS')]],
    [L('Recursos','Resources'),[L('Noticias ESG','ESG News'),L('Marketplace','Marketplace'),L('Plantillas Power BI','Power BI templates'),L('Casos de éxito','Case studies')]],
    [L('Empresa','Company'),[L('Sobre EcoInsight','About EcoInsight'),'Blog',L('Contacto','Contact'),L('Privacidad','Privacy')]],
  ];
  return (
    <footer style={{background:t.bg,borderTop:`1px solid ${t.border}`,padding:'60px 0 36px'}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:'0 32px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:48,flexWrap:'wrap',gap:32}}>
          <div style={{maxWidth:240}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <div style={logoBox}><img src={(window.__resources&&window.__resources.logo)||"uploads/logo-ei.png"} alt="EcoInsight" style={{height:34,width:'auto'}}/></div>
              <span style={{fontFamily:'Plus Jakarta Sans',fontWeight:800,fontSize:18,color:t.text,letterSpacing:'-.02em'}}><span style={{color:t.accent}}>Eco</span>Insight</span>
            </div>
            <p style={{fontSize:13,color:t.textMuted,lineHeight:1.7,fontFamily:'DM Sans'}}>{L('Transformando datos ambientales en decisiones sostenibles.','Turning environmental data into sustainable decisions.')}</p>
          </div>
          {links.map(([title,items])=>(
            <div key={title}>
              <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:t.textMuted,marginBottom:14,fontFamily:'Plus Jakarta Sans'}}>{title}</div>
              {items.map(l=>(
                <a key={l} href="#" onClick={e=>e.preventDefault()} style={{display:'block',fontSize:14,color:t.textMuted,textDecoration:'none',marginBottom:10,fontFamily:'DM Sans',transition:'color .15s'}}
                  onMouseEnter={e=>e.currentTarget.style.color=t.text} onMouseLeave={e=>e.currentTarget.style.color=t.textMuted}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${t.border}`,paddingTop:22,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <span style={{fontSize:12,color:t.textFaint,fontFamily:'DM Sans'}}>© 2026 EcoInsight</span>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {[['GHG Protocol','https://ghgprotocol.org/'],['GRI Standards','https://www.globalreporting.org/'],['TCFD','https://www.fsb-tcfd.org/'],['ISO 14064','https://www.iso.org/standard/66453.html'],['ISO 14001','https://www.iso.org/iso-14001-environmental-management.html'],['SBTi','https://sciencebasedtargets.org/'],['ISSB · NIIF S1/S2','https://www.ifrs.org/groups/international-sustainability-standards-board/'],['CDP','https://www.cdp.net/'],['HuellaChile','https://huellachile.mma.gob.cl/'],['WCAG 2.2 AA','https://www.w3.org/TR/WCAG22/']].map(([s,href])=>(
              <a key={s} href={href} target="_blank" rel="noopener noreferrer" title={s} style={{fontSize:10,color:t.textFaint,background:t.card,border:`1px solid ${t.border}`,borderRadius:20,padding:'3px 10px',fontFamily:'Plus Jakarta Sans',fontWeight:600,textDecoration:'none',transition:'all .18s'}}
                onMouseEnter={e=>{e.currentTarget.style.color=t.accent;e.currentTarget.style.borderColor=t.accent;}}
                onMouseLeave={e=>{e.currentTarget.style.color=t.textFaint;e.currentTarget.style.borderColor=t.border;}}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
window.EcoFooter = EcoFooter;
