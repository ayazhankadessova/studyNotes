import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUsername } from '../users/usersSlice'
import { Typography, Container, Box, Button } from '@mui/material'

const Welcome = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Asia/Hong_Kong',
  }).format(date)

  const username = useSelector(selectUsername)

  return (
    <Container maxWidth='sm'>
      <Box my={4} textAlign='center'>
        <Typography variant='body1'>{today}</Typography>

        <Typography variant='h2' mt={2}>
          Welcome, {username} :)
        </Typography>

        <Box mt={4}>
          <Button
            component={Link}
            to='/dash/notes'
            variant='contained'
            color='primary'
            size='large'
          >
            View Study Notes
          </Button>
        </Box>

        <Box mt={2}>
          <Button
            component={Link}
            to='/dash/notes/new'
            variant='outlined'
            color='primary'
          >
            Add New Study Notes
          </Button>
        </Box>

        <Box mt={4}>
          <Button
            component={Link}
            to='/dash/users'
            variant='contained'
            color='secondary'
            size='large'
          >
            View User Settings
          </Button>
        </Box>

        <Box mt={2}>
          <Button
            component={Link}
            to='/dash/users/new'
            variant='outlined'
            color='secondary'
          >
            Add New User
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Welcome
