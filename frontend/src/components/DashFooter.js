import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@material-ui/core'

const DashFooter = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onGoHomeClicked = () => navigate('/dash')

  let goHomeButton = null
  if (pathname !== '/dash') {
    goHomeButton = (
      <Button variant='contained' color='primary' onClick={onGoHomeClicked}>
        Home
      </Button>
    )
  }

  const content = (
    <footer className='dash-footer'>
      {/* will appear if not already on home page */}
      {goHomeButton}
    </footer>
  )
  return content
}

export default DashFooter
