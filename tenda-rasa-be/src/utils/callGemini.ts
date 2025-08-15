export async function callGemini(prompt: string): Promise<string> {
  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { text: prompt }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Gemini API error:', {
        status: response.status,
        statusText: response.statusText,
        body: data
      });
      throw new Error(`Gemini API failed: ${response.status} ${response.statusText}`);
    }

    // Gemini response format: data.candidates[0].content.parts[0].text
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || '';
  } catch (err) {
    console.error('🔥 callGemini failed:', err);
    return '';
  }
}