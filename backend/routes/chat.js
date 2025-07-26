import express from "express";
import Session from "../models/Session.js";
import Message from "../models/Message.js";
import { chatWithLLM } from "../services/llmService.js";
import { handleQuery } from "../services/queryHandler.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, message, conversationId } = req.body;

    const session = conversationId
      ? await Session.findById(conversationId)
      : await Session.create({ userId });

    // Store user message
    await Message.create({
      sessionId: session._id,
      role: "user",
      content: message,
    });

    // Get all messages in session
    const messages = await Message.find({ sessionId: session._id }).sort({
      createdAt: 1,
    });

    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Ask LLM for reply
    const aiResponse = await chatWithLLM(formattedMessages);

    let parsed;
    try {
      parsed = JSON.parse(aiResponse);
    } catch (_) {
      parsed = null;
    }

    let finalReply = aiResponse;

    if (parsed?.action === "query") {
      const dbData = await handleQuery(parsed);

      const summarizingMessages = [
        {
          role: "system",
          content: `Here is the result of your database query:\n${JSON.stringify(
            dbData,
            null,
            2
          )}\nPlease summarize this for the user.`,
        },
      ];

      finalReply = await chatWithLLM([
        ...formattedMessages,
        ...summarizingMessages,
      ]);
    }

    // Store assistant message
    await Message.create({
      sessionId: session._id,
      role: "assistant",
      content: finalReply,
    });

    res.status(200).json({
      reply: finalReply,
      conversationId: session._id,
    });
  } catch (error) {
    console.error("Chat route error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
