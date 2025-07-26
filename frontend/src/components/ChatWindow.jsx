import MessageList from "./MessageList";
import UserInput from "./UserInput";
import Sidebar from "./Sidebar";

export default function ChatWindow() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <MessageList />
        </div>
        <div className="p-4 border-t bg-white">
          <UserInput />
        </div>
      </div>
    </div>
  );
}
