import React from 'react';
import styles from '../../MyInfo.module.css';

interface AlcoholData {
  dates: string;
  timePeriod: string;
  alcoholLimit: number;
  currentIntake: number;
  rewardCycle: number;
  rewardType: string;
  activityRecommendations: boolean;
  reminderNotification: boolean;
}

interface AlcoholManagementProps extends AlcoholData {
  onUpdate: <K extends keyof AlcoholData>(field: K, value: AlcoholData[K]) => void;
}

const AlcoholManagementSettings: React.FC<AlcoholManagementProps> = ({
  dates,
  timePeriod,
  alcoholLimit,
  currentIntake,
  rewardCycle,
  rewardType,
  activityRecommendations,
  reminderNotification,
  onUpdate
}) => {
  return (
    <div className={styles.alcoholContainer}>
      <p className={styles.title}>Alcohol Management Settings</p>
      
      <div className={styles.inputGroup}>
        <label htmlFor="dates" className={styles.labelClass}>Dates:</label>
        <input
          id="dates"
          type="text"
          value={dates}
          onChange={(e) => onUpdate('dates', e.target.value)}
          placeholder="Enter dates"
          className={styles.input}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="timePeriod" className={styles.labelClass}>Time Period:</label>
        <input
          id="timePeriod"
          type="text"
          value={timePeriod}
          onChange={(e) => onUpdate('timePeriod', e.target.value)}
          placeholder="Enter time period"
          className={styles.input}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="alcoholLimit" className={styles.labelClass}>Alcohol Amount Limit (ml):</label>
        <input
          id="alcoholLimit"
          type="number"
          value={alcoholLimit}
          onChange={(e) => onUpdate('alcoholLimit', Number(e.target.value))}
          placeholder="Enter alcohol limit"
          className={styles.input}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="currentIntake" className={styles.labelClass}>Current Intake Reference (ml):</label>
        <input
          id="currentIntake"
          type="number"
          value={currentIntake}
          onChange={(e) => onUpdate('currentIntake', Number(e.target.value))}
          placeholder="Enter current intake"
          className={styles.input}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="rewardCycle" className={styles.labelClass}>Reward Cycle (Days):</label>
        <input
          id="rewardCycle"
          type="number"
          value={rewardCycle}
          onChange={(e) => onUpdate('rewardCycle', Number(e.target.value))}
          placeholder="Enter reward cycle"
          className={styles.input}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="rewardType" className={styles.labelClass}>Reward Type:</label>
        <select
          id="rewardType"
          value={rewardType}
          onChange={(e) => onUpdate('rewardType', e.target.value)}
          className={styles.input}
        >
          <option value="">Select Reward Type</option>
          <option value="Lottery">Lottery</option>
          <option value="Fixed">Fixed</option>
        </select>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={activityRecommendations}
            onChange={(e) => onUpdate('activityRecommendations', e.target.checked)}
            className={styles.checkbox}
          />
          Activity Recommendations
        </label>
      </div>
      
      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={reminderNotification}
            onChange={(e) => onUpdate('reminderNotification', e.target.checked)}
            className={styles.checkbox}
          />
          Reminder Notification
        </label>
      </div>
    </div>
  );
};

export default AlcoholManagementSettings;