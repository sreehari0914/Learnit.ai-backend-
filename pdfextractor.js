const fetch = require('node-fetch');
const { generateCompletion } = require('./openai query')
require('dotenv').config();
const apiUrl = 'https://api.apyhub.com/extract/text/pdf-url';
const apyToken = process.env.PDF;

const extractPdfText = async (pdfUrl) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'apy-token': apyToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: pdfUrl }),
    };

    const response = await fetch(apiUrl, options);
    const jsonResponse = await response.json();

    // Assuming the extracted text is available in the pdfText property
    const pdfText = jsonResponse.data;

    // Pass the extracted text to generateCompletion and return its response
    const completionResponse = await generateCompletion(pdfText);

    return completionResponse;
  } catch (error) {
    console.error(error);
    throw new Error('PDF extraction and completion generation failed');
  }
};
module.exports = { extractPdfText };