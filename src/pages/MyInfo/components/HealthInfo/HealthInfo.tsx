import React from 'react';
import styles from '../../MyInfo.module.css';

interface HealthInfoProps {
  age: number;
  height: number;
  weight: number;
  gender: string;
}

const HealthInfo: React.FC<HealthInfoProps> = ({ age, height, weight, gender }) => {
  return (
    <div className={styles.healthContainer}>
      <div className={styles.healthItem}>
        <span className={styles.healthLabel}>Age: </span>
        <span className={styles.healthValue}>{age} </span>
      </div>
      <div className={styles.healthItem}>
        <span className={styles.healthLabel}>Height: </span>
        <span className={styles.healthValue}>{height} cm</span>
      </div>
      <div className={styles.healthItem}>
        <span className={styles.healthLabel}>Weight: </span>
        <span className={styles.healthValue}>{weight} kg</span>
      </div>
      <div className={styles.healthItem}>
        <span className={styles.healthLabel}>Gender: </span>
        <span className={styles.healthValue}>{gender}</span>
      </div>
    </div>
  );
};

export default HealthInfo;
