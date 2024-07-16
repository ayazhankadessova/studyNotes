import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUsername } from '../users/usersApiSlice'

const Welcome = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Asia/Hong_Kong',
  }).format(date)
  const username = useSelector(selectUsername)

  const content = (
    <section className='welcome'>
      <p>{today}</p>

      <h1>Welcome {username}:) !</h1>

      <p>
        <Link to='/dash/notes'>View Study Notes</Link>
      </p>

      <p>
        <Link to='/dash/notes/new'>Add New Study Notes</Link>
      </p>

      {/* will apply some roles */}
      <p>
        <Link to='/dash/users'>View User Settings</Link>
      </p>

      <p>
        <Link to='/dash/users/new'>Add New User</Link>
      </p>
    </section>
  )

  return content
}
export default Welcome
