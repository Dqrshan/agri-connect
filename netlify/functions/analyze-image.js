exports.handler = async (event) => {
  try {
    const request = JSON.parse(event.body);
    console.log(request);
    const apiKey = process.env.VITE_GEMINI_API_KEY.replaceAll('"', '').replaceAll("'", '');
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch from Gemini API' }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error in analyze-image function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};