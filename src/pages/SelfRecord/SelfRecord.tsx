import React from 'react';
import UserInfo from './components/UserInfo/UserInfo';
import HealthInfo from './components/HealthInfo/HealthInfo';

const SelfRecord: React.FC = () => {
  const userData = {
    avatarUrl: 'https://example.com/avatar.jpg',
    name: 'Raymond Zhu',
  };

  const healthData = {
    age: 100,
    height: 180,
    weight: 75,
    gender: 'Male',
  };

  return (
    <div>
      <UserInfo avatarUrl={userData.avatarUrl} name={userData.name} />
      <HealthInfo age={healthData.age} height={healthData.height} weight={healthData.weight} gender={healthData.gender} />
    </div>
  );
};

export default SelfRecord;
