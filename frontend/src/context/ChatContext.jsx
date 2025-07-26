import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sessions");
        setSessions(res.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  const selectSession = async (sessionId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/sessions/${sessionId}`
      );
      setMessages(res.data);
      setActiveSessionId(sessionId);
    } catch (error) {
      console.error("Error fetching session messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
        conversation_id: activeSessionId,
      });

      const { reply: aiReply, conversation_id } = res.data;

      if (!activeSessionId) {
        setActiveSessionId(conversation_id);
        const updated = await axios.get("http://localhost:5000/api/sessions");
        setSessions(updated.data);
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
        sessions,
        activeSessionId,
        setActiveSessionId,
        selectSession,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
