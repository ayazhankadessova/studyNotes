import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className='dash-container'>
        {/* render children -> special area */}
        <Outlet />
      </div>
    </>
  )
}

export default DashLayout
