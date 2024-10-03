import React from 'react';
import UserInfo from './components/UserInfo/UserInfo';
import HealthInfo from './components/HealthInfo/HealthInfo';
import styles from './MyInfo.module.css';

const MyInfo: React.FC = () => {
  const userData = {
    avatarUrl: '../../../src/assets/user.jpg',
    name: 'Raymond Zhu',
  };

  const healthData = {
    age: 100,
    height: 180,
    weight: 75,
    gender: 'Male',
  };

  return (
    <div className={styles['my-info-page']}>
      <UserInfo avatarUrl={userData.avatarUrl} name={userData.name} />
      <HealthInfo age={healthData.age} height={healthData.height} weight={healthData.weight} gender={healthData.gender} />
    </div>
  );
};

export default MyInfo;
