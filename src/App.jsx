import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from './components/DashBoard'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'

const App = () => {
  return (
    <>
    <div className='bg-slate-900 w-full h-screen p-2 space-y-7'>
      <h1 className='text-white text-3xl text-center'>Chat App</h1>
      <Routes>
        <Route path='/' element={<DashBoard/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
    </div>
    </>
  )
}

export default App

