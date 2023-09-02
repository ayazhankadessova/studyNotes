import { Link } from 'react-router-dom'

const Welcome = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Asia/Hong_Kong',
  }).format(date)

  const content = (
    <section className='welcome'>
      <p>{today}</p>

      <h1>Welcome!</h1>

      <p>
        <Link to='/dash/notes'>View Study Notes</Link>
      </p>

      {/* will apply some roles */}
      <p>
        <Link to='/dash/users'>View User Settings</Link>
      </p>
    </section>
  )

  return content
}
export default Welcome
