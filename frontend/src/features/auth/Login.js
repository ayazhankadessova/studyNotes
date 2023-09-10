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
  // useDispatch hook brings dispatch function
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // we only need isLoading from this mutation
  const [login, { isLoading }] = useLoginMutation()

  // handle refs
  // only happens when the component loads -> puts focus on the username field
  useEffect(() => {
    useRef.current.focus()
  })

  // clear out the errorMsg state when the username or password state is changed
  // User saw the error message and changed the username/password
  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  // Handlers: userInput, Pwd, Submit
  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  // handle submit for the form
  const handleSubmit = async (e) => {
    e.preventDefault()
    // async request which may result error
    try {
      // get access Token after we call login mutation
      // pass username, pwd state when username & pwd are complete
      // unwrap -> try catch
      const { accessToken } = await login({ username, password }).unwrap()
      // dispatch setCredentials -> we will get the access token back -> get credentials
      dispatch(setCredentials({ accessToken }))
      // empty state
      setUsername('')
      setPassword('')
      // move to dash
      navigate('/dash')
    } catch (e) {
      // handle your error
      if (!e.status) {
        setErrMsg('No Server Response')
      } else if (e.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (e.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg(e.data?.message)
      }
      // Focus is set on the error msg, which would be read by a screen reader as well bc we put aria=live attr set to assertive

      errRef.current.focus()
    }
  }

  const errClass = errMsg ? 'errmsg' : 'offscreen'

  if (isLoading) {
    return <p>Loading...</p>
  }

  const content = (
    <section className='public'>
      {/* provide ur own header */}
      <header>
        <h1>Employee Login</h1>
      </header>
      {/* form starts  */}
      <main className='login'>
        {/* assertive - should only be used for time-sensitive/critical notifications that
        absolutely require the user's immediate attention */}
        <p ref={errRef} className={errClass} aria-live='assertive'>
          {errMsg}
        </p>
        {/* TODO: define Handle submit */}
        <form className='form' onSubmit={handleSubmit}>
          {/* htmlfor should align with id attr for the name */}
          <label htmlFor='username'>Username:</label>
          <input
            className='form__input'
            type='text'
            id='username'
            ref={userRef}
            value={username}
            // {/* TODO: define Handle User Input */}
            onChange={handleUserInput}
            autoComplete='off'
            required
          />

          <label htmlFor='password'>Password:</label>
          <input
            className='form__input'
            // dont show entry
            type='password'
            id='password'
            // TODO: define
            onChange={handlePwdInput}
            value={password}
            required
          />
          {/* submit button */}
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
