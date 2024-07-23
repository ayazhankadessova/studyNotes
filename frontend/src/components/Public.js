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
        sx={{
          px: { xs: 1, sm: 2 },
          py: { xs: 3, sm: 5 },
        }}
      >
        <Typography
          variant='h1'
          component='h1'
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', sm: '3rem' },
          }}
        >
          Welcome to <span className='nowrap'>Study Notes!</span>
        </Typography>
        <Typography
          variant='body1'
          gutterBottom
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          Collaborate on group projects & store your notes here!
        </Typography>
        <Button
          component={Link}
          to='/login'
          variant='contained'
          color='primary'
          sx={{
            mt: 4,
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 3 },
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          Get Started
        </Button>
      </Box>
    </section>
  )
}

export default Public
