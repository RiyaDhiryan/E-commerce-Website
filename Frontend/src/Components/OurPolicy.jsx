import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='mx-10  mt-20  md:mt-30 sm:mt-25 flex flex-col sm:justify-around sm:flex-row gap-12 justify-center text-lg sm:text-m md:text-lg'>
      <div className='text-center items-center' >
        <img className='w-12 m-auto mb-5 sm:w-12 md:w-15 ' src={assets.exchange_icon} alt='exchange'/>
        <p className='text-gray-700 font-medium'> Days Return Policy</p>
        <p className='text-gray-500'>We offer hassle free exchange policy</p>
      </div>
        <div className='text-center items-center'>
        <img className='w-12 m-auto mb-5 sm:w-12 md:w-15 ' src={assets.quality_icon} alt='quality'/>
        <p className='text-gray-700 font-medium'>7 Days Return Policy</p>
        <p className='text-gray-500'>We provide 7 Days free return policy</p>
      </div>
        <div className='text-center items-center'>
        <img className='w-10 m-auto mb-5 sm:w-12 md:w-15 ' src={assets.support_img} alt='support'/>
        <p className='text-gray-700 font-medium'>Best Customer Support</p>
        <p className='text-gray-500'>We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy
