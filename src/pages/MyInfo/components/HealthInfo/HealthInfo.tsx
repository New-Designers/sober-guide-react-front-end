import React from 'react';
import styles from '../../MyInfo.module.css';

interface HealthData {
  age: number | null;
  height: number | null;
  weight: number | null;
  gender: string;
}

interface HealthInfoProps extends HealthData {
  onUpdate: <K extends keyof HealthData>(field: K, value: HealthData[K]) => void;
}

const HealthInfo: React.FC<HealthInfoProps> = ({ age, height, weight, gender, onUpdate }) => {
  return (
    <div className={styles.healthContainer}>
      <div>
      <p className={styles.title}>Health Information</p>
        <input
          type="number"
          value={age ?? ''}
          onChange={(e) => onUpdate('age', e.target.value ? Number(e.target.value) : null)}
          placeholder="Enter your age"
          className={styles.input}
        />
      </div>
      <div>
        <input
          type="number"
          value={height ?? ''}
          onChange={(e) => onUpdate('height', e.target.value ? Number(e.target.value) : null)}
          placeholder="Enter your height (cm)"
          className={styles.input}
        />
      </div>
      <div>
        <input
          type="number"
          value={weight ?? ''}
          onChange={(e) => onUpdate('weight', e.target.value ? Number(e.target.value) : null)}
          placeholder="Enter your weight (kg)"
          className={styles.input}
        />
      </div>
      <div>
        <input
          type="text"
          value={gender}
          onChange={(e) => onUpdate('gender', e.target.value)}
          placeholder="Enter your gender"
          className={styles.input}
        />
      </div>
    </div>
    
    
  );
};

export default HealthInfo;