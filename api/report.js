export default async function handler(req, res) {
  try {
    // 🔹 GET → tarayıcıdan açınca patlamasın
    if (req.method === "GET") {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.send(`
        <h2>Report endpoint çalışıyor</h2>
        <p>Bu endpoint POST ile HTML alır.</p>
      `);
    }

    // 🔹 POST dışında kapat
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    let body = req.body;

    // 🔹 RAW body gelirse parse et
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const html = body?.html;

    if (!html) {
      return res.status(400).send("HTML missing");
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.send(html);

  } catch (err) {
    console.error("FUNCTION ERROR:", err);
    return res.status(500).send("Internal Server Error");
  }
}
