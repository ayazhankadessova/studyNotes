import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { setUserUsername } from '../users/usersApiSlice'

import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Snackbar,
  Alert,
} from '@material-ui/core'

const Login = () => {
  // set focus on user input
  const userRef = useRef()
  // set focus if there is an error
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // we only need isLoading from this mutation
  const [login, { isLoading }] = useLoginMutation()

  // handle refs
  // only happens when the component loads -> puts focus on the username field
  useEffect(() => {
    userRef.current.focus()
  }, [])

  // clear out the errorMsg state when the username or password state is changed
  // User saw the error message and changed the username/password
  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  // handle submit for the form
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      // dispatch(setUserUsername({ username }))
      setUsername('')
      setPassword('')
      // Send the username to the /dash route
      navigate('/dash')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response')
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg(err.data?.message)
      }
      errRef.current.focus()
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  const isError = errMsg.length > 0

  if (isLoading) return <Typography variant='h6'>Loading...</Typography>

  return (
    <Container maxWidth='sm'>
      <Box mt={8}>
        <Typography
          variant='h4'
          align='center'
          gutterBottom
          style={{ marginTop: 20 }}
        >
          Login
        </Typography>
        {isError && (
          <Snackbar open={isError} autoHideDuration={6000}>
            {errMsg}
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
                inputRef={userRef}
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
            Sign In
          </Button>
        </Box>
      </Box>
      <Box mt={2} style={{ marginTop: '20px' }}>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className='form__submit-button'
          href='/'
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  )
}

export default Login
