import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'

const Feed = () => {
  return (
    <Stack sx={{flexDirection: { sx: "column", sm: 'row', md: "row" }}}>
        <Box sx={{height: '89.1vh', borderRight: '1px solid #3d3d3d', maxWidth: {sx: 100, sm: 150, md: 200, lg: 250} }}>
            <Sidebar />

            
        </Box>
    </Stack>
  )
}

export default Feed