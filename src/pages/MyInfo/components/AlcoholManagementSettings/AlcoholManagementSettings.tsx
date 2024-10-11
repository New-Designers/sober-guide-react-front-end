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
      <p className={styles.title}>ALCOHOL MANAGEMENT SETTINGS</p>
      
      <div>
        <input
          type="text"
          value={dates}
          onChange={(e) => onUpdate('dates', e.target.value)}
          placeholder="Dates"
          className={styles.input}
        />
      </div>
      
      <div>
        <input
          type="text"
          value={timePeriod}
          onChange={(e) => onUpdate('timePeriod', e.target.value)}
          placeholder="Time Period"
          className={styles.input}
        />
      </div>
      
      <div>
        <input
          type="number"
          value={alcoholLimit}
          onChange={(e) => onUpdate('alcoholLimit', Number(e.target.value))}
          placeholder="Alcohol Amount Limit (ml)"
          className={styles.input}
        />
      </div>
      
      <div>
        <input
          type="number"
          value={currentIntake}
          onChange={(e) => onUpdate('currentIntake', Number(e.target.value))}
          placeholder="Current Intake Reference (ml)"
          className={styles.input}
        />
      </div>
      
      <div>
        <input
          type="number"
          value={rewardCycle}
          onChange={(e) => onUpdate('rewardCycle', Number(e.target.value))}
          placeholder="Reward Cycle (Days)"
          className={styles.input}
        />
      </div>
      
      <div>
        <select
          value={rewardType}
          onChange={(e) => onUpdate('rewardType', e.target.value)}
          className={styles.input}
        >
          <option value="">Select Reward Type</option>
          <option value="Lottery">Lottery</option>
          <option value="Fixed">Fixed</option>
        </select>
      </div>

      <div>
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
      
      <div>
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