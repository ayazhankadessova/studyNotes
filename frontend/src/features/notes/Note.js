import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import PropTypes from 'prop-types'

// Material UI imports
import { Chip, IconButton, TableCell, TableRow } from '@mui/material'

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId))

  const navigate = useNavigate()

  if (note) {
    const created = new Date(note.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    })

    const updated = new Date(note.updatedAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    })

    const handleEdit = () => navigate(`/dash/notes/${noteId}`)

    return (
      <TableRow>
        <TableCell>
          {note.completed ? (
            <Chip label='Completed' color='success' />
          ) : (
            <Chip label='Open' color='error' />
          )}
        </TableCell>
        <TableCell>{created}</TableCell>
        <TableCell>{updated}</TableCell>
        <TableCell>{note.title}</TableCell>
        <TableCell>{note.username}</TableCell>
        <TableCell>
          <IconButton onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  } else return null
}

Note.propTypes = {
  noteId: PropTypes.string.isRequired,
}

export default Note
