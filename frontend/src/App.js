import { Outlet, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* default component */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        {/* protected layouts */}
        {/* nested routes  -> wrap around other components that are protected inside this route*/}
        <Route path='dash' element={<DashLayout />}>
          <Route index element={<Welcome />} />
          {/* will add new note component, create note compinent, etc */}
          <Route path='notes'>
            <Route index element={<NotesList />} />
          </Route>

          <Route path='users'>
            <Route index element={<UsersList />} />
          </Route>
        </Route>{' '}
        {/*End Dash*/}
      </Route>
    </Routes>
  )
}

export default App
