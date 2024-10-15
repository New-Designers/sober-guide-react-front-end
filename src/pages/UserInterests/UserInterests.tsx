import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const interests = [
  'Fitness and Exercise', 'Cooking and Baking', 'Reading', 'Traveling',
  'Art and Crafting', 'Music', 'Photography', 'Gardening',
  'Meditation', 'Volunteering', 'Gaming', 'Learning Languages',
  'Home Improvement', 'Watching Movies', 'Writing', 'Socializing'
];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserInterests: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // 在组件加载时从localStorage读取保存的选择
  useEffect(() => {
    const savedInterests = localStorage.getItem('userInterests');
    if (savedInterests) {
      setSelectedInterests(JSON.parse(savedInterests));
    }
  }, []);

  const handleInterestClick = (index: number) => {
    setSelectedInterests(prev => {
      const newSelection = prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index];
      
      // 保存新的选择到localStorage
      localStorage.setItem('userInterests', JSON.stringify(newSelection));
      return newSelection;
    });
  };

  const handleConfirm = () => {
    console.log('Selected interests:', selectedInterests.map(i => interests[i]));
    setOpenSnackbar(true);
    // 这里可以添加其他保存逻辑，如发送到服务器等
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: '#024', 
        color: 'white', 
        minHeight: '100vh',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box 
        sx={{ 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          borderRadius: 2, 
          padding: 2, 
          marginBottom: 2 
        }}
      >
        <Typography variant="h6" align="center">
          Choose your interests Below...
        </Typography>
      </Box>
      
      <Box sx={{ flexGrow: 1, mb: 2, overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
        <Grid container spacing={2}>
          {interests.map((interest, index) => (
            <Grid item xs={6} key={index}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleInterestClick(index)}
                sx={{
                  backgroundColor: selectedInterests.includes(index) ? '#00a86b' : '#035',
                  '&:hover': {
                    backgroundColor: selectedInterests.includes(index) ? '#009c63' : '#046',
                  },
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  borderRadius: 1,
                }}
              >
                {interest}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Button
        variant="contained"
        fullWidth
        onClick={handleConfirm}
        sx={{
          backgroundColor: '#00a86b',
          '&:hover': {
            backgroundColor: '#009c63',
          },
          fontSize: '1rem',
          fontWeight: 'bold',
          padding: '10px',
          borderRadius: 1,
          mt: 2,
        }}
      >
        Confirm
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Interests successfully saved!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserInterests;
