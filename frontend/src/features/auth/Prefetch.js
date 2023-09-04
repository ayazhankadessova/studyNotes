import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
  // we want it to run when the component mounts
  // subscribe to state se we have access to it , and it does not expire in 5 seconds
  // create manual subscription useing endpoints & initiate
  useEffect(() => {
    console.log('subscribing')
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
      console.log('unsubscribing')
      notes.unsubscribe()
      users.unsubscribe()
    }
  }, [])

  return <Outlet />
}
export default Prefetch
