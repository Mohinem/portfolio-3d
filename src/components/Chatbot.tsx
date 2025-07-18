// src/components/Chatbot.tsx
import React, { useState, useEffect, useRef } from "react";

export type MenuKey =
  | "music"
  | "about"
  | "education"
  | "experience"
  | "projects"
  | "achievements";

interface ChatbotProps {
  open: boolean;
  minimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onOpenMenu: (menuKey: MenuKey) => void;
  onCloseMenu: () => void;
}

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({
  open,
  minimized,
  onClose,
  onMinimize,
  onOpenMenu,
  onCloseMenu,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        "👋 Hello! I’m your portfolio assistant. Ask me to open “music”, “about me”, “education”, “experience”, “projects”, or “achievements.”",
    },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, minimized]);

  const parseAndRespond = (text: string): string => {
    const lc = text.toLowerCase();
    if (lc.includes("music")) {
      onOpenMenu("music");
      return "🎵 Opening Music Player.";
    }
    if (lc.includes("about")) {
      onOpenMenu("about");
      return "👤 Showing About Me.";
    }
    if (lc.includes("education")) {
      onOpenMenu("education");
      return "📚 Here’s Education.";
    }
    if (lc.includes("experience")) {
      onOpenMenu("experience");
      return "💼 Displaying Experience.";
    }
    if (lc.includes("projects")) {
      onOpenMenu("projects");
      return "🛠️ Listing Projects.";
    }
    if (lc.includes("achievements")) {
      onOpenMenu("achievements");
      return "🏆 Loading Achievements.";
    }
    if (/\b(back|close|exit)\b/.test(lc)) {
      onCloseMenu();
      return "↩️ Going back.";
    }
    return "❓ Sorry, I didn’t understand. Try one of those keywords.";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const txt = input.trim();
    if (!txt) return;
    setMessages((m) => [...m, { sender: "user", text: txt }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { sender: "bot", text: parseAndRespond(txt) }]);
    }, 200);
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: minimized ? 60 : 320,
        height: minimized ? 80 : 400,
        background: "#222",
        color: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "width 0.2s, height 0.2s",
        zIndex: 10000,
      }}
    >
      {/* HEADER */}
      <div
        onClick={minimized ? onMinimize : undefined}
        style={{
          background: "#333",
          display: "flex",
          flexDirection: minimized ? "column" : "row",
          alignItems: "center",
          justifyContent: minimized ? "space-around" : "space-between",
          padding: minimized ? "4px 0" : "0 8px",
          height: 40,
          cursor: minimized ? "pointer" : "default",
        }}
      >
        {!minimized && <strong>🤖 Chatbot</strong>}
        {minimized ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              aria-label="Maximize"
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 18,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              🔼
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close"
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 18,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={onMinimize}
              aria-label="Minimize"
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 16,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              _
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 18,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* BODY */}
      {!minimized && (
        <>
          <div
            style={{
              flex: 1,
              padding: 8,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                  background: m.sender === "user" ? "#4a90e2" : "#555",
                  padding: "6px 10px",
                  borderRadius: 12,
                  maxWidth: "80%",
                  wordBreak: "break-word",
                }}
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              padding: 8,
              borderTop: "1px solid #444",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command…"
              style={{
                flex: 1,
                padding: 6,
                borderRadius: 4,
                border: "none",
                marginRight: 6,
                background: "#333",
                color: "#fff",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "6px 12px",
                background: "#4a90e2",
                border: "none",
                borderRadius: 4,
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Chatbot;
