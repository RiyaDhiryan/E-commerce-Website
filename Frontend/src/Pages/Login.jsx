import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../Context/ShopContext'
import { toast } from 'react-toastify'
const Login = () => {
  const [currentState,setCurrentState] = useState('Login')
  const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {backendUrl,token,setToken,navigate} = useContext(ShopContext)
    const handleSubmit = async(e)=>{
      try {
         e.preventDefault()
         if(currentState === 'Sign Up'){
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password}) 
          if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          }else{
            toast.error(response.data.message)
          }  
         } else{
            const response = await axios.post(backendUrl +'/api/user/login' ,{email,password}) 
              if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          }else{
            toast.error(response.data.message)
            
          }  
          }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message)
      }
    }
    useEffect(()=>{
      if(token){
        navigate('/')
      }
    },[token])
     
  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-[500px] m-auto mt-10 gap-4 text-gray-800 mb-40'>
    <div className='inline-flex items-center gap-2 mb-2 mt-10' >
       <p className='sm:text-4xl text-xl'>{currentState}</p>
       <hr className='border-none h-0.5 w-8 bg-gray-700' />
    </div>
    {currentState === 'Login'  ? '' :<input type="text" onChange={(e)=>setName(e.target.value)} placeholder='Name' className='border border-gray-500 rounded py-3 px-4 w-full text-black' />}
    <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className='border border-gray-500 rounded py-3 px-4 w-full text-black' />
    <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} className='border border-gray-500 rounded py-3 px-4 w-full text-black' />
    <div className='w-full flex justify-between text-base'>
      <p className='cursor-pointer'>Forget your password?</p>
      {
        currentState === 'Login' ?
         <p className='cursor-pointer' onClick={()=>setCurrentState('Sign Up')}>Create Account</p>: 
         <p className='cursor-pointer' onClick={()=>setCurrentState('Login')}>Login Here</p>
      }
    </div>
    <button className=' mt-5 bg-black text-white text-lg sm:text-xl py-2 px-12 rounded hover:bg-blue-950'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
