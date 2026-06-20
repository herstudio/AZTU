// api/chat.js
// Bu fayl Vercel-d\u0259 server t\u0259r\u0259fd\u0259 i\u015fl\u0259yir. API a\u00e7ar\u0131 b\u0259rk burada deyil,
// Vercel-in "Environment Variables" b\u00f6lm\u0259sind\u0259n g\u0259lir (ANTHROPIC_API_KEY).
// Brauzer he\u00e7 vaxt bu a\u00e7ar\u0131 g\u00f6rm\u00fcr.

export default async function handler(req, res) {
  // Sad\u0259c\u0259 POST sorgularina icaz\u0259 ver
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server konfiqurasiyasi xetalidir: ANTHROPIC_API_KEY tapilmadi.' });
    return;
  }

  try {
    const { system, messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'messages massivi tələb olunur.' });
      return;
    }

    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        system: system || '',
        messages: messages
      })
    });

    const data = await anthropicResponse.json();

    if (!anthropicResponse.ok) {
      res.status(anthropicResponse.status).json({ error: data.error?.message || 'Anthropic API xetasi' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server xetasi bas verdi.' });
  }
}
