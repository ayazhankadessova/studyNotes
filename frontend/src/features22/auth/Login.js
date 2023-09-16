import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
  // set focus on user input
  const userRef = useRef()
  // set focus if there is an error
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  // useNavigate hook brings navigate function
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
      // get access Token after we call login mutation
      // pass username, pwd state when username & pwd are complete
      // unwrap -> try catch
      // dispatch setCredentials -> we will get the access token back -> get credentials
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
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
      // Focus is set on the error msg, which would be read by a screen reader as well bc we put aria=live attr set to assertive
      errRef.current.focus()
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  const errClass = errMsg ? 'errmsg' : 'offscreen'

  if (isLoading) return <p>Loading...</p>

  const content = (
    <section className='public'>
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className='login'>
        <p ref={errRef} className={errClass} aria-live='assertive'>
          {errMsg}
        </p>

        <form className='form' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input
            className='form__input'
            type='text'
            id='username'
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete='off'
            required
          />

          <label htmlFor='password'>Password:</label>
          <input
            className='form__input'
            type='password'
            id='password'
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className='form__submit-button'>Sign In</button>
        </form>
      </main>
      <footer>
        <Link to='/'>Back to Home</Link>
      </footer>
    </section>
  )

  return content
}
export default Login
