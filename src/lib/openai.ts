import axios from "axios";

export const fetchOpenAICode = async (prompt: string): Promise<string> => {
  const apiKey =
    import.meta.env.VITE_OPENAI_API_KEY ||
    (typeof process !== "undefined" && process.env.VITE_OPENAI_API_KEY);

  if (!apiKey) {
    throw new Error("Missing OpenAI API Key");
  }
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};
