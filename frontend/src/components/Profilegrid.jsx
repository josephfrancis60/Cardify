import React from 'react';
import Grid from '@mui/material/Grid2';
import Profilecard from './Profilecard';
import mockUsers from '../Mockdata';

const Profilegrid = () => {
  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {mockUsers.map((user) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
          {/* Profile card component */}
          <Profilecard 
            name={user.name} 
            role={user.role} 
            image={user.image} 
            description={user.description} 
            socialLinks={user.socialLinks} 
            categories={user.categories} 
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Profilegrid;