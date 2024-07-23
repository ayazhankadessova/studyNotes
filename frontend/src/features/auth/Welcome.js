import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUsername } from '../users/usersSlice'
import { Typography, Container, Box, Button, Grid, styled } from '@mui/material'

const StyledOutlineButton = styled(Button)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.secondary.main,
}))

const StyledOutlineButtonTwo = styled(Button)(({ theme }) => ({
  border: `2px solid ${theme.palette.secondary.main}`,
  color: theme.palette.secondary.main,
}))
const Welcome = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Asia/Hong_Kong',
  }).format(date)

  const username = useSelector(selectUsername)

  return (
    <Container maxWidth='sm' sx={{ padding: { xs: 2, sm: 4 } }}>
      <Box my={4} textAlign='center'>
        <Typography variant='body1' gutterBottom>
          {today}
        </Typography>

        <Typography variant='h2' gutterBottom>
          Welcome, {username} :)
        </Typography>

        <Grid container spacing={2} mt={4}>
          <Grid item xs={12} sm={6}>
            <Button
              component={Link}
              to='/dash/notes'
              variant='contained'
              color='primary'
              size='large'
              fullWidth
            >
              View Study Notes
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledOutlineButton
              component={Link}
              to='/dash/notes/new'
              variant='outlined'
              size='large'
              fullWidth
            >
              Add New Study Notes
            </StyledOutlineButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              component={Link}
              to='/dash/users'
              variant='contained'
              color='secondary'
              size='large'
              fullWidth
            >
              View User Settings
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledOutlineButtonTwo
              component={Link}
              to='/dash/users/new'
              variant='outlined'
              size='large'
              fullWidth
            >
              Add New User
            </StyledOutlineButtonTwo>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Welcome
