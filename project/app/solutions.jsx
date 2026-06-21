/* ═══════════════════════════════════════════════════════════
   EcoInsight · SOLUTIONS (detail cards) + MARKETPLACE
   ═══════════════════════════════════════════════════════════ */
function EcoSolutions({t, lang, go}) {
  const L = window.makeL(lang);
  const S = window.SOLUTIONS;
  const [group, setGroup] = React.useState('chile');
  const [sel, setSel] = React.useState(null);
  const list = S[group];
  const detail = sel ? [...S.chile,...S.intl].find(x=>x.id===sel) : null;

  React.useEffect(()=>{
    const onKey = e => { if(e.key==='Escape') setSel(null); };
    window.addEventListener('keydown',onKey); return ()=>window.removeEventListener('keydown',onKey);
  },[]);

  const Card = (s) => (
    <div key={s.id} onClick={()=>setSel(s.id)} role="button" tabIndex={0} onKeyDown={window.openKey(()=>setSel(s.id))} aria-label={s.name[lang]} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:16,padding:'22px 22px 18px',cursor:'pointer',transition:'all .22s',display:'flex',flexDirection:'column'}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.transform='translateY(-3px)';}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform='none';}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
        <div style={{width:46,height:46,borderRadius:11,background:t.accentDim,border:`1px solid ${t.accent}33`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <span style={{fontSize:13,fontWeight:800,color:t.accent,fontFamily:'Plus Jakarta Sans',letterSpacing:'-.02em'}}>{s.glyph}</span>
        </div>
        <div style={{minWidth:0}}>
          <h3 style={{fontSize:16,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,letterSpacing:'-.01em',lineHeight:1.2}}>{s.name[lang]}</h3>
          <div style={{fontSize:11,color:t.textMuted,fontFamily:'DM Sans',marginTop:2}}>{s.tag[lang]}</div>
        </div>
      </div>
      <p style={{fontSize:13,color:t.textMuted,lineHeight:1.55,fontFamily:'DM Sans',marginBottom:14,flex:1}}>{s.desc[lang]}</p>
      <span style={{fontSize:12,fontWeight:700,color:t.accent,fontFamily:'Plus Jakarta Sans'}}>{L('Ver ficha completa','View full sheet')} →</span>
    </div>
  );

  const Col = ({title,items}) => (
    <div>
      <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.09em',color:t.textMuted,marginBottom:10,fontFamily:'Plus Jakarta Sans'}}>{title}</div>
      <div style={{display:'flex',flexDirection:'column',gap:9}}>
        {items.map((it,i)=>(
          <div key={i} style={{display:'flex',gap:9,alignItems:'flex-start'}}>
            <span style={{flexShrink:0,marginTop:6,width:6,height:6,borderRadius:'50%',background:t.accent}}/>
            <span style={{fontSize:13.5,color:t.text,lineHeight:1.5,fontFamily:'DM Sans'}}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="soluciones" style={{background:t.bg,padding:'96px 0',borderTop:`1px solid ${t.border}`,scrollMarginTop:84}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:'0 32px'}}>
        <Reveal>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:36,flexWrap:'wrap',gap:22}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:t.accentDim,border:`1px solid ${t.accent}35`,borderRadius:20,padding:'5px 14px',marginBottom:18}}>
              <span style={{color:t.accent,fontSize:11,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',fontFamily:'Plus Jakarta Sans',whiteSpace:'nowrap'}}>{L('Paso 02 · Conoce los marcos','Step 02 · Know the frameworks')}</span>
            </div>
            <h2 style={{fontSize:44,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.1,marginBottom:12,letterSpacing:'-.022em'}}>{L('Soluciones','Environmental')}<br/>{L('Ambientales','Solutions')}</h2>
            <p style={{fontSize:17,color:t.textMuted,lineHeight:1.6,fontFamily:'DM Sans',maxWidth:520}}>{L('Las normativas y marcos que rigen la sostenibilidad — explicados, con beneficios y casos de uso.','The standards and frameworks that govern sustainability — explained, with benefits and use cases.')}</p>
          </div>
          <div style={{display:'flex',gap:6,background:t.card,border:`1px solid ${t.border}`,borderRadius:24,padding:4}}>
            {[['chile',L('🇨🇱 Chile','🇨🇱 Chile')],['intl',L('🌍 Internacional','🌍 International')]].map(([id,lbl])=>(
              <button key={id} onClick={()=>setGroup(id)} style={{padding:'9px 20px',borderRadius:20,border:'none',cursor:'pointer',fontSize:13,fontWeight:700,fontFamily:'Plus Jakarta Sans',transition:'all .2s',
                background:group===id?t.accent:'transparent',color:group===id?t.ctaText:t.textMuted}}>{lbl}</button>
            ))}
          </div>
        </div>
        </Reveal>
        <Reveal>
        <div style={{display:'grid',gridTemplateColumns:`repeat(${group==='chile'?4:3},1fr)`,gap:18}}>
          {list.map(Card)}
        </div>
        </Reveal>
      </div>

      {/* DETAIL MODAL */}
      {detail && (
        <div onClick={()=>setSel(null)} style={{position:'fixed',inset:0,zIndex:500,background:'rgba(4,10,20,.66)',backdropFilter:'blur(6px)',display:'flex',alignItems:'center',justifyContent:'center',padding:24,animation:'fadeIn .2s ease'}}>
          <div onClick={e=>e.stopPropagation()} style={{background:t.surface,border:`1px solid ${t.borderStrong}`,borderRadius:20,maxWidth:620,width:'100%',maxHeight:'88vh',overflowY:'auto',boxShadow:'0 40px 100px rgba(0,0,0,.5)'}}>
            <div style={{padding:'30px 34px 26px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20}}>
                <div style={{display:'flex',alignItems:'center',gap:14}}>
                  <div style={{width:54,height:54,borderRadius:13,background:t.accentDim,border:`1px solid ${t.accent}33`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <span style={{fontSize:15,fontWeight:800,color:t.accent,fontFamily:'Plus Jakarta Sans'}}>{detail.glyph}</span>
                  </div>
                  <div>
                    <h3 style={{fontSize:23,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,letterSpacing:'-.02em',lineHeight:1.15}}>{detail.name[lang]}</h3>
                    <div style={{fontSize:12.5,color:t.textMuted,fontFamily:'DM Sans',marginTop:3}}>{detail.tag[lang]}</div>
                  </div>
                </div>
                <button onClick={()=>setSel(null)} aria-label="Cerrar" style={{flexShrink:0,width:34,height:34,borderRadius:'50%',border:`1px solid ${t.border}`,background:t.card,color:t.textMuted,fontSize:16,cursor:'pointer',lineHeight:1}}>×</button>
              </div>
              <p style={{fontSize:15,color:t.text,lineHeight:1.65,fontFamily:'DM Sans',marginBottom:26}}>{detail.desc[lang]}</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:26,marginBottom:26}}>
                <Col title={L('Beneficios','Benefits')} items={detail.benefits[lang]}/>
                <Col title={L('Casos de uso','Use cases')} items={detail.uses[lang]}/>
              </div>
              <div style={{borderTop:`1px solid ${t.border}`,paddingTop:18,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
                <span style={{fontSize:11,color:t.textFaint,fontFamily:'Plus Jakarta Sans',fontWeight:600,textTransform:'uppercase',letterSpacing:'.08em'}}>{L('Recursos relacionados','Related resources')}</span>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  <a href="#/calculadora" onClick={(e)=>{e.preventDefault();setSel(null);go&&go('calculator');}} style={{fontSize:12,fontWeight:700,color:t.accent,fontFamily:'Plus Jakarta Sans',textDecoration:'none',border:`1px solid ${t.accent}44`,borderRadius:8,padding:'7px 13px'}}>{L('Calculadora GEI','GHG Calculator')} →</a>
                  <a href="#marketplace" onClick={(e)=>{setSel(null);}} style={{fontSize:12,fontWeight:700,color:t.textMuted,fontFamily:'Plus Jakarta Sans',textDecoration:'none',border:`1px solid ${t.border}`,borderRadius:8,padding:'7px 13px'}}>{L('Plantillas','Templates')} →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
window.EcoSolutions = EcoSolutions;

/* ═══ MARKETPLACE ═══ */
function EcoMarketplace({t, lang}) {
  const L = window.makeL(lang);
  const [cat, setCat] = React.useState('todos');
  const [hov, setHov] = React.useState(null);
  const [live, setLive] = React.useState(null);
  const [sync, setSync] = React.useState('loading'); // loading | live | catalog
  const [lastSync, setLastSync] = React.useState(()=>parseInt(localStorage.getItem('ei_etsy_sync')||'0',10)||0);
  const [, force] = React.useReducer(x=>x+1, 0);
  const CATALOG = window.ETSY_PRODUCTS || [];
  const SHOP = window.ETSY_SHOP || {name:'EcoInsight', url:'https://www.etsy.com/es/shop/EcoInsight?ref=profile_header'};

  // Pull the catalog from Etsy (configured feed → shop RSS → HTML); falls back to the bundled verified catalog.
  const load = React.useCallback((silent)=>{
    if(!silent) setSync('loading');
    if(window.fetchEtsyProducts){
      const dl = new Promise(r=>setTimeout(()=>r('__t'),11000));
      Promise.race([window.fetchEtsyProducts(lang), dl]).then(arr=>{
        if(arr && arr!=='__t' && arr.length){ setLive(arr); setSync('live'); const now=Date.now(); setLastSync(now); try{localStorage.setItem('ei_etsy_sync',String(now));}catch(e){} }
        else setSync('catalog');
      }).catch(()=>setSync('catalog'));
    } else setSync('catalog');
  }, [lang]);
  React.useEffect(()=>{ load(false); }, [lang, load]);
  // AUTO-UPDATE: re-sync when the day rolls over or every 6h, plus on tab refocus
  React.useEffect(()=>{
    const SIX=6*3600*1000;
    const chk=()=>{ const last=parseInt(localStorage.getItem('ei_etsy_sync')||'0',10)||0, now=Date.now(); const nd=new Date(last).toDateString()!==new Date(now).toDateString(); if(now-last>SIX||nd) load(true); };
    const iv=setInterval(chk,60000); const ov=()=>{ if(document.visibilityState==='visible') chk(); };
    document.addEventListener('visibilitychange',ov);
    return ()=>{ clearInterval(iv); document.removeEventListener('visibilitychange',ov); };
  }, [load]);
  React.useEffect(()=>{ const i=setInterval(force,1000); return ()=>clearInterval(i); }, []);

  // merge any live data over the bundled catalog (live store order wins)
  const products = React.useMemo(()=>{
    const byId={}; CATALOG.forEach(p=>{ byId[p.listingId]={...p}; });
    if(live && live.length){
      return live.map(lp=>{
        const b=byId[lp.listingId]||{};
        const cr=lp.currencyRaw; const cur=(cr==='USD'||cr==='$')?'USD':cr==='£'?'GBP':'EUR';
        return {
          listingId:lp.listingId,
          name: b.name||lp.title,
          desc: b.desc||lp.desc||null,
          url: (b.url&&b.url.es)?b.url:lp.url,
          price: b.price!=null?b.price:lp.price,
          oldPrice: b.oldPrice,
          currency: b.currency||cur,
          fmt: b.fmt||lp.fmt||'',
          cat: b.cat||lp.cat||'',
          th: b.th||'report', bc: b.bc||'accent',
          badge: b.badge||null,
          image: lp.image||b.image||null,
        };
      });
    }
    return CATALOG.map(p=>({...p}));
  }, [live]);

  const bcOf = p => t[p.bc] || t.accent;
  const money = (x,c)=> x.toLocaleString(lang==='en'?(c==='USD'?'en-US':'en-IE'):(c==='USD'?'en-US':'es-ES'),{style:'currency',currency:c||'EUR'});
  const CATS=[['todos',L('Todos','All')],['ofertas',L('Ofertas','Deals')],['excel','Excel'],['powerbi','Power BI']];
  const shown = cat==='todos'?products : cat==='ofertas'?products.filter(p=>p.oldPrice) : products.filter(p=>p.cat===cat);
  const sinceTxt = (()=>{ if(!lastSync) return ''; const s=Math.max(0,Math.floor((Date.now()-lastSync)/1000)); return s<60?(L('hace ','')+s+'s'+(lang==='en'?' ago':'')):s<3600?(L('hace ','')+Math.floor(s/60)+' min'+(lang==='en'?' ago':'')):(L('hace ','')+Math.floor(s/3600)+' h'+(lang==='en'?' ago':'')); })();
  return (
    <section id="marketplace" style={{background:t.surface,padding:'96px 0',borderTop:`1px solid ${t.border}`,scrollMarginTop:84}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:'0 32px'}}>
        <Reveal>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:44,flexWrap:'wrap',gap:22}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:t.accent2Dim,border:`1px solid ${t.accent2}35`,borderRadius:20,padding:'5px 14px',marginBottom:18}}>
              <span style={{color:t.accent2,fontSize:11,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',fontFamily:'Plus Jakarta Sans',whiteSpace:'nowrap'}}>{L('Paso 04 · Actúa','Step 04 · Take action')}</span>
            </div>
            <h2 style={{fontSize:44,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.1,marginBottom:12,letterSpacing:'-.022em'}}>{L('Plantillas ESG','ESG Templates')}<br/>{L('Listas para Implementar','Ready to Implement')}</h2>
            <p style={{fontSize:17,color:t.textMuted,lineHeight:1.6,fontFamily:'DM Sans'}}>{L('Descarga, personaliza y reporta. Formatos Power BI, Excel y PDF — directo desde nuestra tienda Etsy.','Download, customise and report. Power BI, Excel & PDF formats — straight from our Etsy store.')}</p>
            <div style={{display:'inline-flex',alignItems:'center',gap:10,marginTop:14,fontSize:12.5,color:t.textMuted,fontFamily:'DM Sans',flexWrap:'wrap'}}>
              <span style={{color:t.warning,fontWeight:700,fontFamily:'Plus Jakarta Sans'}}>{L('★ 4,0','★ 4.0')}</span>
              <span style={{width:3,height:3,borderRadius:'50%',background:t.textFaint}}/>
              <span>{L('12 ventas en Etsy','12 sales on Etsy')}</span>
              <span style={{width:3,height:3,borderRadius:'50%',background:t.textFaint}}/>
              <span>{L('Descarga instantánea','Instant download')}</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginTop:13,flexWrap:'wrap'}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:7,fontSize:11.5,fontFamily:'DM Mono',color:t.textMuted,background:t.card,border:`1px solid ${t.border}`,borderRadius:20,padding:'4px 11px'}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:sync==='live'?t.positive:sync==='loading'?t.warning:t.textFaint,display:'inline-block',animation:sync==='loading'?'pulse 1s infinite':'pulse 2.4s infinite'}}/>
                {sync==='live'?L('Sincronizado con Etsy','Synced with Etsy'):sync==='loading'?L('Sincronizando…','Syncing…'):L('Catálogo verificado','Verified catalog')}
              </span>
              {lastSync>0 && <span style={{fontSize:10.5,color:t.textFaint,fontFamily:'DM Sans'}}>{L('Actualizado ','Updated ')}{sinceTxt}</span>}
              <button onClick={()=>load(false)} title={L('Actualizar desde Etsy','Refresh from Etsy')}
                style={{display:'inline-flex',alignItems:'center',gap:5,background:'transparent',border:`1px solid ${t.border}`,color:t.textMuted,fontSize:11,fontWeight:700,fontFamily:'Plus Jakarta Sans',borderRadius:20,padding:'4px 12px',cursor:'pointer',transition:'all .18s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.color=t.accent;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.color=t.textMuted;}}>↻ {L('Actualizar','Refresh')}</button>
            </div>
          </div>
          <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
            {CATS.map(([id,lbl])=>(
              <button key={id} onClick={()=>setCat(id)} style={{padding:'8px 17px',borderRadius:20,border:`1px solid ${cat===id?t.accent:t.border}`,background:cat===id?t.accentDim:'transparent',color:cat===id?t.accent:t.textMuted,fontSize:13,fontWeight:600,cursor:'pointer',transition:'all .18s',fontFamily:'Plus Jakarta Sans'}}>{lbl}</button>
            ))}
          </div>
        </div>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}}>
          {shown.map((tp,i)=>(
            <Reveal key={tp.listingId} delay={(i%3)*70}>
            <div onMouseEnter={()=>setHov(tp.listingId)} onMouseLeave={()=>setHov(null)}
              style={{background:hov===tp.listingId?t.cardHover:t.card,border:`1px solid ${hov===tp.listingId?t.borderStrong:t.border}`,borderRadius:16,overflow:'hidden',transition:'all .2s',transform:hov===tp.listingId?'translateY(-4px)':'none',boxShadow:hov===tp.listingId?`0 16px 40px rgba(0,0,0,${t.dark?.3:.1})`:'none',cursor:'pointer',height:'100%'}}>
              <div style={{position:'relative'}}>
                {React.createElement('image-slot',{id:'etsy-'+tp.listingId, src:(tp.image||window.thumbSrc(tp.th||'report',t)), shape:'rect', fit:'cover', placeholder:L('Arrastra la imagen del producto','Drop product image'), style:{display:'block',width:'100%',height:'150px'}})}
                {tp.badge&&<div style={{position:'absolute',top:10,right:10,background:bcOf(tp)+'D0',color:t.dark?t.ctaText:'#fff',padding:'3px 10px',borderRadius:20,fontSize:10,fontWeight:700,fontFamily:'Plus Jakarta Sans',backdropFilter:'blur(6px)',pointerEvents:'none'}}>{tp.badge[lang]}</div>}
              </div>
              <div style={{padding:'17px 17px 14px'}}>
                <h3 style={{fontSize:15,fontWeight:700,fontFamily:'Plus Jakarta Sans',color:t.text,marginBottom:7,lineHeight:1.3}}>{tp.name[lang]}</h3>
                {tp.desc&&tp.desc[lang]&&<p style={{fontSize:12,color:t.textMuted,lineHeight:1.5,marginBottom:13,fontFamily:'DM Sans'}}>{tp.desc[lang]}</p>}
                <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:13,flexWrap:'wrap'}}>
                  {tp.fmt&&<span style={{fontSize:10.5,fontWeight:700,color:t.textMuted,fontFamily:'Plus Jakarta Sans',background:t.surface,border:`1px solid ${t.border}`,borderRadius:6,padding:'3px 8px'}}>{tp.fmt}</span>}
                  <span style={{fontSize:11,color:t.textFaint,fontFamily:'DM Sans'}}>{L('Descarga instantánea','Instant download')}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
                  <span style={{display:'flex',alignItems:'baseline',gap:7,flexWrap:'wrap'}}>
                    {tp.price!=null
                      ? <span style={{fontSize:21,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text}}>{money(tp.price,tp.currency)}</span>
                      : <span style={{fontSize:13,fontWeight:700,fontFamily:'Plus Jakarta Sans',color:t.textMuted}}>{L('Ver precio en Etsy','See price on Etsy')}</span>}
                    {tp.oldPrice&&<span style={{fontSize:12,color:t.textFaint,textDecoration:'line-through',fontFamily:'DM Mono'}}>{money(tp.oldPrice,tp.currency)}</span>}
                  </span>
                  <a href={(tp.url&&(tp.url[lang]||tp.url.es))||SHOP.url} target="_blank" rel="noopener noreferrer" style={{flexShrink:0,padding:'7px 14px',background:hov===tp.listingId?t.cta:'transparent',border:`1.5px solid ${hov===tp.listingId?t.cta:t.borderStrong}`,borderRadius:8,color:hov===tp.listingId?t.ctaText:t.textMuted,fontSize:12,fontWeight:700,cursor:'pointer',transition:'all .2s',fontFamily:'Plus Jakarta Sans',textDecoration:'none',display:'inline-block'}}>{L('Comprar','Buy')} →</a>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:44}}>
          <a href="https://www.etsy.com/es/shop/EcoInsight?ref=profile_header" target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:8,color:t.accent,fontSize:15,fontWeight:600,fontFamily:'Plus Jakarta Sans',textDecoration:'none'}}>{L('Ver toda la tienda','View the full store')} <span style={{fontSize:18}}>→</span></a>
        </div>
      </div>
    </section>
  );
}
window.EcoMarketplace = EcoMarketplace;

/* ═══ LEAD CAPTURE FORM (no native <form>; controlled + client validation) ═══ */
function EcoLeadForm({t, lang}){
  const L = window.makeL(lang);
  const [f, setF] = React.useState({name:'',email:'',company:'',interest:''});
  const [err, setErr] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const interests = [['huella',L('Huella de carbono','Carbon footprint')],['esg',L('Reporte ESG','ESG report')],['plantillas',L('Plantillas','Templates')]];
  const set = k => e => { const v=e.target.value; setF(p=>({...p,[k]:v})); setErr(p=>({...p,[k]:null})); };
  const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const submit = () => {
    const e={};
    if(!f.name.trim()) e.name=L('Ingresa tu nombre.','Enter your name.');
    if(!f.email.trim()) e.email=L('Ingresa tu email.','Enter your email.');
    else if(!emailOk(f.email)) e.email=L('Email no válido.','Invalid email.');
    if(!f.company.trim()) e.company=L('Ingresa tu empresa.','Enter your company.');
    if(!f.interest) e.interest=L('Selecciona un interés.','Select an interest.');
    setErr(e);
    if(Object.keys(e).length){ const fk=Object.keys(e)[0]; const el=document.getElementById('lead-'+fk); el&&el.focus(); return; }
    // TODO conectar a endpoint/Formspree (p.ej. fetch('https://formspree.io/f/XXXX',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(f)}))
    setSent(true);
  };
  const lab={display:'block',fontSize:10,color:t.textMuted,fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:5,fontFamily:'Plus Jakarta Sans'};
  const inS = e => ({width:'100%',background:t.surface,border:`1px solid ${e?t.critical:t.border}`,color:t.text,borderRadius:9,padding:'11px 12px',fontSize:13.5,fontFamily:'DM Sans',outline:'none',transition:'border-color .2s'});
  const errS={display:'block',fontSize:11,color:t.critical,marginTop:5,fontFamily:'DM Sans'};
  const field = (key,label,kind) => {
    const e=err[key];
    return (
      <div>
        <label htmlFor={'lead-'+key} style={lab}>{label}</label>
        {kind==='select'
          ? <select id={'lead-'+key} value={f[key]} onChange={set(key)} aria-invalid={!!e} aria-describedby={e?'lead-'+key+'-e':undefined} style={{...inS(e),cursor:'pointer'}}>
              <option value="">{L('Selecciona…','Select…')}</option>
              {interests.map(([k,l])=><option key={k} value={k}>{l}</option>)}
            </select>
          : <input id={'lead-'+key} type={kind||'text'} value={f[key]} onChange={set(key)} aria-invalid={!!e} aria-describedby={e?'lead-'+key+'-e':undefined} style={inS(e)}/>}
        {e && <span id={'lead-'+key+'-e'} role="alert" style={errS}>{e}</span>}
      </div>
    );
  };
  return (
    <div style={{marginTop:40,paddingTop:30,borderTop:`1px solid ${t.border}`,maxWidth:580}}>
      {sent ? (
        <div role="status" style={{display:'flex',alignItems:'flex-start',gap:12,background:t.accentDim,border:`1px solid ${t.accent}44`,borderRadius:12,padding:'20px 22px'}}>
          <span style={{flexShrink:0,width:30,height:30,borderRadius:'50%',background:t.accent,color:t.ctaText,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontFamily:'Plus Jakarta Sans'}}>✓</span>
          <div>
            <div style={{fontSize:15,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,marginBottom:3}}>{L('¡Gracias! Te contactaremos pronto.','Thanks! We\u2019ll be in touch soon.')}</div>
            <div style={{fontSize:13,color:t.textMuted,fontFamily:'DM Sans',lineHeight:1.5}}>{L('Hemos recibido tu solicitud sobre EcoInsight.','We\u2019ve received your request about EcoInsight.')}</div>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:t.accent,marginBottom:14,fontFamily:'Plus Jakarta Sans'}}>{L('Habla con un especialista','Talk to a specialist')}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:16}}>
            {field('name', L('Nombre','Name'))}
            {field('email', L('Email corporativo','Work email'),'email')}
            {field('company', L('Empresa','Company'))}
            {field('interest', L('Interés','Interest'),'select')}
          </div>
          <button onClick={submit} style={{background:t.cta,color:t.ctaText,border:'none',borderRadius:10,padding:'13px 26px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'Plus Jakarta Sans'}}>{L('Enviar solicitud','Send request')} →</button>
        </React.Fragment>
      )}
    </div>
  );
}
window.EcoLeadForm = EcoLeadForm;

/* ═══ CLOSING CONVERSION BAND ═══ */
function EcoConversion({t, lang}) {
  const L = window.makeL(lang);
  const props = [
    [L('Listas para usar','Ready to use'), L('Plantillas en Excel, Power BI y PDF, editables y sin código.','Excel, Power BI and PDF templates, editable and no-code.')],
    [L('Estándares reconocidos','Recognized standards'), L('Alineadas con GHG Protocol, GRI, ISO 14064 y TCFD.','Aligned with GHG Protocol, GRI, ISO 14064 and TCFD.')],
    [L('Descarga inmediata','Instant download'), L('Compra en Etsy y recibe los archivos al instante.','Buy on Etsy and get the files instantly.')],
  ];
  return (
    <section style={{background:t.bg,borderTop:`1px solid ${t.border}`,padding:'92px 0'}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:'0 32px'}}>
        <Reveal>
        <div style={{position:'relative',overflow:'hidden',borderRadius:24,border:`1px solid ${t.borderStrong}`,
          background:`radial-gradient(ellipse 70% 120% at 85% 10%, ${t.accent}22 0%, transparent 55%), radial-gradient(ellipse 60% 100% at 10% 90%, ${t.accent2}1A 0%, transparent 50%), ${t.card}`,
          padding:'56px 56px 52px'}}>
          <div style={{maxWidth:680}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:t.accentDim,border:`1px solid ${t.accent}40`,borderRadius:20,padding:'5px 14px',marginBottom:22}}>
              <span style={{color:t.accent,fontSize:11,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',fontFamily:'Plus Jakarta Sans'}}>{L('Tu siguiente paso','Your next step')}</span>
            </div>
            <h2 style={{fontSize:42,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.12,letterSpacing:'-.025em',marginBottom:16}}>
              {L('De la medición a un reporte profesional, hoy mismo.','From measurement to a professional report, today.')}
            </h2>
            <p style={{fontSize:17,color:t.textMuted,lineHeight:1.6,fontFamily:'DM Sans',marginBottom:34,maxWidth:560}}>
              {L('Ya conoces tu huella. Da el siguiente paso con plantillas y reportes ESG listos para implementar, creados por especialistas en sostenibilidad.',
                 'You already know your footprint. Take the next step with ready-to-implement ESG templates and reports built by sustainability specialists.')}
            </p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:38}}>
              {props.map(([h,d],i)=>(
                <div key={i} style={{borderTop:`2px solid ${t.accent}`,paddingTop:13}}>
                  <div style={{fontSize:14,fontWeight:700,color:t.text,fontFamily:'Plus Jakarta Sans',marginBottom:5}}>{h}</div>
                  <div style={{fontSize:12.5,color:t.textMuted,lineHeight:1.5,fontFamily:'DM Sans'}}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:13,flexWrap:'wrap',alignItems:'center'}}>
              <button onClick={()=>{const el=document.querySelector('#marketplace');el&&el.scrollIntoView({behavior:'smooth'});}}
                style={{background:t.cta,color:t.ctaText,border:'none',borderRadius:10,padding:'15px 30px',fontSize:15,fontWeight:700,cursor:'pointer',fontFamily:'Plus Jakarta Sans',letterSpacing:'-.01em',transition:'opacity .2s'}}
                onMouseEnter={e=>e.currentTarget.style.opacity='.82'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                {L('Explorar plantillas','Browse templates')} →
              </button>
              <a href="https://www.etsy.com/es/shop/EcoInsight?ref=profile_header" target="_blank" rel="noopener noreferrer"
                style={{display:'inline-flex',alignItems:'center',gap:8,color:t.text,border:`1.5px solid ${t.borderStrong}`,borderRadius:10,padding:'14px 24px',fontSize:15,fontWeight:600,cursor:'pointer',textDecoration:'none',fontFamily:'Plus Jakarta Sans',transition:'all .2s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.color=t.accent;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=t.borderStrong;e.currentTarget.style.color=t.text;}}>
                {L('Comprar en Etsy','Buy on Etsy')} ↗
              </a>
              <span style={{fontSize:12.5,color:t.textFaint,fontFamily:'DM Sans',display:'flex',alignItems:'center',gap:6}}>
                <span style={{color:t.warning}}>★ 4,0</span> {L('· 12 ventas en Etsy · descarga instantánea','· 12 sales on Etsy · instant download')}
              </span>
            </div>
            <window.EcoLeadForm t={t} lang={lang}/>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
window.EcoConversion = EcoConversion;
