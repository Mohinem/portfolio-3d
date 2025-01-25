// src/components/LoadingScreen.tsx
import React from 'react';
import { Html, useProgress } from '@react-three/drei';
import styles from '../styles/sharedStyles.module.css';

const LoadingScreen: React.FC = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className={styles.loadingContainer}>
        <h2 className={styles.loadingTitle}>Loading...</h2>
        <div className={styles.progressBar}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className={styles.progressText}>{Math.round(progress)}%</p>
      </div>
    </Html>
  );
};

export default LoadingScreen;
