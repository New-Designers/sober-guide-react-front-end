import React, { useState, useCallback } from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import CloudIcon from '@mui/icons-material/Cloud';

// Mock data for three weeks
const weeklyData = [
  { week: 'Two Weeks Ago', totalIntake: 1.8, limit: 2 },
  { week: 'Last Week', totalIntake: 1.2, limit: 2 },
  { week: 'Current Week', totalIntake: 0.7, limit: 2 },
];

const data = [
  { name: 'Mon', intake: 0.3 },
  { name: 'Tue', intake: 0.5 },
  { name: 'Wed', intake: 0.2 },
  { name: 'Thu', intake: 0.7 },
  { name: 'Fri', intake: 0.9 },
  { name: 'Sat', intake: 1.1 },
  { name: 'Sun', intake: 0.6 },
];

const BottleShape: React.FC<{ fillPercentage: number; remainingAmount: number }> = ({ fillPercentage, remainingAmount }) => (
  <Box sx={{ 
    position: 'relative', 
    width: 120, 
    height: 200, 
    border: '4px solid #2196f3', 
    borderRadius: '0 0 35px 35px', 
    overflow: 'hidden',
    backgroundColor: 'white',
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
  const [selectedWeek, setSelectedWeek] = useState(2); // Default to current week

  const handleWeekChange = useCallback((index: number) => {
    setSelectedWeek(index);
  }, []);

  const selectedData = weeklyData[selectedWeek];
  const remainingAmount = selectedData.limit - selectedData.totalIntake;
  const intakePercentage = (selectedData.totalIntake / selectedData.limit) * 100;

  return (
    <Box sx={{ bgcolor: '#013440', minHeight: '100vh', padding: 2 }}>
      {/* Weather API Placeholder */}
      <Paper elevation={3} sx={{ bgcolor: '#26a69a', color: 'white', p: 2, mb: 2, borderRadius: 2 }}>
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

      {/* Week Selection Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        {weeklyData.map((week, index) => (
          <Button
            key={week.week}
            variant={selectedWeek === index ? "contained" : "outlined"}
            sx={{
              bgcolor: '#26a69a',
              color: 'white',
              '&:hover': {
                bgcolor: '#2ed2b9',
              },
              ...(selectedWeek === index && {
                border: '2px solid white',
              }),
            }}
            onClick={() => handleWeekChange(index)}
          >
            {week.week}
          </Button>
        ))}
      </Box>

      {/* Alcohol Intake Information */}
      <Paper elevation={3} sx={{ bgcolor: '#26a69a', color: 'white', p: 2, mb: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">Weekly Limit</Typography>
            <Typography variant="h4" sx={{ color: '#000080' }}>{selectedData.limit}L</Typography>
          </Box>
          <BottleShape fillPercentage={intakePercentage} remainingAmount={remainingAmount} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">Current Intake</Typography>
            <Typography variant="h4" sx={{ color: '#FF9800' }}>{selectedData.totalIntake}L</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Alcohol Intake Trend */}
      <Card sx={{ bgcolor: '#26a69a', color: 'white', mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1, color: '#FFFFFF' }}>Alcohol Intake Trend</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart 
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF" />
              <XAxis 
                dataKey="name" 
                stroke="#FFFFFF"
                style={{ fontSize: '0.8rem', fontWeight: 'bold' }}
              />
              <YAxis 
                stroke="#FFFFFF"
                style={{ fontSize: '0.8rem', fontWeight: 'bold' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#013440', 
                  border: '1px solid #FFFFFF',
                  borderRadius: '2',
                  color: '#FFFFFF'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="intake" 
                stroke="#FFFF00" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#FFFF00', stroke: '#FFFFFF', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#FFFF00', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Today's Advice */}
      <Card sx={{ bgcolor: '#26a69a', color: 'white', mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Today's Advice</Typography>
          <Typography variant="body2">• Drink water between alcoholic beverages to stay hydrated</Typography>
          <Typography variant="body2">• Eat a substantial meal before drinking to slow alcohol absorption</Typography>
          <Typography variant="body2">• Avoid mixing different types of alcohol to prevent stronger effects</Typography>
          <Typography variant="body2">• Know your limits and pace yourself to enjoy responsibly</Typography>
        </CardContent>
      </Card>

      {/* Health Tips */}
      <Typography variant="h6" sx={{ mb: 1, color: 'white' }}>Health Tips</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{ bgcolor: '#26a69a', color: 'white', height: '100%' }}>
            <CardContent>
              <Typography variant="body2">Refreshing Alternatives</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ bgcolor: '#26a69a', color: 'white', height: '100%' }}>
            <CardContent>
              <Typography variant="body2">Mocktail Magic</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ bgcolor: '#26a69a', color: 'white', height: '100%' }}>
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