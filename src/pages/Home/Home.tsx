import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', intake: 90 },
  { name: 'Week 2', intake: 80 },
  { name: 'Week 3', intake: 70 },
  { name: 'Week 4', intake: 60 },
  { name: 'Week 5', intake: 50 },
  { name: 'Week 6', intake: 40 },
  { name: 'Week 7', intake: 30 },
];

const HomePage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#013440', color: 'white', minHeight: '100vh', padding: 2 }}>
      {/* Date and Location */}
      <Typography variant="body2" sx={{ mb: 1 }}>Aug 23, Brisbane, Cloudy</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>Aug 23 - Aug 30</Typography>

      {/* Alcohol Intake Information */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="body2">Weekly Alcohol</Typography>
          <Typography variant="body2">Intake Limit:</Typography>
          <Typography variant="h6">100ml</Typography>
        </Box>
        <Box sx={{ width: 100, height: 100, bgcolor: '#26a69a', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4">70%</Typography>
        </Box>
        <Box>
          <Typography variant="body2">Current Intake:</Typography>
          <Typography variant="h6">70ml</Typography>
        </Box>
      </Box>

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