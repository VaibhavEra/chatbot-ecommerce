import { useChat } from "../context/ChatContext";
import Message from "./Message";

export default function MessageList() {
  const { messages } = useChat();

  return (
    <div className="space-y-3">
      {messages.map((message, index) => (
        <Message key={index} role={message.role} content={message.content} />
      ))}
    </div>
  );
}
