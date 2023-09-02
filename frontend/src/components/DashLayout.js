import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className='dash-container'>
        {/* render children -> special area */}
        <Outlet />
      </div>
      <DashFooter />
    </>
  )
}

export default DashLayout
