import { useState, useEffect } from 'react'
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const EditNoteForm = ({ note, users }) => {
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation()

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation()

  const navigate = useNavigate()

  // setters: title, text, completed, userId -> based on note model

  const [title, setTitle] = useState(note.title)
  const [text, setText] = useState(note.text)
  const [completed, setCompleted] = useState(note.completed)
  const [userId, setUserId] = useState(note.user)

  // clean uo after success

  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess || isDelSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dash/notes')
    }
  }, [isSuccess, isDelSuccess, navigate])

  // handlers
  const onTitleChanged = (e) => setTitle(e.target.value)
  const onTextChanged = (e) => setText(e.target.value)

  // check if we can save
  // All of these methods should be true
  // if not loading -> can save is true

  let canSave

  canSave = [roles.length, validUsername].every(Boolean) && !isLoading

  const errClass = isError || isDelError ? 'errmsg' : 'offscreen'
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validPwdClass =
    password && !validPassword ? 'form__input--incomplete' : ''
  const validRolesClass = !Boolean(roles.length)
    ? 'form__input--incomplete'
    : ''

  // check for update / del error
  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

  // has save & delete buttons -> they call mutations
  // add active/not buttons
  // other fields are same

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <div className='form__title-row'>
          <h2>Edit User</h2>
          <div className='form__action-buttons'>
            <button
              className='icon-button'
              title='Save'
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className='icon-button'
              title='Delete'
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
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
          Password: <span className='nowrap'>[empty = no change]</span>{' '}
          <span className='nowrap'>[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={onPasswordChanged}
        />

        <label
          className='form__label form__checkbox-container'
          htmlFor='user-active'
        >
          ACTIVE:
          <input
            className='form__checkbox'
            id='user-active'
            name='user-active'
            type='checkbox'
            checked={active}
            onChange={onActiveChanged}
          />
        </label>

        <label className='form__label' htmlFor='roles'>
          ASSIGNED ROLES:
        </label>
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
export default EditNoteForm
