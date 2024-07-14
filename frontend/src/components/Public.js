import { Link } from 'react-router-dom'
import { Typography, Button, Box } from '@material-ui/core'

const Public = () => {
  const content = (
    <section className='public'>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        height='100vh'
      >
        <header>
          <Typography variant='h1' component='h1' gutterBottom>
            Welcome to <span className='nowrap'>Study Notes!</span>
          </Typography>
        </header>
        <main className='public__main'>
          <Typography variant='body1' gutterBottom>
            Store your Study Notes here!
          </Typography>
        </main>
        <footer>
          <Button
            component={Link}
            to='/login'
            variant='contained'
            color='primary'
            style={{ marginTop: '30px' }}
          >
            Login
          </Button>
        </footer>
      </Box>
    </section>
  )
  return content
}

export default Public
