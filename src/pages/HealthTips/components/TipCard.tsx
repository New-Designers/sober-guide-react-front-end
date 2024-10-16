import React from 'react';
import { Box, Typography } from '@mui/material';

interface TipCardProps {
  image: string;
  title: string;
  description: string;
}

const TipCard: React.FC<TipCardProps> = ({ image, title, description }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '240px',
        color: 'black',
        fontSize: '12px',
        fontWeight: 'bold',
        border: 'solid 1px #333',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        fontFamily: '"Courier New", Courier, monospace',
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: '95%',
          height: '100px',
          marginBottom: '5x',
          borderRadius: '5px',
          objectFit: 'cover',
        }}
      />
      <Typography 
        variant="body1" 
        sx={{ 
          fontWeight: 'bold', 
          fontSize: '12px',
          height: '36px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: '12px',
          fontWeight: 'lighter',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flex: 1,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default TipCard;