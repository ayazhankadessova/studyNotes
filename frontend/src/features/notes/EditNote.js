import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'

// bring data & edit pre-populated form to render that data
// get note with that id
// get users
// content -> check if we have users & note -> pre-populate EditNoteForm with note & users

const EditNote = () => {
  const { id } = useParams()

  const note = useSelector((state) => selectNoteById(state, id))
  const users = useSelector(selectAllUsers)

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <p>Loading...</p>
    )

  return content
}

export default EditNote
