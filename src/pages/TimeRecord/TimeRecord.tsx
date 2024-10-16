import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Pagination } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Define the structure for a tracking entry
interface TrackingEntry {
  location: string;
  date: string;
  duration: string;
}

// Mock data for demonstration purposes
const mockData: TrackingEntry[] = [
  { location: "The Tipsy Tavern", date: "Aug 15th", duration: "1 hour 12 minutes" },
  { location: "Midnight Oasis", date: "Aug 22nd", duration: "30 minutes" },
  { location: "The Vault Room", date: "Aug 25th", duration: "2 hours 45 minutes" },
  { location: "Starlight Lounge", date: "Sep 1st", duration: "1 hour 30 minutes" },
  { location: "The Rusty Nail", date: "Sep 5th", duration: "45 minutes" },
  { location: "Neon Dreams", date: "Sep 10th", duration: "2 hours" },
  { location: "The Tipsy Tavern", date: "Sep 15th", duration: "1 hour" },
  { location: "Midnight Oasis", date: "Sep 20th", duration: "50 minutes" },
  // Add more mock data as needed
];

// Number of items to display per page
const ITEMS_PER_PAGE = 5;

const TimeTrackingRecord: React.FC = () => {
  // State to keep track of the current page
  const [page, setPage] = useState(1);

  // Handler for page change
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Calculate the total number of pages
  const pageCount = Math.ceil(mockData.length / ITEMS_PER_PAGE);
  // Get the data for the current page
  const displayedData = mockData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Box 
      sx={{ 
        backgroundColor: '#01344A', 
        minHeight: '100vh',
        padding: '0 100px 150px 50px', // Increased bottom padding to accommodate pagination
        color: 'white',
        fontFamily: '"Courier New", Courier, monospace',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative', // Added for absolute positioning of pagination
      }}
    >
      {/* Page Title */}
      <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3, color: '#FFFFFF' }}>
        TIME TRACKING RECORD
      </Typography>

      {/* List of tracking entries */}
      <List sx={{ width: '100%', bgcolor: 'transparent', mb: 2 }}>
        {displayedData.map((entry, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', py: 2 }}>
              {/* Location and icon */}
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                <AccessTimeIcon sx={{ mr: 1, color: '#4FFBDF', fontSize: '1.5rem' }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#FFFFFF', fontSize: '1.2rem' }}>
                  {entry.location}
                </Typography>
              </Box>
              {/* Date and duration */}
              <ListItemText
                primary={
                  <Typography sx={{ color: '#4FFBDF', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {entry.date}
                  </Typography>
                }
                secondary={
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{ color: '#FFFFFF', fontWeight: 'medium', fontSize: '1rem' }}
                  >
                    Duration: {entry.duration}
                  </Typography>
                }
              />
            </ListItem>
            {/* Divider between entries */}
            {index < displayedData.length - 1 && <Divider variant="fullWidth" component="li" sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />}
          </React.Fragment>
        ))}
      </List>

      {/* Pagination component */}
      <Box 
        sx={{ 
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
          backgroundColor: '#01344A',
          boxShadow: '0px -2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Pagination 
          count={pageCount} 
          page={page} 
          onChange={handleChangePage}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#FFFFFF',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(79, 251, 223, 0.2)',
              },
            },
            '& .Mui-selected': {
              backgroundColor: '#4FFBDF',
              color: '#01344A',
              '&:hover': {
                backgroundColor: '#4FFBDF',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default TimeTrackingRecord;