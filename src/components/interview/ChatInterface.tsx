import React, { useRef, useEffect } from "react";

interface Message {
  role: "ai" | "user";
  content: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full bg-dark-light rounded-md p-4 overflow-y-auto text-white">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "ai" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 relative ${
                message.role === "ai"
                  ? "bg-accent-blue/20 text-left animate-slide-right"
                  : "bg-accent-blue text-right animate-slide-left"
              }`}
            >
              <p>{message.content}</p>
              <span className="block text-xs text-gray-400 mt-1">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-accent-blue/20 rounded-lg p-3 animate-pulse">
              <p>Thinking...</p>
              <span className="block text-xs text-gray-400 mt-1">Just now</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatInterface;
