// src/components/ExperienceMenu.tsx

import React from "react";
import styles from "../styles/sharedStyles.module.css"; // Import shared styles
import ExperienceCard from "./ExperienceCard"; // Import the new ExperienceCard component
import { Experience } from '../types/types';

type ExperienceMenuProps = {
  onClose: () => void;
  // Optionally, you can pass the SoundCloud track or playlist URL as a prop
  // trackUrl?: string;
};

// Sample list of experiences
const experiences: Experience[] = [
  {
    company: "Constructor University",
    role: "Research Associate",
    duration: "2022-2024",
    description:
      "Discovered and documented performance improvments on rim storage schemes on Rasdaman array database. Preprocessed and ingested geospatial data. Contributed to advanced time interval functionality to support queries on geo-data. Developed and maintained react landing pages, servers and array datasets.",
    // imageUrl: ConstructorUniversityImage,
  },
  {
    company: "Wissen Technology",
    role: "Software Engineer",
    duration: "2020-2020",
    description:
      "Frontend development with Angular JS on internal reporting platforms."
      // imageUrl: AITImage,
  },
  {
    company: "HSBC",
    role: "Software Engineer",
    duration: "2018-2020",
    description:
      "Mainframe developer. Performed migration of American credit card systems. Designed plans for future mainframe migration to cloud. Provided support for daily and weekly batch runs.",
    // imageUrl: ConstructorUniversityImage,
  },  
  // Add more experiences as needed
];

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
        {/* Experience List */}
        <div className={styles.ExperienceContainer}>
          {experiences.map((experience) => (
            <ExperienceCard experience ={experience} />
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

export default ExperienceMenu;
