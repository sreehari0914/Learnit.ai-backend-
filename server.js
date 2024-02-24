// app.js
const express = require('express');

const { extractPdfText } = require('./pdfextractor');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const apiUrl = 'https://api.openai.com/v1/chat/completions';
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.post('/extract-pdf', async (req, res) => {
  try {
    const pdfUrl = req.body.url;

    if (!pdfUrl) {
      return res.status(400).json({ error: 'Missing PDF URL in the request body' });
    }

    const extractedText = await extractPdfText(pdfUrl);
    res.json({ extractedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
