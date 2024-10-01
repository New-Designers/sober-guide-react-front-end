import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styles from './BackButton.module.css';

const BackButton: React.FC<{ tooltip?: string }> = ({ tooltip = 'back' }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Tooltip title={tooltip}>
      <IconButton
        onClick={handleBack}
        size="large"
        className={styles.backButton}
      >
        <ArrowBackIosIcon />
      </IconButton>
    </Tooltip>
  );
};

export default BackButton;