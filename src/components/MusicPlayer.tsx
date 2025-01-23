// src/components/MusicPlayer.tsx

import React from "react";
import styles from "../styles/sharedStyles.module.css"; // Import shared styles

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
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true`;

  //
  console.log(styles);

  return (
    <div className={styles.fancyContainer}>
      <div className={styles.playerContainer}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close Music Player"
        >
          &times;
        </button>
        
        {/* Title Section */}
        <h2 className={styles.funkyTitle}>Music</h2>
        
        {/* Description Section */}
        <p className={styles.funkyDescription}>
          Music has been my childhood passion. I was more into rap and hip-hop; and consequently more involved with lyrics and rhyming schemes than music production. As I grew older, my taste in music changed, and I lost the passion towards rap. However, I recently rediscovered my passion in EDM. This is one of my sample EDM tracks. Of course, you can find more stuff on my SoundCloud.
          <br /><br />
          I'm also open to part-time music production gigs as well. FL Studio is my tool of choice. You are free to contact me for producing EDM tracks.
        </p>
        
        {/* SoundCloud Widget */}
        <iframe
          title="SoundCloud Player"
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={embedUrl}
          className={styles.soundCloudIframe}
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
