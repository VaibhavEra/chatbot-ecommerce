import { createContext, useContext, useState } from "react";
import axios from "axios";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true); // ✅ fixed
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
        conversation_id: activeSessionId,
      });

      const { reply: aiReply, conversation_id } = res.data;

      if (!activeSessionId) {
        setActiveSessionId(conversation_id);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        setInput,
        isLoading,
        sendMessage,
        activeSessionId,
        setActiveSessionId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
