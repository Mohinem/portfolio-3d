// src/components/ExperienceCard.tsx

import React from 'react';
import styles from '../styles/sharedStyles.module.css'; // Import the CSS module
import { Experience } from '../types/types';

// type Education = {


type ExperienceCardProps = {
  experience: Experience;
};

const ExperienceCard = ({ experience }: ExperienceCardProps): JSX.Element => {
  return (
    <div className={`${styles.educationCard} shadow`}>
      {/* Left side - Degree, University, and Description */}
      <div className={styles.educationInfo}>
        <h3 className={styles.degree}>{experience.company}</h3>
        <h4 className={styles.university}>{experience.role}</h4>
        <p className={styles.duration}>{experience.duration}</p>
        <p className={styles.description}>{experience.description}</p>
      </div>

      {/* Right side - Image
      <div className={styles.imageContainer}>
        <img
          src={education.imageUrl}
          alt={`${education.university} logo`}
          className={styles.educationImage}
        />
      </div> */}
    </div>
  );
};

export default ExperienceCard;
