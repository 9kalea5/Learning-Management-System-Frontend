import { useState } from 'react'
import Login from './pages/Login'
import Home from './components/LandingPage'
import Register from './pages/Register'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/' element={<Layout />}/>
      </Routes>
    </>
  )
}

export default App
