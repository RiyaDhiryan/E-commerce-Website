import React from 'react'
import { useState } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = ({setToken}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const SubmitHandler =async(e)=>{
        try{
          e.preventDefault() 
          const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
          if(response.data.success){
            setToken(response.data.token)
          }
          else{
             toast.error(response.data.message)
          }
          
        }catch(err){
            console.log(err);
            toast.error('Invalid Credentials')
        }
        
    }
  return (
    <div className = 'w-full flex justify-center items-center min-h-screen'>
      <div className = 'md:w-[25%] border border-gray-300 rounded-lg p-10 shadow-md'>
        <h1 className='md:text-3xl text-2xl font-bold mb-2 '>Admin Panel</h1>
        <form onSubmit={SubmitHandler} className ='flex flex-col justify-center items-center' >
            <div className='w-full'>
                <p className='font-bold '>Email Address</p>
            <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your email' className='border border-gray-300 rounded px-3 py-2 w-full mb-4'/>
            </div>
            <div className='w-full'>
                  <p className="font-bold">Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter your password' className='border border-gray-300 rounded px-3 py-2 w-full mb-4'/>
            </div>
            <button className='border rounded-lg bg-blue-600 text-white h-12  mt-5 text-xl  w-full hover:transition-all hover:duration-75 hover:bg-white hover:text-blue-700'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
