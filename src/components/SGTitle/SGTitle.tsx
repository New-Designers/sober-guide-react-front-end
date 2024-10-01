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
        fontWeight: 'bold',
        color: 'black',
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': {
          color: 'primary.dark',
        },
      }}
    >
      Sober Guide
    </Typography>
  );
};

export default SGTitle;