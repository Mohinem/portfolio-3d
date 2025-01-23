// src/components/AboutMeMenu.tsx

import React from "react";
import styles from "../styles/sharedStyles.module.css"; // Import shared styles
import profilePicture from "../assets/profile.png"; // Adjust the path as needed

type AboutMeMenuProps = {
  onClose: () => void;
  // Optionally, you can pass the SoundCloud track or playlist URL as a prop
  // trackUrl?: string;
};

const AboutMeMenu: React.FC<AboutMeMenuProps> = ({ onClose /*, trackUrl */ }) => {
  return (
    <div className={styles.fancyContainer}>
      <div className={styles.playerContainer}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close About Me Menu"
        >
          &times;
        </button>
        {/* Content Wrapper */}
        <div className={styles.contentWrapper}>
          {/* Text Section */}
          <div className={styles.textSection}>
            {/* Title Section */}
            <h2 className={styles.funkyTitle}>About Me</h2>
            {/* Description Section */}
            <p className={styles.funkyDescription}>
              Hi everyone, I am Mohit Kumar Basak.
              <br />
              I've recently graduated from Constructor University, Bremen, with a Masters in Computer Science-Software Engineering, while working as a Research Associate at the same place. I also have a Masters degree from the erstwhile Schaffhausen Institute of Technology (SIT), now called Constructor Institute of Technology, in Switzerland.
              <br />
              <br />
              I completed my Bachelor's Degree in Information Technology from Pune University and have around 3.5 years of experience in software development and research.
              <br />
              <br />
              There was a time when I competed and enjoyed competing in programming competitions. Today, I'm more interested in real-life applications and research. Generative AI has taken over the storm recently; I have wholeheartedly embraced AI in my daily life, and successfully automate my tasks on ChatGPT ! I am committed to achieve my objectives with the least amount of extremely high quality prompts. It helped me learn three.js from scratch, and this website is a successful outcome of my learnings.
              <br />
              <br />
              I also make music, sometimes. I am decently good at making EDM tracks; please check the building named 'Music' !
              <br />
              <br />
              With the completion of my course, I'm open to work! I have an equal command over Python and C++ programming languages. I'm decently strong with Java and JavaScript. My Masters' Thesis involved object-oriented programming with the Eiffel programming language. If you have an interesting job opportunity for me, hit me up!
            
            </p>
          </div>
          {/* Profile Picture Section */}
          <div className={styles.imageSection}>
            <img
              src={profilePicture}
              alt="Mohit Kumar Basak"
              className={styles.profilePicture}
              loading="lazy"
            />
          </div>
        </div>
        {/* Optional: SoundCloud Iframe (Uncomment if needed) */}
        {/* {trackUrl && (
          <iframe
            className={styles.soundCloudIframe}
            src={trackUrl}
            title="SoundCloud Player"
            allow="autoplay"
          ></iframe>
        )} */}
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

export default AboutMeMenu;
