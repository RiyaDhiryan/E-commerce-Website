import React from 'react'
import { assets } from '../assets/assets';
const Navbar = ({setToken}) => {
  return (
    
    <div className='flex justify-between   sm:mr-20 mr-4 mb-5'>
        <img className='w-60 sm:w-80' src={assets.logo} alt="" />
        <button onClick={()=>setToken('')} className='border rounded-lg bg-red-600 text-white h-12 w-[80px] text-base  sm:h-12 sm:w-30 mt-10 sm:text-xl hover:transition-all hover:duration-75 hover:bg-white hover:text-red-700'>Logout</button>
    </div>
  )
}

export default Navbar
