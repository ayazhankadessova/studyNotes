import { useState, useEffect } from 'react'
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Grid,
} from '@mui/material'

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

  // clean up after success
  useEffect(() => {
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
  const onCompletedChanged = (e) => setCompleted((prev) => !prev)
  const onUserIdChanged = (e) => setUserId(e.target.value)

  // check if we can save
  // All of these methods should be true
  // if not loading -> can save is true
  const canSave = [title, text, userId].every(Boolean) && !isLoading

  // on save note clicked -> update note
  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed })
    }
  }

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id })
  }

  const created = new Date(note.createdAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })
  const updated = new Date(note.updatedAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    )
  })

  const errClass = isError || isDelError ? 'errmsg' : 'offscreen'
  const validTitleClass = !title ? 'form__input--incomplete' : ''
  const validTextClass = !text ? 'form__input--incomplete' : ''

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

  const content = (
    <>
      <Typography variant='body1' className={errClass}>
        {errContent}
      </Typography>

      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <Box mb={2}>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              <Typography variant='h5'>Edit Note #{note.ticket}</Typography>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                startIcon={<FontAwesomeIcon icon={faSave} />}
                onClick={onSaveNoteClicked}
                disabled={!canSave}
              >
                Save
              </Button>
              <Button
                variant='contained'
                color='secondary'
                startIcon={<FontAwesomeIcon icon={faTrashCan} />}
                onClick={onDeleteNoteClicked}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>

        <TextField
          label='Title'
          variant='outlined'
          className={`form__input ${validTitleClass}`}
          id='note-title'
          name='title'
          autoComplete='off'
          value={title}
          onChange={onTitleChanged}
          fullWidth
        />

        <TextField
          label='Text'
          variant='outlined'
          className={`form__input form__input--text ${validTextClass}`}
          id='note-text'
          name='text'
          value={text}
          onChange={onTextChanged}
          multiline
          rows={4}
          fullWidth
        />

        <Box mt={2}>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    id='note-completed'
                    name='completed'
                    checked={completed}
                    onChange={onCompletedChanged}
                  />
                }
                label='WORK COMPLETE'
              />
              <Select
                id='note-username'
                name='username'
                value={userId}
                onChange={onUserIdChanged}
                variant='outlined'
              >
                {options}
              </Select>
            </Grid>
            <Grid item>
              <Typography variant='body2' className='form__created'>
                Created: {created}
              </Typography>
              <Typography variant='body2' className='form__updated'>
                Updated: {updated}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  )

  return content
}

export default EditNoteForm
