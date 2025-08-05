import React, { useState } from 'react';

const AIAssistant = ({ expenses, budget }) => {
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch AI-generated saving tips
  const getAiSuggestions = async () => {
    setIsLoading(true);
    setError('');
    setSuggestions('');

    const API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Ensure this matches your .env file
    console.log('API Key:', API_KEY);
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    // Format expenses into a readable text format
    const expenseText = expenses
      .map(e => `${e.date}: ${e.category} - ₹${e.amount} (${e.notes || 'no notes'})`)
      .join('\n');

    // Prompt for AI
    const prompt = `
      You are a friendly and helpful financial advisor AI.
      The currency is in Indian Rupees (₹).
      Based on the following list of expenses and a monthly budget of ₹${budget}, please provide 3-5 specific, actionable, and encouraging cost-saving tips relevant to an Indian context if possible.
      Format your response in a clear, easy-to-read manner using markdown (e.g., bullet points).
      Do not start with "Here are some tips...". Just start with the first tip.

      Expenses:
      ${expenseText}
    `;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const textResponse = data.candidates[0].content.parts[0].text;
      setSuggestions(textResponse);
    } catch (err) {
      setError('Sorry, I couldn\'t fetch suggestions right now. Please check your API key and try again later.');
      console.error('Error fetching AI suggestions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-assistant">
      <h3>🧠 AI Budget Advisor</h3>
      <button onClick={getAiSuggestions} disabled={isLoading || expenses.length === 0}>
        {isLoading ? 'Analyzing...' : 'Get Saving Tips'}
      </button>

      {error && <p className="error-message">{error}</p>}
      
      {suggestions && (
        <div className="suggestions-box">
          <h4>Here are some personalized tips for you:</h4>
          <pre>{suggestions}</pre>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;