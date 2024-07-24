const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function (req, res) {
  if (req.method === 'POST') {
    try {
      const { messages } = req.body;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Vous êtes un expert en horticulture, spécialisé dans les plantes d'intérieur. Donnez des conseils précis et utiles." },
          ...messages
        ],
      });

      res.status(200).json({ reply: response.choices[0].message.content });
    } catch (error) {
      console.error('Erreur OpenAI:', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la communication avec ChatGPT.' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
};