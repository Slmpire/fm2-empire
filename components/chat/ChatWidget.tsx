// ============================================================
// FM2 EMPIRE — AI CHAT WIDGET
// Floating bubble in the bottom-right corner, visible on
// every page. Click to open a chat panel powered by Gemini
// via the /api/chat route. Conversation history is kept in
// memory only — refreshing the page clears it.
// ============================================================

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

const SUGGESTED_QUESTIONS = [
  "How do I apply as an artist?",
  "What does the internship program involve?",
  "How do I buy event tickets?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, I'm having trouble connecting right now. Try again in a moment, or reach our team directly at /contact.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating bubble */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: "var(--color-fm2-gold)" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} style={{ color: "var(--color-fm2-black)" }} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} style={{ color: "var(--color-fm2-black)" }} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[90] w-[90vw] sm:w-96 h-[70vh] sm:h-[32rem] rounded-2xl overflow-hidden flex flex-col"
            style={{
              backgroundColor: "var(--color-fm2-surface)",
              border: "1px solid var(--color-fm2-border)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 border-b shrink-0"
              style={{ borderColor: "var(--color-fm2-border)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)" }}
              >
                <Sparkles size={15} style={{ color: "var(--color-fm2-gold)" }} />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm" style={{ color: "var(--color-fm2-white)" }}>
                  FM2 Assistant
                </span>
                <span className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>
                  Ask me anything about FM2
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
              {messages.length === 0 && (
                <div className="flex flex-col gap-3 mt-2">
                  <p className="text-sm" style={{ color: "var(--color-fm2-muted)" }}>
                    Hi! I&apos;m the FM2 assistant. Ask me about applying, services, events, or anything else.
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-left text-xs px-3 py-2.5 rounded-lg transition-colors duration-200"
                        style={{
                          backgroundColor: "var(--color-fm2-black)",
                          border: "1px solid var(--color-fm2-border)",
                          color: "var(--color-fm2-white)",
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className="max-w-[85%] px-4 py-2.5 rounded-xl text-sm leading-relaxed"
                    style={{
                      backgroundColor: msg.role === "user" ? "var(--color-fm2-gold)" : "var(--color-fm2-black)",
                      color: msg.role === "user" ? "var(--color-fm2-black)" : "var(--color-fm2-white)",
                      border: msg.role === "user" ? "none" : "1px solid var(--color-fm2-border)",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-2.5 rounded-xl flex items-center gap-2"
                    style={{ backgroundColor: "var(--color-fm2-black)", border: "1px solid var(--color-fm2-border)" }}
                  >
                    <Loader2 size={14} className="animate-spin" style={{ color: "var(--color-fm2-gold)" }} />
                    <span className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t shrink-0"
              style={{ borderColor: "var(--color-fm2-border)" }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none"
                style={{
                  backgroundColor: "var(--color-fm2-black)",
                  border: "1px solid var(--color-fm2-border)",
                  color: "var(--color-fm2-white)",
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
                style={{ backgroundColor: "var(--color-fm2-gold)" }}
              >
                <Send size={15} style={{ color: "var(--color-fm2-black)" }} />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}