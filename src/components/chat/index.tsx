"use client";

import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";
import { generateId, type CoreMessage } from "ai";
import { readStreamableValue, useActions, useUIState } from "ai/rsc";
import { Countries } from "@/components/countries";
import { ClientMessage, continueConversation } from "@/app/actions";

const defaultMessage: CoreMessage = {
  role: "assistant",
  content: "Hello! How can I assist you today?",
};

export const Chat = () => {
  const [input, setInput] = useState("");
  const [component, setComponent] = useState<React.ReactNode>();

  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: generateId(), role: "user", display: input },
    ]);

    const message = await continueConversation(input);

    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ]);
    setInput("");
  };
  return (
    <>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.map((message: ClientMessage) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-2 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
            >
              {message.display}
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
    </>
  );
};
