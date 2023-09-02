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
        <address className='public__addr'>
          Study Notes
          <br />
          32 Renfrew Road
          <br />
          Kowloon Tong, HK
          <br />
          <a href='tel:+8525555'>(852)555</a>
        </address>
        <br />
        <p>Owner: Aya Kadessova</p>
      </main>
      <footer>
        <Link to='/login'>Employee Login</Link>
      </footer>
    </section>
  )
  return content
}
export default Public
