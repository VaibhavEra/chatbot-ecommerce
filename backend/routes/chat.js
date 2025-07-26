import express from "express";
import Session from "../models/Session.js";
import Message from "../models/Message.js";
import { chatWithLLM } from "../services/llmService.js";

const router = express.router();

router.post("/", async (req, res) => {
  try {
    const { userId, message, conversationId } = req.body;

    const session = conversationId
      ? await Session.findById(conversationId)
      : await Session.create({ userId });

    const userMessage = await Message.create({
      sessionId: session._id,
      role: "user",
      content: message,
    });

    const messages = await Message.find({ sessionId: session._id }).sort({
      createdAt: 1,
    });

    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const aiResponse = await chatWithLLM(formattedMessages);

    const assistantMessage = await Message.create({
      sessionId: session._id,
      role: "user",
      content: aiResponse,
    });

    res.status(200).json({
      reply: aiResponse,
      conversationId: session._id,
    });
  } catch (error) {
    console.error("Chat route error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
