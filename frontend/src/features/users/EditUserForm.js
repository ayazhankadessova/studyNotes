import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ROLES } from '../../config/roles'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = (user) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation()

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(user.roles)

  // disable employee -> deactivate user
  const [active, setActive] = useState(user.active)

  // Validate username & password
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  // check if both functions are successful: update & delete
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername('')
      setPassword('')
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, isDelSuccess, navigate])

  // handlers
  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)

  // Add OnActive Changed
  // Add onSaveUserClicked
  // add onDeleteUserClicked

  // check if we can save
  // All of these methods should be true
  // if not loading -> can save is true
  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

  const onSaveUserClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      // add new User mutation
      await addNewUser({ username, password, roles })
    }
  }

  // creating an option for every value in roles for the dropdown menu
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {' '}
        {role}
      </option>
    )
  })

  // checking which class will be applied for the inputs
  // add class if invalid
  const errClass = isError ? 'errmsg' : 'offscreen'
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
  const validRolesClass = !Boolean(roles.length)
    ? 'form__input--incomplete'
    : ''

  const content = (
    <>
      {/* display error messages on the top if they occur */}
      <p className={errClass}>{error?.data?.message}</p>

      {/* onSaveUserClicked -> for the entire form */}
      <form className='form' onSubmit={onSaveUserClicked}>
        <div className='form__title-row'>
          <h2>New User</h2>
          <div className='form__action-buttons'>
            {/* if we dont meet requirements for saving the new user, we are disabling this button */}
            <button className='icon-button' title='Save' disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        {/* label for each input */}
        <label className='form__label' htmlFor='username'>
          Username: <span className='nowrap'>[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id='username'
          name='username'
          type='text'
          autoComplete='off'
          value={username}
          onChange={onUsernameChanged}
        />

        <label className='form__label' htmlFor='password'>
          Password: <span className='nowrap'>[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={onPasswordChanged}
        />

        <label className='form__label' htmlFor='roles'>
          ASSIGNED ROLES:
        </label>
        {/* multiple=true -> can select more than one value */}
        <select
          id='roles'
          name='roles'
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size='3'
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  )

  return content
}
export default NewUserForm
