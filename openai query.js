const apiUrl = 'https://api.openai.com/v1/chat/completions';
require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.OPENAPI

async function generateCompletion(userInput) {
  try {
    if (!userInput) {
      throw new Error('User input is required');
    }

    const response = await axios.post(apiUrl, {
      messages: [{ role: 'user', content: `summarize the neccessary content ${userInput}` }],
      model: 'gpt-4-turbo-preview',
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error making request:', error.message);
    throw error;
  }
}
module.exports = { generateCompletion }