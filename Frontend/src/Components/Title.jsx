import React from 'react'

const Title = ({text1,text2,className=''}) => {
  return (
    <div className={`inline-flex text-2xl gap-2 sm:text-3xl text-center  ${className}`}> 
      <p className='text-gray-500' >{text1} <span className='text-gray-700 font-medium'>{text2}</span></p>
      <p className=' mt-6 w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
    </div>
  )
}

export default Title;
