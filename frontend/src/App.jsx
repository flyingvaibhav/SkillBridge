import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
export const serverURL = 'http://localhost:8000'
import {ToastContainer} from 'react-toastify'
import getCurrentUser from './customHooks/getCurrentUser'
import Profile from './pages/Profile'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import ForgetPassword from './pages/ForgetPassword'


function App() {
getCurrentUser()
const {userData} = useSelector((state) => state.user);


  return (
  <>
    <ToastContainer/>
    
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={userData ? <Profile /> : <Navigate to={"/signup"} />} />
  <Route path='/forget' element={userData ? <ForgetPassword /> : <Navigate to={"/signup"} />} />
    </Routes>
    </>
  )
}

export default App