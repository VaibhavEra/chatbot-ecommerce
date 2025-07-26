import axios from "axios";

const GROQ_API_URL = "https:api.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

/**
 *
 * @param {Array<{role: string, content: string}} messages
 * @returns {Promise<string>}
 */

export const chatWithLLM = async (messages) => {
  try {
    const resp = await axios.post(
      GROQ_API_URL,
      {
        model: MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return resp.data.choices?.[0]?.message?.content || "No response.";
  } catch (error) {
    console.error("Groq API error: ", error.response?.data || error.message);
    throw new Error("LLM request failed");
  }
};
