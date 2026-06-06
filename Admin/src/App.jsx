import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './Pages/Add';
import List from './Pages/List';
import Orders from './Pages/Orders';
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify';
import Edit from './Pages/Edit';
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$';
const App = () => {
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
  useEffect(()=>{
 localStorage.setItem('token',token)
  },[token])
  return (
    <div className='min-h-screen'>
        <ToastContainer/>
      {
        token ===''?
        <Login setToken={setToken}/>:
        <>
         <Navbar setToken={setToken}/>
      <hr className='border-gray-300'/>
      <div className='flex w-full'>
           <Sidebar/>
           <div className = 'w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-800 text-base '>
            <Routes>
              <Route path='/' element ={<Add token={token}/>} />
              <Route path='/list' element ={<List token={token}/>} />
              <Route path='/orders' element ={<Orders token={token}/>} />
              <Route path='/edit/:id' element = {<Edit token={token}/>  } />
            </Routes>
           </div>
      </div>
      </>
      }
    
    </div>
  )
}

export default App
