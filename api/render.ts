export default function handler(req, res) {
  const { html } = req.query;

  if (!html) {
    return res.status(400).send('HTML missing');
  }

  try {
    const decodedHtml = Buffer.from(html, 'base64').toString('utf-8');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(decodedHtml);
  } catch (e) {
    res.status(400).send('Invalid HTML');
  }
}
