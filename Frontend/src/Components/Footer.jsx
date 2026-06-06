import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
    <div className='mx-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 lg:gap:40'>
      <div>
        <img className='w-50' src={assets.logo} alt='logo'/> 
        <p className='w-full lg:w-100 text-gray-600 '>Discover fashion that blends style, comfort, and affordability. Explore our latest collections designed for every occasion. We aim to help you look confident, stay trendy, and feel great every day..</p>
      </div>
      <div>
        <p className='text-2xl sm:text-2xl md:text-2xl lg:text-3xl text-gray-800'>COMPANY</p>
        <ul className='text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <p className='text-2xl sm:text-2xl md:text-2xl lg:text-3xl text-gray-800'>GET IN TOUCH</p>
        <ul className='text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>support@vastra.com</li>
        </ul>
      </div>
      
    </div>
    <div className='pt-10 pb-6'>
        <hr className='w-full text-gray-400'/>
        <p className='text-center mt-5 text-sm sm:text-m md:text-m lg:text-lg'>Copyright 2026@vastra.com - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
