import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  sessionId: { type: Schema.Types.ObjectId, ref: "Session" },
  role: { type: String, enum: ["user", "assistant"] },
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = model("Message", MessageSchema);
export default Message;
