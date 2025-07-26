import express from "express";
import Session from "../models/Session.js";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sessions = await Session.find().sort({ createdAt: -1 }).lean();
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:sessionId", async (req, res) => {
  try {
    const messages = await Message.find({
      sessionId: req.params.sessionId,
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
