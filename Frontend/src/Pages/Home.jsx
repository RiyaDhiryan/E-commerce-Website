import React, { useContext, useEffect, useState } from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import LetterBox from '../Components/LetterBox'

const Home = () => {
  return (
    <div>
      <Hero/>
     <LatestCollection/>
     <BestSeller/>
     <OurPolicy/>
     <LetterBox/>
    </div>
  )
}

export default Home
