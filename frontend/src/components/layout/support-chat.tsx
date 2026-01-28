import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, MessageSquare, Paperclip, Send, User, X } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "👋 Hi there! I'm FinBot, your personal finance assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const suggestedQuestions = [
    "How do I add a new transaction?",
    "How to connect my bank account?",
    "I need help with budgeting",
    "How do I set up savings goals?",
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 0);
  };

  const getBotResponse = (message: string) => {
    const lower = message.toLowerCase();
    if (lower.includes("transaction") || lower.includes("add"))
      return "To add a new transaction, click the '+' button in the bottom right or visit the Expenses page and select 'Add Transaction'.";
    if (
      lower.includes("bank") ||
      lower.includes("connect") ||
      lower.includes("account")
    )
      return "To connect your bank account, go to the 'Accounts & Cards' page and click 'Add Account'.";
    if (lower.includes("budget") || lower.includes("spending"))
      return "For budgeting, go to 'Budget Planning' where you can set and track category limits.";
    if (lower.includes("savings") || lower.includes("goal"))
      return "To set savings goals, visit the 'Savings Goals' page and click 'Add Savings Goal'.";
    if (lower.includes("hello") || lower.includes("hi"))
      return "Hello! How can I assist you with your finances today?";
    return "I'm not sure I understand. Could you please rephrase or contact our human support team?";
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      {/* Floating Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full h-14 w-14 fixed bottom-16 ${
          isOpen ? "right-[376px]" : "right-6"
        } shadow-lg transition-all duration-300 z-50`}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
        <span className="sr-only">{isOpen ? "Close Chat" : "Open Chat"}</span>
      </Button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-[350px] rounded-lg shadow-xl border bg-background z-40 transition-all duration-300 transform ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-[400px] opacity-0"
        }`}
      >
        <Card className="flex flex-col h-[500px] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b bg-primary text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-primary-foreground text-primary">
                <AvatarFallback>FB</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">FinBot Support</div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="bg-primary-foreground/20">
              24/7 Support
            </Badge>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  } gap-2`}
                >
                  {m.sender === "bot" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      m.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <div className="text-sm">{m.content}</div>
                    <div className="text-xs mt-1 opacity-70 text-right">
                      {formatTime(m.timestamp)}
                    </div>
                  </div>
                  {m.sender === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce"></div>
                      <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce delay-100"></div>
                      <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Suggested Questions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t">
              <p className="text-xs text-muted-foreground mb-2">
                Suggested questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleSuggestedQuestion(q)}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t flex items-center gap-2"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              className="shrink-0"
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>

          {/* Footer */}
          <div className="p-3 border-t bg-muted/50 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Need more help?
            </span>
            <Button variant="outline" size="sm" className="h-8">
              <User className="h-3 w-3 mr-1" /> Talk to a human
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
