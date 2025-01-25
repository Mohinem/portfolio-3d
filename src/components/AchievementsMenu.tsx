// src/components/AchievementsMenu.tsx

import React from "react";
import styles from "../styles/sharedStyles.module.css"; // Import shared styles
import AchievementCard from "./AchievementsCard"; // Import the new AchievementCard component
import { Achievement } from '../types/types';

import starthack from '../assets/Achievements/starthack.jpeg';
import codeforces from '../assets/Projects/codeforces.png';

type AchievementsMenuProps = {
  onClose: () => void;
  // Optionally, you can pass the SoundCloud track or playlist URL as a prop
  // trackUrl?: string;
};

// Sample list of achievements
const achievements: Achievement[] = [
  {
    name: "STARTHack 2022 - Case SWITCH",
    imageUrl: starthack,
    description:
      "I won't deny, this win was completely unexpected ! This was a win from 16 teams which were competing for this case. We made a solution involving virtual currency to enhance the experience of Swiss educational system.",
    achievementURL: "https://www.linkedin.com/posts/switch-switzerland_lifelonglearning-hackathon2022-startsummit-activity-6913152226429386752-sSa5",
  },
  {
    name: "Codeforces Top Rating - 1879 (Top 10 Percentile)",
    imageUrl: codeforces,
    description:
      "My competitive programming profile. I was a regular competitive programmer from 2016-2020. It was fun solving extremely complex algorithmic problems. I have retired from competitive programming to focus on other aspects of computer science.",
    achievementURL: "https://codeforces.com/profile/Mohinem",
  },
  // Add more achievements as needed
];

const AchievementsMenu: React.FC<AchievementsMenuProps> = ({ onClose /*, trackUrl */ }) => {
    return (
    <div className={styles.fancyContainer}>
      <div className={styles.playerContainer}>
        {/* Close Button */}
        <button onClick={onClose} className={styles.closeButton} aria-label="Close Achievements Menu">
          &times;
        </button>
        {/* Title Section */}
        <h2 className={styles.funkyTitle}>Achievements</h2>
        {/* Achievements List */}
        <div className={styles.scrollableProjectsContainer}>
          {achievements.map((achievement) => (
            <AchievementCard achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Inline styles for simplicity; consider moving to CSS or a CSS-in-JS library
// const overlayStyle: React.CSSProperties = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 1000,
// };

// const playerContainerStyle: React.CSSProperties = {
//   position: "relative",
//   width: "90%",
//   maxWidth: "500px",
//   padding: "20px",
//   backgroundColor: "#fff",
//   borderRadius: "10px",
// };

// const closeButtonStyle: React.CSSProperties = {
//   position: "absolute",
//   top: "10px",
//   right: "15px",
//   background: "transparent",
//   border: "none",
//   fontSize: "1.5rem",
//   cursor: "pointer",
// };

export default AchievementsMenu;
