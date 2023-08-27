import { Outlet } from 'react-router-dom'

import React from 'react'

const Layout = () => {
  // renders the children of the outlet component
  // will make this our parent component
  return <Outlet />
}

export default Layout
