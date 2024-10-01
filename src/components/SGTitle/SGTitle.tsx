import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { Link, LinkProps } from 'react-router-dom';

interface SGTitleProps {
  variant?: TypographyProps['variant'];
  to?: LinkProps['to'];
}

const SGTitle: React.FC<SGTitleProps> = ({ variant = 'h6', to = '/' }) => {
  return (
    <Typography
      variant={variant}
      component={Link}
      to={to}
      sx={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        fontFamily: 'Papyrus, fantasy',
        color: '#2ED2B9',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      Sober Guide
    </Typography>
  );
};

export default SGTitle;