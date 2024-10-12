import React from 'react';
import { Box, TextField } from '@mui/material';
import TipCard from './components/TipCard';
import { healthTipsData } from './healthTipsData';

const HealthTipsPage: React.FC = () => {
  return (
    <Box
      sx={{
        borderRadius: '20px',
        maxWidth: '430px',
        maxHeight: '917px',
        margin: '0 auto',
        padding: 0,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#01344A',
      }}
    >
      <TextField
        placeholder="Search..."
        variant="outlined"
        sx={{
          display: 'block',
          margin: '15px auto 0 auto',
          width: '70%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            height: '35px',
            fontFamily: '"Courier New", Courier, monospace',
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: '20px',
          gap: '20px',
        }}
      >
        {healthTipsData.map((tip, index) => (
          <Box key={index} sx={{ width: 'calc(50% - 10px)' }}>
            <TipCard
              image={tip.image}
              title={tip.title}
              description={tip.description}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HealthTipsPage;