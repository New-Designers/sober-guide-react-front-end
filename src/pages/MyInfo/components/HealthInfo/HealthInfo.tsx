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
      <p className={styles.title}>Health Information</p>
      
      <div className={styles.inputGroup}>
        <label htmlFor="age" className={styles.labelClass}>Age:</label>
        <input
          id="age"
          type="number"
          value={age ?? ''}
          onChange={(e) => onUpdate('age', e.target.value ? Number(e.target.value) : null)}
          placeholder="Enter your age"
          className={styles.input}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="height" className={styles.labelClass}>Height (cm):</label>
        <input
          id="height"
          type="number"
          value={height ?? ''}
          onChange={(e) => onUpdate('height', e.target.value ? Number(e.target.value) : null)}
          placeholder="Enter your height"
          className={styles.input}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="weight" className={styles.labelClass}>Weight (kg):</label>
        <input
          id="weight"
          type="number"
          value={weight ?? ''}
          onChange={(e) => onUpdate('weight', e.target.value ? Number(e.target.value) : null)}
          placeholder="Enter your weight"
          className={styles.input}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="gender" className={styles.labelClass}>Gender:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => onUpdate('gender', e.target.value)}
          className={styles.input}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>
    </div>
  );
};

export default HealthInfo;