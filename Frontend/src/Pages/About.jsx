import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/frontend_assets/assets'
import LetterBox from '../Components/LetterBox'

const About = () => {
  return (
    <div className=' mt-10 mb-40'>
      <div className='flex justify-center'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      
      <div className='flex justify-center my-10 flex-col md:flex-row gap-10 mx-4'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
             <p>Welcome to our store — your trusted destination for stylish, comfortable, and affordable fashion. We believe clothing is more than just fabric, it’s a way to express confidence, personality, and lifestyle. Our goal is to bring together modern trends, premium quality, and everyday comfort in one place.</p>
             <p>We carefully curate collections for Men, Women, and Kids, offering everything from casual wear to seasonal essentials. Every product is selected with attention to quality, design, and durability so our customers always receive the best shopping experience.</p>
             <b>Our Mission</b>
             <p>Our mission is simple: make fashion accessible, reliable, and enjoyable for everyone. From easy browsing and secure payments to fast delivery and smooth returns, we focus on providing a seamless online shopping journey.</p>
             <p>Customer satisfaction is at the heart of everything we do. We continuously work to improve our products, services, and user experience based on customer feedback and changing fashion trends.</p>
             <p>Thank you for choosing us and being part of our growing community. We look forward to helping you discover styles you love and wear with confidence every day.</p>
        </div>
      </div>
      <div>
        <Title text1={'OUR'} text2={'VALUES'} className='text-center sm:text-xl sm:ml-40 mt-10 mx-4'/>
        <div className='flex flex-col md:flex-row gap-10 mt-20 sm:mx-40 mx-4 '>
          <div className='flex flex-col items-center gap-4 text-gray-600 border p-4'>
            <img className='w-16' src={assets.quality_icon} alt="" />
            <p className='font-medium text-lg'>QUALITY</p>
            <p className='text-sm text-center'>We are committed to providing high-quality products that meet our customers' expectations.</p>
          </div>
          <div className='flex flex-col items-center gap-4 text-gray-600 border p-4 '>
            <img className='w-16' src={assets.trend_icon} alt="" />
            <p className='font-medium text-lg'>TRENDY</p>
            <p className='text-sm text-center'>Our collections are curated to reflect the latest fashion trends while maintaining timeless styles.</p>
          </div>
          <div className='flex flex-col items-center gap-4 text-gray-600 border p-4'>
            <img className='w-16' src={assets.affordable_icon} alt="" />
            <p className='font-medium text-lg'>AFFORDABLE</p>
            <p className='text-sm text-center'>We believe that great style should be accessible to everyone, which is why we offer competitive prices without compromising on quality.</p>
          </div>
        </div>
        <LetterBox/>
      </div>
      <div>

      </div>
      
    </div>
  )
}

export default About
