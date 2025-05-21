import axios from "axios";

export const fetchOpenAICode = async (prompt: string): Promise<string> => {
  const apiKey =
    import.meta.env.VITE_OPENAI_API_KEY ||
    (typeof process !== "undefined" && process.env.VITE_OPENAI_API_KEY) ||
    (typeof process !== "undefined" && process.env.OPENAI_API_KEY); // final fallback

  if (!apiKey) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "[ERROR] Missing OpenAI API Key (VITE_OPENAI_API_KEY not set)"
    );

    console.log(
      "\x1b[36m%s\x1b[0m",
      "[DEBUG] import.meta.env keys:",
      Object.keys(import.meta.env || {}).join(", ")
    );

    console.log(
      "\x1b[35m%s\x1b[0m",
      "[DEBUG] process.env keys:",
      typeof process !== "undefined"
        ? Object.keys(process.env || {}).join(", ")
        : "process not defined"
    );

    throw new Error("Missing OpenAI API key.");
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
