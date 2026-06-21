/* ═══════════════════════════════════════════════════════════
   EcoInsight · DATA + THEMES + i18n helper
   Visual identity preserved from EcoInsight Identity.html
   ═══════════════════════════════════════════════════════════ */

const THEMES = {
  navy: {
    id:'navy', label:'Navy Command', tagline:'Oscuro · Marca fiel', dot:'#4DB87A', dark:true,
    bg:'#0D1C32', surface:'#122040', card:'#192C52', cardHover:'#1F3561',
    border:'#223660', borderStrong:'#2C4880',
    accent:'#4DB87A', accentDim:'rgba(77,184,122,.13)', accent2:'#3B8FDB', accent2Dim:'rgba(59,143,219,.13)',
    text:'#E6EDF8', textMuted:'#7A9BBF', textFaint:'#3A5578',
    cta:'#4DB87A', ctaText:'#0A1820',
    positive:'#4DB87A', warning:'#D4973A', warningDim:'rgba(212,151,58,.13)', critical:'#D4503A',
    heroBg:'radial-gradient(ellipse 90% 70% at 72% 28%, rgba(77,184,122,.08) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(59,143,219,.07) 0%, transparent 50%), #0D1C32',
  },
  forest: {
    id:'forest', label:'Forest Carbon', tagline:'Oscuro · Natural', dot:'#5DCF8A', dark:true,
    bg:'#0B0F0C', surface:'#111A14', card:'#162019', cardHover:'#1C2920',
    border:'#1E3426', borderStrong:'#2D4A35',
    accent:'#4DB87A', accentDim:'rgba(77,184,122,.13)', accent2:'#3B8FDB', accent2Dim:'rgba(59,143,219,.13)',
    text:'#EBF0EC', textMuted:'#7A9A82', textFaint:'#3A5542',
    cta:'#4DB87A', ctaText:'#080E09',
    positive:'#4DB87A', warning:'#D4973A', warningDim:'rgba(212,151,58,.13)', critical:'#D4503A',
    heroBg:'radial-gradient(ellipse 80% 60% at 70% 28%, rgba(77,184,122,.09) 0%, transparent 58%), radial-gradient(ellipse 50% 40% at 18% 78%, rgba(59,143,219,.06) 0%, transparent 48%), repeating-linear-gradient(0deg,transparent 0,transparent 47px,rgba(255,255,255,.017) 47px,rgba(255,255,255,.017) 48px), repeating-linear-gradient(90deg,transparent 0,transparent 47px,rgba(255,255,255,.017) 47px,rgba(255,255,255,.017) 48px), #0B0F0C',
  },
  nordic: {
    id:'nordic', label:'Nordic Light', tagline:'Claro · Corporativo', dot:'#154A2E', dark:false,
    bg:'#F3F5F0', surface:'#FFFFFF', card:'#ECEEED', cardHover:'#E5E8E3',
    border:'#D5DBD2', borderStrong:'#B4BEB0',
    accent:'#1E6641', accentDim:'rgba(30,102,65,.10)', accent2:'#1D5FA3', accent2Dim:'rgba(29,95,163,.10)',
    text:'#0E1A10', textMuted:'#50705A', textFaint:'#5A7662',
    cta:'#1E6641', ctaText:'#FFFFFF',
    positive:'#1E6641', warning:'#9B6A1A', warningDim:'rgba(155,106,26,.10)', critical:'#9B3A2A',
    heroBg:'radial-gradient(ellipse 65% 55% at 84% 18%, rgba(30,102,65,.07) 0%, transparent 52%), radial-gradient(ellipse 42% 35% at 88% 78%, rgba(29,95,163,.05) 0%, transparent 42%), #F3F5F0',
  },
};
window.THEMES = THEMES;

/* i18n — components receive `lang` ('es'|'en') and call L(es,en) */
window.makeL = (lang) => (es, en) => (lang === 'en' ? en : es);

/* ═══ NEWS (rich, bilingual) ═══ */
const NEWS = [
  {
    id:1, cat:'Regulación', src:'El Desconcierto', url:'https://eldesconcierto.cl/hoja-ruta/chile-mejora-el-estandar-esg-brechas-empresas-el-cumplimiento-nuevas-exigencias-reporte-n5458729', date:'12 May 2026', time:'1 mes', read:'5 min', th:'report', featured:true,
    title:{es:'Chile eleva el estándar ESG: la NCG 519 y las NIIF S1/S2 redefinen el reporte corporativo',
           en:'Chile raises the ESG bar: NCG 519 and IFRS S1/S2 reshape corporate reporting'},
    summary:{es:'La entrada en vigencia de la NCG 519 y la adopción de las NIIF S1 y S2 marcan un cambio estructural: las empresas deben integrar la sostenibilidad en su estrategia, no solo cumplir formalmente.',
             en:'The NCG 519 taking effect and the adoption of IFRS S1 and S2 mark a structural shift: companies must embed sustainability into strategy, not merely comply on paper.'},
    impactChile:{es:'Las empresas reguladas por la CMF deben alinear sus reportes con estándares internacionales y cerrar la brecha de capacidades internas.',
                 en:'CMF-regulated firms must align reports with international standards and close their internal capability gap.'},
    impactEmpresas:{es:'El desafío ya no es técnico sino de gestión: se requieren datos trazables y gobernanza robusta para sostener el reporte.',
                    en:'The challenge is no longer technical but managerial: traceable data and robust governance are needed to sustain reporting.'},
    body:{es:['La regulación de sostenibilidad en Chile está elevando la vara para las empresas, que deben pasar del cumplimiento formal a una gestión estratégica de sus impactos ambientales, sociales y de gobernanza.',
              'Especialistas advierten que el principal obstáculo ya no es la metodología, sino la capacidad de las organizaciones para gestionar de forma transversal y con datos confiables.'],
          en:['Sustainability regulation in Chile is raising the bar for companies, which must move from formal compliance to strategic management of their environmental, social and governance impacts.',
              'Specialists warn the main obstacle is no longer methodology but organizations\u2019 ability to manage cross-functionally and with reliable data.']},
  },
  {
    id:2, cat:'ESG', src:'ESG Hoy', url:'https://www.esghoy.cl/chile-33-empresas-sustainability-yearbook-2026/', date:'23 Feb 2026', time:'2 meses', read:'3 min', th:'esg',
    title:{es:'33 empresas chilenas figuran en el Sustainability Yearbook 2026 de S&P Global',
           en:'33 Chilean companies make S&P Global\u2019s 2026 Sustainability Yearbook'},
    summary:{es:'Basado en el Corporate Sustainability Assessment, el ranking ubica a CMPC en el 1% global y consolida la presencia de banca, energía y retail chilenos entre los líderes ESG.',
             en:'Based on the Corporate Sustainability Assessment, the ranking places CMPC in the global top 1% and consolidates Chilean banking, energy and retail among ESG leaders.'},
    impactChile:{es:'Refuerza la reputación de Chile como mercado ESG maduro de la región y eleva el estándar para el resto del sector privado.',
                 en:'It strengthens Chile\u2019s reputation as a mature regional ESG market and raises the bar for the rest of the private sector.'},
    impactEmpresas:{es:'Aparecer en rankings reconocidos por inversionistas mejora el acceso a capital; quedar fuera implica mayor escrutinio.',
                    en:'Appearing in investor-recognized rankings improves access to capital; being left out means greater scrutiny.'},
    body:{es:['El Sustainability Yearbook de S&P Global es uno de los referentes más seguidos por inversionistas para evaluar el desempeño en sostenibilidad de las compañías cotizadas.',
              'La inclusión de 33 firmas chilenas refleja el avance del país en reportabilidad y gestión de criterios ambientales, sociales y de gobernanza.'],
          en:['S&P Global\u2019s Sustainability Yearbook is one of the most closely watched references for investors assessing listed companies\u2019 sustainability performance.',
              'The inclusion of 33 Chilean firms reflects the country\u2019s progress in reporting and managing environmental, social and governance criteria.']},
  },
  {
    id:3, cat:'ESG', src:'Tiempos Sustentables', url:'https://tiempossustentables.cl/2026/06/09/grieta-esg-chile-regulacion-empresa-2026/', date:'09 Jun 2026', time:'4 días', read:'6 min', th:'esg',
    title:{es:'ESG en Chile: la brecha estratégica que los directorios deben cerrar en 2026',
           en:'ESG in Chile: the strategic gap boards must close in 2026'},
    summary:{es:'Menos del 26% de las empresas reguladas integra riesgos climáticos y de sostenibilidad en su gestión financiera; la falta de datos trazables amenaza el acceso al mercado de capitales.',
             en:'Fewer than 26% of regulated companies integrate climate and sustainability risks into financial management; the lack of traceable data threatens access to capital markets.'},
    impactChile:{es:'Cerca del 40% de la deuda soberana chilena está vinculada a criterios ESG, condicionando el acceso al financiamiento.',
                 en:'About 40% of Chile\u2019s sovereign debt is linked to ESG criteria, conditioning access to financing.'},
    impactEmpresas:{es:'Los directorios deben realizar diagnósticos y auditorías de sus datos antes de fin de año para evitar mayores costos de financiamiento.',
                    en:'Boards should run diagnostics and audits of their data before year-end to avoid higher financing costs.'},
    body:{es:['Cuando la normativa avanza más rápido que la gobernanza corporativa, el riesgo deja de ser reputacional y se vuelve financiero y de mercado.',
              'El cumplimiento formal es alto, pero la alineación estratégica con las NIIF S1 y S2 sigue siendo baja, lo que expone a las firmas a sanciones y a un mayor costo de capital.'],
          en:['When regulation advances faster than corporate governance, the risk stops being reputational and becomes financial and market-related.',
              'Formal compliance is high, but strategic alignment with IFRS S1 and S2 remains low, exposing firms to sanctions and a higher cost of capital.']},
  },
  {
    id:4, cat:'ESG', src:'24Horas', url:'https://www.24horas.cl/actualidad/economia/nuevo-estandar-del-mercado-sostenibilidad-pasa-de-ser-reputacion-a-un', date:'28 May 2026', time:'2 sem', read:'4 min', th:'report',
    title:{es:'La sostenibilidad deja de ser reputación y se vuelve clave para el financiamiento en Chile',
           en:'Sustainability shifts from reputation to a key driver of financing in Chile'},
    summary:{es:'La emisión de bonos sostenibles creció 132% en un año. Expertos advierten que las empresas sin métricas ESG claras arriesgan quedar fuera del mercado de capitales.',
             en:'Sustainable bond issuance grew 132% in a year. Experts warn that companies without clear ESG metrics risk being shut out of capital markets.'},
    impactChile:{es:'Solo el 35% de las compañías chilenas cuenta con sistemas de datos ESG robustos, evidenciando una brecha de preparación.',
                 en:'Only 35% of Chilean companies have robust ESG data systems, revealing a readiness gap.'},
    impactEmpresas:{es:'La banca eleva su vara: ya no bastan los discursos, se exige evidencia técnica trazable y auditable.',
                    en:'Banks are raising the bar: rhetoric is no longer enough, traceable and auditable technical evidence is required.'},
    body:{es:['El mercado financiero chileno vive un cambio estructural: la sostenibilidad se convierte en un factor decisivo para captar inversión y mantener la competitividad.',
              'Las entidades financieras incorporan criterios ESG como requisito mínimo y desarrollan instrumentos sostenibles para premiar a las empresas mejor preparadas.'],
          en:['Chile\u2019s financial market is undergoing a structural change: sustainability is becoming a decisive factor for attracting investment and staying competitive.',
              'Financial institutions are adopting ESG criteria as a minimum requirement and developing sustainable instruments to reward better-prepared companies.']},
  },
  {
    id:5, cat:'Energía', src:'Reporte Minero', url:'https://www.reporteminero.cl/noticia/noticias/2026/01/chile-hoja-ruta-transicion-energetica-2050-iea', date:'15 Ene 2026', time:'5 meses', read:'5 min', th:'inventory',
    title:{es:'Chile traza su hoja de ruta energética al 2050: las renovables superarían el 95% de la generación',
           en:'Chile maps its 2050 energy roadmap: renewables would exceed 95% of generation'},
    summary:{es:'Según el informe de la Agencia Internacional de Energía, las emisiones energéticas de Chile caerían de 72 a 16 millones de toneladas de CO₂ hacia 2050, clave para la carbono neutralidad.',
             en:'Per the International Energy Agency report, Chile\u2019s energy emissions would fall from 72 to 16 million tonnes of CO₂ by 2050, key to carbon neutrality.'},
    impactChile:{es:'El sector energético concentra cerca del 75% de las emisiones del país, por lo que su transformación define el cumplimiento de las metas climáticas.',
                 en:'The energy sector accounts for about 75% of national emissions, so its transformation defines whether climate targets are met.'},
    impactEmpresas:{es:'Una matriz más limpia reduce el factor de red y, con ello, las emisiones de Alcance 2 de las empresas.',
                    en:'A cleaner grid lowers the emission factor and, with it, companies\u2019 Scope 2 emissions.'},
    body:{es:['El informe Chile 2050 Energy Transition Roadmap, elaborado por la IEA a solicitud del Gobierno, define el camino hacia la carbono neutralidad consagrada en la Ley Marco de Cambio Climático.',
              'Las renovables ya rondan el 70% de la generación y se proyecta que superen el 95% hacia 2035, impulsadas por solar y eólica con respaldo de almacenamiento.'],
          en:['The Chile 2050 Energy Transition Roadmap, prepared by the IEA at the government\u2019s request, sets the path to the carbon neutrality enshrined in the Framework Law on Climate Change.',
              'Renewables already account for around 70% of generation and are projected to exceed 95% by 2035, driven by solar and wind backed by storage.']},
  },
  {
    id:6, cat:'Minería', src:'Minería & Desarrollo', url:'https://www.mineriaydesarrollo.com/noticias/2026/05/19/24459-estiman-que-para-2030-la-mineria-del-cobre-en-chile-operara-con-99por_ciento-de-energia-renovable', date:'19 May 2026', time:'3 sem', read:'4 min', th:'carbon',
    title:{es:'Cochilco proyecta que la minería del cobre operará con 99% de energía renovable al 2030',
           en:'Cochilco projects copper mining will run on 99% renewable energy by 2030'},
    summary:{es:'La Comisión Chilena del Cobre estima que casi toda la electricidad del sector minero provendrá de fuentes renovables, consolidando al cobre como recurso estratégico de la transición.',
             en:'The Chilean Copper Commission estimates nearly all mining electricity will come from renewables, consolidating copper as a strategic transition resource.'},
    impactChile:{es:'El consumo eléctrico minero crecería de 28 TWh en 2025 a 33 TWh en 2034, abastecido por una matriz cada vez más limpia.',
                 en:'Mining electricity use would grow from 28 TWh in 2025 to 33 TWh in 2034, supplied by an increasingly clean grid.'},
    impactEmpresas:{es:'Proveedores y operaciones que demuestren electricidad renovable verificable tendrán ventaja competitiva.',
                    en:'Suppliers and operations that can prove verifiable renewable electricity will gain a competitive edge.'},
    body:{es:['El cobre deja de ser solo un commodity industrial para consolidarse como recurso clave de la economía baja en emisiones, presente en vehículos eléctricos, redes y almacenamiento.',
              'La descarbonización de la minería chilena avanza de la mano de la expansión renovable y de inversiones en desalación y eficiencia.'],
          en:['Copper is moving beyond an industrial commodity to become a key resource of the low-emission economy, present in electric vehicles, grids and storage.',
              'Decarbonization of Chilean mining advances alongside renewable expansion and investment in desalination and efficiency.']},
  },
  {
    id:7, cat:'Minería', src:'Rumbo Minero', url:'https://www.rumbominero.com/chile/mineria-chilena-reduccion-co2-energia-renovable/', date:'12 Feb 2026', time:'4 meses', read:'3 min', th:'inventory',
    title:{es:'La minería chilena con energía renovable desplaza cerca de 3 millones de toneladas de CO₂',
           en:'Chile\u2019s renewable-powered mining displaces nearly 3 million tonnes of CO₂'},
    summary:{es:'Operaciones que representan hasta el 2% del consumo eléctrico nacional ya operan con energía 100% renovable, posicionando al sector como líder regional en transición energética.',
             en:'Operations representing up to 2% of national electricity use already run on 100% renewable energy, positioning the sector as a regional transition leader.'},
    impactChile:{es:'Combina escala productiva, reducción de emisiones y compromisos medibles de largo plazo en una de las industrias más relevantes del país.',
                 en:'It combines production scale, emissions reductions and measurable long-term commitments in one of the country\u2019s most relevant industries.'},
    impactEmpresas:{es:'El estándar de electricidad renovable se traslada a la cadena de suministro, exigiendo reportes a los proveedores.',
                    en:'The renewable-electricity standard cascades to the supply chain, requiring supplier reporting.'},
    body:{es:['Los contratos de energía renovable de largo plazo permiten a las grandes mineras reducir de forma sostenida sus emisiones de Alcance 2.',
              'El avance posiciona a la minería chilena entre los sectores industriales más avanzados en transición energética de América Latina.'],
          en:['Long-term renewable-energy contracts allow large miners to steadily cut their Scope 2 emissions.',
              'The progress places Chilean mining among the most advanced industrial sectors in Latin America\u2019s energy transition.']},
  },
  {
    id:8, cat:'Energía', src:'Minería y Futuro', url:'https://www.mineriayfuturo.cl/mercado/precio-del-litio-sube-84-en-lo-que-va-de-2026-y-consolida-recuperacion-impulsada-por-oferta-restringida/', date:'27 Mar 2026', time:'3 meses', read:'3 min', th:'carbon',
    title:{es:'El precio del litio sube 84% en 2026 impulsado por la demanda de almacenamiento energético',
           en:'Lithium price climbs 84% in 2026, driven by energy-storage demand'},
    summary:{es:'Según Cochilco, el mercado muestra señales de estrechez tras disrupciones productivas y una mayor demanda por sistemas de almacenamiento asociados a energías renovables.',
             en:'Per Cochilco, the market shows tightness after production disruptions and stronger demand for storage systems tied to renewables.'},
    impactChile:{es:'Como uno de los mayores productores mundiales, Chile capta valor del repunte, pero enfrenta el reto de la sostenibilidad socioambiental.',
                 en:'As one of the world\u2019s largest producers, Chile captures value from the rebound but faces the challenge of social-environmental sustainability.'},
    impactEmpresas:{es:'La demanda creciente refuerza la relevancia del litio para la electromovilidad y el almacenamiento renovable.',
                    en:'Rising demand reinforces lithium\u2019s relevance for e-mobility and renewable storage.'},
    body:{es:['La recuperación del precio se explica por una oferta restringida y por el fortalecimiento sostenido de la demanda desde la segunda mitad de 2025.',
              'El crecimiento de los sistemas de almacenamiento, ligados a proyectos solares y eólicos, sostiene la perspectiva del mineral.'],
          en:['The price recovery is explained by constrained supply and steadily strengthening demand since the second half of 2025.',
              'The growth of storage systems tied to solar and wind projects underpins the mineral\u2019s outlook.']},
  },
  {
    id:9, cat:'Clima', src:'BioBioChile', url:'https://www.biobiochile.cl/noticias/ciencia-y-tecnologia/medio-ambiente-cyt/2026/02/12/estudio-confirma-que-el-cambio-climatico-triplico-la-probabilidad-de-clima-de-incendios-en-chile.shtml', date:'12 Feb 2026', time:'4 meses', read:'4 min', th:'plan',
    title:{es:'Un estudio confirma que el cambio climático triplicó la probabilidad de "clima de incendios" en Chile',
           en:'Study confirms climate change tripled the likelihood of "fire weather" in Chile'},
    summary:{es:'El grupo World Weather Attribution concluyó que el calentamiento global alimentó las condiciones que favorecieron los incendios forestales en la Patagonia de Chile y Argentina.',
             en:'The World Weather Attribution group concluded that global warming fueled the conditions behind the forest fires in the Patagonia of Chile and Argentina.'},
    impactChile:{es:'Aumenta la urgencia de planes de adaptación y prevención frente a temporadas de incendios cada vez más extremas.',
                 en:'It heightens the urgency of adaptation and prevention plans against increasingly extreme fire seasons.'},
    impactEmpresas:{es:'Eleva el riesgo físico climático para operaciones forestales, agrícolas y de infraestructura en zonas vulnerables.',
                    en:'It raises physical climate risk for forestry, agricultural and infrastructure operations in vulnerable areas.'},
    body:{es:['Los estudios de atribución permiten cuantificar cuánto más probable o intenso se vuelve un evento extremo a causa del cambio climático.',
              'El hallazgo refuerza la necesidad de integrar el riesgo climático físico en la planificación territorial y empresarial.'],
          en:['Attribution studies make it possible to quantify how much more likely or intense an extreme event becomes because of climate change.',
              'The finding reinforces the need to integrate physical climate risk into territorial and corporate planning.']},
  },
  {
    id:10, cat:'Clima', src:'Universidad de Chile', url:'https://uchile.cl/noticias/226285/mas-de-26-mil-glaciares-en-chile-un-recurso-vital-en-riesgo0', date:'04 Jun 2026', time:'1 sem', read:'5 min', th:'lcv',
    title:{es:'Chile alberga más de 26 mil glaciares: un recurso hídrico vital en riesgo por el cambio climático',
           en:'Chile holds over 26,000 glaciers: a vital water resource at risk from climate change'},
    summary:{es:'Investigadores advierten sobre la vulnerabilidad de las masas de hielo frente al calentamiento global y su papel central para la seguridad hídrica del país.',
             en:'Researchers warn about the vulnerability of ice masses to global warming and their central role in the country\u2019s water security.'},
    impactChile:{es:'Los glaciares son reservas estratégicas de agua dulce; su retroceso compromete el abastecimiento de cuencas y ciudades.',
                 en:'Glaciers are strategic freshwater reserves; their retreat compromises the supply of basins and cities.'},
    impactEmpresas:{es:'La gestión hídrica se vuelve crítica para minería, agro y energía que dependen del deshielo.',
                    en:'Water management becomes critical for mining, agriculture and energy that depend on snowmelt.'},
    body:{es:['Chile concentra una porción mayoritaria de los glaciares de Sudamérica, lo que lo hace particularmente sensible a su pérdida.',
              'La ciencia llama a fortalecer el monitoreo y la protección de estos ecosistemas como parte de la estrategia climática nacional.'],
          en:['Chile holds a majority share of South America\u2019s glaciers, making it particularly sensitive to their loss.',
              'Scientists call for stronger monitoring and protection of these ecosystems as part of the national climate strategy.']},
  },
  {
    id:11, region:'internacional', cat:'Regulación', src:'European Commission', url:'https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en', date:'01 Jun 2026', time:'2 sem', read:'5 min', th:'inventory',
    title:{es:'El CBAM europeo entra en su fase definitiva y presiona la huella de carbono de las exportaciones',
           en:'The EU’s CBAM enters its definitive phase, pressuring the carbon footprint of exports'},
    summary:{es:'El Mecanismo de Ajuste en Frontera por Carbono de la UE comienza a cobrar por las emisiones incorporadas en acero, aluminio, cemento y fertilizantes importados.',
             en:'The EU’s Carbon Border Adjustment Mechanism begins charging for embedded emissions in imported steel, aluminium, cement and fertilizers.'},
    impactChile:{es:'Exportadores de LATAM que vendan a Europa deberán medir y declarar su huella de carbono o enfrentar sobrecostos arancelarios.',
                 en:'LATAM exporters selling to Europe will need to measure and report their carbon footprint or face tariff surcharges.'},
    impactEmpresas:{es:'Convierte la medición de emisiones (GHG Protocol) en un requisito comercial directo para acceder al mercado europeo.',
                    en:'It turns emissions measurement (GHG Protocol) into a direct commercial requirement to access the European market.'},
    body:{es:['El CBAM busca evitar la “fuga de carbono” igualando el precio del CO₂ entre productos europeos e importados.',
              'Las empresas con inventarios de emisiones verificados estarán mejor posicionadas para competir.'],
          en:['CBAM aims to prevent “carbon leakage” by equalizing the price of CO₂ between European and imported products.',
              'Companies with verified emissions inventories will be better positioned to compete.']},
  },
  {
    id:12, region:'internacional', cat:'Energía', src:'IEA', url:'https://www.iea.org/energy-system/renewables', date:'20 May 2026', time:'3 sem', read:'4 min', th:'esg',
    title:{es:'La capacidad renovable mundial bate un nuevo récord y la solar lidera la expansión',
           en:'Global renewable capacity sets a new record, with solar leading the expansion'},
    summary:{es:'La Agencia Internacional de Energía reporta que las adiciones de energía limpia vuelven a marcar máximos históricos, impulsadas por costos a la baja.',
             en:'The International Energy Agency reports clean-energy additions hitting record highs again, driven by falling costs.'},
    impactChile:{es:'Valida la apuesta de Chile por la energía solar y refuerza su potencial exportador de hidrógeno verde.',
                 en:'It validates Chile’s bet on solar power and reinforces its green-hydrogen export potential.'},
    impactEmpresas:{es:'Mayor oferta renovable facilita contratos de energía limpia (PPA) para reducir el Alcance 2.',
                    en:'More renewable supply makes clean-energy contracts (PPAs) easier for cutting Scope 2.'},
    body:{es:['La caída sostenida de costos hace de la solar y la eólica las fuentes más baratas en gran parte del mundo.',
              'El desafío se traslada ahora a las redes y al almacenamiento para integrar tanta generación variable.'],
          en:['The sustained drop in costs makes solar and wind the cheapest sources across much of the world.',
              'The challenge now shifts to grids and storage to integrate so much variable generation.']},
  },
  {
    id:13, region:'internacional', cat:'Clima', src:'UNEP', url:'https://www.unep.org/resources/emissions-gap-report-2025', date:'12 May 2026', time:'1 mes', read:'6 min', th:'plan',
    title:{es:'El Informe sobre la Brecha de Emisiones advierte que el mundo sigue lejos de la meta de 1,5 °C',
           en:'The Emissions Gap Report warns the world remains far from the 1.5 °C target'},
    summary:{es:'El PNUMA señala que los compromisos actuales son insuficientes y que se requieren recortes mucho más pronunciados esta década.',
             en:'UNEP notes that current pledges fall short and that far steeper cuts are needed this decade.'},
    impactChile:{es:'Refuerza la presión para que países como Chile aceleren sus NDC y planes de carbono neutralidad.',
                 en:'It reinforces pressure on countries like Chile to accelerate their NDCs and carbon-neutrality plans.'},
    impactEmpresas:{es:'Anticipa regulaciones más estrictas y metas de reducción validadas por ciencia (SBTi).',
                    en:'It anticipates stricter regulations and science-based reduction targets (SBTi).'},
    body:{es:['El informe cuantifica la diferencia entre las emisiones proyectadas y las compatibles con limitar el calentamiento.',
              'Cada año de inacción encarece y dificulta el ajuste posterior.'],
          en:['The report quantifies the gap between projected emissions and those compatible with limiting warming.',
              'Every year of inaction makes the later adjustment costlier and harder.']},
  },
  {
    id:14, region:'internacional', cat:'ESG', src:'IFRS Foundation', url:'https://www.ifrs.org/groups/international-sustainability-standards-board/', date:'28 Abr 2026', time:'1 mes', read:'5 min', th:'report',
    title:{es:'Más jurisdicciones adoptan las normas ISSB y consolidan un lenguaje global de reporte de sostenibilidad',
           en:'More jurisdictions adopt ISSB standards, consolidating a global sustainability-reporting language'},
    summary:{es:'Las normas NIIF S1 y S2 avanzan hacia convertirse en la base común del reporte ESG para inversionistas en todo el mundo.',
             en:'IFRS S1 and S2 standards advance toward becoming the common baseline for ESG reporting to investors worldwide.'},
    impactChile:{es:'Chile ya alinea su normativa (NCG 519) con este estándar, facilitando la comparabilidad internacional.',
                 en:'Chile already aligns its rules (NCG 519) with this standard, easing international comparability.'},
    impactEmpresas:{es:'Un estándar único reduce la carga de reportar bajo múltiples marcos a la vez.',
                    en:'A single standard reduces the burden of reporting under multiple frameworks at once.'},
    body:{es:['La convergencia hacia el ISSB simplifica la vida de empresas que operan en varios mercados.',
              'La trazabilidad y la calidad del dato se vuelven el nuevo foco de cumplimiento.'],
          en:['Convergence toward the ISSB simplifies life for companies operating across several markets.',
              'Data traceability and quality become the new compliance focus.']},
  },
  {
    id:15, region:'internacional', cat:'Minería', src:'IEA', url:'https://www.iea.org/reports/global-critical-minerals-outlook-2025', date:'15 Abr 2026', time:'2 meses', read:'5 min', th:'carbon',
    title:{es:'La demanda de minerales críticos para la transición energética seguirá creciendo con fuerza',
           en:'Demand for critical minerals for the energy transition will keep growing strongly'},
    summary:{es:'El cobre, el litio y otros minerales clave enfrentan una demanda récord para electrificación, baterías y redes eléctricas.',
             en:'Copper, lithium and other key minerals face record demand for electrification, batteries and power grids.'},
    impactChile:{es:'Posiciona a Chile, líder en cobre y litio, como proveedor estratégico de la transición global.',
                 en:'It positions Chile, a leader in copper and lithium, as a strategic supplier for the global transition.'},
    impactEmpresas:{es:'La minería con baja huella de carbono será una ventaja competitiva ante clientes y reguladores.',
                    en:'Low-carbon mining will be a competitive advantage with customers and regulators.'},
    body:{es:['La seguridad de suministro de minerales críticos se ha vuelto una prioridad geopolítica.',
              'La presión por una extracción responsable y trazable aumenta a lo largo de la cadena.'],
          en:['Security of supply for critical minerals has become a geopolitical priority.',
              'Pressure for responsible, traceable extraction is rising across the chain.']},
  },
];
window.NEWS = NEWS;
window.CAT_COLORS_NEWS = {Regulación:'#D4973A', Clima:'#4DB87A', ESG:'#3B8FDB', Energía:'#8B5CF6', Minería:'#F59E0B'};
window.CAT_EN = {Regulación:'Regulation', Clima:'Climate', ESG:'ESG', Energía:'Energy', Minería:'Mining', Todos:'All'};

/* ═══ HOME / PERSONAL EMISSION FACTORS ═══ */
window.HOME_FACTORS = {
  gnl:      1.89,   // kgCO₂e per m³ natural gas
  glp:      2.94,   // kgCO₂e per kg LPG (gas licuado / cilindro)
  gasolina: 2.31,   // kgCO₂e per litre gasoline
  diesel:   2.68,   // kgCO₂e per litre diesel
  bus:      0.089,  // kgCO₂e per passenger-km, public transport
  flight:   0.255,  // kgCO₂e per km, air travel
  waste:    0.50,   // kgCO₂e per kg landfilled waste
};
/* dietary footprint, kgCO₂e per person per year */
window.DIETS = [
  ['alta',  {es:'Alta en carne',     en:'High meat'},        2500],
  ['media', {es:'Media (omnívora)',  en:'Average (omnivore)'},1800],
  ['baja',  {es:'Baja en carne',     en:'Low meat'},         1300],
  ['veg',   {es:'Vegetariana',       en:'Vegetarian'},       1000],
  ['vegan', {es:'Vegana',            en:'Vegan'},             700],
];
/* ESG classification legend — meaning of each grade A–F */
window.ESG_GRADE_INFO = [
  {g:'A', title:{es:'Líder climático',    en:'Climate leader'},     desc:{es:'Huella muy baja, alineada a una trayectoria de 1,5 °C.',     en:'Very low footprint, aligned with a 1.5 °C pathway.'}},
  {g:'B', title:{es:'Muy bueno',          en:'Very good'},          desc:{es:'Desempeño sólido, por debajo del promedio.',                en:'Solid performance, below the average.'}},
  {g:'C', title:{es:'Aceptable',          en:'Acceptable'},         desc:{es:'En línea con el promedio, con espacio para reducir.',       en:'In line with the average, room to reduce.'}},
  {g:'D', title:{es:'Mejorable',          en:'Needs improvement'},  desc:{es:'Sobre el promedio; conviene un plan de reducción.',         en:'Above average; a reduction plan is advisable.'}},
  {g:'E', title:{es:'Alto',               en:'High'},               desc:{es:'Huella elevada; acción prioritaria.',                      en:'Elevated footprint; priority action.'}},
  {g:'F', title:{es:'Crítico',            en:'Critical'},           desc:{es:'Huella muy alta; intervención urgente.',                   en:'Very high footprint; urgent intervention.'}},
];

/* ═══ EQUIVALENCES (per tCO₂e) ═══ */
window.EQUIV_FACTORS = {
  trees:   21.77,   // kg CO₂ absorbed per tree per year
  fuel:    2.31,    // kg CO₂ per litre of gasoline
  km:      0.170,   // kg CO₂ per km, average car
  phone:   0.00822, // kg CO₂ per smartphone charge
  kwh:     0.45,    // kg CO₂ per kWh (representative grid)
};

/* ═══ ENVIRONMENTAL SOLUTIONS ═══ */
const SOLUTIONS = {
  chile: [
    { id:'huellachile', code:'HuellaChile', glyph:'HC',
      name:{es:'HuellaChile', en:'HuellaChile'},
      tag:{es:'Programa MMA · Cuantificación y reconocimiento', en:'Ministry program · Quantification & recognition'},
      desc:{es:'Programa del Ministerio del Medio Ambiente para la cuantificación, reducción y gestión voluntaria de gases de efecto invernadero en organizaciones.',
            en:'Ministry of the Environment program for voluntary quantification, reduction and management of greenhouse gases in organizations.'},
      benefits:{es:['Sellos de reconocimiento oficial','Cuantificación estandarizada','Reportabilidad ante el Estado'],
                en:['Official recognition seals','Standardized quantification','Reporting to the State']},
      uses:{es:['Empresas que inician su huella','Postulación a compras públicas','Reportes corporativos anuales'],
            en:['Companies starting their footprint','Public-procurement bids','Annual corporate reports']} },
    { id:'leyrep', code:'Ley REP', glyph:'REP',
      name:{es:'Ley REP', en:'EPR Law'},
      tag:{es:'Responsabilidad Extendida del Productor', en:'Extended Producer Responsibility'},
      desc:{es:'Obliga a productores de seis productos prioritarios a organizar y financiar la recolección y valorización de sus residuos.',
            en:'Requires producers of six priority products to organize and finance the collection and recovery of their waste.'},
      benefits:{es:['Cumplimiento de metas de valorización','Economía circular efectiva','Trazabilidad de residuos'],
                en:['Compliance with recovery targets','Effective circular economy','Waste traceability']},
      uses:{es:['Envases y embalajes','Neumáticos y baterías','Aceites y electrónicos'],
            en:['Packaging','Tires and batteries','Oils and electronics']} },
    { id:'retc', code:'RETC', glyph:'RT',
      name:{es:'RETC', en:'RETC'},
      tag:{es:'Registro de Emisiones y Transferencias', en:'Emissions & Transfers Registry'},
      desc:{es:'Sistema público que recopila y difunde información sobre emisiones y transferencias de contaminantes al aire, agua y suelo.',
            en:'Public system that compiles and discloses information on pollutant emissions and transfers to air, water and soil.'},
      benefits:{es:['Transparencia regulatoria','Datos comparables por sector','Base para fiscalización'],
                en:['Regulatory transparency','Sector-comparable data','Basis for enforcement']},
      uses:{es:['Declaración anual obligatoria','Benchmarking ambiental','Reportes de sostenibilidad'],
            en:['Mandatory annual declaration','Environmental benchmarking','Sustainability reports']} },
    { id:'carbononeutral', code:'Carbono Neutralidad', glyph:'CN',
      name:{es:'Carbono Neutralidad', en:'Carbon Neutrality'},
      tag:{es:'Meta país 2050 · NDC Chile', en:'National 2050 target · Chile NDC'},
      desc:{es:'Compromiso nacional de alcanzar emisiones netas cero al 2050, con presupuestos de carbono sectoriales vinculantes.',
            en:'National commitment to reach net-zero emissions by 2050, with binding sectoral carbon budgets.'},
      benefits:{es:['Hoja de ruta clara','Incentivos a la innovación','Acceso a financiamiento verde'],
                en:['Clear roadmap','Innovation incentives','Access to green finance']},
      uses:{es:['Estrategias corporativas net-zero','Planes de reducción','Compensación residual'],
            en:['Corporate net-zero strategies','Reduction plans','Residual offsetting']} },
  ],
  intl: [
    { id:'ghg', code:'GHG Protocol', glyph:'GHG',
      name:{es:'GHG Protocol', en:'GHG Protocol'},
      tag:{es:'Estándar global de contabilidad GEI', en:'Global GHG accounting standard'},
      desc:{es:'El estándar más utilizado del mundo para medir y gestionar emisiones, organizado en Alcances 1, 2 y 3.',
            en:'The world\u2019s most widely used standard to measure and manage emissions, organized into Scopes 1, 2 and 3.'},
      benefits:{es:['Metodología universal','Comparabilidad internacional','Base de casi todo reporte ESG'],
                en:['Universal methodology','International comparability','Basis of nearly every ESG report']},
      uses:{es:['Inventarios corporativos','Reporte a inversionistas','Cadenas de suministro'],
            en:['Corporate inventories','Investor reporting','Supply chains']} },
    { id:'iso14001', code:'ISO 14001', glyph:'141',
      name:{es:'ISO 14001', en:'ISO 14001'},
      tag:{es:'Sistema de Gestión Ambiental', en:'Environmental Management System'},
      desc:{es:'Norma certificable que define los requisitos de un sistema de gestión ambiental eficaz y de mejora continua.',
            en:'Certifiable standard defining the requirements of an effective, continually improving environmental management system.'},
      benefits:{es:['Certificación reconocida','Reducción de riesgos','Mejora continua'],
                en:['Recognized certification','Risk reduction','Continual improvement']},
      uses:{es:['Certificación de planta','Licitaciones internacionales','Gestión de cumplimiento'],
            en:['Plant certification','International tenders','Compliance management']} },
    { id:'iso14064', code:'ISO 14064', glyph:'146',
      name:{es:'ISO 14064', en:'ISO 14064'},
      tag:{es:'Cuantificación y verificación GEI', en:'GHG quantification & verification'},
      desc:{es:'Especifica los principios y requisitos para cuantificar, monitorear, reportar y verificar inventarios de GEI.',
            en:'Specifies principles and requirements to quantify, monitor, report and verify GHG inventories.'},
      benefits:{es:['Inventarios verificables','Credibilidad ante terceros','Alineado con GHG Protocol'],
                en:['Verifiable inventories','Third-party credibility','Aligned with GHG Protocol']},
      uses:{es:['Aseguramiento externo','Reportes regulatorios','Mercados de carbono'],
            en:['External assurance','Regulatory reports','Carbon markets']} },
    { id:'issb', code:'ISSB', glyph:'SB',
      name:{es:'ISSB · NIIF S1/S2', en:'ISSB · IFRS S1/S2'},
      tag:{es:'Estándares globales de divulgación', en:'Global disclosure standards'},
      desc:{es:'Marco del IFRS para divulgaciones financieras relacionadas con sostenibilidad y clima, base de la regulación futura.',
            en:'IFRS framework for sustainability- and climate-related financial disclosures, the basis of future regulation.'},
      benefits:{es:['Lenguaje común con inversionistas','Integración financiera','Consolidación global'],
                en:['Common language with investors','Financial integration','Global consolidation']},
      uses:{es:['Reporte financiero anual','Relación con inversionistas','Cumplimiento futuro'],
            en:['Annual financial reporting','Investor relations','Future compliance']} },
    { id:'sbti', code:'SBTi', glyph:'SBT',
      name:{es:'SBTi', en:'SBTi'},
      tag:{es:'Metas basadas en ciencia', en:'Science-based targets'},
      desc:{es:'Iniciativa que valida metas de reducción alineadas con limitar el calentamiento global a 1,5 °C.',
            en:'Initiative that validates reduction targets aligned with limiting global warming to 1.5 °C.'},
      benefits:{es:['Metas creíbles y validadas','Reputación reforzada','Ruta a net-zero'],
                en:['Credible, validated targets','Stronger reputation','Path to net-zero']},
      uses:{es:['Compromisos públicos','Estrategia de descarbonización','Comunicación ESG'],
            en:['Public commitments','Decarbonization strategy','ESG communication']} },
    { id:'tcfd', code:'TCFD', glyph:'TCF',
      name:{es:'TCFD', en:'TCFD'},
      tag:{es:'Divulgación de riesgos climáticos', en:'Climate-risk disclosure'},
      desc:{es:'Recomendaciones para divulgar riesgos y oportunidades climáticas en gobernanza, estrategia, gestión y métricas.',
            en:'Recommendations to disclose climate risks and opportunities across governance, strategy, management and metrics.'},
      benefits:{es:['Gestión de riesgo climático','Confianza de inversionistas','Base del ISSB'],
                en:['Climate-risk management','Investor confidence','Foundation of ISSB']},
      uses:{es:['Análisis de escenarios','Reporte de riesgo','Planificación estratégica'],
            en:['Scenario analysis','Risk reporting','Strategic planning']} },
  ],
};
window.SOLUTIONS = SOLUTIONS;

/* ═══════════════════════════════════════════════════════════
   NORMATIVA AMBIENTAL CHILENA — evaluador por tipo de proyecto
   Datos orientativos basados en la legislación vigente. No
   constituye asesoría legal. Fuentes: BCN / LeyChile, MMA, SEA.
   ═══════════════════════════════════════════════════════════ */
window.REG_LAWS = {
  ley19300:   {name:'Ley 19.300', cat:'eval',  title:{es:'Bases Generales del Medio Ambiente · SEIA',en:'Environmental Framework Law · SEIA'}, auth:'SEA', url:'https://www.bcn.cl/leychile/navegar?idNorma=30667',
    desc:{es:'Si tu proyecto figura en el Art. 10, debe ingresar al Sistema de Evaluación de Impacto Ambiental (vía DIA o EIA) y obtener su RCA antes de ejecutarse.',en:'If your project is listed in Art. 10, it must enter the Environmental Impact Assessment System (via DIA or EIA) and obtain its RCA before execution.'}},
  ds40:       {name:'D.S. 40/2012', cat:'eval', title:{es:'Reglamento del SEIA',en:'SEIA Regulation'}, auth:'SEA', url:'https://www.bcn.cl/leychile/navegar?idNorma=1053563',
    desc:{es:'Define cómo se evalúa el proyecto, qué Permisos Ambientales Sectoriales (PAS) aplican y los contenidos de la DIA/EIA.',en:'Defines how the project is assessed, which Sectoral Environmental Permits (PAS) apply and the DIA/EIA contents.'}},
  ley21455:   {name:'Ley 21.455', cat:'clima', title:{es:'Ley Marco de Cambio Climático',en:'Climate Change Framework Law'}, auth:'MMA', url:'https://www.bcn.cl/leychile/navegar?idNorma=1177286',
    desc:{es:'Establece la meta de carbono neutralidad a 2050 e instrumentos de gestión. Orienta la medición y reducción de la huella de carbono.',en:'Sets the 2050 carbon-neutrality goal and management instruments. Guides carbon-footprint measurement and reduction.'}},
  retc:       {name:'RETC · D.S. 1/2013', cat:'aire', title:{es:'Registro de Emisiones y Transferencias de Contaminantes',en:'Pollutant Release & Transfer Register'}, auth:'MMA', url:'https://retc.mma.gob.cl',
    desc:{es:'Obliga a declarar emisiones al aire, agua y suelo, residuos y transferencias a través de la Ventanilla Única (sistema VU-RETC).',en:'Requires reporting of air, water and soil emissions, waste and transfers through the Single Window (VU-RETC).'}},
  ds90:       {name:'D.S. 90/2000', cat:'agua', title:{es:'Norma de emisión RILES a aguas superficiales',en:'Liquid-waste emission standard, surface waters'}, auth:'SISS', url:'https://www.bcn.cl/leychile/navegar?idNorma=182637',
    desc:{es:'Fija límites para la descarga de residuos líquidos industriales a aguas marinas y continentales superficiales.',en:'Sets limits for discharging industrial liquid waste into marine and continental surface waters.'}},
  ds46:       {name:'D.S. 46/2002', cat:'agua', title:{es:'Norma de emisión RILES a aguas subterráneas',en:'Liquid-waste standard, groundwater'}, auth:'SISS', url:'https://www.bcn.cl/leychile/navegar?idNorma=200903',
    desc:{es:'Regula la descarga de residuos líquidos que se infiltran a las napas subterráneas.',en:'Regulates discharge of liquid waste that infiltrates groundwater.'}},
  ds148:      {name:'D.S. 148/2003', cat:'residuos', title:{es:'Reglamento sanitario de residuos peligrosos',en:'Hazardous-waste sanitary regulation'}, auth:'SEREMI Salud', url:'https://www.bcn.cl/leychile/navegar?idNorma=226458',
    desc:{es:'Establece el manejo, almacenamiento, transporte y eliminación de residuos peligrosos, y la declaración en el SIDREP.',en:'Sets handling, storage, transport and disposal of hazardous waste, and SIDREP reporting.'}},
  ley20920:   {name:'Ley 20.920 (REP)', cat:'residuos', title:{es:'Responsabilidad Extendida del Productor y Reciclaje',en:'Extended Producer Responsibility & Recycling'}, auth:'MMA', url:'https://www.bcn.cl/leychile/navegar?idNorma=1090894',
    desc:{es:'Si pones en el mercado productos prioritarios (envases, neumáticos, aceites, baterías, pilas, electrónicos) debes organizar y financiar su recolección y valorización.',en:'If you place priority products on the market (packaging, tyres, oils, batteries, electronics) you must organise and fund their collection and recovery.'}},
  codigoaguas:{name:'Código de Aguas', cat:'agua', title:{es:'Derechos de aprovechamiento de aguas (DFL 1.122)',en:'Water-use rights (DFL 1.122)'}, auth:'DGA', url:'https://www.bcn.cl/leychile/navegar?idNorma=5605',
    desc:{es:'Requiere constituir o acreditar derechos de aprovechamiento ante la DGA para extraer o usar agua.',en:'Requires establishing or proving water-use rights before the DGA to extract or use water.'}},
  ley20283:   {name:'Ley 20.283', cat:'bio', title:{es:'Recuperación del Bosque Nativo y Fomento Forestal',en:'Native Forest Recovery & Forestry'}, auth:'CONAF', url:'https://www.bcn.cl/leychile/navegar?idNorma=274894',
    desc:{es:'Exige un Plan de Manejo aprobado por CONAF antes de intervenir o cortar bosque nativo.',en:'Requires a CONAF-approved Management Plan before intervening or felling native forest.'}},
  ley21600:   {name:'Ley 21.600', cat:'bio', title:{es:'Servicio de Biodiversidad y Áreas Protegidas (SBAP)',en:'Biodiversity & Protected Areas Service (SBAP)'}, auth:'SBAP', url:'https://www.bcn.cl/leychile/navegar?idNorma=1196244',
    desc:{es:'Refuerza la protección de ecosistemas y áreas protegidas; relevante si el proyecto se emplaza en o cerca de áreas de alto valor ecológico.',en:'Strengthens protection of ecosystems and protected areas; relevant if the project sits in or near high-value ecological areas.'}},
  ds38:       {name:'D.S. 38/2011', cat:'ruido', title:{es:'Norma de emisión de ruido',en:'Noise emission standard'}, auth:'SMA', url:'https://www.bcn.cl/leychile/navegar?idNorma=1025845',
    desc:{es:'Fija niveles máximos de ruido generados por fuentes fijas hacia la comunidad.',en:'Sets maximum noise levels emitted by fixed sources towards the community.'}},
  aire:       {name:'D.S. 12/2011 · D.S. 59', cat:'aire', title:{es:'Normas de calidad del aire (MP2,5 / MP10)',en:'Air-quality standards (PM2.5 / PM10)'}, auth:'MMA', url:'https://www.bcn.cl/leychile/navegar?idNorma=1025202',
    desc:{es:'Define la calidad del aire exigible; en zonas saturadas/latentes aplican Planes de Descontaminación con exigencias adicionales.',en:'Defines required air quality; in saturated/latent zones Decontamination Plans add further requirements.'}},
  ds594:      {name:'D.S. 594/1999', cat:'residuos', title:{es:'Condiciones sanitarias y ambientales en el trabajo',en:'Sanitary & environmental workplace conditions'}, auth:'SEREMI Salud', url:'https://www.bcn.cl/leychile/navegar?idNorma=167766',
    desc:{es:'Regula condiciones mínimas sanitarias y ambientales en los lugares de trabajo, incluido el manejo de residuos.',en:'Regulates minimum sanitary and environmental conditions at workplaces, including waste handling.'}},
};

/* category metadata for grouping results */
window.REG_CATS = {
  eval:    {label:{es:'Evaluación ambiental',en:'Environmental assessment'}, color:'#3B8FDB'},
  clima:   {label:{es:'Cambio climático',en:'Climate change'}, color:'#4DB87A'},
  aire:    {label:{es:'Aire y emisiones',en:'Air & emissions'}, color:'#8B5CF6'},
  agua:    {label:{es:'Agua',en:'Water'}, color:'#3B8FDB'},
  residuos:{label:{es:'Residuos',en:'Waste'}, color:'#D4973A'},
  bio:     {label:{es:'Biodiversidad',en:'Biodiversity'}, color:'#4DB87A'},
  ruido:   {label:{es:'Ruido',en:'Noise'}, color:'#F59E0B'},
};

/* project types → base laws that typically apply */
window.REG_PROJECTS = [
  {id:'mineria',     icon:'⛏️', label:{es:'Minería',en:'Mining'},                 base:['ley19300','ds40','retc','aire','ds148','codigoaguas','ds38','ley21455']},
  {id:'energia',     icon:'⚡', label:{es:'Energía',en:'Energy'},                  base:['ley19300','ds40','retc','aire','ds38','ley21455','codigoaguas']},
  {id:'industria',   icon:'🏭', label:{es:'Industria / Manufactura',en:'Industry / Manufacturing'}, base:['ley19300','ds40','retc','ds90','ds148','ds594','ds38','ley21455']},
  {id:'inmobiliario',icon:'🏗️', label:{es:'Inmobiliario / Construcción',en:'Real estate / Construction'}, base:['ley19300','ds40','ds38','ley20283','ds594']},
  {id:'agro',        icon:'🌱', label:{es:'Agroindustria',en:'Agribusiness'},      base:['ley19300','ds90','codigoaguas','ds148','retc','ley21455']},
  {id:'saneamiento', icon:'💧', label:{es:'Saneamiento / Aguas',en:'Sanitation / Water'}, base:['ley19300','ds40','ds90','ds46','codigoaguas','retc']},
  {id:'residuos',    icon:'♻️', label:{es:'Gestión de residuos',en:'Waste management'}, base:['ley19300','ds40','ds148','ley20920','retc','ds594']},
  {id:'forestal',    icon:'🌲', label:{es:'Forestal',en:'Forestry'},               base:['ley19300','ley20283','codigoaguas','ley21600']},
];

/* refining characteristics (toggles) → additional laws */
window.REG_FACTORS = [
  {id:'riles',     label:{es:'Genera residuos líquidos (RILES)',en:'Generates liquid waste (RILES)'}, laws:['ds90','ds46']},
  {id:'aire',      label:{es:'Emisiones atmosféricas',en:'Atmospheric emissions'}, laws:['aire','retc']},
  {id:'peligrosos',label:{es:'Maneja sustancias o residuos peligrosos',en:'Handles hazardous substances or waste'}, laws:['ds148','ds594']},
  {id:'agua',      label:{es:'Usa o extrae agua',en:'Uses or extracts water'}, laws:['codigoaguas']},
  {id:'rep',       label:{es:'Pone productos prioritarios en el mercado',en:'Places priority products on the market'}, laws:['ley20920']},
  {id:'areas',     label:{es:'Cerca de áreas protegidas o bosque nativo',en:'Near protected areas or native forest'}, laws:['ley21600','ley20283']},
  {id:'ruido',     label:{es:'Genera ruido significativo',en:'Generates significant noise'}, laws:['ds38']},
];

/* ═══════════════════════════════════════════════════════════
   ETSY STORE — config + verified catalog (source of truth)
   The marketplace section auto-syncs with Etsy (see feed.jsx
   fetchEtsyProducts). Etsy blocks browser scraping, so these
   real listings render reliably and live data merges over them.
   To enable fully-automatic sync, deploy the connector in
   etsy-sync.md and set window.ETSY_FEED_URL to its URL.
   ═══════════════════════════════════════════════════════════ */
window.ETSY_SHOP = {name:'EcoInsight', url:'https://www.etsy.com/es/shop/EcoInsight?ref=profile_header', rating:4.0, sales:12};
window.ETSY_FEED_URL = '';   // ← paste your serverless feed URL here to enable live auto-sync
window.ETSY_PRODUCTS = [
  {listingId:'4376732622', cat:'powerbi', th:'esg', fmt:'Excel + Power BI', price:17.84, currency:'USD', bc:'accent',
    name:{es:'Panel Huella de Carbono · Alcance 1, 2 y 3', en:'Carbon Footprint Dashboard · Scope 1, 2 & 3'},
    desc:{es:'Dashboard en Excel + Power BI ideal para PYMEs. Monitorea y visualiza tu huella en tiempo real.', en:'Excel + Power BI dashboard, ideal for SMEs. Monitor and visualise your footprint in real time.'},
    badge:{es:'Más vendido', en:'Best seller'},
    url:{es:'https://www.etsy.com/es/listing/4376732622/seguimiento-de-co2-huella-de-carbono', en:'https://www.etsy.com/es/listing/4376732622/seguimiento-de-co2-huella-de-carbono'}},
  {listingId:'4443295460', cat:'excel', th:'carbon', fmt:'Excel · GHG Protocol', price:22.60, currency:'USD', bc:'accent2',
    name:{es:'Calculadora Huella de Carbono · Excel', en:'Carbon Footprint Calculator · Excel'},
    desc:{es:'Plantilla GHG Protocol (Alcances 1, 2 y 3) para reporte ESG de Pymes. Descarga instantánea.', en:'GHG Protocol template (Scopes 1, 2 & 3) for SME ESG reporting. Instant download.'},
    url:{es:'https://www.etsy.com/es/listing/4443295460/hoja-de-calculo-huella-de-carbono-ghg', en:'https://www.etsy.com/es/listing/4443295460/hoja-de-calculo-huella-de-carbono-ghg'}},
  {listingId:'4447014903', cat:'excel', th:'carbon', fmt:'Excel · GHG Protocol', price:22.60, currency:'USD', bc:'accent2',
    name:{es:'Carbon Footprint Calculator · Excel', en:'Carbon Footprint Calculator · Excel'},
    desc:{es:'Plantilla GHG Protocol (Alcances 1, 2 y 3) para reporte ESG de Pymes. Descarga instantánea.', en:'GHG Protocol template (Scopes 1, 2 & 3) for SME ESG reporting. Instant download.'},
    url:{es:'https://www.etsy.com/listing/4447014903/carbon-footprint-spreadsheet-corporate', en:'https://www.etsy.com/listing/4447014903/carbon-footprint-spreadsheet-corporate'}},
  {listingId:'4373813587', cat:'powerbi', th:'esg', fmt:'Excel + Power BI', price:17.84, currency:'USD', bc:'accent',
    name:{es:'Carbon Footprint Tracker Dashboard · Scope 1, 2 & 3', en:'Carbon Footprint Tracker Dashboard · Scope 1, 2 & 3'},
    desc:{es:'Dashboard Power BI para seguimiento de huella de carbono. Desglose por Alcance 1, 2 y 3.', en:'Power BI dashboard for carbon footprint tracking. Breakdown by Scope 1, 2 and 3.'},
    url:{es:'https://www.etsy.com/listing/4373813587/carbon-footprint-tracker-dashboard-scope', en:'https://www.etsy.com/listing/4373813587/carbon-footprint-tracker-dashboard-scope'}},
];
