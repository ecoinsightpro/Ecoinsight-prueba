/* ═══════════════════════════════════════════════════════════
   EcoInsight · LIVE NEWS FEED
   Real RSS sources (image-rich) → CORS proxy → parsed card objects.
   Falls back gracefully: WordPress feeds → Google News → sample data.
   ═══════════════════════════════════════════════════════════ */
(function(){
  const PROXIES = [
    u => 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u),
    u => 'https://corsproxy.io/?url=' + encodeURIComponent(u),
    u => 'https://api.codetabs.com/v1/proxy/?quest=' + encodeURIComponent(u),
  ];

  // image-rich environmental feeds (WordPress → media:content / content:encoded)
  const FEEDS = {
    es: [
      {src:'País Circular',       url:'https://www.paiscircular.cl/feed/',       cat:'Clima'},
      {src:'Diario Sustentable',  url:'https://www.diariosustentable.com/feed/', cat:'ESG'},
      {src:'Mongabay Latam',      url:'https://es.mongabay.com/feed/',           cat:'Clima'},
      {src:'Sustentabilidad',     url:'https://www.sustentabilidad.uai.cl/feed/',cat:'ESG'},
    ],
    en: [
      {src:'Mongabay',            url:'https://news.mongabay.com/feed/',         cat:'Clima'},
      {src:'ESG Today',           url:'https://www.esgtoday.com/feed/',          cat:'ESG'},
      {src:'Carbon Brief',        url:'https://www.carbonbrief.org/feed/',       cat:'Clima'},
    ],
  };
  // Google News fallback (reliable links, weaker images)
  const GNEWS = {
    es: [
      {cat:'Clima',      q:'cambio climático Chile'},
      {cat:'ESG',        q:'ESG sostenibilidad empresas Chile'},
      {cat:'Energía',    q:'energía renovable Chile'},
      {cat:'Regulación', q:'regulación ambiental SMA Chile'},
      {cat:'Minería',    q:'minería sustentable litio Chile'},
    ],
    en: [
      {cat:'Clima',      q:'climate change Latin America'},
      {cat:'ESG',        q:'ESG corporate sustainability'},
      {cat:'Energía',    q:'renewable energy Latin America'},
      {cat:'Regulación', q:'climate disclosure regulation'},
      {cat:'Minería',    q:'sustainable mining lithium'},
    ],
  };
  const gnewsUrl = (q,lang) => lang==='en'
    ? `https://news.google.com/rss/search?q=${encodeURIComponent(q+' when:21d')}&hl=en-US&gl=US&ceid=US:en`
    : `https://news.google.com/rss/search?q=${encodeURIComponent(q+' when:21d')}&hl=es-419&gl=CL&ceid=CL:es-419`;

  async function fetchText(url){
    for(const px of PROXIES){
      try{
        const c = new AbortController();
        const to = setTimeout(()=>c.abort(), 6000);
        const r = await fetch(px(url), {cache:'no-store', signal:c.signal});
        clearTimeout(to);
        if(!r.ok) continue;
        let txt = await r.text();
        // allorigins /get returns JSON {contents}
        if(txt[0]==='{' && /"contents"/.test(txt.slice(0,40))){ try{ txt = JSON.parse(txt).contents||txt; }catch(e){} }
        if(txt && txt.length>200 && /<(rss|feed|item|entry)/i.test(txt)) return txt;
      }catch(e){ /* try next proxy */ }
    }
    return null;
  }

  const TH_BY_CAT = {Minería:'carbon', Energía:'inventory', Regulación:'report', ESG:'esg', Clima:'plan'};
  function detectCat(title, fallback){
    const s = (title||'').toLowerCase();
    if(/miner|litio|cobre|faena|mining|copper/.test(s)) return 'Minería';
    if(/energ|renovab|solar|eólic|eolic|hidro|electric|combustible|petról|wind|energy|grid/.test(s)) return 'Energía';
    if(/\bley\b|norma|regula|decreto|\bsma\b|tribunal|fiscaliz|permiso|seia|disclosure|regulat|policy/.test(s)) return 'Regulación';
    if(/esg|sosteni|gobernanza|invers|corporate|governance|invest|finan/.test(s)) return 'ESG';
    return fallback || 'Clima';
  }
  function stripHtml(h){
    const d = document.createElement('div'); d.innerHTML = h||'';
    return (d.textContent||'').replace(/\s+/g,' ').trim();
  }
  function imgFrom(item){
    const tryAttr = (tag,attr)=>{ const els=item.getElementsByTagName(tag); for(let i=0;i<els.length;i++){ const u=els[i].getAttribute(attr); if(u) return u; } return null; };
    let u = tryAttr('media:content','url') || tryAttr('media:thumbnail','url');
    if(u && /^https?:/.test(u)) return u;
    const enc = item.getElementsByTagName('enclosure');
    for(let i=0;i<enc.length;i++){ const ty=enc[i].getAttribute('type')||''; if(ty.indexOf('image')===0){ const eu=enc[i].getAttribute('url'); if(eu) return eu; } }
    const ce = item.getElementsByTagName('content:encoded');
    const html = (ce.length? ce[0].textContent : '') + ' ' + (item.getElementsByTagName('description')[0]? item.getElementsByTagName('description')[0].textContent : '');
    const m = html.match(/<img[^>]+src=["']([^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/i) || html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if(m) return m[1];
    return null;
  }
  function relTime(d, lang){
    if(!d || isNaN(d)) return '';
    const min = Math.max(1, Math.round((Date.now()-d)/60000));
    if(min<60) return min + 'm';
    const h = Math.round(min/60); if(h<24) return h+'h';
    const days = Math.round(h/24); return days + (lang==='en'?'d':'d');
  }
  function hash(s){ let h=0; for(let i=0;i<s.length;i++){ h=(h<<5)-h+s.charCodeAt(i); h|=0; } return Math.abs(h).toString(36); }

  function parseItems(xml, feedSrc, feedCat, lang){
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    if(doc.getElementsByTagName('parsererror').length) return [];
    let items = Array.from(doc.getElementsByTagName('item'));
    if(!items.length) items = Array.from(doc.getElementsByTagName('entry')); // Atom
    const out = [];
    for(const it of items){
      const get = tag => { const e=it.getElementsByTagName(tag)[0]; return e? e.textContent.trim() : ''; };
      const title = stripHtml(get('title'));
      if(!title) continue;
      // link: RSS <link>text, Atom <link href>
      let link = get('link');
      if(!link){ const la=it.getElementsByTagName('link')[0]; if(la) link = la.getAttribute('href')||''; }
      // Google News <source> tag carries the real outlet name
      const srcTag = it.getElementsByTagName('source')[0];
      const src = (srcTag && srcTag.textContent.trim()) || feedSrc;
      const pub = get('pubDate') || get('published') || get('updated');
      const dt = pub ? new Date(pub).getTime() : Date.now();
      const descRaw = get('description') || get('summary') || (it.getElementsByTagName('content:encoded')[0]||{}).textContent || '';
      const desc = stripHtml(descRaw).replace(/\s*Read more.*$/i,'');
      const cat = detectCat(title+' '+desc, feedCat);
      out.push({
        id: 'live-'+hash(link||title),
        live: true,
        cat, src, url: link,
        date: new Date(dt).toLocaleDateString(lang==='en'?'en-US':'es-CL',{day:'numeric',month:'short',year:'numeric'}),
        time: relTime(dt, lang),
        _ts: dt,
        read: Math.max(2, Math.min(8, Math.round(desc.length/700))) + ' min',
        th: TH_BY_CAT[cat] || 'esg',
        image: imgFrom(it),
        title:{es:title, en:title},
        summary:{es:(desc||title).slice(0,200)+((desc||'').length>200?'…':''), en:(desc||title).slice(0,200)+((desc||'').length>200?'…':'')},
        body:{es: desc?[desc]:[], en: desc?[desc]:[]},
      });
    }
    return out;
  }

  function dedupe(arr){
    const seen = new Set(), out = [];
    for(const a of arr){ const k=(a.title.es||'').toLowerCase().slice(0,60); if(seen.has(k)||!k) continue; seen.add(k); out.push(a); }
    return out;
  }

  // Public: returns array of card objects, or null if nothing loaded
  window.fetchEcoNews = async function(lang){
    lang = lang==='en' ? 'en' : 'es';
    let all = [];
    // 1) image-rich feeds first
    const feedResults = await Promise.allSettled(
      FEEDS[lang].map(f => fetchText(f.url).then(x => x ? parseItems(x, f.src, f.cat, lang) : []))
    );
    feedResults.forEach(r => { if(r.status==='fulfilled' && r.value) all = all.concat(r.value); });

    // 2) if too few with images, enrich with Google News (reliable links)
    const withImg = all.filter(a => a.image).length;
    if(all.length < 6 || withImg < 3){
      const gResults = await Promise.allSettled(
        GNEWS[lang].map(g => fetchText(gnewsUrl(g.q, lang)).then(x => x ? parseItems(x, 'Google News', g.cat, lang).map(it=>({...it, cat:g.cat, th:TH_BY_CAT[g.cat]})) : []))
      );
      gResults.forEach(r => { if(r.status==='fulfilled' && r.value) all = all.concat(r.value.slice(0,3)); });
    }

    all = dedupe(all).filter(a => a.url).sort((x,y)=> y._ts - x._ts);
    return all.length ? all.slice(0, 9) : null;
  };

  /* ── Etsy shop live sync (best-effort; real-time sync belongs in the
        Next.js backend via the Etsy Open API v3). Returns ordered listing
        ids currently published, or null if the fetch is blocked. ── */
  async function fetchRaw(url){
    for(const px of PROXIES){
      try{
        const c=new AbortController(); const to=setTimeout(()=>c.abort(),6000);
        const r=await fetch(px(url),{cache:'no-store',signal:c.signal}); clearTimeout(to);
        if(!r.ok) continue;
        let txt=await r.text();
        if(txt[0]==='{' && /"contents"/.test(txt.slice(0,40))){ try{ txt=JSON.parse(txt).contents||txt; }catch(e){} }
        if(txt && txt.length>500) return txt;
      }catch(e){}
    }
    return null;
  }
  window.fetchEtsyListings = async function(){
    const html = await fetchRaw('https://www.etsy.com/es/shop/EcoInsight');
    if(!html) return null;
    const re=/\/listing\/(\d+)\/([a-z0-9-]+)/g; const seen=new Set(); const out=[]; let m;
    while((m=re.exec(html))){ const id=m[1]; if(seen.has(id)) continue; seen.add(id); out.push({id, slug:m[2], url:`https://www.etsy.com/es/listing/${id}/${m[2]}`}); }
    return out.length ? out : null;
  };

  /* ── Marketplace live sync ──────────────────────────────────
     Returns an array of product objects pulled from Etsy, trying:
       1) a configured JSON feed (window.ETSY_FEED_URL) — the
          serverless connector in etsy-sync.md; this is the path
          that yields reliable, full data (price + image + stock).
       2) the Etsy shop RSS feed via CORS proxies.
       3) the shop HTML (listing ids/slugs) via CORS proxies.
     Returns null when every path is blocked (Etsy bot-protects
     direct browser access) so the UI keeps the verified catalog. */
  function normalizeJson(arr){
    return arr.map(p=>({
      listingId: String(p.listingId||p.listing_id||p.id||''),
      title: (p.title&&typeof p.title==='object') ? p.title : {es:(p.title||p.name||''), en:(p.title_en||p.title||p.name||'')},
      desc:  (p.desc&&typeof p.desc==='object') ? p.desc : (p.description?{es:p.description,en:p.description_en||p.description}:null),
      url:   (p.url&&typeof p.url==='object') ? p.url : {es:(p.url||p.es_url||''), en:(p.en_url||p.url||'')},
      image: p.image||p.img||(Array.isArray(p.images)&&p.images[0])||null,
      price: p.price!=null?parseFloat(p.price):null,
      oldPrice: p.oldPrice!=null?parseFloat(p.oldPrice):(p.old_price!=null?parseFloat(p.old_price):null),
      currencyRaw: p.currency||'EUR', fmt: p.fmt||'', cat: p.cat||p.category||'',
    })).filter(p=>p.listingId);
  }
  function parseEtsyXml(xml){
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    if(doc.getElementsByTagName('parsererror').length) return [];
    let items = Array.from(doc.getElementsByTagName('item'));
    if(!items.length) items = Array.from(doc.getElementsByTagName('entry'));
    const out=[];
    for(const it of items){
      const get = tag => { const e=it.getElementsByTagName(tag)[0]; return e? e.textContent.trim() : ''; };
      const title = stripHtml(get('title')); if(!title) continue;
      let link = get('link'); if(!link){ const la=it.getElementsByTagName('link')[0]; if(la) link=la.getAttribute('href')||''; }
      const idm = (link||'').match(/listing\/(\d+)/); if(!idm) continue;
      const descRaw = get('description') || get('summary') || (it.getElementsByTagName('content:encoded')[0]||{}).textContent || '';
      const img = (descRaw.match(/<img[^>]+src=["']([^"']+)["']/i)||[])[1] || imgFrom(it) || null;
      const pm = descRaw.match(/(\d+[.,]\d{2})\s*(€|EUR|USD|\$|£)/) || [];
      out.push({listingId:idm[1], title:{es:title,en:title}, url:{es:link,en:link}, image:img,
        price: pm[1]?parseFloat(pm[1].replace(',','.')):null, currencyRaw: pm[2]||'EUR'});
    }
    return out;
  }
  window.fetchEtsyProducts = async function(lang){
    const shop = (window.ETSY_SHOP && window.ETSY_SHOP.name) || 'EcoInsight';
    // 1) configured JSON feed (serverless connector) — most reliable
    const cfg = window.ETSY_FEED_URL;
    if(cfg){
      try{ const r = await fetch(cfg,{cache:'no-store'}); if(r.ok){ const j=await r.json(); const a=Array.isArray(j)?j:(j.products||j.results||j.items||[]); const n=normalizeJson(a); if(n.length) return n; } }catch(e){}
      const txt = await fetchRaw(cfg);
      if(txt){ try{ const j=JSON.parse(txt); const a=Array.isArray(j)?j:(j.products||j.results||j.items||[]); const n=normalizeJson(a); if(n.length) return n; }catch(e){} }
    }
    // 2) Etsy shop RSS
    const xml = await fetchText(`https://www.etsy.com/shop/${shop}/rss`);
    if(xml){ const items = parseEtsyXml(xml); if(items.length) return items; }
    // 3) shop HTML scrape
    const html = await fetchRaw(`https://www.etsy.com/es/shop/${shop}`);
    if(html){
      const re=/\/listing\/(\d+)\/([a-z0-9-]+)/g; const seen=new Set(); const out=[]; let m;
      while((m=re.exec(html))){ if(seen.has(m[1])) continue; seen.add(m[1]);
        const title=m[2].replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
        out.push({listingId:m[1], title:{es:title,en:title}, image:null, price:null, currencyRaw:'EUR',
          url:{es:`https://www.etsy.com/es/listing/${m[1]}/${m[2]}`, en:`https://www.etsy.com/listing/${m[1]}/${m[2]}`}});
      }
      if(out.length) return out;
    }
    return null;
  };
})();
