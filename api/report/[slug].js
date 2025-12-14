import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { slug } = req.query;

  // ---------------- GET ----------------
  if (req.method === 'GET') {
    const html = await kv.get(slug);

    if (!html) {
      return res
        .status(404)
        .send('<h2>Bu rapor henüz oluşturulmadı.</h2>');
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  }

  // ---------------- POST ----------------
  if (req.method === 'POST') {
    const { html } = req.body;

    if (!html) {
      return res.status(400).json({ error: 'HTML missing' });
    }

    // 30 gün sakla (geçici ama uzun)
    await kv.set(slug, html, { ex: 60 * 60 * 24 * 30 });

    return res.status(200).json({
      ok: true,
      url: `https://${req.headers.host}/api/report/${slug}`,
    });
  }

  return res.status(405).end();
}
