import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProduct from '../Components/RelatedProduct.jsx';

const Product = () => {
  const {productId} = useParams();
  const {products,currency,addToCart} = useContext(ShopContext)
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('')
  const [size,setSize] = useState('')
  const fetchProductData = async()=>{
         products.map((item)=>{
          if(item._id == productId){
            setProductData(item)
            setImage(item.image[0])
            return null;
          }
         })
  }
  useEffect(()=>{
    fetchProductData();
  
    
  },[productId,products])
  
  return productData ? (
    <div className='border-t-2 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*-------------------- Product data----------------- */}

      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* -------------------Product Image---------------- */}
        <div className='flex flex-col-reverse sm:flex-row gap-3 flex-1'>
          <div className=' sm:ml-40 flex sm:flex-col overflow-x-auto sm:overflow-y-scroll  justify-between sm:justify-normal sm:w-[15%] w-full'>
               {
          productData.image.map((item,idx)=>(
            <img onClick={()=>setImage(item)} className=' w-[20%] sm:w-full  object-cover sm:mb-3 flex-shrink-0 cursor-pointer' src={item} key={idx}  />
          ))
        }
          </div>
          <div className='sm:w-[64%]'>
            <img className='w-full   h-auto object-cover my-5 sm:my-0' src={image} alt="big-img" />
          </div>
        </div> 
            {/* -----------Product Information------------ */}
         <div className='flex-1 ml-4 sm:ml-1'>
            <h1 className='font-medium sm:text-3xl text-2xl mt-2 sm:ml-0'>{productData.name}</h1>
            <div className='flex gap-2 mt-3 items-center'>
              <img className=' w-3 h-3 sm:w-4 sm:h-4' src={assets.star_icon}  />
              <img className=' w-3 h-3 sm:w-4 sm:h-4' src={assets.star_icon}/>
              <img className=' w-3 h-3 sm:w-4 sm:h-4' src={assets.star_icon} />
              <img className='  w-3 h-3 sm:w-4 sm:h-4' src={assets.star_icon}/>
              <img className=' w-3 h-3 sm:w-4 sm:h-4' src={assets.star_dull_icon}/>
              <p className='pl-2 text-lg sm:text-xl'>(123)</p>
            </div>
                  <p className=' text-2xl font-medium mt-4 sm:text-3xl'>{currency}{productData.price}</p>
                  <p className='mt-4 mr-4  text-gray-600 sm:w-140 sm:text-lg'>{productData.description}</p>
                  <div className='mt-6 text-lg sm:text-xl'>
                    <p>Select Size</p>
                    <div className='flex gap-4 mt-2'>
                      {
                      productData.sizes.map((item,idx)=>(
                        <button key={idx} onClick={()=>(setSize(item))} className={`border  px-4 py-2 bg-gray-200 sm:text-lg text-sm ${item === size ? 'border-orange-500' : ""}`}>{item}</button>
                      ))
                      }
                    </div>
                  </div>
                  <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white text-sm sm:text-lg px-5 py-3 mt-10 cursor-pointer rounded'>ADD TO CART</button>
                  <hr className='mt-8 sm:w-4/5'/>
                  <div className='mt-5 text-gray-500'>
                    <p>100% Original Product.</p>                      
                    <p>Cash on Delivery available.</p>
                    <p>Easy return and exchange policy within 7 days. </p>
                  </div>
          </div>
      </div>
      {/* //  --------------------Description and Review Section----------------- */}
    <div className='mt-20 flex sm:ml-40 ml-4'>
      <p className='border w-40 px-2 py-2 text-md sm:text-lg font-bold '>Description</p>
      <p className='border w-40 px-2 py-2 text-md sm:text-lg font-medium'>Review (123)</p>
    </div>
    <div className='sm:ml-40 ml-4 mt-5 mb-20 w-90 sm:w-350 border border-gray-300 p-5 text-gray-600 '>
      <p>Discover the perfect blend of style, comfort, and quality with this premium fashion piece. Made from high-quality fabric, it offers a soft feel, breathable comfort, and long-lasting durability for everyday wear. Its modern fit and trendy design make it ideal for casual outings, travel, shopping, or daily use. Designed with attention to detail, this outfit pairs easily with jeans, joggers, or sneakers for a stylish look. Lightweight, comfortable, and versatile, it keeps you confident throughout the day while adding a fashionable touch to your wardrobe. A perfect choice for anyone who values comfort and modern style.
</p>
    </div>
    {/* --------------------Related Products----------------- */}
    <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
    
  ):<div className='opacity-0'></div>
}

export default Product;
