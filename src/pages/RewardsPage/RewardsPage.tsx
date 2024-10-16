import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Grid, Modal, Fade } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Close as CloseIcon } from '@mui/icons-material';

// Mock data for the chart
const data = [
  { date: 'Aug 13', drinks: 6 },
  { date: 'Aug 14', drinks: 5 },
  { date: 'Aug 15', drinks: 4 },
  { date: 'Aug 16', drinks: 3 },
  { date: 'Aug 17', drinks: 2 },
  { date: 'Aug 18', drinks: 1 },
  { date: 'Aug 19', drinks: 0 },
];

// Define the possible states for the reward section
type RewardState = 'box' | 'rewards';

// List of possible rewards
const rewards = [
  'Free Drink', 'Movie Ticket', '$10 Gift Card', 'Fitness Pass',
  'Book Voucher', 'Spa Day', 'Concert Tickets', 'Restaurant Coupon'
];

// Main RewardsDashboard component
const RewardsDashboard: React.FC = () => {
  // State variables
  const [rewardState, setRewardState] = useState<RewardState>('box');
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handler for clicking the reward box
  const handleRewardClick = () => {
    setRewardState('rewards');
  };

  // Handler for clicking the start button
  const handleStartClick = () => {
    const randomIndex = Math.floor(Math.random() * rewards.length);
    setSelectedReward(randomIndex);
    setTimeout(() => {
      setShowNotification(true);
    }, 1500);
  };

  // Handler for closing the notification
  const handleCloseNotification = () => {
    setShowNotification(false);
    // Reset to initial state
    setRewardState('box');
    setSelectedReward(null);
  };

  // Effect for handling scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          // User has scrolled to the bottom
          console.log('Reached the bottom of the page');
        }
      }
    };

    const currentRef = contentRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Function to render the reward section based on the current state
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
              borderRadius: '10px',
              marginBottom: '100px'
            }}
          >
            <img 
              src="src/assets/gift.png" 
              alt="Gift Box" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain' 
              }} 
            />
          </Box>
        );
      case 'rewards':
        return (
          <Box sx={{ width: '100%' , marginBottom:'100px'}}>
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
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        padding: '10px 5px',
                      }}
                    >
                      Start
                    </Button>
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: selectedReward === index ? '#4CAF50' : '#035',
                        p: 1,
                        borderRadius: 2,
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'background-color 0.3s',
                      }}
                    >
                      <Typography variant="body2" align="center" sx={{ fontSize: '0.8rem' }}>
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
    <Box 
      ref={contentRef}
      sx={{ 
        backgroundColor: '#024', 
        color: 'white', 
        minHeight: '100vh',
        padding: 2,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" gutterBottom>WEEKLY ALCOHOL INTAKE</Typography>
      {/* Chart section */}
      <Box sx={{ height: 250, mb: 1 }}>
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
      
      {/* Achievement message */}
      <Box sx={{ backgroundColor: '#035', p: 2, borderRadius: 2, mb: 1 }}>
        <Typography variant="body2" align="center">
          You have reduced social drinking for 7 consecutive days, and now you're being rewarded.
        </Typography>
      </Box>
      
      {/* Reward section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, my: 2 }}>
        {renderReward()}
      </Box>
      
      {/* Notification modal */}
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
              maxWidth: '90%',
              width: 400,
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
            <img 
              src="src\assets\gift.png" 
              alt="Gift" 
              style={{ 
                width: 60, 
                height: 60, 
                marginTop: '1rem' 
              }} 
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default RewardsDashboard;