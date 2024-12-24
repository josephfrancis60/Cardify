import React from 'react'
import { Paper, IconButton, InputBase } from '@mui/material'
import { Search } from '@mui/icons-material'

const Searchbar = () => {
  return (
    <Paper component="form" sx={{borderRadius: 20, border: '1px solid rgba(227, 221, 221, 0.3)', pl: 1, boxShadow: 'none', mr: { sm: 5 }, backgroundColor: "#10141f"}}>
        <InputBase className='search-bar' placeholder='Search for name or role...' value="" onChange={() => {}} sx={{ml: 1, color: "whitesmoke", border: "none", width: 300, pt: "4px",}} />
        <IconButton type='submit' sx={{p: '8px', color: 'red'}}>
            <Search />
        </IconButton>
    </Paper>
  )
}

export default Searchbar