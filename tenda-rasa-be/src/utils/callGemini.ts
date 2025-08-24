// utils/callGemini.ts
export async function callGemini(
  prompt: string,
  {
    timeoutMs = 30000, // total waktu tunggu per attempt
    retries = 2,       // jumlah retry kalau gagal koneksi
    backoffBase = 500  // jeda awal antar retry (ms)
  } = {}
): Promise<string> {
  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' +
    process.env.GEMINI_API_KEY;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const start = Date.now();
    try {
      console.log(`🚀 [Gemini] Attempt ${attempt + 1}...`);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: prompt }] }
          ]
        }),
        signal: controller.signal
      });

      const elapsed = Date.now() - start;
      console.log(`⏱ [Gemini] Fetch completed in ${elapsed}ms`);

      clearTimeout(timeout);

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Gemini API error:', {
          status: response.status,
          statusText: response.statusText,
          body: data
        });
        throw new Error(`Gemini API failed: ${response.status} ${response.statusText}`);
      }

      return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (err: any) {
      clearTimeout(timeout);

      const elapsed = Date.now() - start;
      console.error(`🔥 [Gemini] Attempt ${attempt + 1} failed after ${elapsed}ms:`, err?.message || err);

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