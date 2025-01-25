// src/components/ProjectsMenu.tsx

// import React from "react";
import styles from "../styles/sharedStyles.module.css"; // Import shared styles
import ProjectCard from "./ProjectCard"; // Import the new ProjectCard component
import { Project } from '../types/types';

import VoronoiImage from '/Projects/Sample Voronoi Diagram.png';
import ThreeDPortfolioImage from '/Projects/3d-portfolio-image.png';
import FootballImage from '/Projects/Sample Football Image.png';
import EasyPeasyImage from "/Projects/Easy Peasy Diagram.png";
import GraphImage from "/Projects/Graph Diagram.png";


type ProjectsMenuProps = {
  onClose: () => void;
  // Optionally, you can pass the SoundCloud track or playlist URL as a prop
  // trackUrl?: string;
};



// Sample list of projects
const projects: Project[] = [
  {
    name: "Voronoi Diagram Generator",
    imageUrl: VoronoiImage,
    description:
      "Python application, developed using Pygame framework, for generating Voronoi diagrams using mouse clicks.",
    githubUrl: "https://github.com/Mohinem/Voronoi-Diagram-Generator",
  },
  {
    name: "Portfolio + 3d Car Environment",
    imageUrl: ThreeDPortfolioImage,
    description:
      "This particular website ! Basically a react application leveraging the power of three.js, React Three Fiber and Drei framework to create an interactive 3d world to get to know me better and drive a car around.",
    githubUrl: "https://github.com/Mohinem/portfolio-3d",
  },
  {
    name: "Computer Vision - Best Performing Model in production",
    imageUrl: FootballImage,
    description:
      "My work with SIT Autonomous. Utilized mmdetection framework to find the best performing model for object detection based on mAP and Inference Time.",
    githubUrl: "https://github.com/Mohinem/Independent-Practical-Research",
  },
  {
    name: "Easy Peasy",
    imageUrl: EasyPeasyImage,
    description:
      "Capstone project with SIT. A web based platform for sharing your recipe across the world. Involved in fullstack development with django and react, making design decisions and product management with the entire cohort.",
    githubUrl: "http://34.90.185.41/",
  },  
  {
    name: "Competitive Programming Library",
    imageUrl: GraphImage,
    description:
      "A highly-optimized library programmed in pure C++ for use in programming competitions. It contains efficient implementations of complex data structures and algorithms.",
    githubUrl: "https://github.com/Mohinem/CP-Library",
  },    
  // Add more projects as needed
];

const ProjectsMenu = ({ onClose }: ProjectsMenuProps): JSX.Element => {
  return (
    <div className={styles.fancyContainer}>
      <div className={styles.playerContainer}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close Projects Menu"
        >
          &times;
        </button>

        {/* Title Section */}
        <h2 className={styles.funkyTitle}>Projects</h2>

        {/* Projects List */}
        <div className={styles.scrollableProjectsContainer}>
          {projects.map((project) => (
            <ProjectCard key={project.githubUrl} project={project} />
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

export default ProjectsMenu;
