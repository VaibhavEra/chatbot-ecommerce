export default function Message({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md px-4 py-2 rounded-lg text-sm ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800         "
        }`}
      >
        {content}
      </div>
    </div>
  );
}
