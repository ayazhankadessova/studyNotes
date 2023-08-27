import { Outlet, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './components/Login'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* default component */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
