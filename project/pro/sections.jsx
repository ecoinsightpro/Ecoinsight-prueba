/* ═══════════════════════════════════════════════════════════
   EcoInsight Pro · SECTIONS A — Nav, Hero, Marquee, Stats, Value, Products
   ═══════════════════════════════════════════════════════════ */
/* cross-file aliases (Babel scripts are separately scoped) */
const Reveal = window.Reveal;
const REDUCED = window.REDUCED;
const ICONS = window.ICONS;

/* ── Brand logo lockup ── */
function Logo({ size=34, showPro=true }) {
  return (
    <a href="#top" style={{display:'flex',alignItems:'center',gap:11}} aria-label="EcoInsight Pro">
      <img src={(window.__resources&&window.__resources.logo)||"uploads/logo-ei.png"} alt="" style={{height:size,width:'auto'}}/>
      <span style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:size*0.62,letterSpacing:'-.025em'}}>
        <span style={{color:'var(--green)'}}>Eco</span><span style={{color:'var(--text)'}}>Insight</span>
        {showPro && <span style={{color:'var(--blue)'}}> Pro</span>}
      </span>
    </a>
  );
}
window.Logo = Logo;

/* ── Top navigation ── */
function Nav({ lang, setLang }) {
  const L = window.makeL(lang);
  const y = window.useScrollY();
  const scrolled = y > 40;
  const links = [['#productos',L('Productos','Products')],['#como',L('Cómo funciona','How it works')],['#quien',L('Para quién','Who it\u2019s for')],['#faq','FAQ']];
  return (
    <nav className={`nav ${scrolled?'nav-scrolled':'nav-top'}`}>
      <div className="wrap" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:20}}>
        <Logo size={scrolled?30:34}/>
        <div className="nav-links" style={{alignItems:'center',gap:34}}>
          {links.map(([h,t]) => <a key={h} href={h} className="nav-link">{t}</a>)}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <div style={{display:'flex',alignItems:'center',gap:1,background:'rgba(255,255,255,.05)',border:'1px solid var(--border2)',borderRadius:30,padding:3}}>
            {[['es','ES'],['en','EN']].map(([c,l]) => (
              <button key={c} onClick={()=>setLang(c)} aria-pressed={lang===c}
                style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:12.5,padding:'5px 11px',borderRadius:30,transition:'all .2s',
                  background:lang===c?'var(--green)':'transparent',color:lang===c?'var(--cta-text)':'var(--muted)'}}>{l}</button>
            ))}
          </div>
          <a href="#productos" className="btn btn-primary hide-mobile" style={{padding:'11px 20px',fontSize:14}}>{L('Ver productos','View products')}</a>
        </div>
      </div>
    </nav>
  );
}
window.Nav = Nav;

/* ── Animated carbon dashboard (hero visual) ── */
function HeroDash({ lang }) {
  const L = window.makeL(lang);
  const bars = [42,58,49,71,63,88,79];
  const R = 52, C = 2*Math.PI*R;
  return (
    <div className="float-a" style={{position:'relative'}}>
      {/* glow */}
      <div style={{position:'absolute',inset:'-8% -6%',background:'var(--grad-soft)',filter:'blur(40px)',borderRadius:32,opacity:.7}}/>
      <div className="card" style={{position:'relative',padding:'24px 24px 22px',borderRadius:22,boxShadow:'var(--shadow-lg)',background:'linear-gradient(160deg,#1a2e57,#142546)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10.5,color:'var(--muted)',letterSpacing:'.05em'}}>{L('PANEL DE EMISIONES','EMISSIONS DASHBOARD')}</div>
            <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:16,marginTop:2}}>{L('Huella corporativa 2026','Corporate footprint 2026')}</div>
          </div>
          <span style={{display:'inline-flex',alignItems:'center',gap:6,fontFamily:'var(--font-mono)',fontSize:10.5,color:'var(--green)',background:'rgba(77,184,122,.12)',border:'1px solid rgba(77,184,122,.3)',borderRadius:20,padding:'4px 10px'}}>
            <span className="live-dot" style={{width:6,height:6,borderRadius:'50%',background:'var(--green)'}}/>{L('En vivo','Live')}
          </span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1.1fr .9fr',gap:18,alignItems:'center'}}>
          {/* bars */}
          <div>
            <div style={{display:'flex',alignItems:'flex-end',gap:8,height:120}}>
              {bars.map((h,i)=>(
                <div key={i} className="bar" style={{flex:1,height:`${h}%`,borderRadius:'5px 5px 2px 2px',
                  background:i===5?'var(--grad-brand)':'linear-gradient(180deg,#3B8FDB,#2c6cad)',animationDelay:`${0.5+i*0.09}s`,opacity:i===5?1:.82}}/>
              ))}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:9,fontFamily:'var(--font-mono)',fontSize:9,color:'var(--faint)'}}>
              <span>ENE</span><span>MAR</span><span>MAY</span><span>JUL</span>
            </div>
          </div>
          {/* donut */}
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle cx="65" cy="65" r="52" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="13"/>
              <circle cx="65" cy="65" r="52" fill="none" stroke="url(#g)" strokeWidth="13" strokeLinecap="round"
                strokeDasharray={C} style={{'--ring-to':C*0.32, strokeDashoffset:REDUCED?C*0.32:undefined, animation:REDUCED?'none':'ringDraw 1.6s 0.7s var(--ease) both', transform:'rotate(-90deg)', transformOrigin:'center'}}/>
              <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4DB87A"/><stop offset="1" stopColor="#3B8FDB"/></linearGradient></defs>
              <text x="65" y="61" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontWeight="800" fontSize="22" fill="#E6EDF8">68%</text>
              <text x="65" y="78" textAnchor="middle" fontFamily="DM Mono" fontSize="8.5" fill="#8FA8C7">{L('REDUCIDO','REDUCED')}</text>
            </svg>
          </div>
        </div>
        {/* KPI row */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginTop:18}}>
          {[[L('Alcance 1','Scope 1'),'124','var(--green)'],[L('Alcance 2','Scope 2'),'318','var(--blue)'],[L('Alcance 3','Scope 3'),'412','var(--warning)']].map(([k,v,c])=>(
            <div key={k} style={{background:'rgba(255,255,255,.03)',border:'1px solid var(--border)',borderRadius:11,padding:'10px 11px'}}>
              <div style={{display:'flex',alignItems:'center',gap:5}}><span style={{width:6,height:6,borderRadius:'50%',background:c}}/><span style={{fontSize:10.5,color:'var(--muted)'}}>{k}</span></div>
              <div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:17,marginTop:3}}>{v}<span style={{fontSize:9,color:'var(--faint)',fontFamily:'var(--font-mono)',marginLeft:3}}>t</span></div>
            </div>
          ))}
        </div>
      </div>
      {/* floating badge */}
      <div className="float-b card" style={{position:'absolute',right:-22,bottom:-26,padding:'12px 16px',borderRadius:14,display:'flex',alignItems:'center',gap:10,boxShadow:'var(--shadow-lg)',background:'linear-gradient(160deg,#1a2e57,#142546)'}}>
        <span style={{width:34,height:34,borderRadius:10,background:'rgba(77,184,122,.15)',color:'var(--green)',display:'flex',alignItems:'center',justifyContent:'center'}}>{window.ICONS.check({s:18,w:2.4})}</span>
        <div><div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:14}}>GHG Protocol</div><div style={{fontSize:10.5,color:'var(--muted)'}}>{L('Alcances 1·2·3','Scopes 1·2·3')}</div></div>
      </div>
    </div>
  );
}

/* ── Hero ── */
function Hero({ lang }) {
  const L = window.makeL(lang);
  return (
    <header id="top" className="sec" style={{paddingTop:'clamp(132px,16vh,180px)',overflow:'hidden'}}>
      <div className="aurora a1"/><div className="aurora a2"/><div className="grid-tex"/>
      <div className="wrap" style={{position:'relative'}}>
        <div className="grid-2">
          <div>
            <Reveal variant="reveal" delay={0}><span className="eyebrow">{window.ICONS.leaf({s:14,w:2})}{L('Plantillas profesionales de carbono','Professional carbon templates')}</span></Reveal>
            <Reveal variant="reveal" delay={80}>
              <h1 className="h-display" style={{fontSize:'clamp(38px,5.6vw,68px)',margin:'22px 0 0'}}>
                {L('Mide y reporta tu','Measure and report your')}<br/><span className="grad-text">{L('huella de carbono','carbon footprint')}</span><br/>{L('sin partir de cero','without starting from scratch')}
              </h1>
            </Reveal>
            <Reveal variant="reveal" delay={160}>
              <p className="muted" style={{fontSize:'clamp(16px,1.7vw,19px)',maxWidth:540,margin:'24px 0 0',lineHeight:1.65}}>
                {L('Plantillas digitales bajo GHG Protocol —Alcances 1, 2 y 3— en Excel y Power BI. Diseñadas para empresas, ingenieros y consultores ambientales de LATAM.',
                   'Digital templates under the GHG Protocol —Scopes 1, 2 & 3— in Excel and Power BI. Built for companies, engineers and environmental consultants across LATAM.')}
              </p>
            </Reveal>
            <Reveal variant="reveal" delay={240}>
              <div style={{display:'flex',gap:14,flexWrap:'wrap',marginTop:34}}>
                <a href="#productos" className="btn btn-primary">{L('Ver productos','View products')} {window.ICONS.arrow({s:18,w:2.2})}</a>
                <a href="#como" className="btn btn-ghost">{L('Cómo funciona','How it works')}</a>
              </div>
            </Reveal>
            <Reveal variant="reveal" delay={320}>
              <div style={{display:'flex',alignItems:'center',gap:18,marginTop:30,flexWrap:'wrap'}}>
                <div style={{display:'flex',alignItems:'center',gap:7,color:'var(--warning)'}}>
                  {[0,1,2,3,4].map(i=><span key={i}>{window.ICONS.star({s:15})}</span>)}
                  <span style={{color:'var(--text)',fontFamily:'var(--font-display)',fontWeight:700,fontSize:14,marginLeft:2}}>4,0</span>
                </div>
                <span style={{width:4,height:4,borderRadius:'50%',background:'var(--faint)'}}/>
                <span style={{fontSize:13.5,color:'var(--muted)'}}>{L('Vendido en Etsy · descarga instantánea','Sold on Etsy · instant download')}</span>
              </div>
            </Reveal>
          </div>
          <Reveal variant="reveal-r" delay={200} className="hide-mobile">
            <HeroDash lang={lang}/>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
window.Hero = Hero;

/* ── Standards marquee ── */
function Marquee({ lang }) {
  const L = window.makeL(lang);
  const items = window.STANDARDS;
  const row = (k) => (
    <div className="marquee-track" key={k} aria-hidden={k>0}>
      {items.map((s,i)=>(
        <span key={i} style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:17,color:'var(--muted)',display:'inline-flex',alignItems:'center',gap:14,opacity:.8}}>
          {s}<span style={{width:5,height:5,borderRadius:'50%',background:'var(--green)',opacity:.6}}/>
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label={L('Estándares y marcos','Standards and frameworks')} style={{borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',padding:'26px 0',background:'var(--bg-deep)'}}>
      <div className="wrap" style={{marginBottom:16}}>
        <p style={{textAlign:'center',fontFamily:'var(--font-mono)',fontSize:11.5,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--faint)'}}>{L('Alineado a los estándares líderes','Aligned with leading standards')}</p>
      </div>
      <div className="marquee">{row(0)}{row(1)}</div>
    </section>
  );
}
window.Marquee = Marquee;

/* ── Stats band ── */
function Stats({ lang }) {
  const L = window.makeL(lang);
  const fmt = x => Math.round(x).toLocaleString(lang==='en'?'en-US':'es-CL');
  const data = [
    { v:2400, suf:'+', l:L('Profesionales alcanzados','Professionals reached'), f:fmt },
    { v:28, suf:'', l:L('Países en LATAM y más','Countries in LATAM & beyond') },
    { v:12, suf:'M', l:L('tCO₂e modeladas','tCO₂e modeled') },
    { v:3, suf:'', l:L('Alcances cubiertos (1·2·3)','Scopes covered (1·2·3)') },
  ];
  return (
    <section className="sec" style={{paddingTop:'clamp(56px,7vw,88px)',paddingBottom:'clamp(56px,7vw,88px)'}}>
      <div className="wrap">
        <Reveal className="grid-4" style={{gap:24}}>
          {data.map((d,i)=>(
            <div key={i} style={{textAlign:'center',padding:'8px 0',borderLeft:i?'1px solid var(--border)':'none'}}>
              <div className="h-display grad-text" style={{fontSize:'clamp(34px,4.4vw,50px)'}}>
                <window.CountUp value={d.v} format={d.f} suffix={d.suf}/>
              </div>
              <div className="muted" style={{fontSize:13.5,marginTop:6}}>{d.l}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
window.Stats = Stats;

/* ── Value / problem→solution ── */
function Value({ lang }) {
  const L = window.makeL(lang);
  const pains = [
    { icon:'doc', t:{es:'Hojas en blanco',en:'Blank spreadsheets'}, b:{es:'Construir un inventario GEI desde cero toma semanas y es propenso a errores.',en:'Building a GHG inventory from scratch takes weeks and is error-prone.'} },
    { icon:'globe', t:{es:'Factores dispersos',en:'Scattered factors'}, b:{es:'Buscar factores de emisión confiables para tu región es lento y confuso.',en:'Finding reliable emission factors for your region is slow and confusing.'} },
    { icon:'chart', t:{es:'Reportes poco claros',en:'Unclear reports'}, b:{es:'Presentar resultados a dirección o clientes sin visualizaciones resta impacto.',en:'Presenting results to leadership or clients without visuals weakens impact.'} },
  ];
  return (
    <section className="sec" style={{background:'var(--bg-deep)',borderTop:'1px solid var(--border)'}}>
      <div className="wrap">
        <div style={{maxWidth:680,margin:'0 auto 56px',textAlign:'center'}}>
          <Reveal><span className="eyebrow">{L('El problema','The problem')}</span></Reveal>
          <Reveal delay={80}><h2 className="h-display" style={{fontSize:'clamp(30px,4vw,46px)',margin:'20px 0 16px'}}>{L('Medir tu huella no debería tomar semanas','Measuring your footprint shouldn\u2019t take weeks')}</h2></Reveal>
          <Reveal delay={140}><p className="muted" style={{fontSize:17}}>{L('Te damos la estructura, los factores y la visualización ya resueltos. Tú solo ingresas tus datos.','We give you the structure, factors and visualisation already solved. You just enter your data.')}</p></Reveal>
        </div>
        <div className="grid-3">
          {pains.map((p,i)=>{const I=window.ICONS[p.icon];return(
            <Reveal key={i} variant="reveal" delay={i*100} className="card card-lift" style={{padding:'30px 26px'}}>
              <span style={{width:48,height:48,borderRadius:13,background:'rgba(212,151,58,.12)',color:'var(--warning)',display:'flex',alignItems:'center',justifyContent:'center'}}>{I({s:24})}</span>
              <h3 className="h-display" style={{fontSize:19,margin:'18px 0 9px'}}>{p.t[lang]}</h3>
              <p className="muted" style={{fontSize:14.5,lineHeight:1.6}}>{p.b[lang]}</p>
            </Reveal>
          );})}
        </div>
      </div>
    </section>
  );
}
window.Value = Value;

/* ── Products ── */
function Products({ lang }) {
  const L = window.makeL(lang);
  const money = x => '$'+x.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  return (
    <section id="productos" className="sec">
      <div className="wrap">
        <div style={{maxWidth:680,margin:'0 auto 56px',textAlign:'center'}}>
          <Reveal><span className="eyebrow">{window.ICONS.download({s:14,w:2})}{L('Productos digitales','Digital products')}</span></Reveal>
          <Reveal delay={80}><h2 className="h-display" style={{fontSize:'clamp(30px,4vw,46px)',margin:'20px 0 16px'}}>{L('Herramientas listas para usar','Ready-to-use tools')}</h2></Reveal>
          <Reveal delay={140}><p className="muted" style={{fontSize:17}}>{L('Descarga instantánea, pago seguro vía Etsy. Elige la plantilla que necesitas o llévate el pack completo.','Instant download, secure payment via Etsy. Pick the template you need or grab the full pack.')}</p></Reveal>
        </div>
        <div className="grid-3">
          {window.PRODUCTS.map((p,i)=>(
            <Reveal key={p.id} variant="reveal-scale" delay={i*110}
              className="card card-lift" style={{display:'flex',flexDirection:'column',overflow:'hidden',
                border:p.highlight?'1px solid var(--green)':undefined, boxShadow:p.highlight?'var(--shadow-glow)':undefined}}>
              <div style={{position:'relative',aspectRatio:'1/1',overflow:'hidden',background:'#0e1d36'}}>
                <img src={p.img} alt={p.name[lang]} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                <span style={{position:'absolute',top:12,left:12,fontFamily:'var(--font-display)',fontWeight:700,fontSize:11,letterSpacing:'.04em',
                  background:p.highlight?'var(--green)':'rgba(9,21,37,.82)',color:p.highlight?'var(--cta-text)':'var(--text)',
                  border:p.highlight?'none':'1px solid var(--border2)',borderRadius:20,padding:'5px 12px',backdropFilter:'blur(6px)'}}>{p.badge[lang]}</span>
              </div>
              <div style={{padding:'22px 22px 24px',display:'flex',flexDirection:'column',flex:1}}>
                <div className="mono" style={{fontSize:11,color:'var(--blue-bright)',letterSpacing:'.04em',marginBottom:8}}>{typeof p.fmt==='string'?p.fmt:p.fmt[lang]}</div>
                <h3 className="h-display" style={{fontSize:21,marginBottom:10}}>{p.name[lang]}</h3>
                <p className="muted" style={{fontSize:14,lineHeight:1.6,marginBottom:16}}>{p.desc[lang]}</p>
                <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9,marginBottom:22}}>
                  {p.feats[lang].map((f,j)=>(
                    <li key={j} style={{display:'flex',alignItems:'center',gap:10,fontSize:13.5}}>
                      <span style={{color:'var(--green)',flexShrink:0}}>{window.ICONS.check({s:16,w:2.4})}</span>{f}
                    </li>
                  ))}
                </ul>
                <div style={{marginTop:'auto'}}>
                  <div style={{display:'flex',alignItems:'baseline',gap:9,marginBottom:14}}>
                    <span className="h-display" style={{fontSize:28}}>{money(p.price)}</span>
                    {p.old && <span className="mono" style={{fontSize:14,color:'var(--faint)',textDecoration:'line-through'}}>{money(p.old)}</span>}
                    {p.old && <span style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:11,color:'var(--green)',background:'rgba(77,184,122,.12)',borderRadius:6,padding:'3px 8px'}}>-{Math.round((1-p.price/p.old)*100)}%</span>}
                  </div>
                  <a href={p.url[lang]} target="_blank" rel="noopener noreferrer"
                    className={`btn ${p.highlight?'btn-primary':'btn-ghost'}`} style={{width:'100%',justifyContent:'center'}}>
                    {L('Comprar en Etsy','Buy on Etsy')} {window.ICONS.arrow({s:17,w:2.2})}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}><p style={{textAlign:'center',marginTop:30,fontSize:13.5,color:'var(--faint)'}}>{L('Pago seguro y entrega digital gestionados por Etsy.','Secure payment and digital delivery handled by Etsy.')}</p></Reveal>
      </div>
    </section>
  );
}
window.Products = Products;
