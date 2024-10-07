import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import CloudIcon from '@mui/icons-material/Cloud';

const data = [
  { name: 'Week 1', intake: 90 },
  { name: 'Week 2', intake: 80 },
  { name: 'Week 3', intake: 70 },
  { name: 'Week 4', intake: 60 },
  { name: 'Week 5', intake: 50 },
  { name: 'Week 6', intake: 40 },
  { name: 'Week 7', intake: 30 },
];

const BottleShape: React.FC<{ fillPercentage: number; remainingAmount: number }> = ({ fillPercentage, remainingAmount }) => (
  <Box sx={{ 
    position: 'relative', 
    width: 120, 
    height: 200, 
    border: '4px solid #2196f3', 
    borderRadius: '0 0 40px 40px', 
    overflow: 'hidden',
    backgroundColor: 'white', // Add white background
  }}>
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: `${fillPercentage}%`,
        backgroundColor: 'rgba(33, 150, 243, 0.3)',
        transition: 'height 0.5s',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          bottom: 5,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#2196f3',
        }}
      >
        {Math.round(fillPercentage)}%
      </Typography>
    </Box>
    <Typography
      variant="h5"
      sx={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#2196f3',
      }}
    >
      {remainingAmount.toFixed(1)}L
    </Typography>
    <Typography
      variant="body2"
      sx={{
        position: 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#2196f3',
      }}
    >
      Remained
    </Typography>
  </Box>
);

const HomePage: React.FC = () => {
  const totalWeeklyIntake = 0.5; // 0.5L consumed
  const weeklyLimit = 2; // 2L limit
  const remainingAmount = weeklyLimit - totalWeeklyIntake;
  const intakePercentage = (totalWeeklyIntake / weeklyLimit) * 100;

  return (
    <Box sx={{ bgcolor: '#013440', color: 'white', minHeight: '100vh', padding: 2 }}>
      {/* Weather API Placeholder */}
      <Paper elevation={3} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', p: 2, mb: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6">Brisbane</Typography>
            <Typography variant="body2">Aug 23 - Aug 30</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CloudIcon sx={{ mr: 1 }} />
            <Typography variant="h6">23°C</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Alcohol Intake Information */}
      <Paper elevation={3} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', p: 2, mb: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">Weekly Limit</Typography>
            <Typography variant="h4" sx={{ color: '#4CAF50' }}>{weeklyLimit}L</Typography>
          </Box>
          <BottleShape fillPercentage={intakePercentage} remainingAmount={remainingAmount} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">Current Intake</Typography>
            <Typography variant="h4" sx={{ color: '#FF9800' }}>{totalWeeklyIntake}L</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Alcohol Intake Trend */}
      <Card sx={{ bgcolor: '#26a69a', mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Alcohol Intake Trend</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Line type="monotone" dataKey="intake" stroke="#ffffff" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Today's Advice */}
      <Card sx={{ bgcolor: '#26a69a', mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Today's Advice</Typography>
          <Typography variant="body2">• Drink water between alcoholic beverages to stay hydrated</Typography>
          <Typography variant="body2">• Eat a substantial meal before drinking to slow alcohol absorption</Typography>
          <Typography variant="body2">• Avoid mixing different types of alcohol to prevent stronger effects</Typography>
          <Typography variant="body2">• Know your limits and pace yourself to enjoy responsibly</Typography>
        </CardContent>
      </Card>

      {/* Health Tips */}
      <Typography variant="h6" sx={{ mb: 1 }}>Health Tips</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="body2">Refreshing Alternatives</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="body2">Mocktail Magic</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="body2">Healthy Habits</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;