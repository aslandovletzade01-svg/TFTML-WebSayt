export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY; 

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Yalnız POST qəbul edilir" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Sən Nihas AI-san. Azərbaycan dilində səmimi və şən cavab ver." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ text: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Xəta baş verdi" });
  }
}
