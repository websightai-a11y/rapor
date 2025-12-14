let lastHtml = null;
let lastUpdated = null;

export default async function handler(req, res) {
  // 👤 MÜŞTERİ BURADAN AÇAR
  if (req.method === "GET") {
    if (!lastHtml) {
      return res.send("Henüz rapor oluşturulmadı.");
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.send(lastHtml);
  }

  // 🤖 n8n BURADAN GÖNDERİR
  if (req.method === "POST") {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);

    if (!body?.html) {
      return res.status(400).send("HTML missing");
    }

    lastHtml = body.html;
    lastUpdated = new Date();

    return res.send("OK");
  }

  res.status(405).end();
}
