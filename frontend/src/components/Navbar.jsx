import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import{ Link } from 'react-dom'  // this is for clicking the logo for going to 'all' page(home). if yes wrap cardify in <link>
import Searchbar from './Searchbar'


const Navbar = () => {
  return (
    <Stack direction="row" spacing={2} p={2} sx={{background: "#242424", color: "white", alignItems: "center", justifyContent: "space-between",}}>
        <Typography variant='h5' sx={{fontWeight: 1000}}>Cardify</Typography>
        <Searchbar />
        <Typography>Cardify</Typography>
    </Stack>
  )
}

export default Navbar