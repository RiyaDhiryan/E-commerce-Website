import React from 'react'

const LetterBox = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
    }
  return (
    <div className='mt-30 mb-20'>
       <div className='text-center' >
        <p className='text-xl sm:text-2xl md:text-3xl text-gray-700' >Subscribe now & get 20% off</p>
        <p className=' mx-4 text-base sm:text-m md:text-lg text-gray-600 font-medium my-2'>Join our newsletter for special discounts, new arrivals, and exciting offers straight to your inbox.</p>
        <form onSubmit={handleSubmit}>
            <input className='w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/3 mt-10 h-13 border pl-4 text-m sm:text-m md:text-xl' type="email" placeholder='Enter Your Email' required/>
            <button className='bg-black text-white pt-3.5 pb-3.5 px-4   sm:pt-4 sm:pb-3 sm:px-5 ' type='submit'>SUBSCRIBE</button>
        </form>
       </div>
    </div>
  )
}

export default LetterBox
