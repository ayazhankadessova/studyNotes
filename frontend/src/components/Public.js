import { Link } from 'react-router-dom'

const Public = () => {
  const content = (
    <section className='public'>
      <header>
        <h1>
          Welcome to <span className='nowrap'>Study Notes!</span>
        </h1>
      </header>
      <main className='public__main'>
        <p>Store your Study Notes here!</p>
        <br />
      </main>
      <footer>
        <Link to='/login'>Login</Link>
      </footer>
    </section>
  )
  return content
}
export default Public
