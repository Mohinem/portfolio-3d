// src/components/EducationCard.tsx

import React from 'react';
import styles from '../styles/sharedStyles.module.css'; // Import the CSS module
import { Education } from '../types/types';

// type Education = {


type EducationCardProps = {
  education: Education;
};

const EducationCard = ({ education }: EducationCardProps): JSX.Element => {
  return (
    <div className={`${styles.educationCard} shadow`}>
      {/* Left side - Degree, University, and Description */}
      <div className={styles.educationInfo}>
        <h3 className={styles.degree}>{education.degree}</h3>
        <h4 className={styles.university}>{education.university}</h4>
        <p className={styles.duration}>{education.duration}</p>
        <p className={styles.description}>{education.description}</p>
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

export default EducationCard;
