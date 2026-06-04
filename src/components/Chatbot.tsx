"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Chatbot.module.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Welcome to Atelier Interiors. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });
      const data = await res.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I am experiencing connectivity issues." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        className={styles.toggleBtn} 
        onClick={() => setIsOpen(true)}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.header}>
              <div className={styles.headerTitle}>Atelier Concierge</div>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.messagesContainer}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`${styles.messageWrapper} ${styles[msg.role]}`}>
                  <div className={styles.messageBubble}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className={`${styles.messageWrapper} ${styles.assistant}`}>
                  <div className={styles.messageBubble}>
                    <span className={styles.dot}>.</span>
                    <span className={styles.dot}>.</span>
                    <span className={styles.dot}>.</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className={styles.inputArea} onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                className={styles.input}
              />
              <button type="submit" className={styles.sendBtn} disabled={loading || !input.trim()}>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
