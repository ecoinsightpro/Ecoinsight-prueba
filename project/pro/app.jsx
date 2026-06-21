/* ═══════════════════════════════════════════════════════════
   EcoInsight Pro · APP — HowItWorks, Personas, Features, Proof,
   FAQ, FinalCTA, Footer, WhatsApp + mount
   ═══════════════════════════════════════════════════════════ */
const Reveal = window.Reveal;
const ICONS = window.ICONS;
const { useState, useEffect } = React;

/* ── How it works ── */
function HowItWorks({ lang }) {
  const L = window.makeL(lang);
  return (
    <section id="como" className="sec" style={{background:'var(--bg-deep)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
      <div className="wrap">
        <div style={{maxWidth:680,margin:'0 auto 56px',textAlign:'center'}}>
          <Reveal><span className="eyebrow">{ICONS.spark({s:14,w:2})}{L('Cómo funciona','How it works')}</span></Reveal>
          <Reveal delay={80}><h2 className="h-display" style={{fontSize:'clamp(30px,4vw,46px)',margin:'20px 0 16px'}}>{L('De los datos al reporte en 3 pasos','From data to report in 3 steps')}</h2></Reveal>
        </div>
        <div className="grid-3" style={{position:'relative'}}>
          {window.STEPS.map((s,i)=>(
            <Reveal key={i} variant="reveal" delay={i*120} className="card card-lift" style={{padding:'32px 28px',position:'relative'}}>
              <div className="h-display grad-text" style={{fontSize:48,lineHeight:1,opacity:.9}}>{s.n}</div>
              <h3 className="h-display" style={{fontSize:21,margin:'16px 0 10px'}}>{s.title[lang]}</h3>
              <p className="muted" style={{fontSize:14.5,lineHeight:1.6}}>{s.body[lang]}</p>
              {i<2 && <span className="hide-mobile" style={{position:'absolute',right:-32,top:'50%',color:'var(--border2)',zIndex:2}}>{ICONS.arrow({s:26,w:1.8})}</span>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Personas ── */
function Personas({ lang }) {
  const L = window.makeL(lang);
  return (
    <section id="quien" className="sec">
      <div className="wrap">
        <div style={{maxWidth:680,margin:'0 auto 56px',textAlign:'center'}}>
          <Reveal><span className="eyebrow">{ICONS.users({s:14,w:2})}{L('Para quién','Who it\u2019s for')}</span></Reveal>
          <Reveal delay={80}><h2 className="h-display" style={{fontSize:'clamp(30px,4vw,46px)',margin:'20px 0 16px'}}>{L('Pensado para profesionales del medio ambiente','Built for environmental professionals')}</h2></Reveal>
        </div>
        <div className="grid-3">
          {window.PERSONAS.map((p,i)=>{const I=ICONS[p.icon];return(
            <Reveal key={i} variant="reveal-scale" delay={i*110} className="card card-lift" style={{padding:'34px 28px'}}>
              <span style={{width:54,height:54,borderRadius:15,background:'var(--grad-soft)',color:'var(--green-bright)',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid var(--border2)'}}>{I({s:26})}</span>
              <h3 className="h-display" style={{fontSize:21,margin:'20px 0 10px'}}>{p.title[lang]}</h3>
              <p className="muted" style={{fontSize:15,lineHeight:1.65}}>{p.body[lang]}</p>
            </Reveal>
          );})}
        </div>
      </div>
    </section>
  );
}

/* ── Features grid ── */
function Features({ lang }) {
  const L = window.makeL(lang);
  return (
    <section className="sec" style={{background:'var(--bg-deep)',borderTop:'1px solid var(--border)'}}>
      <div className="wrap">
        <div style={{maxWidth:680,margin:'0 auto 56px',textAlign:'center'}}>
          <Reveal><span className="eyebrow">{ICONS.shield({s:14,w:2})}{L('Por qué EcoInsight','Why EcoInsight')}</span></Reveal>
          <Reveal delay={80}><h2 className="h-display" style={{fontSize:'clamp(30px,4vw,46px)',margin:'20px 0 16px'}}>{L('Rigor técnico, sin la complejidad','Technical rigor, without the complexity')}</h2></Reveal>
        </div>
        <div className="grid-3">
          {window.FEATURES.map((f,i)=>{const I=ICONS[f.icon];return(
            <Reveal key={i} variant="reveal" delay={(i%3)*90} className="card card-lift" style={{padding:'28px 26px'}}>
              <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:14}}>
                <span style={{width:46,height:46,borderRadius:12,background:'rgba(59,143,219,.12)',color:'var(--blue-bright)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{I({s:23})}</span>
                <h3 className="h-display" style={{fontSize:17.5,lineHeight:1.2}}>{f.title[lang]}</h3>
              </div>
              <p className="muted" style={{fontSize:14.5,lineHeight:1.6}}>{f.body[lang]}</p>
            </Reveal>
          );})}
        </div>
      </div>
    </section>
  );
}

/* ── Proof / guarantee band ── */
function Proof({ lang }) {
  const L = window.makeL(lang);
  const items = [
    { icon:'star', t:{es:'Valoración 4,0 en Etsy',en:'4.0 rating on Etsy'} },
    { icon:'download', t:{es:'Descarga instantánea',en:'Instant download'} },
    { icon:'shield', t:{es:'Pago seguro vía Etsy',en:'Secure payment via Etsy'} },
    { icon:'leaf', t:{es:'Factores LATAM incluidos',en:'LATAM factors included'} },
  ];
  return (
    <section className="sec" style={{paddingTop:0}}>
      <div className="wrap">
        <Reveal variant="reveal-scale" className="card" style={{padding:'clamp(28px,4vw,44px)',background:'var(--grad-soft)',border:'1px solid var(--border2)'}}>
          <div className="grid-4" style={{gap:24}}>
            {items.map((it,i)=>{const I=ICONS[it.icon];return(
              <div key={i} style={{display:'flex',alignItems:'center',gap:13}}>
                <span style={{width:44,height:44,borderRadius:12,background:'rgba(77,184,122,.16)',color:'var(--green)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{I({s:22})}</span>
                <span className="h-display" style={{fontSize:14.5,fontWeight:700,lineHeight:1.25}}>{it.t[lang]}</span>
              </div>
            );})}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── FAQ accordion ── */
function FAQItem({ item, lang, open, onToggle }) {
  const ref = React.useRef(null);
  return (
    <div className="card" style={{padding:0,overflow:'hidden',marginBottom:14,borderColor:open?'var(--border2)':'var(--border)'}}>
      <button onClick={onToggle} aria-expanded={open}
        style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,padding:'20px 24px',textAlign:'left'}}>
        <span className="h-display" style={{fontSize:17,color:'var(--text)'}}>{item.q[lang]}</span>
        <span style={{flexShrink:0,color:open?'var(--green)':'var(--muted)',transform:open?'rotate(45deg)':'none',transition:'transform .35s var(--ease),color .25s'}}>{ICONS.plus({s:22,w:2})}</span>
      </button>
      <div className="faq-a" style={{maxHeight:open?(ref.current?ref.current.scrollHeight+40:400):0,opacity:open?1:0}}>
        <p ref={ref} className="muted" style={{padding:'0 24px 22px',fontSize:14.5,lineHeight:1.7}}>{item.a[lang]}</p>
      </div>
    </div>
  );
}
function FAQSection({ lang }) {
  const L = window.makeL(lang);
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="sec">
      <div className="wrap" style={{maxWidth:820}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <Reveal><span className="eyebrow">FAQ</span></Reveal>
          <Reveal delay={80}><h2 className="h-display" style={{fontSize:'clamp(30px,4vw,46px)',margin:'20px 0 0'}}>{L('Preguntas frecuentes','Frequently asked questions')}</h2></Reveal>
        </div>
        <Reveal>
          {window.FAQ.map((it,i)=>(
            <FAQItem key={i} item={it} lang={lang} open={open===i} onToggle={()=>setOpen(open===i?-1:i)}/>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── Final CTA ── */
function FinalCTA({ lang }) {
  const L = window.makeL(lang);
  const wa = `https://wa.me/${window.STORE.wa}?text=${encodeURIComponent(L('Hola, quiero información sobre las plantillas de EcoInsight','Hi, I want information about EcoInsight templates'))}`;
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal variant="reveal-scale" className="card" style={{position:'relative',overflow:'hidden',textAlign:'center',padding:'clamp(48px,7vw,84px) 28px',border:'1px solid var(--border2)',background:'linear-gradient(160deg,#16284c,#0f1f3c)'}}>
          <div className="aurora a1" style={{opacity:.5}}/><div className="grid-tex"/>
          <div style={{position:'relative'}}>
            <h2 className="h-display" style={{fontSize:'clamp(30px,4.4vw,52px)',marginBottom:18}}>{L('Empieza a medir tu','Start measuring your')} <span className="grad-text">{L('huella hoy','footprint today')}</span></h2>
            <p className="muted" style={{fontSize:18,maxWidth:560,margin:'0 auto 34px'}}>{L('Descarga una plantilla profesional y ten tu primer reporte de carbono esta misma semana.','Download a professional template and have your first carbon report this week.')}</p>
            <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
              <a href="#productos" className="btn btn-primary">{L('Ver productos','View products')} {ICONS.arrow({s:18,w:2.2})}</a>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{L('Hablar por WhatsApp','Chat on WhatsApp')}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer({ lang }) {
  const L = window.makeL(lang);
  return (
    <footer style={{borderTop:'1px solid var(--border)',background:'var(--bg-deep)',padding:'56px 0 34px'}}>
      <div className="wrap">
        <div style={{display:'flex',justifyContent:'space-between',gap:32,flexWrap:'wrap',marginBottom:36}}>
          <div style={{maxWidth:330}}>
            <window.Logo size={32}/>
            <p className="muted" style={{fontSize:14,lineHeight:1.65,marginTop:16}}>{L('Plantillas y herramientas digitales para medir y reportar la huella de carbono. Para empresas, ingenieros y consultores de LATAM.','Digital templates and tools to measure and report your carbon footprint. For companies, engineers and consultants across LATAM.')}</p>
          </div>
          <div style={{display:'flex',gap:'48px 64px',flexWrap:'wrap'}}>
            <div>
              <div className="mono" style={{fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--faint)',marginBottom:14}}>{L('Navegación','Navigate')}</div>
              <div style={{display:'flex',flexDirection:'column',gap:11}}>
                {[['#productos',L('Productos','Products')],['#como',L('Cómo funciona','How it works')],['#quien',L('Para quién','Who it\u2019s for')],['#faq','FAQ']].map(([h,t])=>(
                  <a key={h} href={h} className="muted" style={{fontSize:14,transition:'color .2s'}} onMouseEnter={e=>e.currentTarget.style.color='var(--text)'} onMouseLeave={e=>e.currentTarget.style.color=''}>{t}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="mono" style={{fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--faint)',marginBottom:14}}>{L('Tienda','Store')}</div>
              <div style={{display:'flex',flexDirection:'column',gap:11}}>
                <a href={window.STORE.url} target="_blank" rel="noopener noreferrer" className="muted" style={{fontSize:14}}>Etsy · EcoInsight</a>
                <a href={`https://wa.me/${window.STORE.wa}`} target="_blank" rel="noopener noreferrer" className="muted" style={{fontSize:14}}>WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',paddingTop:24,borderTop:'1px solid var(--border)'}}>
          {window.STANDARDS.map(s=>(
            <span key={s} className="mono" style={{fontSize:10.5,color:'var(--faint)',border:'1px solid var(--border)',borderRadius:20,padding:'3px 10px'}}>{s}</span>
          ))}
        </div>
        <p style={{marginTop:24,fontSize:12.5,color:'var(--faint)'}}>© 2026 EcoInsight</p>
      </div>
    </footer>
  );
}

/* ── Floating WhatsApp ── */
function WhatsApp({ lang }) {
  const L = window.makeL(lang);
  const href = `https://wa.me/${window.STORE.wa}?text=${encodeURIComponent(L('Hola, quiero información sobre EcoInsight','Hi, I would like information about EcoInsight'))}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="wa"
      aria-label={L('Contáctanos por WhatsApp','Contact us on WhatsApp')}
      style={{position:'fixed',right:24,bottom:24,zIndex:200,width:54,height:54,borderRadius:'50%',background:'var(--green)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 14px 34px -8px rgba(77,184,122,.6)'}}>
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <path fill="#0A1820" d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.3.9.9-4.2-.2-.4c-1-1.6-1.5-3.4-1.5-5.3 0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8zm5.4-7.3c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/>
      </svg>
    </a>
  );
}

/* ── App ── */
function App() {
  const [lang, setLang] = useState(() => { try { return localStorage.getItem('eipro_lang') || 'es'; } catch(e){ return 'es'; } });
  useEffect(() => { try { localStorage.setItem('eipro_lang', lang); } catch(e){} document.documentElement.lang = lang; }, [lang]);
  return (
    <React.Fragment>
      <window.Nav lang={lang} setLang={setLang}/>
      <main>
        <window.Hero lang={lang}/>
        <window.Marquee lang={lang}/>
        <window.Stats lang={lang}/>
        <window.Value lang={lang}/>
        <window.Products lang={lang}/>
        <HowItWorks lang={lang}/>
        <Personas lang={lang}/>
        <Features lang={lang}/>
        <Proof lang={lang}/>
        <FAQSection lang={lang}/>
        <FinalCTA lang={lang}/>
      </main>
      <Footer lang={lang}/>
      <WhatsApp lang={lang}/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
