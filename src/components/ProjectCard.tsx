// src/components/ProjectCard.tsx

// import React from 'react';
import { Card } from 'react-bootstrap';
import { Project } from '../types/types'; // Ensure correct import path
import styles from '../styles/sharedStyles.module.css'; // Import the CSS module

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps): JSX.Element => {
  return (
    <div className={styles.cardWrapper}>
      <Card className={`${styles.projectCard} shadow`}>
        <div className={styles.imageContainer}>
          <Card.Img
            src={project.imageUrl}
            alt={`Image of ${project.name}`}
            className={styles.projectImage}
          />
        </div>
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.cardTitle}>{project.name}</Card.Title>
          <Card.Text className={styles.cardDescription}>
            {project.description}
          </Card.Text>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewProjectButton}
          >
            View Project
          </a>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProjectCard;
