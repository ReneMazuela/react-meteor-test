import axios from "axios";

export const fetchOpenAICode = async (prompt: string): Promise<string> => {
  const apiKey =
    import.meta.env.VITE_OPENAI_API_KEY || window?.__env__?.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    console.error("[ENV ERROR] OpenAI API key missing.");
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
