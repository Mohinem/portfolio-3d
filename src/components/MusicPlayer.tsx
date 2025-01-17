// src/components/MusicPlayer.tsx

import React from "react";

type MusicPlayerProps = {
  onClose: () => void;
  // Optionally, you can pass the SoundCloud track or playlist URL as a prop
  // trackUrl?: string;
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({ onClose /*, trackUrl */ }) => {
  // Define the SoundCloud track or playlist URL
  // If you passed it as a prop, use the prop instead
  const soundCloudUrl =
    "https://soundcloud.com/mohinem-rap-master/beginning"; // Replace with your SoundCloud track or playlist URL

  // Encode the URL for embedding
  const encodedUrl = encodeURIComponent(soundCloudUrl);

  // Construct the embed URL
  const embedUrl = `https://w.soundcloud.com/player/?url=https://soundcloud.com/mohinem-rap-master/beginning&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true`;

  return (
    <div style={overlayStyle}>
      <div style={playerContainerStyle}>
        {/* Close Button */}
        <button onClick={onClose} style={closeButtonStyle}>
          &times;
        </button>
        {/* SoundCloud Widget */}
        <iframe
          title="SoundCloud Player"
          width="100%"
          height="166" // Default height; adjust as needed
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={embedUrl}
          style={{ borderRadius: "10px" }}
        ></iframe>
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

export default MusicPlayer;
