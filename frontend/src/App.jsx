import ChatWindow from "./components/ChatWindow";
import { ChatProvider } from "./context/ChatContext";

export default function App() {
  return (
    <ChatProvider>
      <ChatWindow />
    </ChatProvider>
  );
}
