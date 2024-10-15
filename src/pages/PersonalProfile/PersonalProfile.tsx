import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, TextField, Avatar } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const PersonalProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: '#024', 
        color: '#26a69a',
        minHeight: '100vh',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>PERSONAL PROFILE</Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
        <Avatar 
          sx={{ width: 100, height: 100, bgcolor: '#26a69a' }}
          alt={profile.name}
          src="/path-to-profile-image.jpg" 
        >
          {profile.name.charAt(0)}
        </Avatar>
      </Box>

      <Grid container spacing={2}>
        {Object.entries(profile).map(([key, value]) => (
          <Grid item xs={12} key={key}>
            <TextField
              fullWidth
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              value={value}
              onChange={handleChange}
              disabled={!isEditing}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#26a69a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#26a69a',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#26a69a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#26a69a',
                },
                '& .MuiInputBase-input': {
                  color: '#26a69a',
                },
                '& .Mui-disabled': {
                  color: '#26a69a',
                  WebkitTextFillColor: '#26a69a',
                },
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={isEditing ? handleSave : handleEdit}
          startIcon={isEditing ? null : <EditIcon />}
          sx={{
            backgroundColor: '#26a69a',
            '&:hover': {
              backgroundColor: '#2bbbad',
            },
            fontSize: '1rem',
            fontWeight: 'bold',
            padding: '10px 20px',
            borderRadius: 1,
          }}
        >
          {isEditing ? 'Save' : 'Edit Profile'}
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalProfile;
