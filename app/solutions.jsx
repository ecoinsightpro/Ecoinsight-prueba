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
                  <a href="#marketplace" onClick={(e)=>{e.preventDefault();setSel(null);const el=document.querySelector('#marketplace');el&&el.scrollIntoView({behavior:'smooth'});}} style={{fontSize:12,fontWeight:700,color:t.accent,fontFamily:'Plus Jakarta Sans',textDecoration:'none',border:`1px solid ${t.accent}44`,borderRadius:8,padding:'7px 13px'}}>{L('Ver plantillas','View templates')} →</a>
                  <a href={(window.ETSY_SHOP&&window.ETSY_SHOP.url)||'https://www.etsy.com/es/shop/EcoInsight'} target="_blank" rel="noopener noreferrer" onClick={()=>{setSel(null);}} style={{fontSize:12,fontWeight:700,color:t.textMuted,fontFamily:'Plus Jakarta Sans',textDecoration:'none',border:`1px solid ${t.border}`,borderRadius:8,padding:'7px 13px'}}>{L('Comprar en Etsy','Buy on Etsy')} ↗</a>
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
// Prueba social: ocúltala hasta tener suficientes ventas/reseñas. Cambia a true para reactivarla.
const SHOW_RATING = false;

/* Grouped product card: one product, ES/EN edition toggle (switches Etsy link + ficha
   language) and an editable mini-gallery of interior screenshots. */
function EcoProductCard({variants, t, lang, money, shopUrl}){
  const es = variants.find(v=>v.edition==='es');
  const en = variants.find(v=>v.edition==='en');
  const hasToggle = !!(es && en);
  const base = es || variants[0];
  const [cardLang, setCardLang] = React.useState(lang);
  const [hov, setHov] = React.useState(false);
  React.useEffect(()=>{ setCardLang(lang); }, [lang]);
  const TL = (a,b)=> cardLang==='en'? b : a;
  const edition = hasToggle ? (cardLang==='en'?en:es) : base;
  const buyUrl = (edition.url && (edition.url[cardLang]||edition.url.es||edition.url.en)) || shopUrl;
  const bc = t[base.bc] || t.accent;
  const slotBase = base.group || base.listingId;
  const name = (base.name && (base.name[cardLang]||base.name.es)) || '';
  const desc = base.desc && (base.desc[cardLang]||base.desc.es);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?t.cardHover:t.card,border:`1px solid ${hov?t.borderStrong:t.border}`,borderRadius:16,overflow:'hidden',transition:'all .2s',transform:hov?'translateY(-4px)':'none',boxShadow:hov?`0 16px 40px rgba(0,0,0,${t.dark?.3:.1})`:'none',height:'100%',display:'flex',flexDirection:'column'}}>
      {/* editable mini-gallery */}
      <div style={{position:'relative',padding:10,display:'flex',flexDirection:'column',gap:8}}>
        <div style={{position:'relative',borderRadius:11,overflow:'hidden'}}>
          {React.createElement('image-slot',{id:'shot-'+slotBase+'-1', src:((base.shots&&base.shots[0])||base.image||window.thumbSrc(base.th||'report',t)), shape:'rect', fit:'cover', placeholder:TL('Captura principal','Cover screenshot'), style:{display:'block',width:'100%',height:'176px'}})}
          {base.badge&&<div style={{position:'absolute',top:10,right:10,background:bc+'D0',color:t.dark?t.ctaText:'#fff',padding:'3px 10px',borderRadius:20,fontSize:10,fontWeight:700,fontFamily:'Plus Jakarta Sans',backdropFilter:'blur(6px)',pointerEvents:'none'}}>{base.badge[cardLang]||base.badge.es}</div>}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {['2','3'].map((nn,ix)=>(
            <div key={nn} style={{borderRadius:9,overflow:'hidden'}}>
              {React.createElement('image-slot',{id:'shot-'+slotBase+'-'+nn, src:(base.shots&&base.shots[ix+1])||undefined, shape:'rect', fit:'cover', placeholder:TL('Captura interior','Interior screenshot'), style:{display:'block',width:'100%',height:'90px'}})}
            </div>
          ))}
        </div>
      </div>
      {/* body */}
      <div style={{padding:'6px 17px 16px',display:'flex',flexDirection:'column',flex:1}}>
        <h3 style={{fontSize:16,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,marginBottom:7,lineHeight:1.3}}>{name}</h3>
        {desc&&<p style={{fontSize:12.5,color:t.textMuted,lineHeight:1.55,marginBottom:13,fontFamily:'DM Sans'}}>{desc}</p>}
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14,flexWrap:'wrap'}}>
          {base.fmt&&<span style={{fontSize:10.5,fontWeight:700,color:t.textMuted,fontFamily:'Plus Jakarta Sans',background:t.surface,border:`1px solid ${t.border}`,borderRadius:6,padding:'3px 8px'}}>{base.fmt}</span>}
          {hasToggle && (
            <div role="group" aria-label={TL('Idioma de la plantilla','Template language')} style={{display:'inline-flex',alignItems:'center',gap:2,background:t.surface,border:`1px solid ${t.border}`,borderRadius:20,padding:2,marginLeft:'auto'}}>
              {[['es','ES'],['en','EN']].map(([code,lbl])=>(
                <button key={code} onClick={()=>setCardLang(code)} aria-pressed={cardLang===code} aria-label={code==='es'?'Español':'English'}
                  style={{border:'none',cursor:'pointer',fontFamily:'Plus Jakarta Sans',fontWeight:700,fontSize:11,padding:'4px 11px',borderRadius:16,transition:'all .18s',background:cardLang===code?t.accent:'transparent',color:cardLang===code?t.ctaText:t.textMuted}}>{lbl}</button>
              ))}
            </div>
          )}
        </div>
        <div style={{marginTop:'auto',display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
          <span style={{display:'flex',alignItems:'baseline',gap:7,flexWrap:'wrap'}}>
            {base.price!=null
              ? <span style={{fontSize:22,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text}}>{money(base.price,base.currency)}</span>
              : <span style={{fontSize:13,fontWeight:700,fontFamily:'Plus Jakarta Sans',color:t.textMuted}}>{TL('Ver precio en Etsy','See price on Etsy')}</span>}
            {base.oldPrice&&<span style={{fontSize:12,color:t.textFaint,textDecoration:'line-through',fontFamily:'DM Mono'}}>{money(base.oldPrice,base.currency)}</span>}
          </span>
          <a href={buyUrl} target="_blank" rel="noopener noreferrer" style={{flexShrink:0,padding:'9px 17px',background:t.cta,border:`1.5px solid ${t.cta}`,borderRadius:8,color:t.ctaText,fontSize:12.5,fontWeight:700,cursor:'pointer',transition:'all .2s',fontFamily:'Plus Jakarta Sans',textDecoration:'none',display:'inline-block'}}>{TL('Comprar','Buy')} →</a>
        </div>
        <div style={{fontSize:10.5,color:t.textFaint,fontFamily:'DM Sans',marginTop:8}}>{hasToggle?TL('Descarga en español · pago seguro en Etsy','Download in English · secure payment on Etsy'):TL('Descarga instantánea · pago seguro en Etsy','Instant download · secure payment on Etsy')}</div>
      </div>
    </div>
  );
}
window.EcoProductCard = EcoProductCard;

function EcoMarketplace({t, lang}) {
  const L = window.makeL(lang);
  const [cat, setCat] = React.useState('todos');
  const [hov, setHov] = React.useState(null);
  const [live, setLive] = React.useState(null);
  const [sync, setSync] = React.useState('loading'); // loading | live | catalog
  const [lastSync, setLastSync] = React.useState(()=>parseInt(localStorage.getItem('ei_etsy_sync')||'0',10)||0);
  const [, force] = React.useReducer(x=>x+1, 0);
  const CATALOG = window.ETSY_PRODUCTS || [];
  const SHOP = window.ETSY_SHOP || {name:'EcoInsight', url:'https://www.etsy.com/es/shop/EcoInsight'};

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
  // AUTO-UPDATE: revisa precios/productos cada 4 horas (y al volver a la pestaña)
  React.useEffect(()=>{
    const CYCLE=4*3600*1000; // 4 h
    const chk=()=>{ const last=parseInt(localStorage.getItem('ei_etsy_sync')||'0',10)||0, now=Date.now(); if(now-last>CYCLE) load(true); };
    const iv=setInterval(chk,60000); const ov=()=>{ if(document.visibilityState==='visible') chk(); };
    document.addEventListener('visibilitychange',ov);
    return ()=>{ clearInterval(iv); document.removeEventListener('visibilitychange',ov); };
  }, [load]);
  React.useEffect(()=>{ const i=setInterval(force,1000); return ()=>clearInterval(i); }, []);

  // Merge live data over the bundled catalog. Known listings are refined (trusted
  // curated name/desc/price stay, live price/image update); any live listing that isn't
  // in the catalog is rendered as its OWN card, so the FULL Etsy shop is displayed.
  // Canonical-id mapping prevents a language/variant listing id from spawning a duplicate.
  const products = React.useMemo(()=>{
    // map every known id (listingId + any id embedded in url.es/url.en) -> canonical listingId
    const variantToCanonical = {};
    CATALOG.forEach(p=>{
      variantToCanonical[p.listingId] = p.listingId;
      [p.url&&p.url.es, p.url&&p.url.en].forEach(u=>{
        const m = u && u.match(/\/listing\/(\d+)/);
        if(m) variantToCanonical[m[1]] = p.listingId;
      });
    });
    const refinements = {}; // canonical listingId -> {price, oldPrice, image, currency}
    const extras = [];      // live-only listings not in the curated catalog
    const extraSeen = new Set();
    const toCur = cr => (cr==='USD'||cr==='$')?'USD':cr==='\u00a3'?'GBP':(cr||'EUR');
    if(live && live.length){
      live.forEach(lp=>{
        const canon = variantToCanonical[lp.listingId];
        if(canon){
          const r = refinements[canon] || {};
          if(lp.price!=null) r.price = lp.price;
          if(lp.oldPrice!=null) r.oldPrice = lp.oldPrice;
          if(lp.image) r.image = lp.image;
          if(lp.currencyRaw) r.currency = toCur(lp.currencyRaw);
          refinements[canon] = r;
        } else {
          if(extraSeen.has(lp.listingId)) return;
          extraSeen.add(lp.listingId);
          const title = (lp.title&&typeof lp.title==='object') ? lp.title : {es:lp.title||'', en:lp.title||''};
          extras.push({
            listingId: lp.listingId,
            name: title,
            desc: (lp.desc&&typeof lp.desc==='object') ? lp.desc : null,
            url: (lp.url&&typeof lp.url==='object') ? lp.url : {es:lp.url||'', en:lp.url||''},
            image: lp.image||null,
            price: lp.price!=null?lp.price:null,
            oldPrice: lp.oldPrice!=null?lp.oldPrice:null,
            currency: toCur(lp.currencyRaw),
            fmt: lp.fmt||'', th:'report', bc:'accent', cat: lp.cat||'',
          });
        }
      });
    }
    // curated catalog first (trusted), then any additional live listings
    const curated = CATALOG.map(p=>{
      const r = refinements[p.listingId];
      return r ? { ...p, ...r } : { ...p };
    });
    return [...curated, ...extras];
  }, [live]);

  const bcOf = p => t[p.bc] || t.accent;
  const money = (x,c)=> x.toLocaleString(lang==='en'?(c==='USD'?'en-US':'en-IE'):(c==='USD'?'en-US':'es-ES'),{style:'currency',currency:c||'EUR'});
  const CATS=[['todos',L('Todos','All')],['ofertas',L('Ofertas','Deals')],['excel','Excel'],['powerbi','Power BI']];
  // group ES/EN editions of the same product into a single card
  const groups = React.useMemo(()=>{
    const map = new Map();
    products.forEach(p=>{ const k=p.group||p.listingId; if(!map.has(k)) map.set(k,[]); map.get(k).push(p); });
    return Array.from(map.values());
  }, [products]);
  const sinceTxt = (()=>{ if(!lastSync) return ''; const s=Math.max(0,Math.floor((Date.now()-lastSync)/1000)); return s<60?(L('hace ','')+s+'s'+(lang==='en'?' ago':'')):s<3600?(L('hace ','')+Math.floor(s/60)+' min'+(lang==='en'?' ago':'')):(L('hace ','')+Math.floor(s/3600)+' h'+(lang==='en'?' ago':'')); })();
  return (
    <section id="marketplace" style={{background:t.surface,padding:'96px 0',borderTop:`1px solid ${t.border}`,scrollMarginTop:84}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:'0 32px'}}>
        <Reveal>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:44,flexWrap:'wrap',gap:22}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:t.accent2Dim,border:`1px solid ${t.accent2}35`,borderRadius:20,padding:'5px 14px',marginBottom:18}}>
              <span style={{color:t.accent2,fontSize:11,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',fontFamily:'Plus Jakarta Sans',whiteSpace:'nowrap'}}>{L('Catálogo · Tienda Etsy','Catalog · Etsy Store')}</span>
            </div>
            <h2 style={{fontSize:44,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.1,marginBottom:12,letterSpacing:'-.022em'}}>{L('Plantillas y reportes','Ready-to-use')}<br/>{L('listos para usar','templates & reports')}</h2>
            <p style={{fontSize:17,color:t.textMuted,lineHeight:1.6,fontFamily:'DM Sans'}}>{L('Herramientas profesionales de huella de carbono y ESG en Excel, Power BI y PDF — descarga instantánea, pago seguro y sin código.','Professional carbon-footprint and ESG tools in Excel, Power BI & PDF — instant download, secure payment and no code.')}</p>
            <div style={{display:'inline-flex',alignItems:'center',gap:10,marginTop:14,fontSize:12.5,color:t.textMuted,fontFamily:'DM Sans',flexWrap:'wrap'}}>
              {SHOW_RATING && <React.Fragment>
                <span style={{color:t.warning,fontWeight:700,fontFamily:'Plus Jakarta Sans'}}>{L('★ 4,0','★ 4.0')}</span>
                <span style={{width:3,height:3,borderRadius:'50%',background:t.textFaint}}/>
                <span>{L('12 ventas en Etsy','12 sales on Etsy')}</span>
                <span style={{width:3,height:3,borderRadius:'50%',background:t.textFaint}}/>
              </React.Fragment>}
              <span>{L('Descarga instantánea · pago seguro en Etsy','Instant download · secure payment on Etsy')}</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginTop:13,flexWrap:'wrap'}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:7,fontSize:11.5,fontFamily:'DM Mono',color:t.textMuted,background:t.card,border:`1px solid ${t.border}`,borderRadius:20,padding:'4px 11px'}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:sync==='live'?t.positive:sync==='loading'?t.warning:t.textFaint,display:'inline-block',animation:sync==='loading'?'pulse 1s infinite':'pulse 2.4s infinite'}}/>
                {sync==='live'?L('Sincronizado con Etsy','Synced with Etsy'):sync==='loading'?L('Sincronizando…','Syncing…'):L('Catálogo verificado','Verified catalog')}
              </span>
              <span style={{fontSize:10.5,color:t.textFaint,fontFamily:'DM Sans'}}>· {L('precios revisados cada 4 horas','prices checked every 4 hours')}</span>
              {lastSync>0 && <span style={{fontSize:10.5,color:t.textFaint,fontFamily:'DM Sans'}}>· {L('actualizado ','updated ')}{sinceTxt}</span>}
              <button onClick={()=>load(false)} title={L('Actualizar desde Etsy','Refresh from Etsy')}
                style={{display:'inline-flex',alignItems:'center',gap:5,background:'transparent',border:`1px solid ${t.border}`,color:t.textMuted,fontSize:11,fontWeight:700,fontFamily:'Plus Jakarta Sans',borderRadius:20,padding:'4px 12px',cursor:'pointer',transition:'all .18s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.color=t.accent;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.color=t.textMuted;}}>↻ {L('Actualizar','Refresh')}</button>
            </div>
          </div>
        </div>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(330px,1fr))',gap:22}}>
          {groups.map((variants,i)=>(
            <Reveal key={variants[0].group||variants[0].listingId} delay={(i%3)*70}>
              <EcoProductCard variants={variants} t={t} lang={lang} money={money} shopUrl={SHOP.url}/>
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
// ⚠️ Pega aquí tu endpoint de Formspree (https://formspree.io/ → New form).
const FORMSPREE_URL = "https://formspree.io/f/TU_ID_AQUI";
function EcoLeadForm({t, lang}){
  const L = window.makeL(lang);
  const [f, setF] = React.useState({name:'',email:'',company:'',interest:''});
  const [err, setErr] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const interests = [['huella',L('Huella de carbono','Carbon footprint')],['esg',L('Reporte ESG','ESG report')],['plantillas',L('Plantillas','Templates')]];
  const set = k => e => { const v=e.target.value; setF(p=>({...p,[k]:v})); setErr(p=>({...p,[k]:null})); setFailed(false); };
  const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const submit = async () => {
    const e={};
    if(!f.name.trim()) e.name=L('Ingresa tu nombre.','Enter your name.');
    if(!f.email.trim()) e.email=L('Ingresa tu email.','Enter your email.');
    else if(!emailOk(f.email)) e.email=L('Email no válido.','Invalid email.');
    if(!f.company.trim()) e.company=L('Ingresa tu empresa.','Enter your company.');
    if(!f.interest) e.interest=L('Selecciona un interés.','Select an interest.');
    setErr(e);
    if(Object.keys(e).length){ const fk=Object.keys(e)[0]; const el=document.getElementById('lead-'+fk); el&&el.focus(); return; }
    setFailed(false); setSending(true);
    try{
      const interestLbl = (interests.find(([k])=>k===f.interest)||[])[1] || f.interest;
      const r = await fetch(FORMSPREE_URL, {
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({ name:f.name, email:f.email, company:f.company, interest:interestLbl, _subject:'EcoInsight — nueva solicitud de especialista' })
      });
      if(r.ok){ setSent(true); }
      else { setFailed(true); }
    }catch(err){ setFailed(true); }
    finally{ setSending(false); }
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
          {failed && <div role="alert" style={{display:'flex',alignItems:'flex-start',gap:10,background:t.critical+'15',border:`1px solid ${t.critical}44`,borderRadius:10,padding:'12px 14px',marginBottom:14,fontSize:13,color:t.text,fontFamily:'DM Sans',lineHeight:1.5}}>
            <span style={{color:t.critical,fontWeight:800}}>!</span>
            <span>{L('No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo, o escríbenos directamente.','We couldn’t send your request. Check your connection and try again, or contact us directly.')}</span>
          </div>}
          <button onClick={submit} disabled={sending} aria-busy={sending} style={{background:t.cta,color:t.ctaText,border:'none',borderRadius:10,padding:'13px 26px',fontSize:14,fontWeight:700,cursor:sending?'default':'pointer',opacity:sending?.7:1,fontFamily:'Plus Jakarta Sans'}}>{sending? L('Enviando…','Sending…') : <React.Fragment>{L('Enviar solicitud','Send request')} →</React.Fragment>}</button>
        </React.Fragment>
      )}
    </div>
  );
}
window.EcoLeadForm = EcoLeadForm;

/* ═══ FAQ — accesible (teclado + ARIA) ═══ */
const FAQ_ITEMS = [
  {q:['¿Puedo usarla con mis propios clientes?','Can I use it with my own clients?'],
   a:['Sí. La licencia permite uso profesional ilimitado: puedes aplicarla en todos los proyectos de tus clientes, rebrandear el reporte con la identidad de tu consultora y reutilizarla año tras año. La única restricción es no revender ni redistribuir el archivo como producto propio.',
      'Yes. The licence allows unlimited professional use: you can apply it across all your client projects, re-brand the report with your firm’s identity and reuse it year after year. The only restriction is not reselling or redistributing the file as your own product.']},
  {q:['¿De dónde vienen los factores de emisión?','Where do the emission factors come from?'],
   a:['De fuentes oficiales referenciadas en la propia hoja de factores: IPCC 2006 para combustión y refrigerantes, y DEFRA 2024 para electricidad, transporte, bienes y residuos. La estructura sigue el GHG Protocol Corporate Standard.',
      'From official sources referenced in the factors sheet itself: IPCC 2006 for combustion and refrigerants, and DEFRA 2024 for electricity, transport, goods and waste. The structure follows the GHG Protocol Corporate Standard.']},
  {q:['¿Qué incluye la plantilla?','What does the template include?'],
   a:['Un archivo Excel de 6 hojas (y dashboard en Power BI según el producto) con 52 fuentes de emisión seleccionables, cálculo automático por alcance y categoría, KPI de intensidad, seguimiento mensual de enero a diciembre y un manual de uso en PDF de 12 páginas.',
      'A 6-sheet Excel file (and a Power BI dashboard depending on the product) with 52 selectable emission sources, automatic calculation by scope and category, an intensity KPI, monthly tracking from January to December and a 12-page PDF user manual.']},
  {q:['¿Cómo la recibo?','How do I receive it?'],
   a:['La compra se hace en Etsy con pago seguro y descarga instantánea: recibes los archivos apenas se confirma el pago.',
      'The purchase is made on Etsy with secure payment and instant download: you get the files as soon as payment is confirmed.']},
  {q:['¿Necesito Power BI?','Do I need Power BI?'],
   a:['Para las plantillas de Excel no, basta con Microsoft Excel. Los productos con dashboard requieren Power BI Desktop, que es gratuito.',
      'For the Excel templates no — Microsoft Excel is enough. Products with a dashboard require Power BI Desktop, which is free.']},
  {q:['¿Sirve para mi industria?','Does it work for my industry?'],
   a:['Sí. GHG Protocol aplica a cualquier rubro; las plantillas sirven para minería, construcción, agroindustria, energía y servicios, entre otros.',
      'Yes. The GHG Protocol applies to any sector; the templates work for mining, construction, agribusiness, energy and services, among others.']},
  {q:['¿Puedo editarla?','Can I edit it?'],
   a:['Totalmente. Son plantillas 100% editables: ajustas actividades, factores y periodos según tu operación. También ofrecemos personalización a medida si necesitas factores de tu país o sector, fuentes adicionales o el formato de reporte de tu consultora.',
      'Absolutely. They are 100% editable templates: you adjust activities, factors and periods to fit your operation. We also offer custom work if you need country- or sector-specific factors, additional sources or your firm’s report format.']},
  {q:['¿Está en español?','Is it in Spanish?'],
   a:['Sí, hay versiones en español e inglés de cada plantilla.',
      'Yes, there are Spanish and English versions of each template.']},
];
function EcoFAQ({t, lang}){
  const L = window.makeL(lang);
  const [open, setOpen] = React.useState(0);
  const refs = React.useRef([]);
  const onKey = (e,i) => {
    const n=FAQ_ITEMS.length; let j=null;
    if(e.key==='ArrowDown'){j=(i+1)%n;} else if(e.key==='ArrowUp'){j=(i-1+n)%n;}
    else if(e.key==='Home'){j=0;} else if(e.key==='End'){j=n-1;}
    if(j!==null){ e.preventDefault(); refs.current[j] && refs.current[j].focus(); }
  };
  return (
    <section id="faq" style={{background:t.bg,borderTop:`1px solid ${t.border}`,padding:'92px 0'}}>
      <div style={{maxWidth:820,margin:'0 auto',padding:'0 32px'}}>
        <Reveal>
        <div style={{textAlign:'center',marginBottom:44}}>
          <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',color:t.accent,marginBottom:14,fontFamily:'Plus Jakarta Sans'}}>{L('Preguntas frecuentes','FAQ')}</div>
          <h2 style={{fontSize:40,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.12,letterSpacing:'-.022em'}}>{L('Todo lo que necesitas saber antes de comprar','Everything you need to know before buying')}</h2>
        </div>
        </Reveal>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {FAQ_ITEMS.map((it,i)=>{
            const isOpen = open===i;
            const num = String(i+1).padStart(2,'0');
            return (
              <Reveal key={i} delay={(i%3)*60}>
              <div style={{background:isOpen?t.cardHover:t.card,border:`1px solid ${isOpen?t.accent+'66':t.border}`,borderRadius:14,overflow:'hidden',transition:'background .22s,border-color .22s',boxShadow:isOpen?`0 10px 30px rgba(0,0,0,${t.dark?.28:.07})`:'none'}}>
                <h3 style={{margin:0}}>
                  <button ref={el=>refs.current[i]=el} id={'faq-btn-'+i} aria-expanded={isOpen} aria-controls={'faq-panel-'+i}
                    onClick={()=>setOpen(isOpen?-1:i)} onKeyDown={e=>onKey(e,i)}
                    onMouseEnter={e=>{if(!isOpen)e.currentTarget.style.background=t.surface}} onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}
                    style={{width:'100%',display:'flex',alignItems:'center',gap:16,textAlign:'left',background:'transparent',border:'none',cursor:'pointer',padding:'20px 22px',fontFamily:'Plus Jakarta Sans',fontSize:16.5,fontWeight:700,color:t.text,transition:'background .2s'}}>
                    <span aria-hidden="true" style={{flexShrink:0,fontSize:12.5,fontWeight:700,fontFamily:'DM Mono,monospace',color:isOpen?t.accent:t.textFaint,width:22,transition:'color .22s'}}>{num}</span>
                    <span style={{lineHeight:1.4,flex:1}}>{it.q[lang==='en'?1:0]}</span>
                    <span aria-hidden="true" style={{flexShrink:0,width:28,height:28,borderRadius:8,background:isOpen?t.accent:t.surface,border:`1px solid ${isOpen?t.accent:t.borderStrong}`,color:isOpen?t.ctaText:t.textMuted,display:'inline-flex',alignItems:'center',justifyContent:'center',transition:'all .22s'}}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{transform:isOpen?'rotate(180deg)':'none',transition:'transform .26s cubic-bezier(.16,1,.3,1)'}}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </button>
                </h3>
                <div id={'faq-panel-'+i} role="region" aria-labelledby={'faq-btn-'+i} aria-hidden={!isOpen}
                  style={{display:'grid',gridTemplateRows:isOpen?'1fr':'0fr',transition:'grid-template-rows .3s cubic-bezier(.4,0,.2,1)'}}>
                  <div style={{overflow:'hidden'}}>
                    <p style={{margin:'0 22px 22px 60px',fontSize:14.5,lineHeight:1.7,color:t.textMuted,fontFamily:'DM Sans',textWrap:'pretty'}}>{it.a[lang==='en'?1:0]}</p>
                  </div>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
window.EcoFAQ = EcoFAQ;

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
              <span style={{color:t.accent,fontSize:11,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',fontFamily:'Plus Jakarta Sans'}}>{L('Por qué EcoInsight','Why EcoInsight')}</span>
            </div>
            <h2 style={{fontSize:42,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.12,letterSpacing:'-.025em',marginBottom:16}}>
              {L('Reportes de sostenibilidad profesionales, sin empezar de cero.','Professional sustainability reporting, without starting from scratch.')}
            </h2>
            <p style={{fontSize:17,color:t.textMuted,lineHeight:1.6,fontFamily:'DM Sans',marginBottom:34,maxWidth:560}}>
              {L('Plantillas y reportes ESG listos para implementar, creados por especialistas en sostenibilidad. Mide tu huella, cumple los estándares y presenta resultados en horas, no semanas.',
                 'Ready-to-implement ESG templates and reports built by sustainability specialists. Measure your footprint, meet the standards and present results in hours, not weeks.')}
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
