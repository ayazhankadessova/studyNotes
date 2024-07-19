import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
  Box,
} from '@mui/material'
import { useAddNewUserMutation } from '../users/usersApiSlice' // Assuming this is the correct import path for addNewUser
import { setUserUsername } from '../users/usersSlice'

const Signup = () => {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [addNewUser, { isLoading }] = useAddNewUserMutation()

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newUser = { username, password }
      await addNewUser(newUser).unwrap()
      dispatch(setUserUsername(username))
      setUsername('')
      setPassword('')
      setIsSuccessSnackbarOpen(true)
      setTimeout(() => {
        setIsSuccessSnackbarOpen(false)
        navigate('/login') // Redirect to login after successful signup
      }, 3000) // Close Snackbar after 3 seconds and redirect
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response')
      } else if (err.status === 400) {
        setErrMsg('Invalid Username or Password')
      } else {
        setErrMsg(err.data?.message || 'Something went wrong')
      }
      passwordRef.current.focus()
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  const isError = errMsg.length > 0

  return (
    <Container maxWidth='sm'>
      <Box mt={8}>
        <Typography variant='h4' align='center' gutterBottom>
          Sign Up
        </Typography>
        {isError && (
          <Snackbar open={isError} autoHideDuration={6000}>
            <Typography>{errMsg}</Typography>
          </Snackbar>
        )}
        <Box component='form' onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                inputRef={usernameRef}
                value={username}
                onChange={handleUserInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                inputRef={passwordRef}
                value={password}
                onChange={handlePwdInput}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className='form__submit-button'
            disabled={isLoading}
            style={{ marginTop: '20px' }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Box mt={2} style={{ marginTop: '20px' }}>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          component={Link}
          to='/'
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  )
}

export default Signup
