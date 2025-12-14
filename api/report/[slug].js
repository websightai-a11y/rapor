// Basit in-memory store
const store = {};

export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).send("Missing report key");
  }

  // 👤 MÜŞTERİ (GET)
  if (req.method === "GET") {
    const record = store[slug];

    if (!record) {
      return res.send("Bu rapor henüz oluşturulmadı.");
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.send(record.html);
  }

  // 🤖 n8n (POST)
  if (req.method === "POST") {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);

    if (!body?.html) {
      return res.status(400).send("HTML missing");
    }

    store[slug] = {
      html: body.html,
      updatedAt: new Date()
    };

    return res.send("OK");
  }

  res.status(405).end();
}
