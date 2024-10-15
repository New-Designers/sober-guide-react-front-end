import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import InfoCard from './components/InfoCard/InfoCard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HeightIcon from '@mui/icons-material/Height';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import WcIcon from '@mui/icons-material/Wc';
import LocalBarIcon from '@mui/icons-material/LocalBar';

interface UserInfo {
  age: number;
  height: number;
  weight: number;
  gender: string;
  alcoholTolerance: string;
}

const MyInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    const savedInfo = localStorage.getItem('userInfo');
    return savedInfo ? JSON.parse(savedInfo) : {
      age: 22,
      height: 180,
      weight: 85,
      gender: 'Male',
      alcoholTolerance: 'Moderate'
    };
  });

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  const handleUpdate = (key: keyof UserInfo, value: string | number) => {
    setUserInfo(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('userInfo', JSON.stringify(updated));
      return updated;
    });
  };

  const updateUserInfo = (newInfo: UserInfo) => {
    setUserInfo(newInfo);
    localStorage.setItem('userInfo', JSON.stringify(newInfo));
  };

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px'
    }}>
      <Box sx={{ 
        backgroundColor: '#024', 
        padding: '20px', 
        borderRadius: '15px',
        width: '100%'
      }}>
        <InfoCard
          icon={<PersonOutlineIcon sx={{ color: 'white', fontSize: 30 }} />}
          label="Age"
          value={userInfo.age}
          color="#00a86b"
          onUpdate={(value) => handleUpdate('age', Number(value))}
        />
        <InfoCard
          icon={<HeightIcon sx={{ color: 'white', fontSize: 30 }} />}
          label="Height"
          value={userInfo.height}
          color="#0288d1"
          onUpdate={(value) => handleUpdate('height', Number(value))}
          unit="cm"
        />
        <InfoCard
          icon={<MonitorWeightIcon sx={{ color: 'white', fontSize: 30 }} />}
          label="Weight"
          value={userInfo.weight}
          color="#00a86b"
          onUpdate={(value) => handleUpdate('weight', Number(value))}
          unit="kg"
        />
        <InfoCard
          icon={<WcIcon sx={{ color: 'white', fontSize: 30 }} />}
          label="Gender"
          value={userInfo.gender}
          color="#0288d1"
          onUpdate={(value) => handleUpdate('gender', value)}
        />
        <InfoCard
          icon={<LocalBarIcon sx={{ color: 'white', fontSize: 30 }} />}
          label="Alcohol Tolerance"
          value={userInfo.alcoholTolerance}
          color="#00a86b"
          onUpdate={(value) => handleUpdate('alcoholTolerance', value)}
        />
      </Box>
    </Box>
  );
};

export default MyInfo;
