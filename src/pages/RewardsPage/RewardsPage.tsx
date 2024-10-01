import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CardGiftcard } from '@mui/icons-material';

const data = [
  { date: 'Aug 13', drinks: 6 },
  { date: 'Aug 14', drinks: 5 },
  { date: 'Aug 15', drinks: 4 },
  { date: 'Aug 16', drinks: 3 },
  { date: 'Aug 17', drinks: 2 },
  { date: 'Aug 18', drinks: 1 },
  { date: 'Aug 19', drinks: 0 },
];

type RewardState = 'hidden' | 'box' | 'turntable';

const RewardsDashboard: React.FC = () => {
  const [rewardState, setRewardState] = useState<RewardState>('box');

  const handleRewardClick = () => {
    if (rewardState === 'box') {
      setRewardState('turntable');
    }
  };

  const renderReward = () => {
    switch (rewardState) {
      case 'box':
        return (
          <Box 
            onClick={handleRewardClick}
            sx={{ 
              width: 100, 
              height: 100, 
              backgroundColor: 'pink', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              cursor: 'pointer',
              borderRadius: '10px'
            }}
          >
            <CardGiftcard sx={{ fontSize: 50, color: 'white' }} />
          </Box>
        );
      case 'turntable':
        return (
          <Box 
            sx={{ 
              width: 200, 
              height: 200, 
              backgroundColor: '#4CAF50', 
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '10px',
                height: '10px',
                backgroundColor: 'white',
                borderRadius: '50%'
              }
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              Spin to Win!
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ backgroundColor: '#024', color: 'white', height: '100vh', padding: 2 }}>
      <Typography variant="h6" gutterBottom>WEEKLY ALCOHOL INTAKE</Typography>
      <Box sx={{ height: 300, mb: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip />
            <Line type="monotone" dataKey="drinks" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      
      <Box sx={{ backgroundColor: '#035', p: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="body1" align="center">
          You have reduced social drinking for 7 consecutive days, and now you're being rewarded.
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250 }}>
        {renderReward()}
      </Box>
      
      {rewardState === 'turntable' && (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
          Rewards
        </Typography>
      )}
    </Box>
  );
};

export default RewardsDashboard;