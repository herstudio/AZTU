export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server konfiqurasiyasi xetalidir: GROQ_API_KEY tapilmadi.' });
    return;
  }

  try {
    const { system, messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'messages massivi telab olunur.' });
      return;
    }

    const openaiMessages = [
      { role: 'system', content: system || '' },
      ...messages.map(m => ({ role: m.role, content: m.content }))
    ];

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1500,
        messages: openaiMessages
      })
    });

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      res.status(groqResponse.status).json({ error: data.error?.message || 'Groq API xetasi' });
      return;
    }

    const text = data.choices?.[0]?.message?.content || '';
    res.status(200).json({ content: [{ type: 'text', text }] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server xetasi bas verdi.' });
  }
}
