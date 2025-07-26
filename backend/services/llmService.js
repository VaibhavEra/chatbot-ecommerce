import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL || "llama-3-1-8b-instant";

const systemPrompt = {
  role: "system",
  content: `
You are a shopping assistant. Help users by asking clarifying questions and using available data.

Once enough information is gathered, respond ONLY with a JSON object like:
{"action": "query", "collection": "products", "filter": {"name": "T-shirt"}}

Do not explain the action. Just reply with the JSON. Use collection names like: products, orders, inventory_items, users, distribution_centers, order_items.

Respond naturally when clarification is needed.
  `.trim(),
};

/**
 * Sends a list of messages to Groq LLM and returns the response text
 * @param {Array<{role: string, content: string}>} messages
 * @returns {Promise<string>}
 */
export const chatWithLLM = async (messages) => {
  try {
    const payload = [systemPrompt, ...messages];

    const resp = await axios.post(
      GROQ_API_URL,
      {
        model: MODEL,
        messages: payload,
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
