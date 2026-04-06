
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function askGemini(prompt: string) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${AIzaSyC-8pX8YTKqK8NeqsQ7O7CJUKJOlFTCaq0}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Нет ответа";
}
