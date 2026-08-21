// utils/callGemini.ts

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message: string;
  };
}

interface CallGeminiOptions {
  timeoutMs?: number;
  retries?: number;
  backoffBase?: number;
}

export async function callGemini(
  prompt: string,
  {
    timeoutMs = 30000,
    retries = 2,
    backoffBase = 500
  }: CallGeminiOptions = {}
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('💀 GEMINI_API_KEY is not set.');
    return '';
  }
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort('timeout'), timeoutMs);

    const start = Date.now();
    try {
      console.log(`🚀 [Gemini] Attempt ${attempt + 1}...`);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);
      const data: GeminiResponse = await response.json();
      const elapsed = Date.now() - start;

      if (!response.ok) {
        const errorMessage = data.error?.message || response.statusText;
        console.error(`❌ Gemini API error on attempt ${attempt + 1} (${response.status}):`, errorMessage);
        throw new Error(`API Error: ${errorMessage}`);
      }

      console.log(`✅ [Gemini] Attempt ${attempt + 1} successful in ${elapsed}ms`);

      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    } catch (err: any) {
      clearTimeout(timeout);
      const elapsed = Date.now() - start;

      if (err.name === 'AbortError') {
        console.error(`🔥 [Gemini] Attempt ${attempt + 1} timed out after ${elapsed}ms.`);
      } else {
        console.error(`🔥 [Gemini] Attempt ${attempt + 1} failed after ${elapsed}ms:`, err.message || err);
      }

      if (attempt < retries) {
        const delay = backoffBase * Math.pow(2, attempt);
        console.log(`🔄 Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error('💀 All attempts failed.');
        return '';
      }
    }
  }

  return '';
}