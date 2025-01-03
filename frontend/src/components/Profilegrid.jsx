import React from 'react';
import Grid from '@mui/material/Grid2';
import Profilecard from './Profilecard';
import mockUsers from '../Mockdata';
import { Box, Typography } from '@mui/material';

const Profilegrid = ({selectedCategory}) => {
  return (
    <Box>
      <Typography  // Heading 
        variant='h5'
        fontWeight='bold'
        marginBottom={1}
        marginLeft={4}
        sx={{
          color:'white',
        }}
      >
        {selectedCategory} <span style={{color: "#ff0000"}}>Profile cards</span>
      </Typography>

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
    </Box>
  );
};

export default Profilegrid;