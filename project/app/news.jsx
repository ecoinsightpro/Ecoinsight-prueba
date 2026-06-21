/* ═══════════════════════════════════════════════════════════
   EcoInsight · NEWS center + ARTICLE reader
   ═══════════════════════════════════════════════════════════ */

/* editorial thumbnails (abstract, theme-aware) */
window.NewsThumb = function NewsThumb({t, th, h=150}) {
  const [a,b,w,bg,brd] = [t.accent,t.accent2,t.warning,t.dark?t.surface:t.card,t.border];
  const map = {
    carbon:<svg viewBox="0 0 200 116" style={{width:'100%',height:'100%'}}><rect width="200" height="116" fill={bg}/><circle cx="138" cy="60" r="35" fill="none" stroke={brd} strokeWidth="14"/><circle cx="138" cy="60" r="35" fill="none" stroke={a} strokeWidth="14" strokeDasharray="88 132" strokeLinecap="round" transform="rotate(-90 138 60)"/><circle cx="138" cy="60" r="35" fill="none" stroke={b} strokeWidth="14" strokeDasharray="55 165" strokeDashoffset="-88" strokeLinecap="round" transform="rotate(-90 138 60)"/>{[0,1,2,3,4,5].map(i=><rect key={i} x={12} y={14+i*15} width={66+i*2} height={7} rx={3} fill={brd} opacity={.52+i*.06}/>)}</svg>,
    esg:<svg viewBox="0 0 200 116" style={{width:'100%',height:'100%'}}><rect width="200" height="116" fill={bg}/><rect x={12} y={14} width={82} height={7} rx={3} fill={a} opacity={.7}/>{[0,1,2,3,4].map(i=><g key={i}><rect x={22+i*34} y={84-i*10} width={13} height={24+i*10} rx={3} fill={a} opacity={.75}/><rect x={37+i*34} y={94-i*6} width={11} height={14+i*6} rx={3} fill={b} opacity={.65}/></g>)}<line x1={12} y1={108} x2={188} y2={108} stroke={brd} strokeWidth={1}/></svg>,
    inventory:<svg viewBox="0 0 200 116" style={{width:'100%',height:'100%'}}><rect width="200" height="116" fill={bg}/><rect x={12} y={12} width={176} height={12} rx={3} fill={a} opacity={.18}/>{[0,1,2,3,4,5,6].map(i=><g key={i} transform={`translate(0,${30+i*11})`}><rect x={12} y={0} width={50} height={6} rx={2} fill={brd} opacity={.65}/><rect x={72} y={0} width={26} height={6} rx={2} fill={a} opacity={.3+i*.07}/><rect x={110} y={0} width={26} height={6} rx={2} fill={b} opacity={.38}/><rect x={148} y={0} width={40} height={6} rx={2} fill={brd} opacity={.45}/></g>)}</svg>,
    plan:<svg viewBox="0 0 200 116" style={{width:'100%',height:'100%'}}><rect width="200" height="116" fill={bg}/><rect x={12} y={12} width={88} height={8} rx={3} fill={a} opacity={.68}/><line x1={30} y1={30} x2={30} y2={106} stroke={brd} strokeWidth={2}/>{[0,1,2,3,4].map(i=><g key={i} transform={`translate(0,${32+i*15})`}><circle cx={30} cy={0} r={5} fill={i<2?a:brd} opacity={i<2?.88:.38}/><rect x={44} y={-4} width={84-i*8} height={8} rx={3} fill={i<2?a:brd} opacity={i<2?.28:.18}/></g>)}</svg>,
    lcv:<svg viewBox="0 0 200 116" style={{width:'100%',height:'100%'}}><rect width="200" height="116" fill={bg}/><circle cx={100} cy={60} r={36} fill="none" stroke={brd} strokeWidth={1}/>{[[a,66,143,0],[b,46,163,-66],[w,36,173,-112]].map(([col,d,tot,off],i)=><circle key={i} cx={100} cy={60} r={36} fill="none" stroke={col} strokeWidth={3} strokeDasharray={`${d} ${tot}`} strokeDashoffset={off} strokeLinecap="round" transform="rotate(-90 100 60)" opacity={.88}/>)}{[0,1,2,3].map(i=>{const ang=(i*90-90)*Math.PI/180;return <circle key={i} cx={100+36*Math.cos(ang)} cy={60+36*Math.sin(ang)} r={5} fill={bg} stroke={a} strokeWidth={2}/>;})}</svg>,
    report:<svg viewBox="0 0 200 116" style={{width:'100%',height:'100%'}}><rect width="200" height="116" fill={bg}/><rect x={12} y={12} width={176} height={34} rx={5} fill={a} opacity={.1}/><rect x={20} y={18} width={72} height={9} rx={3} fill={a} opacity={.78}/><rect x={20} y={31} width={100} height={5} rx={2} fill={brd}/><rect x={20} y={40} width={72} height={4} rx={2} fill={brd} opacity={.5}/><rect x={12} y={54} width={80} height={50} rx={4} fill={brd} opacity={.28}/><rect x={100} y={54} width={88} height={22} rx={3} fill={brd} opacity={.48}/><rect x={100} y={82} width={88} height={8} rx={3} fill={a} opacity={.18}/><rect x={100} y={96} width={55} height={5} rx={2} fill={brd} opacity={.38}/></svg>,
  };
  return <div style={{width:'100%',height:h,overflow:'hidden'}}>{map[th]||map.esg}</div>;
};

/* SVG fallback as data-URL — keeps cards looking designed until a real image is dropped */
window.thumbSrc = function(th, t){
  const bg=t.dark?t.surface:t.card, a=t.accent, b=t.accent2, w=t.warning, brd=t.border;
  const bars=(x,y,n)=>{let s='';for(let i=0;i<n;i++){s+=`<rect x='${x}' y='${y+i*15}' width='${66+i*2}' height='7' rx='3' fill='${brd}' fill-opacity='${.5+i*.06}'/>`;}return s;};
  const inner={
    carbon:`<circle cx='138' cy='60' r='35' fill='none' stroke='${brd}' stroke-width='14'/><circle cx='138' cy='60' r='35' fill='none' stroke='${a}' stroke-width='14' stroke-dasharray='88 132' stroke-linecap='round' transform='rotate(-90 138 60)'/><circle cx='138' cy='60' r='35' fill='none' stroke='${b}' stroke-width='14' stroke-dasharray='55 165' stroke-dashoffset='-88' stroke-linecap='round' transform='rotate(-90 138 60)'/>${bars(12,14,6)}`,
    esg:`<rect x='12' y='14' width='82' height='7' rx='3' fill='${a}' fill-opacity='.7'/>`+[0,1,2,3,4].map(i=>`<rect x='${22+i*34}' y='${84-i*10}' width='13' height='${24+i*10}' rx='3' fill='${a}' fill-opacity='.75'/><rect x='${37+i*34}' y='${94-i*6}' width='11' height='${14+i*6}' rx='3' fill='${b}' fill-opacity='.65'/>`).join('')+`<line x1='12' y1='108' x2='188' y2='108' stroke='${brd}'/>`,
    inventory:`<rect x='12' y='12' width='176' height='12' rx='3' fill='${a}' fill-opacity='.18'/>`+[0,1,2,3,4,5,6].map(i=>`<g transform='translate(0,${30+i*11})'><rect x='12' width='50' height='6' rx='2' fill='${brd}' fill-opacity='.65'/><rect x='72' width='26' height='6' rx='2' fill='${a}' fill-opacity='${.3+i*.07}'/><rect x='110' width='26' height='6' rx='2' fill='${b}' fill-opacity='.38'/><rect x='148' width='40' height='6' rx='2' fill='${brd}' fill-opacity='.45'/></g>`).join(''),
    plan:`<rect x='12' y='12' width='88' height='8' rx='3' fill='${a}' fill-opacity='.68'/><line x1='30' y1='30' x2='30' y2='106' stroke='${brd}' stroke-width='2'/>`+[0,1,2,3,4].map(i=>`<g transform='translate(0,${32+i*15})'><circle cx='30' r='5' fill='${i<2?a:brd}' fill-opacity='${i<2?.88:.38}'/><rect x='44' y='-4' width='${84-i*8}' height='8' rx='3' fill='${i<2?a:brd}' fill-opacity='${i<2?.28:.18}'/></g>`).join(''),
    lcv:`<circle cx='100' cy='60' r='36' fill='none' stroke='${brd}'/>`+[[a,66,143,0],[b,46,163,-66],[w,36,173,-112]].map(([col,d,tot,off])=>`<circle cx='100' cy='60' r='36' fill='none' stroke='${col}' stroke-width='3' stroke-dasharray='${d} ${tot}' stroke-dashoffset='${off}' stroke-linecap='round' transform='rotate(-90 100 60)' opacity='.88'/>`).join(''),
    report:`<rect x='12' y='12' width='176' height='34' rx='5' fill='${a}' fill-opacity='.1'/><rect x='20' y='18' width='72' height='9' rx='3' fill='${a}' fill-opacity='.78'/><rect x='20' y='31' width='100' height='5' rx='2' fill='${brd}'/><rect x='20' y='40' width='72' height='4' rx='2' fill='${brd}' fill-opacity='.5'/><rect x='12' y='54' width='80' height='50' rx='4' fill='${brd}' fill-opacity='.28'/><rect x='100' y='54' width='88' height='22' rx='3' fill='${brd}' fill-opacity='.48'/><rect x='100' y='82' width='88' height='8' rx='3' fill='${a}' fill-opacity='.18'/><rect x='100' y='96' width='55' height='5' rx='2' fill='${brd}' fill-opacity='.38'/>`,
  };
  const s=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 116' preserveAspectRatio='xMidYMid slice'><rect width='200' height='116' fill='${bg}'/>${inner[th]||inner.esg}</svg>`;
  return 'data:image/svg+xml,'+encodeURIComponent(s);
};

/* fillable news image — drop the real photo, persists; SVG motif as default */
window.NewsImg = function NewsImg({t, lang, a, h}){
  const L = window.makeL(lang);
  return React.createElement('image-slot', {
    id:'news-'+a.id, src:(a.image||window.thumbSrc(a.th,t)), shape:'rect', fit:'cover',
    placeholder:L('Arrastra la imagen','Drop image'),
    style:{display:'block',width:'100%',height:h+'px'}
  });
};

/* outbound source link (or plain text when no public URL) */
window.SourceLink = function SourceLink({a, t, size=11, extra}){
  const txt = a.src + (extra?` · ${extra}`:'');
  if(!a.url || a.url==='#') return <span style={{fontSize:size,color:t.textFaint,fontFamily:'DM Sans',fontWeight:600}}>{txt}</span>;
  return <a href={a.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
    style={{fontSize:size,color:t.textFaint,fontFamily:'DM Sans',fontWeight:600,textDecoration:'none',borderBottom:`1px dotted ${t.borderStrong}`,transition:'color .18s'}}
    onMouseEnter={e=>e.currentTarget.style.color=t.accent} onMouseLeave={e=>e.currentTarget.style.color=t.textFaint}>{a.src} ↗{extra?` · ${extra}`:''}</a>;
};

/* prominent "read original" external CTA */
window.ExtLink = function ExtLink({a, t, lang, small}){
  const L = window.makeL(lang);
  if(!a.url || a.url==='#') return null;
  return <a href={a.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
    style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:small?11:12,fontWeight:700,color:t.accent,fontFamily:'Plus Jakarta Sans',
      textDecoration:'none',border:`1px solid ${t.accent}44`,borderRadius:7,padding:small?'4px 9px':'6px 12px',transition:'all .18s',whiteSpace:'nowrap'}}
    onMouseEnter={e=>{e.currentTarget.style.background=t.accentDim;e.currentTarget.style.borderColor=t.accent;}}
    onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor=t.accent+'44';}}>
    {L('Leer original','Read original')} ↗</a>;
};

/* ═══ NEWS CENTER ═══ */
function EcoNews({t, lang, go}) {
  const L = window.makeL(lang);
  const bp = window.useBreakpoint();
  const NEWS = window.NEWS, CC = window.CAT_COLORS_NEWS, CEN = window.CAT_EN;
  const [cat, setCat] = React.useState('Todos');
  const [region, setRegion] = React.useState('todas');
  const [q, setQ] = React.useState('');
  const [live, setLive] = React.useState(null);   // null=loading/none, array=live data
  const [feedState, setFeedState] = React.useState('loading'); // loading | live | sample
  const [lastSync, setLastSync] = React.useState(()=>{ const v=parseInt(localStorage.getItem('ei_news_sync')||'0',10); return v||Date.now(); });
  const [, force] = React.useReducer(x=>x+1, 0);

  // fetch the live feed; silent=true keeps current cards on screen during an auto-refresh
  const load = React.useCallback((silent)=>{
    if(!silent) setFeedState('loading');
    if(window.fetchEcoNews){
      const deadline = new Promise(r=>setTimeout(()=>r('__timeout'),11000));
      Promise.race([window.fetchEcoNews(lang), deadline]).then(arr=>{
        if(arr && arr!=='__timeout' && arr.length>=4){
          setLive(arr); setFeedState('live');
          const now=Date.now(); setLastSync(now);
          try{ localStorage.setItem('ei_news_sync', String(now)); }catch(e){}
        } else if(!silent){ setFeedState('sample'); }
      }).catch(()=>{ if(!silent) setFeedState('sample'); });
    } else if(!silent){ setFeedState('sample'); }
  }, [lang]);

  React.useEffect(()=>{ load(false); }, [lang, load]);

  // ── DAILY AUTO-UPDATE ──
  // Re-fetch whenever the calendar day rolls over or 6h elapse, plus on tab refocus,
  // so a page left open always shows fresh daily news without a manual reload.
  React.useEffect(()=>{
    const SIX_H = 6*3600*1000;
    const check = () => {
      const last = parseInt(localStorage.getItem('ei_news_sync')||'0',10)||0;
      const now = Date.now();
      const newDay = new Date(last).toDateString() !== new Date(now).toDateString();
      if(now-last > SIX_H || newDay) load(true);
    };
    const iv = setInterval(check, 60000);
    const onVis = () => { if(document.visibilityState==='visible') check(); };
    document.addEventListener('visibilitychange', onVis);
    return ()=>{ clearInterval(iv); document.removeEventListener('visibilitychange', onVis); };
  }, [load]);

  // ticking "updated X ago" indicator
  React.useEffect(()=>{ const i=setInterval(force,1000); return ()=>clearInterval(i); }, []);
  const SRC = live || NEWS;
  React.useEffect(()=>{ window.__feedArticles = SRC; }, [SRC]);
  const cats = ['Todos','ESG','Clima','Energía','Regulación','Minería'];
  const cc = a => CC[a.cat] || t.accent;
  // region classifier: curated items carry impactChile; otherwise infer from text/source/url
  const regionOf = a => {
    if(a.region) return a.region;
    if(a.impactChile) return 'chile';
    const hay = ((a.title&&(a.title.es+' '+a.title.en))+' '+(a.summary?(a.summary.es+' '+a.summary.en):'')+' '+(a.src||'')+' '+(a.url||'')).toLowerCase();
    return /chile|chilen|santiago|cochilco|\.cl\b|sii\b|cmf\b/.test(hay) ? 'chile' : 'internacional';
  };
  const REGIONS = [['todas',L('Todas','All')],['chile','Chile'],['internacional',L('Internacional','International')]];
  const ql = q.trim().toLowerCase();
  const filtered = SRC.filter(a =>
    (cat==='Todos' || a.cat===cat) &&
    (region==='todas' || regionOf(a)===region) &&
    (!ql || a.title[lang].toLowerCase().includes(ql) || a.summary[lang].toLowerCase().includes(ql))
  );
  const featured = filtered[0];
  const sidebar = filtered.slice(1,4);
  const grid = filtered.slice(4,7);
  const mostRead = [...SRC].slice().sort((a,b)=>parseInt(b.read)-parseInt(a.read)).slice(0,4);

  // last-sync display (re-evaluated each tick via `force`)
  const _since = Math.max(0, Math.floor((Date.now()-lastSync)/1000));
  const syncSince = _since<60 ? L('hace','')+(lang==='en'?'':' ')+_since+'s'+(lang==='en'?' ago':'')
    : _since<3600 ? L('hace','')+(lang==='en'?'':' ')+Math.floor(_since/60)+' min'+(lang==='en'?' ago':'')
    : L('hace','')+(lang==='en'?'':' ')+Math.floor(_since/3600)+' h'+(lang==='en'?' ago':'');
  const syncAt = new Date(lastSync).toLocaleString(lang==='en'?'en-US':'es-CL',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});

  const catLabel = c => lang==='en' ? (CEN[c]||c) : c;
  const Badge = ({a,small}) => (
    <span style={{background:cc(a)+'22',color:cc(a),fontSize:small?9:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',padding:'2px 9px',borderRadius:20,fontFamily:'Plus Jakarta Sans'}}>{catLabel(a.cat)}</span>
  );
  const AiTag = () => (
    <span style={{display:'inline-flex',alignItems:'center',gap:4,background:t.accent2Dim,color:t.accent2,fontSize:9,fontWeight:700,padding:'2px 7px',borderRadius:5,fontFamily:'Plus Jakarta Sans',letterSpacing:'.04em'}}>
      <span style={{width:4,height:4,borderRadius:'50%',background:t.accent2}}/>{L('Resumen IA','AI summary')}
    </span>
  );

  return (
    <section id="noticias" style={{background:t.bg,padding:'96px 0',borderTop:`1px solid ${t.border}`,scrollMarginTop:84}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:bp==='sm'?'0 18px':'0 32px'}}>
        <Reveal>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:30,flexWrap:'wrap',gap:20}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:t.critical+'15',border:`1px solid ${t.critical}35`,borderRadius:20,padding:'5px 14px',marginBottom:18}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:t.critical,display:'inline-block',animation:'pulse 1.8s infinite'}}/>
              <span style={{color:t.critical,fontSize:11,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',fontFamily:'Plus Jakarta Sans',whiteSpace:'nowrap'}}>{L('Paso 01 · Infórmate','Step 01 · Get informed')}</span>
            </div>
            <h2 style={{fontSize:44,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.1,letterSpacing:'-.022em',marginBottom:10}}>{L('Centro de','News')}<br/>{L('Noticias Ambientales','& Environmental Hub')}</h2>
            <p style={{fontSize:16,color:t.textMuted,fontFamily:'DM Sans',lineHeight:1.6,maxWidth:480}}>{L('Noticias ESG, clima y regulación para LATAM — con resumen IA e impacto para Chile y empresas.','ESG, climate and regulation news for LATAM — with AI summary and impact for Chile and companies.')}</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:6}}>
            <div style={{display:'flex',alignItems:'center',gap:7,fontSize:12,color:t.textMuted,fontFamily:'DM Mono'}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:feedState==='live'?t.positive:feedState==='loading'?t.warning:t.textFaint,display:'inline-block',animation:feedState==='loading'?'pulse 1s infinite':'pulse 2.4s infinite'}}/>
              {feedState==='live'? L('Feed en vivo · RSS','Live feed · RSS') : feedState==='loading'? L('Cargando feed…','Loading feed…') : L('Contenido curado','Curated content')}
            </div>
            <span style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:10.5,color:t.accent,fontFamily:'Plus Jakarta Sans',fontWeight:700}}>
              <span style={{display:'inline-block'}}>↻</span>{L('Actualización automática diaria','Auto-updates daily')}
            </span>
            <span style={{fontSize:10.5,color:t.textFaint,fontFamily:'DM Sans'}}>
              {L('Última','Updated')}: {syncSince} · {syncAt}
            </span>
          </div>
        </div>
        {/* region filter (Chile / Internacional) */}
        <div style={{display:'flex',gap:7,flexWrap:'wrap',marginBottom:14}}>
          {REGIONS.map(([id,lbl])=>(
            <button key={id} onClick={()=>setRegion(id)} aria-pressed={region===id} style={{padding:'8px 17px',borderRadius:20,border:`1px solid ${region===id?t.accent:t.border}`,background:region===id?t.accentDim:'transparent',color:region===id?t.accent:t.textMuted,fontSize:12,fontWeight:700,cursor:'pointer',transition:'all .18s',fontFamily:'Plus Jakarta Sans'}}>{lbl}</button>
          ))}
        </div>
        {/* search + filters */}
        <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:28,flexWrap:'wrap'}}>
          <div style={{position:'relative',flex:'1 1 280px',maxWidth:380}}>
            <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:t.textFaint,fontSize:14}}>⌕</span>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder={L('Buscar noticias ESG, clima, regulación…','Search ESG, climate, regulation…')}
              style={{width:'100%',background:t.card,border:`1px solid ${t.border}`,color:t.text,borderRadius:10,padding:'11px 14px 11px 34px',fontSize:13,fontFamily:'DM Sans',outline:'none',transition:'border-color .2s'}}
              onFocus={e=>e.target.style.borderColor=t.accent} onBlur={e=>e.target.style.borderColor=t.border}/>
          </div>
          <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
            {cats.map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{padding:'8px 15px',borderRadius:20,border:`1px solid ${cat===c?(CC[c]||t.accent):t.border}`,background:cat===c?(CC[c]||t.accent)+'18':'transparent',color:cat===c?(CC[c]||t.accent):t.textMuted,fontSize:12,fontWeight:600,cursor:'pointer',transition:'all .18s',fontFamily:'Plus Jakarta Sans'}}>{catLabel(c)}</button>
            ))}
          </div>
        </div>
        </Reveal>

        {!featured && (
          <div style={{padding:'60px 0',textAlign:'center',color:t.textMuted,fontFamily:'DM Sans',border:`1px dashed ${t.border}`,borderRadius:16}}>
            {L('No se encontraron noticias para tu búsqueda.','No news found for your search.')}
          </div>
        )}

        {featured && (
        <div style={{display:'grid',gridTemplateColumns:bp!=='sm'?'1.55fr 1fr':'1fr',gap:20,marginBottom:20}}>
          {/* featured */}
          <Reveal>
          <div onClick={()=>go('article',featured.id)} role="button" tabIndex={0} onKeyDown={window.openKey(()=>go('article',featured.id))} aria-label={featured.title[lang]} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:18,overflow:'hidden',cursor:'pointer',transition:'all .25s',height:'100%'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=cc(featured);e.currentTarget.style.transform='translateY(-3px)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform='none';}}>
            <div style={{position:'relative'}}>
              <window.NewsImg t={t} lang={lang} a={featured} h={200}/>
              <div style={{position:'absolute',top:14,left:14,display:'flex',gap:8,alignItems:'center',pointerEvents:'none'}}><Badge a={featured}/><span style={{background:t.bg+'D0',color:t.text,fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:20,fontFamily:'Plus Jakarta Sans',backdropFilter:'blur(6px)'}}>{L('Destacada','Featured')}</span></div>
            </div>
            <div style={{padding:'22px 24px 24px'}}>
              <h3 style={{fontSize:23,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.25,marginBottom:12}}>{featured.title[lang]}</h3>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}><AiTag/></div>
              <p style={{fontSize:14.5,color:t.textMuted,lineHeight:1.62,fontFamily:'DM Sans',marginBottom:18}}>{featured.summary[lang]}</p>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:16,borderTop:`1px solid ${t.border}`,gap:10,flexWrap:'wrap'}}>
                <window.SourceLink a={featured} t={t} size={12} extra={featured.date}/>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <window.ExtLink a={featured} t={t} lang={lang}/>
                  <span style={{fontSize:12,color:cc(featured),fontFamily:'Plus Jakarta Sans',fontWeight:700}}>{L('Leer','Read')} → {featured.read}</span>
                </div>
              </div>
            </div>
          </div>
          </Reveal>
          {/* sidebar list */}
          <Reveal delay={80}>
          <div style={{display:'flex',flexDirection:'column',gap:14,height:'100%'}}>
            {sidebar.map(a=>(
              <div key={a.id} onClick={()=>go('article',a.id)} role="button" tabIndex={0} onKeyDown={window.openKey(()=>go('article',a.id))} aria-label={a.title[lang]} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:14,cursor:'pointer',transition:'all .22s',display:'flex',gap:14,flex:1,alignItems:'center'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=cc(a);e.currentTarget.style.background=t.cardHover;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.background=t.card;}}>
                <div style={{width:92,flexShrink:0,borderRadius:9,overflow:'hidden'}}><window.NewsImg t={t} lang={lang} a={a} h={66}/></div>
                <div style={{minWidth:0}}>
                  <div style={{marginBottom:7}}><Badge a={a} small/></div>
                  <h4 style={{fontSize:13.5,fontWeight:700,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.34,marginBottom:6}}>{a.title[lang]}</h4>
                  <window.SourceLink a={a} t={t} size={10.5} extra={a.time}/>
                </div>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
        )}

        {/* recent grid + most read */}
        <div style={{display:'grid',gridTemplateColumns:bp!=='sm'?'1fr 320px':'1fr',gap:20,marginTop:4}}>
          <div style={{display:'grid',gridTemplateColumns:bp==='lg'?'repeat(3,1fr)':bp==='md'?'repeat(2,1fr)':'1fr',gap:18}}>
            {grid.map((a,i)=>(
              <Reveal key={a.id} delay={i*70}>
              <div onClick={()=>go('article',a.id)} role="button" tabIndex={0} onKeyDown={window.openKey(()=>go('article',a.id))} aria-label={a.title[lang]} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,overflow:'hidden',cursor:'pointer',transition:'all .22s',height:'100%'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=cc(a);e.currentTarget.style.transform='translateY(-3px)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform='none';}}>
                <window.NewsImg t={t} lang={lang} a={a} h={108}/>
                <div style={{padding:'14px 16px 16px'}}>
                  <div style={{marginBottom:9}}><Badge a={a} small/></div>
                  <h4 style={{fontSize:14,fontWeight:700,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.36,marginBottom:9}}>{a.title[lang]}</h4>
                  <p style={{fontSize:12,color:t.textMuted,lineHeight:1.5,fontFamily:'DM Sans',marginBottom:12}}>{a.summary[lang].slice(0,92)}…</p>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
                    <window.SourceLink a={a} t={t} size={10.5} extra={a.read}/>
                    <window.ExtLink a={a} t={t} lang={lang} small/>
                  </div>
                </div>
              </div>
              </Reveal>
            ))}
            {grid.length===0 && featured && <div style={{gridColumn:'1/-1',color:t.textFaint,fontSize:13,fontFamily:'DM Sans',padding:'10px 2px'}}>{L('Sin más resultados en esta categoría.','No more results in this category.')}</div>}
          </div>
          {/* most read */}
          <Reveal delay={60}>
          <div style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:16,padding:'20px 22px'}}>
            <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:t.textMuted,marginBottom:16,fontFamily:'Plus Jakarta Sans',display:'flex',alignItems:'center',gap:8}}>
              <span style={{color:t.warning}}>★</span>{L('Más leídas','Most read')}
            </div>
            {mostRead.map((a,i)=>(
              <div key={a.id} onClick={()=>go('article',a.id)} role="button" tabIndex={0} onKeyDown={window.openKey(()=>go('article',a.id))} aria-label={a.title[lang]} style={{display:'flex',gap:13,padding:'12px 0',borderTop:i?`1px solid ${t.border}`:'none',cursor:'pointer'}}
                onMouseEnter={e=>e.currentTarget.querySelector('h5').style.color=cc(a)}
                onMouseLeave={e=>e.currentTarget.querySelector('h5').style.color=t.text}>
                <span style={{fontSize:22,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.border,lineHeight:1,minWidth:24}}>{i+1}</span>
                <div>
                  <h5 style={{fontSize:13,fontWeight:700,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.34,marginBottom:5,transition:'color .18s'}}>{a.title[lang]}</h5>
                  <span style={{fontSize:10,color:t.textFaint,fontFamily:'DM Mono'}}>{a.cat==='Todos'?'':catLabel(a.cat)} · {a.read}</span>
                </div>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
window.EcoNews = EcoNews;

/* ═══ ARTICLE READER ═══ */
function EcoArticle({t, lang, id, go}) {
  const L = window.makeL(lang);
  const bp = window.useBreakpoint();
  const NEWS = window.NEWS, CC = window.CAT_COLORS_NEWS, CEN = window.CAT_EN;
  const ALL = [...(window.__feedArticles||[]), ...NEWS];
  const seen=new Set(); const POOL = ALL.filter(x=>{ if(seen.has(x.id))return false; seen.add(x.id); return true; });
  const a = POOL.find(x=>x.id===id) || POOL[0];
  const cc = CC[a.cat] || t.accent;
  const catLabel = c => lang==='en' ? (CEN[c]||c) : c;
  const hasImpacts = a.impactChile && a.impactEmpresas;
  const bodyArr = (a.body && a.body[lang] && a.body[lang].length) ? a.body[lang] : [a.summary[lang]];
  React.useEffect(()=>{ window.scrollTo(0,0); },[id]);
  const related = POOL.filter(x=>x.id!==a.id && x.cat===a.cat).slice(0,3);
  const relFill = related.length<3 ? [...related, ...POOL.filter(x=>x.id!==a.id && x.cat!==a.cat).slice(0,3-related.length)] : related;
  const ImpactBox = ({label,color,text}) => (
    <div style={{background:t.card,border:`1px solid ${t.border}`,borderLeft:`3px solid ${color}`,borderRadius:10,padding:'16px 18px'}}>
      <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',color:color,marginBottom:7,fontFamily:'Plus Jakarta Sans'}}>{label}</div>
      <p style={{fontSize:14,color:t.text,lineHeight:1.6,fontFamily:'DM Sans',margin:0}}>{text}</p>
    </div>
  );
  return (
    <article style={{background:t.bg,minHeight:'100vh',paddingTop:90,paddingBottom:80}}>
      <div style={{maxWidth:760,margin:'0 auto',padding:bp==='sm'?'0 18px':'0 32px'}}>
        <button onClick={()=>go('home','#noticias')} style={{display:'inline-flex',alignItems:'center',gap:8,background:'transparent',border:`1px solid ${t.border}`,color:t.textMuted,fontSize:13,fontWeight:600,fontFamily:'Plus Jakarta Sans',padding:'8px 16px',borderRadius:20,cursor:'pointer',marginBottom:28,transition:'all .2s'}}
          onMouseEnter={e=>{e.currentTarget.style.color=t.text;e.currentTarget.style.borderColor=t.borderStrong;}}
          onMouseLeave={e=>{e.currentTarget.style.color=t.textMuted;e.currentTarget.style.borderColor=t.border;}}>
          ← {L('Volver a noticias','Back to news')}
        </button>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:18,flexWrap:'wrap'}}>
          <span style={{background:cc+'22',color:cc,fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',padding:'4px 12px',borderRadius:20,fontFamily:'Plus Jakarta Sans'}}>{catLabel(a.cat)}</span>
          <span style={{fontSize:12,color:t.textFaint,fontFamily:'DM Mono'}}>{a.date} · {a.read} {L('lectura','read')}</span>
          {a.url && a.url!=='#' ? (
            <a href={a.url} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:t.accent,fontFamily:'Plus Jakarta Sans',fontWeight:700,textDecoration:'none',display:'inline-flex',alignItems:'center',gap:4}}>{L('Fuente','Source')}: {a.src} ↗</a>
          ) : (
            <span style={{fontSize:12,color:t.textFaint,fontFamily:'DM Mono'}}>{L('Fuente','Source')}: {a.src}</span>
          )}
        </div>
        <h1 style={{fontSize:bp==='sm'?26:40,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.16,letterSpacing:'-.025em',marginBottom:22}}>{a.title[lang]}</h1>
        <div style={{borderRadius:16,overflow:'hidden',border:`1px solid ${t.border}`,marginBottom:10}}><window.NewsImg t={t} lang={lang} a={a} h={300}/></div>
        <div style={{fontSize:11,color:t.textFaint,fontFamily:'DM Sans',marginBottom:26,textAlign:'center'}}>{L('Arrastra aquí la imagen original de la noticia','Drop the original article image here')}</div>

        {/* AI summary */}
        <div style={{background:t.accent2Dim,border:`1px solid ${t.accent2}33`,borderRadius:12,padding:'18px 20px',marginBottom:26}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,marginBottom:10}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:t.accent2}}/>
            <span style={{fontSize:10.5,fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',color:t.accent2,fontFamily:'Plus Jakarta Sans'}}>{a.live? L('Extracto de la fuente','Source excerpt') : L('Resumen generado por IA','AI-generated summary')}</span>
          </div>
          <p style={{fontSize:15.5,color:t.text,lineHeight:1.6,fontFamily:'DM Sans',margin:0,fontWeight:500}}>{a.summary[lang]}</p>
        </div>

        {/* read original CTA */}
        {a.url && a.url!=='#' && (
          <a href={a.url} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:'16px 20px',marginBottom:28,textDecoration:'none',transition:'all .2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=cc;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;}}>
            <span style={{fontSize:14,color:t.text,fontFamily:'DM Sans'}}>{L('Lee la noticia completa en','Read the full story at')} <strong style={{fontFamily:'Plus Jakarta Sans'}}>{a.src}</strong></span>
            <span style={{flexShrink:0,background:cc,color:'#fff',fontSize:13,fontWeight:700,fontFamily:'Plus Jakarta Sans',padding:'9px 16px',borderRadius:8}}>{L('Leer original','Read original')} ↗</span>
          </a>
        )}

        {/* body */}
        {bodyArr.map((p,i)=>(
          <p key={i} style={{fontSize:16.5,color:t.text,lineHeight:1.78,fontFamily:'DM Sans',marginBottom:20}}>{p}</p>
        ))}

        {/* impacts */}
        {hasImpacts && (
        <div style={{display:'grid',gridTemplateColumns:bp!=='sm'?'1fr 1fr':'1fr',gap:14,margin:'28px 0'}}>
          <ImpactBox label={L('Impacto para Chile','Impact for Chile')} color={t.accent} text={a.impactChile[lang]}/>
          <ImpactBox label={L('Impacto para empresas','Impact for companies')} color={t.accent2} text={a.impactEmpresas[lang]}/>
        </div>
        )}

        {/* share */}
        <div style={{display:'flex',alignItems:'center',gap:12,padding:'18px 0',borderTop:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,margin:'30px 0'}}>
          <span style={{fontSize:12,color:t.textMuted,fontFamily:'Plus Jakarta Sans',fontWeight:600}}>{L('Compartir','Share')}:</span>
          {['in','X','f','✉'].map(s=>(
            <button key={s} onClick={e=>e.preventDefault()} style={{width:34,height:34,borderRadius:'50%',border:`1px solid ${t.border}`,background:t.card,color:t.textMuted,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'Plus Jakarta Sans',transition:'all .2s'}}
              onMouseEnter={e=>{e.currentTarget.style.color=t.accent;e.currentTarget.style.borderColor=t.accent;}}
              onMouseLeave={e=>{e.currentTarget.style.color=t.textMuted;e.currentTarget.style.borderColor=t.border;}}>{s}</button>
          ))}
        </div>

        {/* related */}
        <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:t.textMuted,marginBottom:16,fontFamily:'Plus Jakarta Sans'}}>{L('Artículos relacionados','Related articles')}</div>
        <div style={{display:'grid',gridTemplateColumns:bp==='lg'?'repeat(3,1fr)':'repeat(2,1fr)',gap:14}}>
          {relFill.map(r=>(
            <div key={r.id} onClick={()=>go('article',r.id)} role="button" tabIndex={0} onKeyDown={window.openKey(()=>go('article',r.id))} aria-label={r.title[lang]} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,overflow:'hidden',cursor:'pointer',transition:'all .2s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=CC[r.cat]||t.accent;e.currentTarget.style.transform='translateY(-3px)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform='none';}}>
              <window.NewsImg t={t} lang={lang} a={r} h={84}/>
              <div style={{padding:'12px 13px'}}>
                <h4 style={{fontSize:12.5,fontWeight:700,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.34}}>{r.title[lang]}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
window.EcoArticle = EcoArticle;
