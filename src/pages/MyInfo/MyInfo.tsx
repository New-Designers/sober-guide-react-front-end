import React, { useState, useEffect } from 'react';
import HealthInfo from './components/HealthInfo/HealthInfo';
import AlcoholManagementSettings from './components/AlcoholManagementSettings/AlcoholManagementSettings';
import styles from './MyInfo.module.css';

interface HealthData {
  age: number | null;
  height: number | null;
  weight: number | null;
  gender: string;
}

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

const MyInfo: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthData>(() => {
    const savedHealthData = localStorage.getItem('healthData');
    return savedHealthData ? JSON.parse(savedHealthData) : { age: null, height: null, weight: null, gender: '' };
  });

  const [alcoholData, setAlcoholData] = useState<AlcoholData>(() => {
    const savedAlcoholData = localStorage.getItem('alcoholData');
    return savedAlcoholData ? JSON.parse(savedAlcoholData) : {
      dates: '',
      timePeriod: '',
      alcoholLimit: 0,
      currentIntake: 0,
      rewardCycle: 0,
      rewardType: '',
      activityRecommendations: false,
      reminderNotification: false
    };
  });

  useEffect(() => {
    localStorage.setItem('healthData', JSON.stringify(healthData));
  }, [healthData]);

  useEffect(() => {
    localStorage.setItem('alcoholData', JSON.stringify(alcoholData));
  }, [alcoholData]);

  const updateHealthData = <K extends keyof HealthData>(field: K, value: HealthData[K]) => {
    setHealthData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const updateAlcoholData = <K extends keyof AlcoholData>(field: K, value: AlcoholData[K]) => {
    setAlcoholData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  return (
    <div className={styles['my-info-page']}>
      <HealthInfo {...healthData} onUpdate={updateHealthData} />
      <AlcoholManagementSettings {...alcoholData} onUpdate={updateAlcoholData} />
    </div>
  );
};

export default MyInfo;