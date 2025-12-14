export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  let body = req.body;

  // 🔴 KRİTİK DÜZELTME
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).send("Invalid JSON");
    }
  }

  const html = body?.html;

  if (!html) {
    return res.status(400).send("HTML missing");
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(html);
}
