import crypto from 'crypto';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const hash = crypto.createHash('sha256').update(text, 'utf8').digest('hex');
    return res.status(200).json({ hash });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
