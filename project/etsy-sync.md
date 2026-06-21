# Sincronización automática con Etsy — EcoInsight

La sección **Plantillas / Marketplace** se sincroniza con tu tienda Etsy. Como Etsy
**bloquea el acceso directo desde el navegador** (protección anti-bots: las llamadas
devuelven 403), la página trae tu catálogo real verificado y, además, intenta traer
los productos en vivo en este orden:

1. **Feed JSON propio** (`window.ETSY_FEED_URL`) — la forma 100% fiable (precio, imagen, stock).
2. Feed RSS de la tienda Etsy (mejor esfuerzo).
3. HTML de la tienda (mejor esfuerzo).

Para activar la **sincronización totalmente automática** sólo necesitas desplegar un
pequeño conector (gratis) que llama a la **API oficial de Etsy v3** y devuelve JSON.
Luego pegas su URL en `app/data.jsx`:

```js
window.ETSY_FEED_URL = 'https://TU-CONECTOR.workers.dev';
```

A partir de ahí, la página se actualiza sola (al cargar, cada 6 h y cada día).

---

## 1) Credenciales de Etsy (5 min)

1. Entra a https://www.etsy.com/developers/your-apps y crea una app → obtienes una **API Key (keystring)**.
2. Tu **shop_id** es `62203228` (tienda EcoInsight).

## 2) Conector — Cloudflare Worker (gratis)

Crea un Worker en https://workers.cloudflare.com y pega esto. Define la variable de
entorno `ETSY_API_KEY` con tu keystring.

```js
export default {
  async fetch(req, env) {
    const SHOP_ID = '62203228';
    const url = `https://openapi.etsy.com/v3/application/shops/${SHOP_ID}/listings/active?limit=24&includes=Images`;
    const r = await fetch(url, { headers: { 'x-api-key': env.ETSY_API_KEY } });
    const data = await r.json();
    const products = (data.results || []).map(l => ({
      listingId: String(l.listing_id),
      title: l.title,
      url: l.url,
      price: l.price ? Number(l.price.amount) / Number(l.price.divisor) : null,
      currency: l.price ? l.price.currency_code : 'EUR',
      image: (l.images && l.images[0] && l.images[0].url_570xN) || null,
      cat: '', fmt: '',
    }));
    return new Response(JSON.stringify({ products }), {
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',          // permite que la página lo lea
        'cache-control': 'public, max-age=21600',     // cachea 6 h
      },
    });
  },
};
```

> El mismo patrón sirve en Vercel/Netlify Functions o AWS Lambda: llama a la API de
> Etsy con la cabecera `x-api-key`, mapea los campos y devuelve JSON con
> `access-control-allow-origin: *`.

## 3) Conectar

Pega la URL del Worker en `window.ETSY_FEED_URL` (en `app/data.jsx`). Listo: la sección
mostrará tus productos en vivo y se mantendrá sincronizada automáticamente. Si el
conector deja de responder, la página vuelve al catálogo verificado sin romperse.

## Formato JSON esperado por la página

Un array (o `{ "products": [...] }`) de objetos. Campos reconocidos:

```json
{
  "listingId": "4376732622",
  "title": "Panel Huella de Carbono…",   // o { "es": "...", "en": "..." }
  "url": "https://www.etsy.com/listing/4376732622/...",  // o { "es": "...", "en": "..." }
  "price": 7.50,
  "oldPrice": 10.72,
  "currency": "EUR",
  "image": "https://i.etsystatic.com/.../il_570xN.jpg",
  "cat": "powerbi",     // todos | ofertas | excel | powerbi | ebook
  "fmt": "Excel + Power BI"
}
```
