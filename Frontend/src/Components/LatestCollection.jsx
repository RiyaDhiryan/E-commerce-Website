import React,{useContext, useEffect} from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem';
const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = React.useState([]);
    useEffect(()=>{
      setLatestProducts(products.slice(0,10))
    },[products])
  return (
    <div>
      <div className='text-center text-xl sm:text-3xl mt-10'>
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
        <p className='w-3/4 m-auto text-base sm:text-sm md:text-lg text-gray-600 font-medium'>Upgrade your wardrobe with premium styles, trendy outfits, and unbeatable deals—all in one place</p>
      </div>
      {/* Rendering Products*/}
      <div className=' mt-10 mx-10 sm:mx-30 md:mx-20 lg:mx-30 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 gap-y-6'>
           {
            latestProducts.map((item,idx)=>(
                <ProductItem key={idx} id={item._id} price={item.price} image = {item.image} name={item.name} />
            ))
           }
      </div>
    </div>
  )
}

export default LatestCollection
