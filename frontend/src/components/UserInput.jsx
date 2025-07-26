import { useChat } from "../context/ChatContext";

export default function UserInput() {
  const { input, setInput, sendMessage, isLoading } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        className="flex-1 border rounded px-4 py-2 text-sm"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
        disabled={isLoading}
      >
        {isLoading ? "..." : "Send"}
      </button>
    </form>
  );
}
