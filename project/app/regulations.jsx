/* ═══════════════════════════════════════════════════════════
   EcoInsight · NORMATIVA AMBIENTAL — evaluador por tipo de proyecto
   Selecciona proyecto + características → normativa chilena aplicable.
   Orientativo, no constituye asesoría legal.
   ═══════════════════════════════════════════════════════════ */
function EcoRegulations({ t, lang }) {
  const L = window.makeL(lang);
  const Reveal = window.Reveal;
  const PROJECTS = window.REG_PROJECTS, FACTORS = window.REG_FACTORS, LAWS = window.REG_LAWS, CATS = window.REG_CATS;

  const SAVE = 'ei_reg_v1';
  const saved = (() => { try { return JSON.parse(localStorage.getItem(SAVE) || '{}'); } catch(e){ return {}; } })();
  const [proj, setProj] = React.useState(saved.proj || null);
  const [factors, setFactors] = React.useState(saved.factors || {});
  React.useEffect(() => { try { localStorage.setItem(SAVE, JSON.stringify({proj, factors})); } catch(e){} }, [proj, factors]);

  const toggleFactor = id => setFactors(p => ({ ...p, [id]: !p[id] }));

  // compute applicable laws (union of project base + active factor laws), deduped
  const lawIds = React.useMemo(() => {
    if (!proj) return [];
    const p = PROJECTS.find(x => x.id === proj);
    const ids = [...(p ? p.base : [])];
    FACTORS.forEach(f => { if (factors[f.id]) f.laws.forEach(l => ids.push(l)); });
    return [...new Set(ids)];
  }, [proj, factors]);

  // group by category in a stable order
  const grouped = React.useMemo(() => {
    const order = Object.keys(CATS);
    const g = {};
    lawIds.forEach(id => { const law = LAWS[id]; if (!law) return; (g[law.cat] = g[law.cat] || []).push(id); });
    return order.filter(c => g[c]).map(c => [c, g[c]]);
  }, [lawIds]);

  const selProj = proj ? PROJECTS.find(x => x.id === proj) : null;

  return (
    <section id="normativa" style={{position:'relative',background:t.surface,padding:'96px 0',borderTop:`1px solid ${t.border}`,overflow:'hidden',scrollMarginTop:84}}>
      {/* ambient aurora for depth */}
      <div aria-hidden="true" style={{position:'absolute',top:-160,left:'8%',width:420,height:420,borderRadius:'50%',background:t.accent,opacity:.06,filter:'blur(90px)',pointerEvents:'none'}}/>
      <div aria-hidden="true" style={{position:'absolute',bottom:-200,right:'4%',width:480,height:480,borderRadius:'50%',background:t.accent2,opacity:.05,filter:'blur(100px)',pointerEvents:'none'}}/>

      <div style={{position:'relative',maxWidth:1180,margin:'0 auto',padding:'0 32px'}}>
        <Reveal>
          <div style={{maxWidth:680,marginBottom:44}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:t.accent2Dim,border:`1px solid ${t.accent2}35`,borderRadius:20,padding:'5px 14px',marginBottom:18}}>
              <span style={{color:t.accent2,fontSize:11,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',fontFamily:'Plus Jakarta Sans'}}>{L('Normativa · Chile','Regulation · Chile')}</span>
            </div>
            <h2 style={{fontSize:44,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.08,marginBottom:14,letterSpacing:'-.022em'}}>{L('¿Qué normativa ambiental','Which environmental law')}<br/>{L('debe cumplir tu proyecto?','must your project meet?')}</h2>
            <p style={{fontSize:17,color:t.textMuted,lineHeight:1.65,fontFamily:'DM Sans'}}>{L('Selecciona el tipo de proyecto y sus características. Te orientamos sobre la legislación chilena que probablemente debas cumplir, con enlace a cada norma.','Pick your project type and its characteristics. We orient you on the Chilean legislation you likely need to comply with, linking each regulation.')}</p>
          </div>
        </Reveal>

        {/* STEP 1 — project selector (menu of cards) */}
        <Reveal>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
            <span style={{width:24,height:24,borderRadius:7,background:t.accent,color:t.ctaText,fontSize:13,fontWeight:800,fontFamily:'Plus Jakarta Sans',display:'flex',alignItems:'center',justifyContent:'center'}}>1</span>
            <span style={{fontSize:13,fontWeight:700,color:t.text,fontFamily:'Plus Jakarta Sans',textTransform:'uppercase',letterSpacing:'.06em'}}>{L('Tipo de proyecto','Project type')}</span>
          </div>
        </Reveal>
        <Reveal>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:38}}>
            {PROJECTS.map((p,i) => {
              const on = proj === p.id;
              return (
                <button key={p.id} onClick={()=>setProj(p.id)} aria-pressed={on}
                  style={{textAlign:'left',display:'flex',alignItems:'center',gap:12,padding:'16px 16px',borderRadius:14,cursor:'pointer',transition:'all .25s cubic-bezier(.16,1,.3,1)',
                    background:on?t.accentDim:t.card, border:`1.5px solid ${on?t.accent:t.border}`,
                    transform:on?'translateY(-2px)':'none', boxShadow:on?(t.dark?'0 14px 34px -12px rgba(0,0,0,.6)':'0 14px 30px -12px rgba(0,0,0,.18)'):'none'}}
                  onMouseEnter={e=>{ if(!on){ e.currentTarget.style.borderColor=t.borderStrong; e.currentTarget.style.transform='translateY(-2px)'; } }}
                  onMouseLeave={e=>{ if(!on){ e.currentTarget.style.borderColor=t.border; e.currentTarget.style.transform='none'; } }}>
                  <span style={{fontSize:24,flexShrink:0,filter:on?'none':'grayscale(.3)'}}>{p.icon}</span>
                  <span style={{fontSize:14,fontWeight:on?700:600,color:on?t.text:t.textMuted,fontFamily:'Plus Jakarta Sans',lineHeight:1.25}}>{p.label[lang]}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* STEP 2 — refining characteristics */}
        <Reveal>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
            <span style={{width:24,height:24,borderRadius:7,background:t.border,color:t.text,fontSize:13,fontWeight:800,fontFamily:'Plus Jakarta Sans',display:'flex',alignItems:'center',justifyContent:'center'}}>2</span>
            <span style={{fontSize:13,fontWeight:700,color:t.text,fontFamily:'Plus Jakarta Sans',textTransform:'uppercase',letterSpacing:'.06em'}}>{L('Características','Characteristics')}</span>
            <span style={{fontSize:12,color:t.textFaint,fontFamily:'DM Sans'}}>· {L('opcional','optional')}</span>
          </div>
        </Reveal>
        <Reveal>
          <div style={{display:'flex',flexWrap:'wrap',gap:9,marginBottom:46}}>
            {FACTORS.map(f => {
              const on = !!factors[f.id];
              return (
                <button key={f.id} onClick={()=>toggleFactor(f.id)} aria-pressed={on}
                  style={{display:'inline-flex',alignItems:'center',gap:8,padding:'9px 15px',borderRadius:30,cursor:'pointer',transition:'all .2s',fontFamily:'DM Sans',
                    background:on?t.accentDim:'transparent', border:`1px solid ${on?t.accent:t.borderStrong}`, color:on?t.accent:t.textMuted, fontSize:13,fontWeight:on?700:500}}>
                  <span style={{width:15,height:15,borderRadius:5,border:`1.5px solid ${on?t.accent:t.borderStrong}`,background:on?t.accent:'transparent',color:t.ctaText,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,transition:'all .2s'}}>{on?'✓':''}</span>
                  {f.label[lang]}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* RESULT */}
        {!proj ? (
          <Reveal>
            <div style={{textAlign:'center',padding:'56px 24px',border:`1.5px dashed ${t.border}`,borderRadius:18,color:t.textMuted}}>
              <div style={{fontSize:30,marginBottom:12,opacity:.5}}>📋</div>
              <p style={{fontSize:15,fontFamily:'DM Sans'}}>{L('Selecciona un tipo de proyecto para ver la normativa aplicable.','Select a project type to see the applicable regulation.')}</p>
            </div>
          </Reveal>
        ) : (
          <div key={proj + Object.keys(factors).filter(k=>factors[k]).join('-')}>
            {/* result header with animated count */}
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,flexWrap:'wrap',marginBottom:26,paddingBottom:22,borderBottom:`1px solid ${t.border}`,animation:'slideUp .55s ease-out both'}}>
              <div style={{display:'flex',alignItems:'center',gap:16}}>
                <div style={{display:'flex',alignItems:'baseline',gap:8}}>
                  <span style={{fontSize:46,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.accent,lineHeight:1,letterSpacing:'-.02em'}}><window.CountUp value={lawIds.length}/></span>
                  <span style={{fontSize:15,color:t.textMuted,fontFamily:'DM Sans'}}>{L('normativas','regulations')}</span>
                </div>
                <div style={{height:34,width:1,background:t.border}}/>
                <div>
                  <div style={{fontSize:11,color:t.textFaint,fontFamily:'Plus Jakarta Sans',fontWeight:700,textTransform:'uppercase',letterSpacing:'.07em'}}>{L('Proyecto','Project')}</div>
                  <div style={{fontSize:16,color:t.text,fontFamily:'Plus Jakarta Sans',fontWeight:700}}>{selProj.icon} {selProj.label[lang]}</div>
                </div>
              </div>
              <button onClick={()=>{ setProj(null); setFactors({}); }}
                style={{fontSize:12.5,color:t.textMuted,background:'transparent',border:`1px solid ${t.border}`,borderRadius:20,padding:'7px 15px',cursor:'pointer',fontFamily:'Plus Jakarta Sans',fontWeight:600,transition:'all .18s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.color=t.accent;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.color=t.textMuted;}}>{L('Reiniciar','Reset')}</button>
            </div>

            {/* grouped law cards */}
            {grouped.map(([cat, ids], gi) => {
              const meta = CATS[cat];
              return (
                <div key={cat} style={{marginBottom:30,animation:'slideUp .6s ease-out both',animationDelay:`${0.12+gi*0.07}s`}}>
                  <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:14}}>
                    <span style={{width:9,height:9,borderRadius:'50%',background:meta.color}}/>
                    <span style={{fontSize:12.5,fontWeight:700,color:t.text,fontFamily:'Plus Jakarta Sans',textTransform:'uppercase',letterSpacing:'.06em'}}>{meta.label[lang]}</span>
                    <span style={{flex:1,height:1,background:t.border}}/>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:14}}>
                    {ids.map((id,ci) => {
                      const law = LAWS[id];
                      return (
                        <a key={id} href={law.url} target="_blank" rel="noopener noreferrer"
                          style={{display:'block',textDecoration:'none',background:t.card,border:`1px solid ${t.border}`,borderLeft:`3px solid ${meta.color}`,borderRadius:13,padding:'18px 20px',transition:'all .24s cubic-bezier(.16,1,.3,1)',animation:'slideUp .55s ease-out both',animationDelay:`${0.18+gi*0.07+ci*0.05}s`}}
                          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.borderColor=t.borderStrong;e.currentTarget.style.borderLeftColor=meta.color;e.currentTarget.style.boxShadow=t.dark?'0 16px 36px -14px rgba(0,0,0,.6)':'0 16px 30px -14px rgba(0,0,0,.16)';}}
                          onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor=t.border;e.currentTarget.style.borderLeftColor=meta.color;e.currentTarget.style.boxShadow='none';}}>
                          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10,marginBottom:8}}>
                            <span style={{fontSize:13,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:meta.color,letterSpacing:'-.01em'}}>{law.name}</span>
                            <span style={{fontSize:10,fontFamily:'DM Mono',color:t.textMuted,background:t.surface,border:`1px solid ${t.border}`,borderRadius:6,padding:'2px 8px',whiteSpace:'nowrap'}}>{law.auth}</span>
                          </div>
                          <div style={{fontSize:14.5,fontWeight:700,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.3,marginBottom:7}}>{law.title[lang]}</div>
                          <p style={{fontSize:12.5,color:t.textMuted,lineHeight:1.55,fontFamily:'DM Sans',marginBottom:10}}>{law.desc[lang]}</p>
                          <span style={{fontSize:11.5,color:t.accent,fontFamily:'Plus Jakarta Sans',fontWeight:700,display:'inline-flex',alignItems:'center',gap:4}}>{L('Ver norma','View regulation')} ↗</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* disclaimer */}
            <div style={{marginTop:30,display:'flex',gap:11,alignItems:'flex-start',background:t.warningDim,border:`1px solid ${t.warning}33`,borderRadius:12,padding:'15px 18px'}}>
              <span style={{color:t.warning,fontSize:16,flexShrink:0,lineHeight:1.3}}>ⓘ</span>
              <p style={{fontSize:12.5,color:t.textMuted,lineHeight:1.6,fontFamily:'DM Sans'}}>
                {L('Orientación general basada en la legislación ambiental chilena vigente; no constituye asesoría legal. La aplicabilidad depende de la ubicación, escala y características específicas del proyecto. Verifica siempre con el SEA, la SMA y un profesional acreditado.',
                   'General guidance based on current Chilean environmental law; it is not legal advice. Applicability depends on the project\u2019s location, scale and specific characteristics. Always verify with the SEA, SMA and an accredited professional.')}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
window.EcoRegulations = EcoRegulations;
