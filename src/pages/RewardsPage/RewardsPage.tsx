import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Modal, Fade } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CardGiftcard, Close as CloseIcon } from '@mui/icons-material';

const data = [
  { date: 'Aug 13', drinks: 6 },
  { date: 'Aug 14', drinks: 5 },
  { date: 'Aug 15', drinks: 4 },
  { date: 'Aug 16', drinks: 3 },
  { date: 'Aug 17', drinks: 2 },
  { date: 'Aug 18', drinks: 1 },
  { date: 'Aug 19', drinks: 0 },
];

type RewardState = 'box' | 'rewards';

const rewards = [
  'Free Drink', 'Movie Ticket', '$10 Gift Card', 'Fitness Pass',
  'Book Voucher', 'Spa Day', 'Concert Tickets', 'Restaurant Coupon'
];

const RewardsDashboard: React.FC = () => {
  const [rewardState, setRewardState] = useState<RewardState>('box');
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleRewardClick = () => {
    setRewardState('rewards');
  };

  const handleStartClick = () => {
    const randomIndex = Math.floor(Math.random() * rewards.length);
    setSelectedReward(randomIndex);
    setTimeout(() => {
      setShowNotification(true);
    }, 1500);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    // Reset to initial state
    setRewardState('box');
    setSelectedReward(null);
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
      case 'rewards':
        return (
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              {rewards.map((reward, index) => (
                <Grid item xs={4} key={index}>
                  {index === 4 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleStartClick}
                      disabled={selectedReward !== null}
                      sx={{ 
                        height: '100%', 
                        width: '100%',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}
                    >
                      Start
                    </Button>
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: selectedReward === index ? '#4CAF50' : '#035',
                        p: 2,
                        borderRadius: 2,
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'background-color 0.3s',
                      }}
                    >
                      <Typography variant="body2" align="center">
                        {reward}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        );
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
      
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 250 }}>
        {renderReward()}
      </Box>
      
      <Modal
        open={showNotification}
        onClose={handleCloseNotification}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade in={showNotification}>
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
              maxWidth: 400,
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <Button
              onClick={handleCloseNotification}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'grey.500',
              }}
            >
              <CloseIcon />
            </Button>
            <Typography variant="h5" component="h2" sx={{ mb: 2, color: '#4CAF50' }}>
              Congratulations!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.primary' }}>
              You've won:
            </Typography>
            <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: '#024' }}>
              {selectedReward !== null ? rewards[selectedReward] : ''}
            </Typography>
            <CardGiftcard sx={{ fontSize: 60, color: 'pink', mt: 3 }} />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default RewardsDashboard;