import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, Box } from '@mui/material'

const Public = () => {
  return (
    <section className='public'>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        height='100vh'
        textAlign='center'
        sx={{ px: 2, py: 5 }}
      >
        <Typography variant='h1' component='h1' gutterBottom>
          Welcome to <span className='nowrap'>Study Notes!</span>
        </Typography>
        <Typography variant='body1' gutterBottom>
          Collaborate on group projects & store your notes here!
        </Typography>
        <Button
          component={Link}
          to='/login'
          variant='contained'
          color='primary'
          sx={{ mt: 4, px: 3, py: 3 }} // Adjust padding for better button size
        >
          Get Started
        </Button>
      </Box>
    </section>
  )
}

export default Public
