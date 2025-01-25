// src/components/AchievementCard.tsx

// import React from 'react';
import { Card } from 'react-bootstrap';
import { Achievement } from '../types/types'; // Ensure correct import path
import styles from '../styles/sharedStyles.module.css'; // Import the CSS module

type AchievementCardProps = {
  achievement: Achievement;
};

const AchievementCard = ({ achievement }: AchievementCardProps): JSX.Element => {
  return (
    <div className={styles.cardWrapper}>
      <Card className={`${styles.projectCard} shadow`}>
        <div className={styles.imageContainer}>
          <Card.Img
            src={achievement.imageUrl}
            alt={`Image of ${achievement.name}`}
            className={styles.projectImage}
          />
        </div>
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.cardTitle}>{achievement.name}</Card.Title>
          <Card.Text className={styles.cardDescription}>
            {achievement.description}
          </Card.Text>
          <a
            href={achievement.achievementURL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewProjectButton}
          >
            View Achievement
          </a>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AchievementCard;
