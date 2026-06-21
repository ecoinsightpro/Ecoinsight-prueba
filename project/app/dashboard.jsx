/* ═══════════════════════════════════════════════════════════
   EcoInsight · COMPACT "Carbon Footprint Dashboard" card
   Small hero card (themes-aware) with a seamless looping
   animation — bars breathe in a traveling wave, a scan line
   sweeps, scope bars shimmer. Pure CSS loops (perfect loop).
   ═══════════════════════════════════════════════════════════ */
const DASH_MONTHS = [1336.3,1367.8,1323.0,1483.2,1177.7,1338.4,1137.5,1444.3,1454.0,934.3,1343.4,1144.5];
const DASH_MAX = 1500;

function EcoDashboard({t, lang}){
  const L = window.makeL(lang);
  const D = DASH_MONTHS.length, DUR = 2.6;
  const scopes = [
    [L('Alcance 1','Scope 1'), '10.204,1', 65.9, t.accent],
    [L('Alcance 2','Scope 2'), '4.352,0', 28.11, t.accent2],
    [L('Alcance 3','Scope 3'), '928,4', 6.0, t.warning],
  ];
  return (
    <div className="dash-float" style={{width:332,background:t.card,border:`1px solid ${t.borderStrong}`,borderRadius:20,padding:'22px 22px 20px',
      boxShadow:t.dark?'0 40px 90px rgba(0,0,0,.5)':'0 40px 80px rgba(0,0,0,.13)'}}>
      {/* header */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div style={{display:'flex',alignItems:'center',gap:7}}>
          <span style={{width:7,height:7,borderRadius:'50%',background:t.positive,animation:'pulse 1.8s infinite'}}/>
          <span style={{fontSize:10.5,fontWeight:700,color:t.textMuted,textTransform:'uppercase',letterSpacing:'.07em',fontFamily:'Plus Jakarta Sans'}}>Carbon Footprint Dashboard</span>
        </div>
        <span style={{fontSize:10,color:t.textFaint,fontFamily:'DM Mono'}}>tCO₂e</span>
      </div>

      {/* total */}
      <div style={{fontSize:10,color:t.textMuted,textTransform:'uppercase',letterSpacing:'.07em',fontWeight:600,marginBottom:4}}>{L('Emisiones totales','Total Emissions')}</div>
      <div style={{display:'flex',alignItems:'baseline',gap:9,marginBottom:16}}>
        <span style={{fontSize:34,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1,letterSpacing:'-.02em'}}>15.484,5</span>
        <span style={{background:t.positive+'22',color:t.positive,padding:'3px 8px',borderRadius:20,fontSize:11,fontWeight:700}}>↓12,4%</span>
      </div>

      {/* looping monthly bars */}
      <div style={{position:'relative',height:84,marginBottom:6,overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'flex-end',gap:'4%'}}>
          {DASH_MONTHS.map((v,i)=>(
            <div key={i} className="ei-bar" style={{flex:1,height:`${v/DASH_MAX*100}%`,background:t.accent,borderRadius:'2px 2px 0 0',transformOrigin:'bottom',
              animation:`barWave ${DUR}s ease-in-out ${-i*(DUR/D)}s infinite`}}/>
          ))}
        </div>
        {/* scan line (perfect loop) */}
        <div className="ei-scan" style={{position:'absolute',top:0,bottom:0,width:46,
          background:`linear-gradient(90deg, transparent, ${t.accent}33, transparent)`,animation:'scanX 3.6s linear infinite'}}/>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:8.5,color:t.textFaint,fontFamily:'DM Mono',marginBottom:16}}>
        <span>Ene</span><span>Abr</span><span>Jul</span><span>Oct</span><span>Dic</span>
      </div>

      {/* scope split */}
      <div style={{paddingTop:14,borderTop:`1px solid ${t.border}`}}>
        {scopes.map(([lab,val,pct,c],i)=>(
          <div key={lab} style={{marginBottom:i<2?11:0}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
              <span style={{fontSize:11,color:t.textMuted,display:'flex',alignItems:'center',gap:5}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:c,display:'inline-block'}}/>{lab}
              </span>
              <span style={{fontSize:11,fontFamily:'DM Mono',color:t.text}}>{val}</span>
            </div>
            <div style={{height:4,borderRadius:2,background:t.border,overflow:'hidden',position:'relative'}}>
              <div style={{height:'100%',width:`${pct}%`,background:c,borderRadius:2,position:'relative',overflow:'hidden'}}>
                <div className="ei-shimmer" style={{position:'absolute',top:0,bottom:0,width:30,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent)',animation:`shimmer 2.8s ease-in-out ${-i*0.5}s infinite`}}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
window.EcoDashboard = EcoDashboard;
