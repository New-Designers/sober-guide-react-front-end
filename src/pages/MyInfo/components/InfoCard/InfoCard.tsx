import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  onUpdate: (value: string) => void;
  unit?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value, color, onUpdate, unit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.toString());

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editValue);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: color,
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '15px',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        {icon}
        <Typography variant="body1" sx={{ marginLeft: '15px', color: 'white', fontSize: '1.1rem' }}>
          {label}
        </Typography>
      </Box>
      {isEditing ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            variant="standard"
            sx={{ input: { color: 'white', fontSize: '1.3rem' } }}
          />
          {unit && <Typography sx={{ color: 'white', marginLeft: '5px' }}>{unit}</Typography>}
          <IconButton onClick={handleSave} sx={{ color: 'white' }}>
            <CheckIcon />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.3rem' }}>
            {value}{unit && unit}
          </Typography>
          <IconButton onClick={handleEdit} sx={{ color: 'white', marginLeft: '10px' }}>
            <EditIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default InfoCard;
