import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewNoteMutation } from './notesApiSlice'
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

const NewNoteForm = ({ users }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [userId, setUserId] = useState(users[0].id)

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dash/notes')
    }
  }, [isSuccess, navigate])

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onTextChanged = (e) => setText(e.target.value)
  const onUserIdChanged = (e) => setUserId(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewNote({ user: userId, title, text })
    }
  }

  const options = users.map((user) => (
    <MenuItem key={user.id} value={user.id}>
      {user.username}
    </MenuItem>
  ))

  const hasError = isError && error?.data?.message

  return (
    <Box>
      {hasError && (
        <Typography variant='body1' color='error'>
          {error?.data?.message}
        </Typography>
      )}

      <Box component='form' onSubmit={onSaveNoteClicked}>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography variant='h5'>New Note</Typography>
          <Button
            variant='contained'
            color='primary'
            startIcon={<SaveIcon />}
            disabled={!canSave}
            type='submit'
          >
            Save
          </Button>
        </Box>

        <TextField
          label='Title'
          variant='outlined'
          value={title}
          onChange={onTitleChanged}
          fullWidth
          required
          error={!title}
          helperText={!title ? 'Title is required' : ''}
          margin='normal'
        />

        <TextField
          label='Text'
          variant='outlined'
          value={text}
          onChange={onTextChanged}
          multiline
          rows={4}
          fullWidth
          required
          error={!text}
          helperText={!text ? 'Text is required' : ''}
          margin='normal'
        />

        <Box display='flex' alignItems='center' mb={2}>
          <Typography variant='body1' mr={1}>
            ASSIGNED TO:
          </Typography>
          <Select
            value={userId}
            onChange={onUserIdChanged}
            variant='outlined'
            fullWidth
          >
            {options}
          </Select>
        </Box>
      </Box>
    </Box>
  )
}

export default NewNoteForm
