export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  // (Opsiyonel) Basit token koruması
  const expected = process.env.API_KEY;
  if (expected) {
    const auth = req.headers.authorization || "";
    if (auth !== `Bearer ${expected}`) {
      return res.status(401).send("Unauthorized");
    }
  }

  const { html } = req.body || {};
  if (!html) {
    return res.status(400).send("HTML missing");
  }

  // CDN cache (performans)
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}
