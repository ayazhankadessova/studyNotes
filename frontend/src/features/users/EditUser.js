import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm'

// get user id out of the url
// get user data from the state, not query
// we created useSelector in the userApiSlice
// if we have a user, pull the edit user form that we have not created yet

const EditUser = () => {
  const { id } = useParams()

  const user = useSelector((state) => selectUserById(state, id))

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

  return content
}

export default EditUser
