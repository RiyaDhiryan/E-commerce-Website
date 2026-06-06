import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/frontend_assets/assets'
import LetterBox from '../Components/LetterBox'

const Contact = () => {
  return (
    <div className='mb-40 sm:mx-40 mx-4'>
      <div className='flex justify-center mt-10'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
        <div className='mt-10  flex flex-col md:flex-row gap-10 justify-between'>
          <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
          <div>
            <p className='text-base text-gray-600 text-center mt-4'>We’d love to hear from you. Whether you have a question about products, orders, shipping, or returns, our team is always ready to help.</p>
            <div className='mt-10 sm:ml-20 gap-4'>
            <p className='md:text-2xl text-xl font-medium'>Our Store</p>
            <p className='text-gray-600 mb-4'>123 Fashion Street, New Delhi, India</p>
            <p className='md:text-2xl text-xl font-medium'>Phone</p>
            <p className='text-gray-600 mb-4'>+91 9876543210</p>
            <p className='md:text-2xl text-xl font-medium'>Email</p>
            <p className='text-gray-600 mb-4'>vastra@gmail.com</p>
             <p className='md:text-2xl text-xl font-medium '>Working Hours</p>
            <p className='text-gray-600 mb-10 '>Monday - Saturday: 10:00 AM - 7:00 PM</p>  
            <p className='font-medium md:text-3xl text-2xl  '>Careers at Vastra</p>
            <p className='text-gray-600'>Learn more about our teams and job openings</p>
            <button className=' mt-10 border border-black px-8 py-2 text-lg hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
            </div>
          </div>
        </div>
         <LetterBox/>
    </div>
  )
}

export default Contact
