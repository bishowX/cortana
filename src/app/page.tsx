"use client";

import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";
import type { CoreMessage } from "ai";
import { continueConversation } from "./actions";
import { readStreamableValue } from "ai/rsc";

const defaultMessage: CoreMessage = {
  role: "assistant",
  content: "Hello! How can I assist you today?",
};

export default function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([defaultMessage]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage: CoreMessage = { content: input, role: "user" };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setInput("");

    const result = await continueConversation(updatedMessages);

    for await (const content of readStreamableValue(result)) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: content as string },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-2 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
            >
              {message.content as string}
            </div>
          </div>
        ))}
      </main>
      <footer className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </footer>
    </div>
  );
}
