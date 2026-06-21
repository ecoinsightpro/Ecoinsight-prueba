/* ═══════════════════════════════════════════════════════════
   EcoInsight · CALCULATOR — Empresa (GHG Protocol) + Hogar (personal)
   with calculator selector, ESG legend, real-world equivalences
   and a generalised PDF REPORT preview.
   ═══════════════════════════════════════════════════════════ */
window.GRIDS = {chile:.315,peru:.274,colombia:.179,argentina:.319,brasil:.074,mexico:.452,latam:.319};
window.calcEquiv = (totT) => {
  const kg = totT*1000, f = window.EQUIV_FACTORS;
  return {
    trees: Math.round(kg/f.trees),
    fuel: Math.round(kg/f.fuel),
    km: Math.round(kg/f.km),
    phone: Math.round(kg/f.phone),
    kwh: Math.round(kg/f.kwh),
  };
};
/* grade colours shared by both calculators */
window.GRADE_COLORS = (t)=>({A:t.positive,B:'#82C440',C:'#C9BB1A',D:t.warning,E:'#D46A3A',F:t.critical});

/* stable, module-level input + scope (never remount → no focus loss) */
function CalcField({t, label, value, onChange, unit}){
  return (
    <div>
      <div style={{fontSize:10,color:t.textMuted,fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:5,fontFamily:'Plus Jakarta Sans'}}>{label}</div>
      <div style={{display:'flex',gap:6}}>
        <input type="number" min="0" inputMode="decimal" value={value} onChange={onChange} placeholder="0"
          style={{flex:1,minWidth:0,background:t.surface,border:`1px solid ${t.border}`,color:t.text,borderRadius:8,padding:'10px 12px',fontSize:13,fontFamily:'DM Mono,monospace',outline:'none',transition:'border-color .2s'}}
          onFocus={e=>e.target.style.borderColor=t.accent} onBlur={e=>e.target.style.borderColor=t.border}/>
        <span style={{padding:'10px',background:t.card,border:`1px solid ${t.border}`,borderRadius:8,color:t.textMuted,fontSize:11,fontFamily:'DM Mono',display:'flex',alignItems:'center',whiteSpace:'nowrap'}}>{unit}</span>
      </div>
    </div>
  );
}
function CalcSelect({t, label, value, onChange, options}){
  const iSel={width:'100%',background:t.surface,border:`1px solid ${t.border}`,color:t.text,borderRadius:8,padding:'10px 12px',fontSize:13,fontFamily:'DM Sans',cursor:'pointer'};
  return (
    <div>
      <div style={{fontSize:10,color:t.textMuted,fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:5,fontFamily:'Plus Jakarta Sans'}}>{label}</div>
      <select value={value} onChange={onChange} style={iSel}>{options.map(([k,l])=><option key={k} value={k}>{l}</option>)}</select>
    </div>
  );
}
function CalcScope({t, id, title, sub, color, val, open, setOpen, children}){
  const bp = window.useBreakpoint();
  return (
    <div style={{border:`1px solid ${open===id?color+'55':t.border}`,borderRadius:12,overflow:'hidden',marginBottom:10,transition:'border-color .2s'}}>
      <button onClick={()=>setOpen(open===id?null:id)} style={{width:'100%',padding:'14px 18px',background:open===id?color+'13':t.surface,border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'background .2s'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:color}}/>
          <div style={{textAlign:'left'}}>
            <div style={{fontSize:14,fontWeight:600,color:t.text,fontFamily:'Plus Jakarta Sans'}}>{title}</div>
            <div style={{fontSize:11,color:t.textMuted}}>{sub}</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          {val>0&&<span style={{fontSize:12,color,fontFamily:'DM Mono',fontWeight:600}}>{val.toFixed(1)} t</span>}
          <span style={{color:t.textMuted,transform:open===id?'rotate(180deg)':'none',transition:'transform .22s',display:'block'}}>▾</span>
        </div>
      </button>
      {open===id&&<div style={{padding:18,background:t.card,display:'grid',gridTemplateColumns:bp!=='sm'?'1fr 1fr':'1fr',gap:14}}>{children}</div>}
    </div>
  );
}
window.CalcField = CalcField; window.CalcScope = CalcScope; window.CalcSelect = CalcSelect;

/* ═══ ESG LEGEND — what each classification means ═══ */
function EsgLegend({t, lang, mode, current}){
  const L = window.makeL(lang);
  const GC = window.GRADE_COLORS(t);
  const [open, setOpen] = React.useState(false);
  const ranges = mode==='empresa'
    ? {A:'< 10',B:'10–50',C:'50–200',D:'200–500',E:'500–1.000',F:'> 1.000', unit:'tCO₂e/'+L('año','yr')}
    : {A:'< 2',B:'2–4',C:'4–6',D:'6–8',E:'8–12',F:'> 12', unit:'tCO₂e/'+L('persona·año','person·yr')};
  return (
    <div style={{marginTop:14,border:`1px solid ${t.border}`,borderRadius:12,overflow:'hidden'}}>
      <button onClick={()=>setOpen(o=>!o)} aria-expanded={open}
        style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',gap:8,padding:'11px 14px',background:t.surface,border:'none',cursor:'pointer'}}>
        <span style={{fontSize:11.5,fontWeight:700,color:t.text,fontFamily:'Plus Jakarta Sans',display:'flex',alignItems:'center',gap:7}}>
          <span style={{color:t.accent}}>ⓘ</span>{L('¿Qué significa la clasificación ESG?','What does the ESG rating mean?')}
        </span>
        <span style={{color:t.textMuted,transform:open?'rotate(180deg)':'none',transition:'transform .22s'}}>▾</span>
      </button>
      {open && (
        <div style={{padding:'4px 14px 14px',background:t.card}}>
          <div style={{fontSize:10,color:t.textFaint,fontFamily:'DM Mono',margin:'8px 0 10px'}}>{L('Rangos','Ranges')} · {ranges.unit}</div>
          {window.ESG_GRADE_INFO.map(g=>{
            const on = current && current===g.g;
            return (
              <div key={g.g} style={{display:'flex',gap:11,alignItems:'flex-start',padding:'8px 0',borderTop:`1px solid ${t.border}`}}>
                <span style={{flexShrink:0,width:26,height:26,borderRadius:7,background:GC[g.g]+'22',border:`1px solid ${GC[g.g]}${on?'':'44'}`,boxShadow:on?`0 0 0 2px ${GC[g.g]}55`:'none',color:GC[g.g],fontWeight:800,fontSize:13,fontFamily:'Plus Jakarta Sans',display:'flex',alignItems:'center',justifyContent:'center'}}>{g.g}</span>
                <div style={{minWidth:0}}>
                  <div style={{display:'flex',alignItems:'baseline',gap:8,flexWrap:'wrap'}}>
                    <span style={{fontSize:12.5,fontWeight:700,color:t.text,fontFamily:'Plus Jakarta Sans'}}>{g.title[lang]}</span>
                    <span style={{fontSize:10.5,color:t.textMuted,fontFamily:'DM Mono'}}>{ranges[g.g]}</span>
                  </div>
                  <div style={{fontSize:11.5,color:t.textMuted,lineHeight:1.45,fontFamily:'DM Sans',marginTop:2}}>{g.desc[lang]}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
window.EsgLegend = EsgLegend;

function EcoCalculator({t, lang, go}) {
  const L = window.makeL(lang);
  const bp = window.useBreakpoint();
  const GRIDS = window.GRIDS, HF = window.HOME_FACTORS, GC = window.GRADE_COLORS(t);
  const SAVE_KEY='ei_calc_v1', HSAVE_KEY='ei_calc_home_v1', MODE_KEY='ei_calc_mode';
  const saved  = (()=>{ try{ return JSON.parse(localStorage.getItem(SAVE_KEY)||'{}'); }catch(e){ return {}; } })();
  const hsaved = (()=>{ try{ return JSON.parse(localStorage.getItem(HSAVE_KEY)||'{}'); }catch(e){ return {}; } })();

  const [mode, setMode] = React.useState(()=>localStorage.getItem(MODE_KEY)||'empresa');
  React.useEffect(()=>{ try{ localStorage.setItem(MODE_KEY,mode); }catch(e){} }, [mode]);

  /* ── EMPRESA state ── */
  const [country, setCountry]   = React.useState(saved.country || 'chile');
  const [industry, setIndustry] = React.useState(saved.industry || 'mineria');
  const [v, setV]               = React.useState(saved.v || {diesel:'',gasolina:'',gnl:'',elec:'',vuelos:'',flete:''});
  const [open, setOpen]         = React.useState(saved.open || 's1');
  React.useEffect(()=>{ try{ localStorage.setItem(SAVE_KEY, JSON.stringify({country,industry,v,open})); }catch(e){} }, [country,industry,v,open]);
  const upd = k => e => { const val = e.target.value; setV(p=>({...p,[k]:val})); };
  const n = k => parseFloat(v[k])||0;
  const c_s1=(n('diesel')*2.68+n('gasolina')*2.31+n('gnl')*1.89)/1000;
  const c_s2=(n('elec')*(GRIDS[country]||.319))/1000;
  const c_s3=(n('vuelos')*.255+n('flete')*.168)/1000;
  const c_tot=c_s1+c_s2+c_s3;
  const industries=[['mineria',L('Minería','Mining')],['construccion',L('Construcción','Construction')],['agro',L('Agroindustria','Agribusiness')],['manufactura',L('Manufactura','Manufacturing')],['transporte',L('Transporte & Logística','Transport & Logistics')],['servicios',L('Servicios','Services')]];

  /* ── HOGAR state ── */
  const [hcountry, setHcountry] = React.useState(hsaved.country || 'chile');
  const [people, setPeople]     = React.useState(hsaved.people || '1');
  const [diet, setDiet]         = React.useState(hsaved.diet || 'media');
  const [hv, setHv]             = React.useState(hsaved.hv || {elec:'',gnat:'',glp:'',gasolina:'',diesel:'',bus:'',vuelos:'',residuos:''});
  const [hopen, setHopen]       = React.useState(hsaved.open || 'h1');
  React.useEffect(()=>{ try{ localStorage.setItem(HSAVE_KEY, JSON.stringify({country:hcountry,people,diet,hv,open:hopen})); }catch(e){} }, [hcountry,people,diet,hv,hopen]);
  const hupd = k => e => { const val = e.target.value; setHv(p=>({...p,[k]:val})); };
  const hn = k => parseFloat(hv[k])||0;
  const persons = Math.max(1, Math.round(parseFloat(people)||1));
  const h_energy = (hn('elec')*12*(GRIDS[hcountry]||.319) + hn('gnat')*12*HF.gnl + hn('glp')*12*HF.glp)/1000;
  const h_trans  = (hn('gasolina')*12*HF.gasolina + hn('diesel')*12*HF.diesel + hn('bus')*52*HF.bus + hn('vuelos')*HF.flight)/1000;
  const dietKg   = (window.DIETS.find(d=>d[0]===diet)||['',{},1800])[2];
  const h_cons   = (dietKg*persons + hn('residuos')*52*HF.waste)/1000;
  const h_tot    = h_energy+h_trans+h_cons;
  const perCap   = h_tot/persons;

  /* ── active model ── */
  const gradeOf = (g)=>({g, c:GC[g]});
  const corpGrade = c_tot<10?'A':c_tot<50?'B':c_tot<200?'C':c_tot<500?'D':c_tot<1000?'E':'F';
  const homeGrade = perCap<2?'A':perCap<4?'B':perCap<6?'C':perCap<8?'D':perCap<12?'E':'F';

  const model = mode==='empresa'
    ? {tot:c_tot, gr:gradeOf(corpGrade), segs:[
        {key:'s1', label:L('Alcance 1','Scope 1'), val:c_s1, color:t.accent},
        {key:'s2', label:L('Alcance 2','Scope 2'), val:c_s2, color:t.accent2},
        {key:'s3', label:L('Alcance 3','Scope 3'), val:c_s3, color:t.warning},
      ]}
    : {tot:h_tot, gr:gradeOf(homeGrade), segs:[
        {key:'he', label:L('Energía del hogar','Home energy'), val:h_energy, color:t.accent},
        {key:'ht', label:L('Transporte','Transport'),          val:h_trans,  color:t.accent2},
        {key:'hc', label:L('Consumo y residuos','Goods & waste'), val:h_cons, color:t.warning},
      ]};
  const tot = model.tot, segs = model.segs, gr = model.gr;
  const totTween = window.useTween(tot);
  const eq  = window.calcEquiv(totTween);
  const p = w => tot>0?Math.max(w>0?1:0,Math.round(w/tot*100)):0;
  const fmt = x => Math.round(x).toLocaleString(lang==='en'?'en-US':'es-CL');

  /* donut conic-gradient built from active segments */
  const donut = (()=>{ if(tot<=0) return t.border; let acc=0; const stops=segs.map(s=>{const a=acc, w=s.val/tot*100; acc+=w; return `${s.color} ${a}% ${acc}%`;}); return `conic-gradient(${stops.join(',')})`; })();

  const EQ=[
    {k:'trees', v:eq.trees, ic:'🌳', label:L('Árboles / año','Trees / yr'), sub:L('para absorber','to absorb'), col:t.accent},
    {k:'fuel',  v:eq.fuel,  ic:'⛽', label:L('Litros combustible','Litres of fuel'), sub:L('equivalentes','equivalent'), col:t.warning},
    {k:'km',    v:eq.km,    ic:'🚗', label:L('Kilómetros','Kilometres'), sub:L('en auto promedio','average car'), col:t.accent2},
    {k:'phone', v:eq.phone, ic:'🔋', label:L('Cargas de móvil','Phone charges'), sub:L('de smartphone','smartphone'), col:'#8B5CF6'},
    {k:'kwh',   v:eq.kwh,   ic:'⚡', label:L('kWh eléctricos','Electric kWh'), sub:L('consumo equivalente','equivalent use'), col:'#3B8FDB'},
  ];

  const snapshot = ()=>({
    mode,
    tot,
    segments: segs.map(s=>({label:s.label, val:s.val, color:s.color})),
    gr,
    eq: window.calcEquiv(tot),
    sector: mode==='empresa' ? industries.find(x=>x[0]===industry)[1] : L('Hogar / Personal','Household / Personal'),
    perCap: mode==='hogar' ? perCap : null,
    persons: mode==='hogar' ? persons : null,
    date: new Date().toLocaleDateString(lang==='en'?'en-US':'es-CL',{year:'numeric',month:'long',day:'numeric'}),
  });

  const gridOptions = [['chile','Chile · 0.315'],['peru','Perú · 0.274'],['colombia','Colombia · 0.179'],['argentina','Argentina · 0.319'],['brasil','Brasil · 0.074'],['mexico','México · 0.452'],['latam','LATAM · 0.319']].map(([k,l])=>[k, l+' kgCO₂e/kWh']);

  /* calculator selector tab */
  const ModeTab = ({id, icon, title, sub}) => {
    const on = mode===id;
    return (
      <button onClick={()=>setMode(id)} aria-pressed={on}
        style={{flex:'1 1 220px',display:'flex',alignItems:'center',gap:13,textAlign:'left',padding:'14px 18px',borderRadius:14,cursor:'pointer',
          background:on?t.accentDim:t.card, border:`1.5px solid ${on?t.accent:t.border}`, transition:'all .2s'}}
        onMouseEnter={e=>{ if(!on){ e.currentTarget.style.borderColor=t.borderStrong; } }}
        onMouseLeave={e=>{ if(!on){ e.currentTarget.style.borderColor=t.border; } }}>
        <span style={{flexShrink:0,width:40,height:40,borderRadius:11,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,background:on?t.accent+'22':t.surface,border:`1px solid ${on?t.accent+'44':t.border}`}}>{icon}</span>
        <span style={{minWidth:0}}>
          <span style={{display:'block',fontSize:14.5,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:on?t.text:t.textMuted,letterSpacing:'-.01em'}}>{title}</span>
          <span style={{display:'block',fontSize:11.5,color:t.textMuted,fontFamily:'DM Sans',marginTop:1}}>{sub}</span>
        </span>
        <span style={{marginLeft:'auto',flexShrink:0,width:18,height:18,borderRadius:'50%',border:`2px solid ${on?t.accent:t.borderStrong}`,display:'flex',alignItems:'center',justifyContent:'center'}}>
          {on && <span style={{width:8,height:8,borderRadius:'50%',background:t.accent}}/>}
        </span>
      </button>
    );
  };

  return (
    <section id="calculadora" style={{background:t.bg,padding:'96px 0',borderTop:`1px solid ${t.border}`,scrollMarginTop:84}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:bp==='sm'?'0 18px':'0 32px'}}>
        <Reveal>
        <div style={{marginBottom:30}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:t.accentDim,border:`1px solid ${t.accent}35`,borderRadius:20,padding:'5px 14px',marginBottom:18}}>
            <span style={{color:t.accent,fontSize:11,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',fontFamily:'Plus Jakarta Sans',whiteSpace:'nowrap'}}>{L('Paso 03 · Mide tu huella','Step 03 · Measure your footprint')}</span>
          </div>
          <h2 style={{fontSize:44,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.1,marginBottom:14,letterSpacing:'-.022em'}}>{L('Calculadora de','GHG Emissions')}<br/>{L('Emisiones GEI','Calculator')}</h2>
          <p style={{fontSize:17,color:t.textMuted,maxWidth:580,lineHeight:1.65,fontFamily:'DM Sans'}}>{L('Elige la calculadora que necesitas — empresa u hogar — y mide tu huella de carbono en tiempo real, con equivalencias reales y reporte PDF.','Pick the calculator you need — company or household — and measure your carbon footprint in real time, with real-world equivalences and a PDF report.')}</p>
        </div>
        {/* CALCULATOR SELECTOR */}
        <div style={{marginBottom:40}}>
          <div style={{fontSize:10,color:t.textMuted,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',marginBottom:10,fontFamily:'Plus Jakarta Sans'}}>{L('Elige tu calculadora','Choose your calculator')}</div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <ModeTab id="empresa" icon="🏢" title={L('Empresa · GEI','Company · GHG')} sub={L('Alcances 1-2-3 · GHG Protocol','Scopes 1-2-3 · GHG Protocol')}/>
            <ModeTab id="hogar"   icon="🏠" title={L('Hogar · Personal','Household · Personal')} sub={L('Energía, transporte y consumo','Energy, transport & consumption')}/>
          </div>
        </div>
        </Reveal>

        <div style={{display:'grid',gridTemplateColumns:bp!=='sm'?'1fr 355px':'1fr',gap:32,alignItems:'start'}}>
          <Reveal>
          <div>
            {mode==='empresa' ? (
            <React.Fragment>
              <div style={{display:'grid',gridTemplateColumns:bp!=='sm'?'1fr 1fr':'1fr',gap:14,marginBottom:18}}>
                <CalcSelect t={t} label={L('Sector / Industria','Sector / Industry')} value={industry} onChange={e=>setIndustry(e.target.value)} options={industries}/>
                <CalcSelect t={t} label={L('Factor red eléctrica','Grid factor')} value={country} onChange={e=>setCountry(e.target.value)} options={gridOptions}/>
              </div>
              <CalcScope t={t} id="s1" open={open} setOpen={setOpen} title={L('Alcance 1 · Emisiones Directas','Scope 1 · Direct Emissions')} sub={L('Combustión propia: instalaciones y vehículos','Own combustion: facilities and vehicles')} color={t.accent} val={c_s1}>
                <CalcField t={t} label={L('Diésel','Diesel')} value={v.diesel} onChange={upd('diesel')} unit="L/año"/>
                <CalcField t={t} label={L('Gasolina','Gasoline')} value={v.gasolina} onChange={upd('gasolina')} unit="L/año"/>
                <CalcField t={t} label={L('Gas natural','Natural gas')} value={v.gnl} onChange={upd('gnl')} unit="m³/año"/>
                <div style={{gridColumn:'span 2',padding:'10px 14px',background:t.accent+'12',borderRadius:8,fontSize:12,color:t.textMuted,fontFamily:'DM Sans'}}>
                  {L('Factor diésel','Diesel factor')}: <strong style={{color:t.accent,fontFamily:'DM Mono'}}>2.68</strong> <span style={{fontFamily:'DM Mono',fontSize:11}}>kgCO₂e/L</span> · {L('Gasolina','Gasoline')}: <strong style={{color:t.accent,fontFamily:'DM Mono'}}>2.31</strong> <span style={{fontFamily:'DM Mono',fontSize:11}}>kgCO₂e/L</span> · GNL: <strong style={{color:t.accent,fontFamily:'DM Mono'}}>1.89</strong> <span style={{fontFamily:'DM Mono',fontSize:11}}>kgCO₂e/m³</span>
                </div>
              </CalcScope>
              <CalcScope t={t} id="s2" open={open} setOpen={setOpen} title={L('Alcance 2 · Energía Comprada','Scope 2 · Purchased Energy')} sub={L('Electricidad, vapor y calor adquiridos','Purchased electricity, steam and heat')} color={t.accent2} val={c_s2}>
                <div style={{gridColumn:'span 2'}}>
                  <CalcField t={t} label={L('Consumo eléctrico','Electricity use')} value={v.elec} onChange={upd('elec')} unit="kWh/año"/>
                  <div style={{marginTop:10,padding:'10px 14px',background:t.accent2+'12',borderRadius:8,fontSize:12,color:t.textMuted}}>
                    {L('Factor red','Grid factor')}: <strong style={{color:t.accent2,fontFamily:'DM Mono'}}>{GRIDS[country]||.319} kgCO₂e/kWh</strong>
                  </div>
                </div>
              </CalcScope>
              <CalcScope t={t} id="s3" open={open} setOpen={setOpen} title={L('Alcance 3 · Cadena de Valor','Scope 3 · Value Chain')} sub={L('Viajes de negocio y transporte de carga','Business travel and freight transport')} color={t.warning} val={c_s3}>
                <CalcField t={t} label={L('Vuelos de negocio','Business flights')} value={v.vuelos} onChange={upd('vuelos')} unit="km/año"/>
                <CalcField t={t} label={L('Flete de carga','Freight')} value={v.flete} onChange={upd('flete')} unit="ton-km/año"/>
              </CalcScope>
            </React.Fragment>
            ) : (
            <React.Fragment>
              <div style={{display:'grid',gridTemplateColumns:bp!=='sm'?'1fr 1fr':'1fr',gap:14,marginBottom:18}}>
                <CalcField t={t} label={L('Personas en el hogar','People in household')} value={people} onChange={e=>setPeople(e.target.value)} unit={L('pers.','ppl')}/>
                <CalcSelect t={t} label={L('Factor red eléctrica','Grid factor')} value={hcountry} onChange={e=>setHcountry(e.target.value)} options={gridOptions}/>
              </div>
              <CalcScope t={t} id="h1" open={hopen} setOpen={setHopen} title={L('Energía del hogar','Home energy')} sub={L('Electricidad, gas natural y gas licuado','Electricity, natural gas and LPG')} color={t.accent} val={h_energy}>
                <CalcField t={t} label={L('Electricidad','Electricity')} value={hv.elec} onChange={hupd('elec')} unit="kWh/mes"/>
                <CalcField t={t} label={L('Gas natural','Natural gas')} value={hv.gnat} onChange={hupd('gnat')} unit="m³/mes"/>
                <CalcField t={t} label={L('Gas licuado (GLP)','LPG')} value={hv.glp} onChange={hupd('glp')} unit="kg/mes"/>
                <div style={{padding:'10px 14px',background:t.accent+'12',borderRadius:8,fontSize:11.5,color:t.textMuted,fontFamily:'DM Sans',display:'flex',alignItems:'center'}}>
                  {L('Red','Grid')}: <strong style={{color:t.accent,fontFamily:'DM Mono',margin:'0 4px'}}>{GRIDS[hcountry]||.319}</strong> · GLP <strong style={{color:t.accent,fontFamily:'DM Mono',marginLeft:4}}>2.94</strong>
                </div>
              </CalcScope>
              <CalcScope t={t} id="h2" open={hopen} setOpen={setHopen} title={L('Transporte','Transport')} sub={L('Vehículo propio, transporte público y vuelos','Own vehicle, public transport and flights')} color={t.accent2} val={h_trans}>
                <CalcField t={t} label={L('Gasolina vehículo','Vehicle gasoline')} value={hv.gasolina} onChange={hupd('gasolina')} unit="L/mes"/>
                <CalcField t={t} label={L('Diésel vehículo','Vehicle diesel')} value={hv.diesel} onChange={hupd('diesel')} unit="L/mes"/>
                <CalcField t={t} label={L('Transporte público','Public transport')} value={hv.bus} onChange={hupd('bus')} unit="km/sem"/>
                <CalcField t={t} label={L('Vuelos','Flights')} value={hv.vuelos} onChange={hupd('vuelos')} unit="km/año"/>
              </CalcScope>
              <CalcScope t={t} id="h3" open={hopen} setOpen={setHopen} title={L('Consumo y residuos','Goods & waste')} sub={L('Alimentación y residuos a relleno sanitario','Diet and landfilled waste')} color={t.warning} val={h_cons}>
                <div style={{gridColumn:'span 2'}}>
                  <CalcSelect t={t} label={L('Dieta (por persona)','Diet (per person)')} value={diet} onChange={e=>setDiet(e.target.value)} options={window.DIETS.map(d=>[d[0], d[1][lang]])}/>
                </div>
                <CalcField t={t} label={L('Residuos a relleno','Landfilled waste')} value={hv.residuos} onChange={hupd('residuos')} unit="kg/sem"/>
                <div style={{padding:'10px 14px',background:t.warning+'12',borderRadius:8,fontSize:11.5,color:t.textMuted,fontFamily:'DM Sans',display:'flex',alignItems:'center'}}>
                  {L('Dieta','Diet')}: <strong style={{color:t.warning,fontFamily:'DM Mono',margin:'0 4px'}}>{fmt(dietKg)}</strong> kgCO₂e/{L('pers·año','ppl·yr')}
                </div>
              </CalcScope>
            </React.Fragment>
            )}

            {/* EQUIVALENCES (shared) */}
            <div style={{marginTop:26}}>
              <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:t.textMuted,marginBottom:14,fontFamily:'Plus Jakarta Sans'}}>{L('Equivalencias del mundo real','Real-world equivalences')}</div>
              <div style={{display:'grid',gridTemplateColumns:bp==='sm'?'repeat(3,1fr)':'repeat(5,1fr)',gap:10}}>
                {EQ.map(e=>(
                  <div key={e.k} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:'14px 12px',textAlign:'center'}}>
                    <div style={{fontSize:20,marginBottom:7}}>{e.ic}</div>
                    <div style={{fontSize:tot>0?(e.v>99999?16:19):19,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:tot>0?e.col:t.textFaint,lineHeight:1,marginBottom:5,letterSpacing:'-.02em'}}>{tot>0?fmt(e.v):'—'}</div>
                    <div style={{fontSize:10.5,color:t.text,fontWeight:600,fontFamily:'Plus Jakarta Sans',lineHeight:1.25}}>{e.label}</div>
                    <div style={{fontSize:9.5,color:t.textMuted,fontFamily:'DM Sans',marginTop:2}}>{e.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </Reveal>

          {/* Results Panel */}
          <div style={{position:bp!=='sm'?'sticky':'static',top:100,background:t.card,border:`1px solid ${t.border}`,borderRadius:20,padding:26}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
              <span style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:t.textMuted,fontFamily:'Plus Jakarta Sans'}}>{L('Resultado estimado','Estimated result')}</span>
              <span style={{fontSize:10,fontWeight:700,color:t.accent,fontFamily:'Plus Jakarta Sans',background:t.accentDim,border:`1px solid ${t.accent}33`,borderRadius:20,padding:'3px 10px'}}>{mode==='empresa'?L('Empresa','Company'):L('Hogar','Household')}</span>
            </div>
            <div style={{display:'flex',justifyContent:'center',marginBottom:18}}>
              <div style={{position:'relative',width:150,height:150}}>
                <div style={{width:150,height:150,borderRadius:'50%',background:donut,
                  WebkitMaskImage:'radial-gradient(transparent 49px, black 50px)',maskImage:'radial-gradient(transparent 49px, black 50px)',transition:'background .55s'}}/>
                <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center'}}>
                  <div style={{fontSize:tot>999?18:24,fontWeight:800,color:t.text,fontFamily:'Plus Jakarta Sans',lineHeight:1}}>{tot>0?totTween.toFixed(1):'—'}</div>
                  <div style={{fontSize:9,color:t.textMuted,fontFamily:'DM Mono',marginTop:2}}>tCO₂e/{L('año','yr')}</div>
                </div>
              </div>
            </div>
            {tot>0&&(
              <div style={{textAlign:'center',marginBottom:14,padding:'10px 0',borderTop:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`}}>
                <span style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:13,color:t.textMuted,fontFamily:'DM Sans'}}>
                  {L('Clasificación ESG','ESG rating')}:
                  <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:30,height:30,borderRadius:7,background:gr.c+'22',border:`1px solid ${gr.c}44`,color:gr.c,fontWeight:800,fontSize:15,fontFamily:'Plus Jakarta Sans'}}>{gr.g}</span>
                </span>
                {mode==='hogar' && <div style={{fontSize:11,color:t.textMuted,fontFamily:'DM Sans',marginTop:7}}>{perCap.toFixed(2)} tCO₂e {L('por persona/año','per person/yr')} · {persons} {persons>1?L('personas','people'):L('persona','person')}</div>}
              </div>
            )}
            {segs.map(s=>(
              <div key={s.key} style={{marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
                  <span style={{fontSize:11,color:t.textMuted,display:'flex',alignItems:'center',gap:5}}>
                    <span style={{width:7,height:7,borderRadius:'50%',background:s.color,display:'inline-block'}}/>{s.label}
                  </span>
                  <span style={{fontSize:11,fontFamily:'DM Mono',color:t.text}}>{s.val.toFixed(2)} t</span>
                </div>
                <div style={{height:5,borderRadius:3,background:t.border,overflow:'hidden'}}>
                  <div style={{height:'100%',width:tot>0?`${p(s.val)}%`:'0%',background:s.color,borderRadius:3,transition:'width .55s'}}/>
                </div>
              </div>
            ))}

            {/* ESG legend */}
            <EsgLegend t={t} lang={lang} mode={mode} current={tot>0?gr.g:null}/>

            <button disabled={tot<=0} onClick={()=>go('report',snapshot())} style={{marginTop:16,width:'100%',padding:14,background:tot>0?t.cta:t.border,color:tot>0?t.ctaText:t.textFaint,border:'none',borderRadius:10,fontSize:14,fontWeight:700,cursor:tot>0?'pointer':'not-allowed',fontFamily:'Plus Jakarta Sans',transition:'opacity .2s'}}
              onMouseEnter={e=>{if(tot>0)e.currentTarget.style.opacity='.82'}} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
              {L('Ver reporte PDF','View PDF report')} →
            </button>
            <p style={{textAlign:'center',fontSize:10,color:t.textFaint,marginTop:8,lineHeight:1.5,fontFamily:'DM Sans'}}>{tot>0?L('Reporte profesional listo para descargar','Professional report ready to download'):L('Ingresa datos para generar el reporte','Enter data to generate the report')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
window.EcoCalculator = EcoCalculator;

/* ═══ PDF REPORT PREVIEW ═══ */
function EcoReport({t, lang, data, go}) {
  const L = window.makeL(lang);
  const bp = window.useBreakpoint();
  React.useEffect(()=>{ window.scrollTo(0,0); },[]);
  if(!data){ go('calculator'); return null; }
  const {tot,gr,eq,sector,date} = data;
  const mode = data.mode || 'empresa';
  const segments = data.segments || [];
  const fmt = x => x.toLocaleString(lang==='en'?'en-US':'es-CL');
  const p = w => tot>0?Math.round(w/tot*100):0;
  // document palette (always light "paper")
  const INK='#0D1C32', SUB='#5A6B82', LINE='#E2E7EE', GREEN='#2E9E63', BLUE='#3B8FDB', AMBER='#D4973A';
  const PAPER=[GREEN,BLUE,AMBER];
  const recs = mode==='hogar' ? [
    L('Cambia a un plan eléctrico con energía 100% renovable certificada o evalúa paneles solares.','Switch to a certified 100% renewable electricity plan or consider solar panels.'),
    L('Prefiere transporte público, bicicleta o un vehículo eléctrico en los trayectos frecuentes.','Favour public transport, cycling or an electric vehicle for frequent trips.'),
    L('Reduce el consumo de carne roja y prioriza alimentos locales y de temporada.','Cut red-meat consumption and prioritise local, seasonal food.'),
    L('Mejora el aislamiento del hogar y cambia a iluminación y electrodomésticos eficientes.','Improve home insulation and switch to efficient lighting and appliances.'),
  ] : [
    L('Migrar a contratos de electricidad 100% renovable (PPA) para reducir Alcance 2.','Move to 100% renewable electricity contracts (PPA) to cut Scope 2.'),
    L('Electrificar la flota y optimizar rutas para abatir el Alcance 1.','Electrify the fleet and optimize routes to abate Scope 1.'),
    L('Medir y exigir reportes a proveedores clave para gestionar el Alcance 3.','Measure and require reporting from key suppliers to manage Scope 3.'),
    L('Fijar una meta de reducción validada por SBTi alineada a 1,5 °C.','Set an SBTi-validated reduction target aligned to 1.5 °C.'),
  ];
  const methodology = mode==='hogar' ? L('Cálculo personal · Factores LATAM','Personal estimate · LATAM factors') : 'GHG Protocol · '+L('Alcances','Scopes')+' 1-2-3';
  const reportKind = mode==='hogar' ? L('Reporte de Huella Personal','Personal Footprint Report') : L('Reporte de Huella de Carbono','Carbon Footprint Report');
  const subStandard = mode==='hogar' ? L('Huella personal','Personal footprint') : 'GHG Protocol';
  const bar = (label,val,col)=>(
    <div style={{marginBottom:12}}>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:5,fontFamily:'DM Sans'}}>
        <span style={{color:INK,fontWeight:600}}>{label}</span><span style={{color:SUB,fontFamily:'DM Mono'}}>{val.toFixed(2)} t · {p(val)}%</span>
      </div>
      <div style={{height:8,background:'#EEF1F5',borderRadius:4,overflow:'hidden'}}><div style={{height:'100%',width:`${p(val)}%`,background:col,borderRadius:4}}/></div>
    </div>
  );
  return (
    <div style={{background:t.bg,minHeight:'100vh',paddingTop:84,paddingBottom:70}}>
      {/* toolbar */}
      <div style={{maxWidth:820,margin:'0 auto 18px',padding:bp==='sm'?'0 16px':'0 24px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
        <button onClick={()=>go('calculator')} style={{display:'inline-flex',alignItems:'center',gap:8,background:'transparent',border:`1px solid ${t.border}`,color:t.textMuted,fontSize:13,fontWeight:600,fontFamily:'Plus Jakarta Sans',padding:'8px 16px',borderRadius:20,cursor:'pointer'}}>← {L('Volver a la calculadora','Back to calculator')}</button>
        <div style={{display:'flex',gap:10}}>
          <button onClick={()=>window.print()} style={{background:'transparent',border:`1px solid ${t.borderStrong}`,color:t.text,fontSize:13,fontWeight:700,fontFamily:'Plus Jakarta Sans',padding:'9px 18px',borderRadius:9,cursor:'pointer'}}>{L('Imprimir','Print')}</button>
          <button onClick={()=>alert(L('La descarga del PDF se habilita en producción. Esta es una vista previa del diseño del reporte.','PDF download is enabled in production. This is a design preview of the report.'))}
            style={{background:t.cta,color:t.ctaText,border:'none',fontSize:13,fontWeight:700,fontFamily:'Plus Jakarta Sans',padding:'9px 18px',borderRadius:9,cursor:'pointer'}}>↓ {L('Descargar Reporte','Download Report')}</button>
        </div>
      </div>

      {/* PAPER */}
      <div style={{maxWidth:820,margin:'0 auto',padding:bp==='sm'?'0 16px':'0 24px'}}>
        <div className="paper-print" style={{background:'#FFFFFF',borderRadius:6,overflow:'hidden',boxShadow:'0 30px 80px rgba(0,0,0,.4)',fontFamily:'DM Sans,sans-serif'}}>
          {/* header band */}
          <div style={{background:'#0D1C32',padding:'26px 40px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',alignItems:'center',gap:11}}>
              <div style={{display:'flex'}}><img src={(window.__resources&&window.__resources.logo)||"uploads/logo-ei.png"} alt="EcoInsight" style={{height:34}}/></div>
              <span style={{fontFamily:'Plus Jakarta Sans',fontWeight:800,fontSize:21,color:'#E6EDF8',letterSpacing:'-.02em'}}><span style={{color:'#4DB87A'}}>Eco</span>Insight</span>
            </div>
            <div style={{textAlign:'right',maxWidth:240}}>
              <div style={{fontSize:11,color:'#7A9BBF',fontFamily:'Plus Jakarta Sans',fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',lineHeight:1.45}}>{reportKind}</div>
              <div style={{fontSize:11,color:'#52688A',fontFamily:'DM Mono',marginTop:7}}>{subStandard} · {date}</div>
            </div>
          </div>

          <div style={{padding:'34px 40px 40px'}}>
            {/* meta row */}
            <div style={{display:'flex',justifyContent:'space-between',gap:20,marginBottom:28,flexWrap:'wrap'}}>
              <div>
                <div style={{fontSize:10,color:SUB,textTransform:'uppercase',letterSpacing:'.09em',fontWeight:700,fontFamily:'Plus Jakarta Sans',marginBottom:4}}>{mode==='hogar'?L('Perfil','Profile'):L('Sector','Sector')}</div>
                <div style={{fontSize:15,color:INK,fontWeight:700,fontFamily:'Plus Jakarta Sans'}}>{sector}</div>
              </div>
              <div>
                <div style={{fontSize:10,color:SUB,textTransform:'uppercase',letterSpacing:'.09em',fontWeight:700,fontFamily:'Plus Jakarta Sans',marginBottom:4}}>{L('Metodología','Methodology')}</div>
                <div style={{fontSize:15,color:INK,fontWeight:700,fontFamily:'Plus Jakarta Sans'}}>{methodology}</div>
              </div>
              <div>
                <div style={{fontSize:10,color:SUB,textTransform:'uppercase',letterSpacing:'.09em',fontWeight:700,fontFamily:'Plus Jakarta Sans',marginBottom:4}}>{L('Clasificación','Rating')}</div>
                <div style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:30,height:30,borderRadius:7,background:gr.c+'22',border:`1px solid ${gr.c}55`,color:gr.c,fontWeight:800,fontSize:16,fontFamily:'Plus Jakarta Sans'}}>{gr.g}</div>
              </div>
            </div>

            {/* big total */}
            <div style={{display:'flex',gap:26,alignItems:'center',background:'#F6F8FA',border:`1px solid ${LINE}`,borderRadius:12,padding:'24px 28px',marginBottom:28}}>
              <div>
                <div style={{fontSize:11,color:SUB,textTransform:'uppercase',letterSpacing:'.08em',fontWeight:700,fontFamily:'Plus Jakarta Sans',marginBottom:6}}>{L('Emisiones totales','Total emissions')}</div>
                <div style={{display:'flex',alignItems:'baseline',gap:10}}>
                  <span style={{fontSize:46,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:INK,letterSpacing:'-.02em',lineHeight:1}}>{tot.toFixed(1)}</span>
                  <span style={{fontSize:14,color:SUB,fontFamily:'DM Mono'}}>tCO₂e/{L('año','yr')}</span>
                </div>
                <div style={{fontSize:12.5,color:SUB,fontFamily:'DM Mono',marginTop:6}}>= {fmt(Math.round(tot*1000))} kg CO₂e{mode==='hogar'&&data.perCap?` · ${data.perCap.toFixed(2)} t/${L('persona','person')}`:''}</div>
              </div>
              <div style={{flex:1,borderLeft:`1px solid ${LINE}`,paddingLeft:26}}>
                {segments.map((s,i)=>bar(s.label, s.val, PAPER[i%3]))}
              </div>
            </div>

            {/* equivalences */}
            <div style={{fontSize:11,color:INK,textTransform:'uppercase',letterSpacing:'.1em',fontWeight:700,fontFamily:'Plus Jakarta Sans',marginBottom:14}}>{L('Equivalencias','Equivalences')}</div>
            <div style={{display:'grid',gridTemplateColumns:bp==='sm'?'repeat(3,1fr)':'repeat(5,1fr)',gap:10,marginBottom:30}}>
              {[['🌳',eq.trees,L('árboles/año','trees/yr')],['⛽',eq.fuel,L('litros','litres')],['🚗',eq.km,L('km auto','car km')],['🔋',eq.phone,L('cargas móvil','phone chg')],['⚡',eq.kwh,L('kWh','kWh')]].map(([ic,val,lb],i)=>(
                <div key={i} style={{border:`1px solid ${LINE}`,borderRadius:10,padding:'14px 8px',textAlign:'center'}}>
                  <div style={{fontSize:18,marginBottom:6}}>{ic}</div>
                  <div style={{fontSize:val>99999?14:16,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:INK,lineHeight:1}}>{fmt(val)}</div>
                  <div style={{fontSize:9.5,color:SUB,fontFamily:'DM Sans',marginTop:4}}>{lb}</div>
                </div>
              ))}
            </div>

            {/* recommendations */}
            <div style={{fontSize:11,color:INK,textTransform:'uppercase',letterSpacing:'.1em',fontWeight:700,fontFamily:'Plus Jakarta Sans',marginBottom:14}}>{L('Recomendaciones','Recommendations')}</div>
            <div style={{display:'grid',gridTemplateColumns:bp!=='sm'?'1fr 1fr':'1fr',gap:12,marginBottom:30}}>
              {recs.map((r,i)=>(
                <div key={i} style={{display:'flex',gap:11,alignItems:'flex-start'}}>
                  <span style={{flexShrink:0,width:22,height:22,borderRadius:6,background:'#E8F4EE',color:GREEN,fontSize:12,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Plus Jakarta Sans'}}>{i+1}</span>
                  <span style={{fontSize:13,color:'#33414F',lineHeight:1.5,fontFamily:'DM Sans'}}>{r}</span>
                </div>
              ))}
            </div>

            {/* footer */}
            <div style={{borderTop:`1px solid ${LINE}`,paddingTop:18,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
              <span style={{fontSize:10.5,color:'#94A1B2',fontFamily:'DM Sans'}}>© 2026 EcoInsight · {mode==='hogar'?L('Generado automáticamente · Estimación personal con factores LATAM','Auto-generated · Personal estimate with LATAM factors'):L('Generado automáticamente · Metodología GHG Protocol Corporate Standard','Auto-generated · GHG Protocol Corporate Standard')}</span>
              <div style={{display:'flex',gap:6}}>
                {(mode==='hogar'?['LATAM','IPCC','GHG Protocol']:['GHG Protocol','ISO 14064','TCFD']).map(s=>(<span key={s} style={{fontSize:9,color:'#7A8699',border:`1px solid ${LINE}`,borderRadius:20,padding:'2px 9px',fontFamily:'Plus Jakarta Sans',fontWeight:600}}>{s}</span>))}
              </div>
            </div>
          </div>
        </div>
        <p style={{textAlign:'center',fontSize:12,color:t.textFaint,marginTop:18,fontFamily:'DM Sans'}}>{L('Vista previa del reporte · la descarga del PDF se habilita en producción','Report preview · PDF download is enabled in production')}</p>

        {/* funnel bridge → products */}
        <div style={{marginTop:34,display:'flex',alignItems:'center',justifyContent:'space-between',gap:18,flexWrap:'wrap',background:t.card,border:`1px solid ${t.border}`,borderRadius:16,padding:'22px 26px'}}>
          <div style={{maxWidth:560}}>
            <div style={{fontSize:16,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,marginBottom:5}}>{mode==='hogar'?L('¿Quieres reducir tu huella personal?','Want to cut your personal footprint?'):L('¿Necesitas un reporte oficial y auditable?','Need an official, auditable report?')}</div>
            <div style={{fontSize:13.5,color:t.textMuted,lineHeight:1.55,fontFamily:'DM Sans'}}>{mode==='hogar'?L('Explora guías y plantillas prácticas para bajar tus emisiones en casa, paso a paso.','Explore practical guides and templates to lower your emissions at home, step by step.'):L('Convierte esta estimación en un inventario GEI completo con nuestras plantillas profesionales alineadas a GHG Protocol e ISO 14064.','Turn this estimate into a full GHG inventory with our professional templates aligned to GHG Protocol and ISO 14064.')}</div>
          </div>
          <button onClick={()=>go('home','#marketplace')} style={{flexShrink:0,background:t.cta,color:t.ctaText,border:'none',borderRadius:10,padding:'13px 24px',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'Plus Jakarta Sans'}}>{L('Ver plantillas','Browse templates')} →</button>
        </div>
      </div>
    </div>
  );
}
window.EcoReport = EcoReport;
