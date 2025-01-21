// src/components/ExperienceMenu.tsx

import React from "react";
import styles from "../styles/sharedStyles.module.css"; // Import shared styles

type ExperienceMenuProps = {
  onClose: () => void;
  // Optionally, you can pass the SoundCloud track or playlist URL as a prop
  // trackUrl?: string;
};

const ExperienceMenu: React.FC<ExperienceMenuProps> = ({ onClose /*, trackUrl */ }) => {
    return (
    <div className={styles.fancyContainer}>
      <div className={styles.playerContainer}>
        {/* Close Button */}
        <button onClick={onClose} className={styles.closeButton} aria-label="Close Experience Menu">
          &times;
        </button>
        {/* Title Section */}
        <h2 className={styles.funkyTitle}>Experience</h2>
        {/* Description Section */}
        <p className={styles.funkyDescription}>
          Hola ! komo estas ?
        </p>
      </div>
    </div>
  );
};

// Inline styles for simplicity; consider moving to CSS or a CSS-in-JS library
const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const playerContainerStyle: React.CSSProperties = {
  position: "relative",
  width: "90%",
  maxWidth: "500px",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "10px",
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "15px",
  background: "transparent",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
};

export default ExperienceMenu;
