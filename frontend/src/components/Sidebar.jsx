import { useChat } from "../context/ChatContext";

export default function Sidebar() {
  const { sessions, selectSession, activeSessionId } = useChat();

  return (
    <div className="w-48 bg-white border-r p-4 text-sm">
      <div className="font-semibold mb-2">Conversations</div>
      {sessions.length === 0 ? (
        <div className="text-gray-500">No conversations yet</div>
      ) : (
        <ul className="space-y-2">
          {sessions.map((session) => (
            <li
              key={session._id}
              className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${
                activeSessionId === session._id ? "bg-gray-200" : ""
              }`}
              onClick={() => selectSession(session._id)}
            >
              {new Date(session.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
