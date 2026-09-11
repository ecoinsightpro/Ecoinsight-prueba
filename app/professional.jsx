/* ═══════════════════════════════════════════════════════════
   EcoInsight · SECCIONES PROFESIONALES
   Qué hay dentro · Metodología y factores · Licencia profesional
   Datos verificables tomados del propio archivo y su manual v1.
   ═══════════════════════════════════════════════════════════ */

const SHOTS = {
  dashboard:'assets/shot-dashboard.png',
  database:'assets/shot-database.png',
  instructions:'assets/shot-instructions.png',
};

/* ═══ QUÉ HAY DENTRO — anatomía real del archivo ═══ */
function EcoInside({t, lang}){
  const L = window.makeL(lang);
  const Reveal = window.Reveal;
  const TABS = [
    {id:'dashboard', img:SHOTS.dashboard,
     label:L('Panel mensual','Monthly dashboard'),
     title:L('Panel de resultados automático','Automatic results panel'),
     body:L('Emisiones totales anuales, desglose por Alcance 1, 2 y 3, KPI de intensidad (tCO₂e por trabajador, unidad o tonelada) y evolución mes a mes. Se recalcula solo al ingresar los datos.',
            'Total annual emissions, breakdown by Scope 1, 2 and 3, intensity KPI (tCO₂e per worker, unit or ton) and month-by-month evolution. It recalculates itself as you enter data.')},
    {id:'database', img:SHOTS.database,
     label:L('Base de datos','Database'),
     title:L('Carga mensual por fuente de emisión','Monthly entry by emission source'),
     body:L('Seleccionas la fuente desde una lista desplegable y la categoría, el alcance y la unidad se completan solos. Tablas de emisiones por alcance y por categoría, enero a diciembre.',
            'You pick the source from a drop-down and category, scope and unit fill in automatically. Emissions tables by scope and by category, January to December.')},
    {id:'instructions', img:SHOTS.instructions,
     label:L('Instrucciones','Instructions'),
     title:L('Manual de uso incluido','User manual included'),
     body:L('Hoja de instrucciones dentro del archivo y manual en PDF de 12 páginas: requisitos, carga de datos, buenas prácticas y flujo de trabajo mensual recomendado.',
            'Instructions sheet inside the file plus a 12-page PDF manual: prerequisites, data entry, good practice and the recommended monthly workflow.')},
  ];
  const [tab, setTab] = React.useState('dashboard');
  const cur = TABS.find(x=>x.id===tab) || TABS[0];
  const SHEETS = [
    ['Introducción', L('Marco conceptual GHG Protocol','GHG Protocol framework')],
    ['Instrucciones', L('Guía rápida de uso','Quick usage guide')],
    [L('Huella de Carbono','Carbon Footprint'), L('Carga de datos y resumen','Data entry and summary')],
    ['Cal_Carbon_Footprint', L('Cálculo por fuente y mes','Calculation by source and month')],
    ['FE', L('Factores de emisión','Emission factors')],
    ['List', L('Listas desplegables','Drop-down lists')],
  ];
  return (
    <section id="dentro" style={{background:t.surface,borderTop:`1px solid ${t.border}`,padding:'96px 0',scrollMarginTop:84}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:'0 32px'}}>
        <Reveal>
        <div style={{marginBottom:38,maxWidth:640}}>
          <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',color:t.accent,marginBottom:14,fontFamily:'Plus Jakarta Sans'}}>{L('Qué hay dentro','What\u2019s inside')}</div>
          <h2 style={{fontSize:'clamp(30px,3.6vw,42px)',fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.1,letterSpacing:'-.025em',marginBottom:14}}>{L('Mira el archivo real antes de comprar','See the real file before you buy')}</h2>
          <p style={{fontSize:16.5,color:t.textMuted,lineHeight:1.65,fontFamily:'DM Sans'}}>{L('Sin capturas de marketing: estas son pantallas del entregable que recibes.','No marketing mockups: these are screens of the actual deliverable you receive.')}</p>
        </div>
        </Reveal>
        <Reveal delay={70}>
        <div style={{display:'flex',gap:8,marginBottom:18,flexWrap:'wrap'}}>
          {TABS.map(x=>(
            <button key={x.id} onClick={()=>setTab(x.id)} aria-pressed={tab===x.id}
              style={{padding:'9px 18px',borderRadius:10,border:`1px solid ${tab===x.id?t.accent:t.border}`,background:tab===x.id?t.accent:t.card,color:tab===x.id?t.ctaText:t.textMuted,fontSize:13,fontWeight:700,cursor:'pointer',transition:'all .18s',fontFamily:'Plus Jakarta Sans'}}>{x.label}</button>
          ))}
        </div>
        <div className="inside-grid" style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:24,alignItems:'start'}}>
          <div style={{border:`1px solid ${t.border}`,borderRadius:16,overflow:'hidden',background:t.card,boxShadow:`0 20px 50px rgba(0,0,0,${t.dark?.4:.09})`,display:'flex',flexDirection:'column'}}>
            <div style={{display:'flex',alignItems:'center',gap:7,padding:'10px 14px',borderBottom:`1px solid ${t.border}`,background:t.surface,flexShrink:0}}>
              {['#E8635A','#E5B84B','#5BB65E'].map(c=><span key={c} style={{width:10,height:10,borderRadius:'50%',background:c,display:'inline-block'}}/>)}
              <span style={{marginLeft:8,fontSize:11,color:t.textMuted,fontFamily:'DM Mono'}}>EcoInsight_Carbon_Footprint.xlsx</span>
            </div>
            <div style={{width:'100%',aspectRatio:'1529 / 744',background:t.surface,display:'flex',alignItems:'center',justifyContent:'center',padding:12}}>
              <img src={cur.img} alt={cur.title} loading="lazy" style={{display:'block',width:'100%',height:'100%',objectFit:'contain',borderRadius:8}}/>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:18}}>
            <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:'20px 22px',flexShrink:0}}>
              <h3 style={{fontSize:17,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,marginBottom:10,lineHeight:1.3}}>{cur.title}</h3>
              <p style={{fontSize:14,color:t.textMuted,lineHeight:1.65,fontFamily:'DM Sans',textWrap:'pretty'}}>{cur.body}</p>
            </div>
            <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:'20px 22px'}}>
              <div style={{fontSize:10.5,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:t.textMuted,marginBottom:14,fontFamily:'Plus Jakarta Sans'}}>{L('6 hojas incluidas','6 sheets included')}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {SHEETS.map(([nm,desc],i)=>(
                  <div key={nm} style={{display:'flex',gap:11,alignItems:'baseline'}}>
                    <span style={{fontSize:10,fontFamily:'DM Mono',color:t.accent,flexShrink:0,width:14}}>{String(i+1).padStart(2,'0')}</span>
                    <div style={{minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:700,fontFamily:'Plus Jakarta Sans',color:t.text}}>{nm}</div>
                      <div style={{fontSize:11.5,color:t.textMuted,fontFamily:'DM Sans',lineHeight:1.45}}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
window.EcoInside = EcoInside;

/* ═══ METODOLOGÍA Y FACTORES DE EMISIÓN ═══ */
function EcoMethodology({t, lang}){
  const L = window.makeL(lang);
  const Reveal = window.Reveal;
  const SCOPES = [
    {n:'1', c:t.accent, ttl:L('Alcance 1 · Emisiones directas','Scope 1 · Direct emissions'),
     items:[L('Combustión estacionaria: GLP, gas natural, diésel','Stationary combustion: LPG, natural gas, diesel'),
            L('Combustión móvil: flota propia','Mobile combustion: own fleet'),
            L('Emisiones fugitivas: refrigerantes R507, R407A','Fugitive emissions: R507, R407A refrigerants')]},
    {n:'2', c:t.accent2, ttl:L('Alcance 2 · Energía comprada','Scope 2 · Purchased energy'),
     items:[L('Electricidad importada de la red','Imported grid electricity'),
            L('Factor de red configurable','Configurable grid factor')]},
    {n:'3', c:t.warning, ttl:L('Alcance 3 · Otras indirectas','Scope 3 · Other indirect'),
     items:[L('Adquisición de bienes y servicios','Acquisition of goods and services'),
            L('Transporte de personas y carga','Passenger and freight transport'),
            L('Tratamiento y disposición de residuos','Waste treatment and disposal')]},
  ];
  const FACTORS = [
    ['1', L('GLP estacionario','Stationary LPG'), '1,590', 'm³', 'IPCC 2006'],
    ['1', L('Gas natural estacionario','Stationary natural gas'), '1,98', 'm³', 'IPCC 2006'],
    ['1', L('Diésel estacionario','Stationary diesel'), '2,710', 'm³', 'IPCC 2006'],
    ['1', L('Refrigerante R507','R507 refrigerant'), '3,985', 'kg', 'IPCC 2006 Vol.3'],
    ['2', L('Electricidad (global)','Electricity (global)'), '0,233', 'kWh', 'DEFRA 2024'],
    ['3', L('Papel virgen','Virgin paper'), '1.339,3', 'ton', 'DEFRA 2024'],
    ['3', L('Transporte público · bus','Public transport · bus'), '0,108', 'km-pax', 'DEFRA 2024'],
  ];
  const sc = n => n==='1'?t.accent : n==='2'?t.accent2 : t.warning;
  return (
    <section id="metodologia" style={{background:t.bg,borderTop:`1px solid ${t.border}`,padding:'96px 0',scrollMarginTop:84}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:'0 32px'}}>
        <Reveal>
        <div style={{marginBottom:44,maxWidth:660}}>
          <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',color:t.accent,marginBottom:14,fontFamily:'Plus Jakarta Sans'}}>{L('Metodología','Methodology')}</div>
          <h2 style={{fontSize:'clamp(30px,3.6vw,42px)',fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.1,letterSpacing:'-.025em',marginBottom:14}}>{L('Factores trazables, cálculo auditable','Traceable factors, auditable calculation')}</h2>
          <p style={{fontSize:16.5,color:t.textMuted,lineHeight:1.65,fontFamily:'DM Sans'}}>{L('La estructura sigue el GHG Protocol Corporate Standard y cada factor de emisión está referenciado a su fuente oficial. Puedes defender el resultado frente a tu cliente, tu auditor o tu directorio.','The structure follows the GHG Protocol Corporate Standard and every emission factor is referenced to its official source. You can defend the result in front of your client, your auditor or your board.')}</p>
        </div>
        </Reveal>
        {/* scopes */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:18,marginBottom:22,alignItems:'stretch'}}>
          {SCOPES.map((s,i)=>(
            <Reveal key={s.n} delay={i*70} style={{height:'100%'}}>
            <div style={{background:t.card,border:`1px solid ${t.border}`,borderTop:`3px solid ${s.c}`,borderRadius:14,padding:'22px 22px 20px',height:'100%',boxSizing:'border-box'}}>
              <div style={{display:'flex',alignItems:'center',gap:11,marginBottom:14}}>
                <span style={{width:32,height:32,borderRadius:9,background:s.c+'1E',color:s.c,display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:800,fontFamily:'Plus Jakarta Sans',flexShrink:0}}>{s.n}</span>
                <h3 style={{fontSize:14.5,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.3}}>{s.ttl}</h3>
              </div>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                {s.items.map(it=>(
                  <li key={it} style={{display:'flex',gap:9,fontSize:13.5,color:t.textMuted,fontFamily:'DM Sans',lineHeight:1.5}}>
                    <span style={{width:5,height:5,borderRadius:'50%',background:s.c,marginTop:7,flexShrink:0}}/>{it}
                  </li>
                ))}
              </ul>
            </div>
            </Reveal>
          ))}
        </div>
        {/* factor table + sources */}
        <div className="meth-grid" style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:22,alignItems:'stretch'}}>
          <Reveal style={{height:'100%'}}>
          <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:16,overflow:'hidden',height:'100%',display:'flex',flexDirection:'column',boxSizing:'border-box'}}>
            <div style={{padding:'16px 22px',borderBottom:`1px solid ${t.border}`,display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
              <span style={{fontSize:13,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text}}>{L('Extracto de la hoja de factores','Extract from the factors sheet')}</span>
              <span style={{fontSize:10.5,color:t.textFaint,fontFamily:'DM Mono'}}>{L('52 fuentes de emisión en total','52 emission sources in total')}</span>
            </div>
            <div style={{overflowX:'auto',flex:1}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontFamily:'DM Sans',fontSize:13,minWidth:520}}>
                <thead>
                  <tr style={{background:t.surface}}>
                    {[L('Alcance','Scope'),L('Fuente','Source'),L('Factor','Factor'),L('Unidad','Unit'),L('Origen','Origin')].map(h=>(
                      <th key={h} style={{textAlign:'left',padding:'11px 16px',fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',color:t.textMuted,fontFamily:'Plus Jakarta Sans',whiteSpace:'nowrap'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FACTORS.map((r,i)=>(
                    <tr key={i} style={{borderTop:`1px solid ${t.border}`}}>
                      <td style={{padding:'11px 16px'}}><span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:22,height:22,borderRadius:6,background:sc(r[0])+'1E',color:sc(r[0]),fontSize:11,fontWeight:800,fontFamily:'Plus Jakarta Sans'}}>{r[0]}</span></td>
                      <td style={{padding:'11px 16px',color:t.text}}>{r[1]}</td>
                      <td style={{padding:'11px 16px',color:t.text,fontFamily:'DM Mono',whiteSpace:'nowrap'}}>{r[2]}</td>
                      <td style={{padding:'11px 16px',color:t.textMuted,fontFamily:'DM Mono',whiteSpace:'nowrap'}}>{r[3]}</td>
                      <td style={{padding:'11px 16px',color:t.textFaint,fontSize:12,whiteSpace:'nowrap'}}>{r[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{padding:'13px 22px',borderTop:`1px solid ${t.border}`,background:t.surface,fontSize:11.5,color:t.textMuted,fontFamily:'DM Sans',lineHeight:1.5,flexShrink:0}}>
              {L('Factores en kgCO₂e por unidad. La hoja completa viene bloqueada para evitar alteraciones accidentales del cálculo.','Factors in kgCO₂e per unit. The full sheet ships locked to prevent accidental changes to the calculation.')}
            </div>
          </div>
          </Reveal>
          <Reveal delay={80} style={{height:'100%'}}>
          <div style={{display:'flex',flexDirection:'column',gap:14,height:'100%'}}>
            {[['IPCC 2006', L('Directrices para inventarios nacionales de GEI. Base de los factores de combustión y refrigerantes.','Guidelines for national GHG inventories. Basis for combustion and refrigerant factors.')],
              ['DEFRA 2024', L('Factores de conversión del Gobierno del Reino Unido. Electricidad, transporte, bienes y residuos.','UK Government conversion factors. Electricity, transport, goods and waste.')],
              ['GHG Protocol', L('Corporate Accounting and Reporting Standard. Define la estructura de alcances 1, 2 y 3.','Corporate Accounting and Reporting Standard. Defines the Scope 1, 2 and 3 structure.')]].map(([nm,desc])=>(
              <div key={nm} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:13,padding:'17px 19px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center',boxSizing:'border-box'}}>
                <div style={{fontSize:13.5,fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.accent,marginBottom:7}}>{nm}</div>
                <p style={{fontSize:12.5,color:t.textMuted,lineHeight:1.55,fontFamily:'DM Sans'}}>{desc}</p>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
window.EcoMethodology = EcoMethodology;

/* ═══ LICENCIA PROFESIONAL + PERSONALIZACIÓN ═══ */
function EcoLicense({t, lang}){
  const L = window.makeL(lang);
  const Reveal = window.Reveal;
  const goContact = () => { const el=document.querySelector('#contacto')||document.querySelector('#marketplace'); el&&el.scrollIntoView({behavior:'smooth',block:'start'}); };
  const goShop = () => { const el=document.querySelector('#marketplace'); el&&el.scrollIntoView({behavior:'smooth',block:'start'}); };
  const ALLOWED = [
    L('Usarla en proyectos de tus propios clientes, sin límite de proyectos','Use it on your own clients\u2019 projects, with no project limit'),
    L('Rebrandear el reporte con el logo y colores de tu consultora','Re-brand the report with your firm\u2019s logo and colours'),
    L('Adaptar fuentes, categorías y periodos a cada operación','Adapt sources, categories and periods to each operation'),
    L('Reutilizarla año tras año sin pagos recurrentes','Reuse it year after year with no recurring fees'),
  ];
  return (
    <section id="licencia" style={{background:t.surface,borderTop:`1px solid ${t.border}`,padding:'96px 0',scrollMarginTop:84}}>
      <div style={{maxWidth:1180,margin:'0 auto',padding:'0 32px'}}>
        <Reveal>
        <div style={{background:t.card,border:`1px solid ${t.accent}44`,borderRadius:22,padding:'42px 44px 38px',position:'relative',overflow:'hidden'}}>
          <div aria-hidden="true" style={{position:'absolute',inset:0,background:`radial-gradient(880px 320px at 94% -12%, ${t.accent}16, transparent 68%)`,pointerEvents:'none'}}/>
          <div style={{position:'relative'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:t.accentDim,border:`1px solid ${t.accent}35`,borderRadius:20,padding:'5px 14px',marginBottom:20}}>
              <span style={{color:t.accent,fontSize:11,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',fontFamily:'Plus Jakarta Sans'}}>{L('Para consultoras','For consultancies')}</span>
            </div>
            <h2 style={{fontSize:'clamp(28px,3.3vw,38px)',fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.12,letterSpacing:'-.028em',marginBottom:16,maxWidth:620}}>{L('Licencia de uso profesional con tus clientes','Professional licence to use with your clients')}</h2>
            <p style={{fontSize:16.5,color:t.textMuted,lineHeight:1.65,fontFamily:'DM Sans',marginBottom:32,maxWidth:620,textWrap:'pretty'}}>{L('Compras una vez y la usas en todos los encargos que quieras. Sin licencias por asiento, sin suscripción y sin pedir permiso por cada proyecto.','Buy once and use it on as many engagements as you like. No per-seat licences, no subscription, no asking permission per project.')}</p>
            <div className="lic-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'18px 34px',marginBottom:34}}>
              {ALLOWED.map(x=>(
                <div key={x} style={{display:'flex',gap:13,alignItems:'flex-start'}}>
                  <span style={{flexShrink:0,width:22,height:22,borderRadius:'50%',background:t.accent+'1E',color:t.accent,display:'inline-flex',alignItems:'center',justifyContent:'center',marginTop:1}}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span style={{fontSize:15,color:t.text,fontFamily:'DM Sans',lineHeight:1.55,textWrap:'pretty'}}>{x}</span>
                </div>
              ))}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:18,flexWrap:'wrap',paddingTop:26,borderTop:`1px solid ${t.border}`}}>
              <button onClick={goShop} style={{background:t.cta,color:t.ctaText,border:'none',borderRadius:10,padding:'15px 30px',fontSize:15,fontWeight:700,cursor:'pointer',fontFamily:'Plus Jakarta Sans',transition:'opacity .2s',flexShrink:0}}
                onMouseEnter={e=>e.currentTarget.style.opacity='.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>{L('Ver plantillas y comprar','See templates and buy')} →</button>
              <p style={{fontSize:12.5,color:t.textMuted,fontFamily:'DM Sans',lineHeight:1.55,margin:0,maxWidth:360}}>{L('Única restricción: no revender ni redistribuir el archivo como producto propio.','Only restriction: do not resell or redistribute the file as your own product.')}</p>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
window.EcoLicense = EcoLicense;

/* ═══ CONTACTO — destino del CTA de cotización (monta el formulario Formspree) ═══ */
function EcoContact({t, lang}){
  const L = window.makeL(lang);
  const Reveal = window.Reveal;
  return (
    <section id="contacto" style={{background:t.bg,borderTop:`1px solid ${t.border}`,padding:'96px 0',scrollMarginTop:84}}>
      <div style={{maxWidth:820,margin:'0 auto',padding:'0 32px'}}>
        <Reveal>
        <div style={{textAlign:'center',marginBottom:36}}>
          <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',color:t.accent,marginBottom:14,fontFamily:'Plus Jakarta Sans'}}>{L('Contacto','Contact')}</div>
          <h2 style={{fontSize:'clamp(28px,3.4vw,40px)',fontWeight:800,fontFamily:'Plus Jakarta Sans',color:t.text,lineHeight:1.12,letterSpacing:'-.025em',marginBottom:14}}>{L('Cuéntanos qué necesitas adaptar','Tell us what you need adapted')}</h2>
          <p style={{fontSize:16,color:t.textMuted,lineHeight:1.65,fontFamily:'DM Sans',maxWidth:560,margin:'0 auto'}}>{L('Personalización de la plantilla, factores de tu país o sector, o formato de reporte para tu cliente final. Respondemos con alcance y precio.','Template customisation, country- or sector-specific factors, or a report format for your end client. We reply with scope and price.')}</p>
        </div>
        </Reveal>
        <Reveal delay={70}><window.EcoLeadForm t={t} lang={lang}/></Reveal>
      </div>
    </section>
  );
}
window.EcoContact = EcoContact;
