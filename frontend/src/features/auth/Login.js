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

  // we only need isLoading from this mutation
  const [login, { isLoading }] = useLoginMutation()

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
