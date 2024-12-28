import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const Profilecard = ({ name, role, image }) => {
  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        boxShadow: 3, 
        borderRadius: 2, 
        overflow: 'hidden', 
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.05)' }
      }}
    >
      {/* Profile Image */}
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={name}
        sx={{ objectFit: 'cover' }}
      />

      {/* Profile Details */}
      <CardContent>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          {name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ textAlign: 'center', marginBottom: 2 }}
        >
          {role}
        </Typography>
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ 
            backgroundColor: '#115293', 
            color: '#fff', 
            textTransform: 'none', 
            '&:hover': { backgroundColor: '#0d3e75' } 
          }}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default Profilecard;