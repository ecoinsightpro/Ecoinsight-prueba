/* ═══════════════════════════════════════════════════════════
   EcoInsight · CALCULADORA DE EMISIONES GEI (GHG Protocol)
   Bilingüe es/en · Alcances 1·2·3 · factores LATAM
   ═══════════════════════════════════════════════════════════ */
function EcoCalculator({t, lang}) {
  const L = window.makeL(lang);
  const [country, setCountry] = React.useState('chile');
  const [industry, setIndustry] = React.useState('mineria');
  const [v, setV] = React.useState({diesel:'',gasolina:'',gnl:'',elec:'',vuelos:'',flete:''});
  const [open, setOpen] = React.useState('s1');
  const upd = k => e => setV({...v,[k]:e.target.value});
  const n = k => parseFloat(v[k])||0;
  const grids={chile:.315,peru:.274,colombia:.179,argentina:.319,brasil:.074,mexico:.452,latam:.319,
    usa:.373,canada:.123,uk:.207,alemania:.363,francia:.056,espana:.151,italia:.289,paisesbajos:.328,polonia:.662,ue27:.242,
    china:.582,india:.713,japon:.462,corea:.437,indonesia:.761,australia:.634};
  const s1=(n('diesel')*2.68+n('gasolina')*2.31+n('gnl')*1.89)/1000;
  const s2=(n('elec')*(grids[country]||.319))/1000;
  const s3=(n('vuelos')*.255+n('flete')*.168)/1000;
  const tot=s1+s2+s3;
  const p=w=>tot>0?Math.max(1,Math.round(w/tot*100)):0;
  const gr=tot<10?{g:'A',c:t.positive}:tot<50?{g:'B',c:'#82C440'}:tot<200?{g:'C',c:'#C9BB1A'}:tot<500?{g:'D',c:t.warning}:tot<1000?{g:'E',c:'#D46A3A'}:{g:'F',c:t.critical};
  const iSel={width:'100%',background:t.surface,border:`1px solid ${t.border}`,color:t.text,borderRadius:8,padding:'10px 12px',fontSize:13,fontFamily:'DM Sans',cursor:'pointer'};
  const Field=({label,k,unit})=>(
    <div key={k}>
      <div style={{fontSize:10,color:t.textMuted,fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:5,fontFamily:'Plus Jakarta Sans'}}>{label}</div>
      <div style={{display:'flex',gap:6}}>
        <input type="number" min="0" value={v[k]} onChange={upd(k)} placeholder="0"
          style={{flex:1,minWidth:0,background:t.surface,border:`1px solid ${t.border}`,color:t.text,borderRadius:8,padding:'10px 12px',fontSize:13,fontFamily:'DM Mono,monospace',outline:'none',transition:'border-color .2s'}}
          onFocus={e=>e.target.style.borderColor=t.accent} onBlur={e=>e.target.style.borderColor=t.border}/>
        <span style={{padding:'10px',background:t.card,border:`1px solid ${t.border}`,borderRadius:8,color:t.textMuted,fontSize:11,fontFamily:'DM Mono',display:'flex',alignItems:'center',whiteSpace:'nowrap'}}>{unit}</span>
      </div>
    </div>
  );
  const Scope=({id,title,sub,color,val,children})=>(
    <div key={id} style={{border:`1px solid ${open===id?color+'55':t.border}`,borderRadius:12,overflow:'hidden',marginBottom:10,transition:'border-color .2s'}}>
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
      {open===id&&<div style={{padding:18,background:t.card,display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>{children}</div>}
    </div>
  );
  const goShop = () => { const el=document.querySelector('#marketplace'); el&&el.scrollIntoView({behavior:'smooth',block:'start'}); };
  return (
    <section id="calculadora" style={{background:t.bg,padding:'96px 0',borderTop:`1px solid ${t.border}`}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:'0 32px'}}>
        <div style={{marginBottom:50}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:t.accentDim,border:`1px solid ${t.accent}35`,borderRadius:20,padding:'5px 14px',marginBottom:18}}>
            <span style={{color:t.accent,fontSize:11,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',fontFamily:'Plus Jakarta Sans',whiteSpace:'nowrap'}}>GHG Protocol · {L('Alcances 1 · 2 · 3','Scopes 1 · 2 · 3')}</span>
          </div>
          <h2 style={{fontSize:44,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.1,marginBottom:14,letterSpacing:'-.022em'}}>{L('Calculadora de','GHG Emissions')}<br/>{L('Emisiones GEI','Calculator')}</h2>
          <p style={{fontSize:17,color:t.textMuted,maxWidth:560,lineHeight:1.65,fontFamily:'DM Sans'}}>{L('Mide la huella de carbono de tu empresa en tiempo real. Factores de emisión oficiales para LATAM, Norteamérica, Europa y Asia-Pacífico.','Measure your company\u2019s carbon footprint in real time. Official emission factors for LATAM, North America, Europe and Asia-Pacific.')}</p>
        </div>
        <div className="calc-grid" style={{display:'grid',gridTemplateColumns:'1fr 355px',gap:32,alignItems:'start'}}>
          <div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:18}}>
              {[[L('Sector / Industria','Sector / Industry'),'industry',setIndustry,industry,[['mineria',L('Minería','Mining')],['construccion',L('Construcción','Construction')],['agro',L('Agroindustria','Agribusiness')],['manufactura',L('Manufactura','Manufacturing')],['transporte',L('Transporte & Logística','Transport & Logistics')],['servicios',L('Servicios & Consultoría','Services & Consulting')]]],
                [L('Factor red eléctrica','Grid factor'),'country',setCountry,country,[
                  [L('América Latina','Latin America'),[['chile','Chile · 0.315'],['peru','Perú · 0.274'],['colombia','Colombia · 0.179'],['argentina','Argentina · 0.319'],['brasil','Brasil · 0.074'],['mexico','México · 0.452'],['latam',L('LATAM prom. · 0.319','LATAM avg. · 0.319')]]],
                  [L('Norteamérica','North America'),[['usa',L('Estados Unidos · 0.373','United States · 0.373')],['canada',L('Canadá · 0.123','Canada · 0.123')]]],
                  [L('Europa','Europe'),[['uk',L('Reino Unido · 0.207','United Kingdom · 0.207')],['alemania',L('Alemania · 0.363','Germany · 0.363')],['francia',L('Francia · 0.056','France · 0.056')],['espana',L('España · 0.151','Spain · 0.151')],['italia',L('Italia · 0.289','Italy · 0.289')],['paisesbajos',L('Países Bajos · 0.328','Netherlands · 0.328')],['polonia',L('Polonia · 0.662','Poland · 0.662')],['ue27',L('UE-27 prom. · 0.242','EU-27 avg. · 0.242')]]],
                  [L('Asia y Oceanía','Asia & Oceania'),[['china',L('China · 0.582','China · 0.582')],['india',L('India · 0.713','India · 0.713')],['japon',L('Japón · 0.462','Japan · 0.462')],['corea',L('Corea del Sur · 0.437','South Korea · 0.437')],['indonesia','Indonesia · 0.761'],['australia',L('Australia · 0.634','Australia · 0.634')]]],
                ]]
              ].map(([lbl,key,fn,val,opts])=>(
                <div key={lbl}>
                  <div style={{fontSize:10,color:t.textMuted,fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:5,fontFamily:'Plus Jakarta Sans'}}>{lbl}</div>
                  <select value={val} onChange={e=>fn(e.target.value)} style={iSel} aria-label={lbl}>
                    {key==='country'
                      ? opts.map(([grp,items])=>(
                          <optgroup key={grp} label={grp}>
                            {items.map(([k,l])=><option key={k} value={k}>{l} kg/kWh</option>)}
                          </optgroup>
                        ))
                      : opts.map(([k,l])=><option key={k} value={k}>{l}</option>)}
                  </select>
                </div>
              ))}
            </div>
            {Scope({id:'s1', title:L('Alcance 1 · Emisiones Directas','Scope 1 · Direct Emissions'), sub:L('Combustión propia: instalaciones y vehículos','Own combustion: facilities and vehicles'), color:t.accent, val:s1, children:<React.Fragment>
              {Field({label:L('Diésel','Diesel'), k:'diesel', unit:L('L/año','L/yr')})}
              {Field({label:L('Gasolina','Gasoline'), k:'gasolina', unit:L('L/año','L/yr')})}
              {Field({label:L('Gas natural','Natural gas'), k:'gnl', unit:L('m³/año','m³/yr')})}
              <div style={{gridColumn:'span 2',padding:'10px 14px',background:t.accent+'12',borderRadius:8,fontSize:12,color:t.textMuted,fontFamily:'DM Sans'}}>
                {L('Factor diésel','Diesel factor')}: <strong style={{color:t.accent,fontFamily:'DM Mono'}}>2.68</strong> · {L('Gasolina','Gasoline')}: <strong style={{color:t.accent,fontFamily:'DM Mono'}}>2.31</strong> · GNL: <strong style={{color:t.accent,fontFamily:'DM Mono'}}>1.89</strong> kgCO₂e/{L('unidad','unit')}
              </div>
            </React.Fragment>})}
            {Scope({id:'s2', title:L('Alcance 2 · Energía Comprada','Scope 2 · Purchased Energy'), sub:L('Electricidad, vapor y calor adquiridos','Purchased electricity, steam and heat'), color:t.accent2, val:s2, children:
              <div style={{gridColumn:'span 2'}}>
                {Field({label:L('Consumo eléctrico','Electricity use'), k:'elec', unit:L('kWh/año','kWh/yr')})}
                <div style={{marginTop:10,padding:'10px 14px',background:t.accent2+'12',borderRadius:8,fontSize:12,color:t.textMuted}}>
                  {L('Factor red','Grid factor')}: <strong style={{color:t.accent2,fontFamily:'DM Mono'}}>{grids[country]||.319} kgCO₂e/kWh</strong> · {L('Fuentes: IEA, DEFRA 2024 y AEMA','Sources: IEA, DEFRA 2024 and EEA')}
                </div>
              </div>})}
            {Scope({id:'s3', title:L('Alcance 3 · Cadena de Valor','Scope 3 · Value Chain'), sub:L('Viajes de negocio y transporte de carga','Business travel and freight transport'), color:t.warning, val:s3, children:<React.Fragment>
              {Field({label:L('Vuelos de negocio','Business flights'), k:'vuelos', unit:L('km/año','km/yr')})}
              {Field({label:L('Flete de carga','Freight'), k:'flete', unit:L('ton-km/año','ton-km/yr')})}
            </React.Fragment>})}
          </div>
          {/* Results Panel */}
          <div className="calc-result" style={{position:'sticky',top:96,background:t.card,border:`1px solid ${t.border}`,borderRadius:20,padding:26}}>
            <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:t.textMuted,marginBottom:20,fontFamily:'Plus Jakarta Sans'}}>{L('Resultado estimado','Estimated result')}</div>
            <div style={{display:'flex',justifyContent:'center',marginBottom:20}}>
              <div style={{position:'relative',width:150,height:150}}>
                <div style={{width:150,height:150,borderRadius:'50%',
                  background:tot>0?`conic-gradient(${t.accent} 0% ${p(s1)}%,${t.accent2} ${p(s1)}% ${p(s1)+p(s2)}%,${t.warning} ${p(s1)+p(s2)}% 100%)`:t.border,
                  WebkitMaskImage:'radial-gradient(transparent 49px, black 50px)',maskImage:'radial-gradient(transparent 49px, black 50px)',
                  transition:'background .55s'}}/>
                <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center'}}>
                  <div style={{fontSize:tot>999?18:24,fontWeight:800,color:t.text,fontFamily:'Plus Jakarta Sans',lineHeight:1}}>{tot>0?tot.toFixed(1):'—'}</div>
                  <div style={{fontSize:9,color:t.textMuted,fontFamily:'DM Mono',marginTop:2}}>tCO₂e/{L('año','yr')}</div>
                </div>
              </div>
            </div>
            {tot>0&&(
              <div style={{textAlign:'center',marginBottom:18,padding:'10px 0',borderTop:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`}}>
                <span style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:13,color:t.textMuted,fontFamily:'DM Sans'}}>
                  {L('Clasificación ESG','ESG rating')}:
                  <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:30,height:30,borderRadius:7,background:gr.c+'22',border:`1px solid ${gr.c}44`,color:gr.c,fontWeight:800,fontSize:15,fontFamily:'Plus Jakarta Sans'}}>{gr.g}</span>
                </span>
              </div>
            )}
            {[[L('Alcance 1','Scope 1'),s1,t.accent],[L('Alcance 2','Scope 2'),s2,t.accent2],[L('Alcance 3','Scope 3'),s3,t.warning]].map(([l,val,c])=>(
              <div key={l} style={{marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
                  <span style={{fontSize:11,color:t.textMuted,display:'flex',alignItems:'center',gap:5}}>
                    <span style={{width:7,height:7,borderRadius:'50%',background:c,display:'inline-block'}}/>{l}
                  </span>
                  <span style={{fontSize:11,fontFamily:'DM Mono',color:t.text}}>{val.toFixed(2)} t</span>
                </div>
                <div style={{height:5,borderRadius:3,background:t.border,overflow:'hidden'}}>
                  <div style={{height:'100%',width:tot>0?`${p(val)}%`:'0%',background:c,borderRadius:3,transition:'width .55s'}}/>
                </div>
              </div>
            ))}
            <button onClick={goShop} style={{marginTop:20,width:'100%',padding:14,background:t.cta,color:t.ctaText,border:'none',borderRadius:10,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'Plus Jakarta Sans',transition:'opacity .2s'}}
              onMouseEnter={e=>e.currentTarget.style.opacity='.82'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
              {L('Ver plantillas profesionales →','See professional templates →')}
            </button>
            <p style={{textAlign:'center',fontSize:10,color:t.textFaint,marginTop:8,lineHeight:1.5,fontFamily:'DM Sans'}}>{L('Estimación referencial · Metodología GHG Protocol Corporate Standard','Reference estimate · GHG Protocol Corporate Standard methodology')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
window.EcoCalculator = EcoCalculator;
