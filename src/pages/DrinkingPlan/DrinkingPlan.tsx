import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HeightIcon from '@mui/icons-material/Height';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import WcIcon from '@mui/icons-material/Wc';

interface UserInfo {
  age: number;
  height: number;
  weight: number;
  gender: string;
}

const DrinkingPlan: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    age: 0,
    height: 0,
    weight: 0,
    gender: '',
  });

  const [plan, setPlan] = useState<string>('');

  useEffect(() => {
    const loadUserInfo = () => {
      const savedInfo = localStorage.getItem('userInfo');
      if (savedInfo) {
        setUserInfo(JSON.parse(savedInfo));
      }
    };

    loadUserInfo();
    window.addEventListener('storage', loadUserInfo);

    return () => {
      window.removeEventListener('storage', loadUserInfo);
    };
  }, []);

  const generatePlan = () => {
    const generatedPlan = `
Weekly Drinking Days: Distribute your weekly intake of 100g of alcohol over 3-4 days, with a daily intake of 20-25g of pure alcohol.

Per-Session Drinking Amount: Limit each drinking session to 20-25g of pure alcohol, equivalent to approximately 250ml of beer (5% alcohol content), 100ml of wine (12% alcohol content), or 30ml of spirits (40% alcohol content).

Drinking Intervals: Avoid drinking on consecutive days; it's recommended to drink on alternate days to allow your body time to recover.

Hydration: Drink plenty of water during alcohol consumption to help your body metabolize the alcohol and reduce its burden on your system.
    `;
    setPlan(generatedPlan);
  };

  const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, backgroundColor: '#26a69a', borderRadius: '10px', padding: '10px' }}>
      {icon}
      <Typography sx={{ ml: 2, flexGrow: 1 }}>{label}</Typography>
      <Typography sx={{ fontWeight: 'bold' }}>{value}</Typography>
    </Box>
  );

  return (
    <Box sx={{ 
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'auto',
      backgroundColor: '#1a3a4a',
      color: 'white',
      padding: '20px',
    }}>
      <Box sx={{ 
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
          Personalized Drinking Plan
        </Typography>
        <Box sx={{ 
          backgroundColor: '#26a69a', 
          padding: '20px', 
          borderRadius: '15px',
          mb: 3
        }}>
          <InfoItem icon={<PersonOutlineIcon />} label="Age" value={`${userInfo.age}`} />
          <InfoItem icon={<WcIcon />} label="Gender" value={userInfo.gender} />
          <InfoItem icon={<HeightIcon />} label="Height" value={`${userInfo.height}cm`} />
          <InfoItem icon={<MonitorWeightIcon />} label="Weight" value={`${userInfo.weight}kg`} />
        </Box>
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ 
            backgroundColor: '#4db6ac', 
            color: 'white',
            '&:hover': {
              backgroundColor: '#3d9689',
            },
            mb: 3
          }}
          onClick={generatePlan}
        >
          Generate
        </Button>
        {plan && (
          <Box sx={{ 
            backgroundColor: '#26a69a', 
            padding: '20px', 
            borderRadius: '15px'
          }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {plan}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DrinkingPlan;
