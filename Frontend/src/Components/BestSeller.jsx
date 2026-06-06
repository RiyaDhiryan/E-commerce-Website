import React from 'react'
import Title from './Title'
import { ShopContext } from '../Context/ShopContext'
import { useContext,useState,useEffect } from 'react'
import ProductItem from './ProductItem'
const BestSeller = () => {
    const {products} = useContext(ShopContext)
  const [bestSeller,setBestSeller] = useState([])
  useEffect(()=>{
    const bestProduct = products.filter((item)=>item.bestseller)
    setBestSeller(bestProduct.slice(0,5))
    
  },[products])
  return (
    <div className='mt-10'>
      <div className='text-center' >
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='mx-10 my-0 text-base text-gray-700 font-medium sm:text-m md:text-m lg:text-lg'>Explore our best-selling styles loved by customers, combining comfort, quality, and trendsetting fashion</p>
        </div>
        <div className='mt-10 mx-10 sm:mx-30 md:mx-20 lg:mx-30 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 gap-y-6' >
            {
                bestSeller.map((item,idx)=>(
                    <ProductItem key={idx} id={item._id} price={item.price} name={item.name} image={item.image}/>
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller
