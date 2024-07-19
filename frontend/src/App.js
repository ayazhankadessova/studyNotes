import { Outlet, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch'
import SignUp from './features/auth/SignUp'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* default component */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        {/* protected layouts */}
        <Route element={<Prefetch />}>
          {/* nested routes  -> wrap around other components that are protected inside this route*/}
          <Route path='dash' element={<DashLayout />}>
            <Route index element={<Welcome />} />

            <Route path='users'>
              <Route index element={<UsersList />} />
              <Route path=':id' element={<EditUser />} />
              <Route path='new' element={<NewUserForm />} />
            </Route>

            {/* will add new note component, create note compinent, etc */}
            <Route path='notes'>
              <Route index element={<NotesList />} />
              <Route path=':id' element={<EditNote />} />
              <Route path='new' element={<NewNote />} />{' '}
            </Route>
          </Route>{' '}
          {/*End Dash*/}
        </Route>
      </Route>
    </Routes>
  )
}

export default App
