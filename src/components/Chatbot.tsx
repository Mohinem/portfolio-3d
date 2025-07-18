// Chatbot.tsx
import React, { useState, useEffect } from "react";

interface ChatbotProps {
  open: boolean;
  minimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  /** Called when the user picks one of the six menus (or music player) */
  onOpenMenu: (menuKey: MenuKey) => void;
  /** Called to close whichever menu is currently open */
  onCloseMenu: () => void;
  resetChat?: number;
}

type MenuKey = 
  | "music"
  | "about"
  | "education"
  | "experience"
  | "projects"
  | "achievements";

const menuLabels: Record<MenuKey,string> = {
  music:       "Play Music",
  about:       "About Me",
  education:   "Education",
  experience:  "Experience",
  projects:    "Projects",
  achievements:"Achievements",
};

const Chatbot: React.FC<ChatbotProps> = ({
  open,
  minimized,
  onClose,
  onMinimize,
  onOpenMenu,
  onCloseMenu,
  resetChat,
}) => {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);

// whenever parent bumps resetChat, clear our internal menu
useEffect(() => {
  setActiveMenu(null);
}, [resetChat]);

  const handleSelect = (key: MenuKey) => {
    setActiveMenu(key);
    onOpenMenu(key);
  };
  const handleBack = () => {
    setActiveMenu(null);
    onCloseMenu();
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: minimized ? 60 : 320,
        height: minimized ? 60 : 400,
        background: "#222",
        color: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        zIndex: 10000,
        overflow: "hidden",
        transition: "width 0.2s, height 0.2s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: minimized ? "center" : "space-between",
          background: "#333",
          padding: minimized ? 0 : "8px 16px",
          height: 48,
          cursor: minimized ? "pointer" : undefined,
        }}
        onClick={minimized ? onMinimize : undefined}
      >
        {!minimized && <strong>🤖 Chatbot Assistant</strong>}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            aria-label="Minimize"
            onClick={onMinimize}
            style={{ background: "none", border: "none", color: "#fff", fontSize: 18 }}
          >
            {minimized ? "🔼" : "_"}
          </button>
          <button
            aria-label="Close"
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#fff", fontSize: 18 }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Body */}
      {!minimized && (
        <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column" }}>
          {activeMenu === null ? (
            <>
              <p style={{ marginBottom: 12 }}>Hi! 👋 Need help navigating my portfolio?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {(
                  Object.keys(menuLabels) as MenuKey[]
                ).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    style={{
                      background: "#444",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 12px",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    {menuLabels[key]}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={handleBack}
                style={{
                  background: "none",
                  border: "none",
                  color: "#66BB6A",
                  cursor: "pointer",
                  marginBottom: 8,
                }}
              >
                ← Back
              </button>
              <div style={{ flex: 1 }}>
                {/* We don’t render the menu itself here; the parent will */}
                <p style={{ fontStyle: "italic" }}>
                  Opening “{menuLabels[activeMenu]}”…
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
