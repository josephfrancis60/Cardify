import React from 'react';
import Grid from '@mui/material/Grid2';
import Profilecard from './Profilecard';
import mockUsers from '../Mockdata';

const Profilegrid = () => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        padding: 2,
        justifyContent: 'center', // Center the grid within the container
        margin: 'auto', // Center the grid horizontally
      }}
    >
      {mockUsers.map((user) => (
        <Grid
          item
          xs={12} // Full-width on extra-small screens
          sm={6} // Two cards per row on small screens
          md={4} // Three cards per row on medium and larger screens
          key={user.id}
        >
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