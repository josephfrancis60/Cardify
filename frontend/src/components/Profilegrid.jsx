import React from 'react';
import { Grid } from '@mui/material';
import ProfileCard from './ProfileCard';
import mockUsers from '../Mockdata';

const Profilegrid = () => {
  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {mockUsers.map((user) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
          <ProfileCard 
            name={user.name} 
            role={user.role} 
            image={user.image} 
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Profilegrid;