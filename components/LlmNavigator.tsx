
import { useState } from "react";
import { askGemini } from "../services/geminiService";

export default function LlmNavigator() {
  const [input, setInput] = useState("Hello AI");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input) return;

    setMessages((prev) => [...prev, "🧑: " + input]);
    setLoading(true);

    const answer = await askGemini(input);

    setMessages((prev) => [...prev, "🤖: " + answer]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl">
      <h2 className="text-xl font-bold mb-3">AI Navigator</h2>

      <div className="h-60 overflow-y-auto mb-3 bg-black p-2 rounded">
        {messages.map((m, i) => (
          <div key={i} className="mb-1">{m}</div>
        ))}
        {loading && <div>🤖 думает...</div>}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 text-black rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI about traffic..."
        />
        <button
          onClick={handleAsk}
          className="bg-green-500 px-4 rounded"
        >
          Спросить
        </button>
      </div>
    </div>
  );
}
