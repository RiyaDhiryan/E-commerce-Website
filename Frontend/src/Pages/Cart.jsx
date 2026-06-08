import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../Components/CartTotal'
import { toast } from 'react-toastify'
const Cart = () => {
  const {products,currency,cartItems,updateQuantity,navigate,token,cartAmount} = useContext(ShopContext)
  const [cartData,setCartData] = useState([])
  useEffect(()=>{
      if(!token){
      navigate('/login')
   }
    let tempData =[]
    for(let itemId in cartItems){
      for(let size in cartItems[itemId]){
        try {
        if(cartItems[itemId][size]>0){
           tempData.push({
            _id:itemId,
            size:size,
            quantity:cartItems[itemId][size],
          })
        } 
        } catch (error) {
          console.log(error);
          
        }
      }
    }
    setCartData(tempData);
    
  },[cartItems,products])

      const placeOrder = ()=>{
        if(cartAmount() === 0){
            toast.error("Please Select atleast 1 product first!")
          navigate('/collection')
        }else{
          navigate('/place-order')
        } 
      }
  return (
    <div className='pt-10'>
      <div className='sm:ml-40 ml-4'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>
      <div className='mt-10'>
        {
        cartData.map((item,idx)=>{
          const productData = products.find((product)=>product._id === item._id)
          return(
            <div key={idx} className=' sm:ml-40 sm:mr-40 mr-4 ml-4 py-4 border-t border-b text-gray-500 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex item-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                <div>
                  <p className='text-xs sm:text-lg text-gray-700 font-medium'>{productData.name}</p>
                  <div className='flex gap-6 text-xs sm:text-lg  text-gray-700 font-medium mt-2'> 
                  <p>{currency}{productData.price}</p>
                  <p className='px-2 border  sm:px-3 bg-slate-100 font-light'>{item.size}</p>
                  </div>
                
                </div>
              </div>
              <input onChange={(e)=> e.target.value === "" || e.target.value === '0' ? null : updateQuantity(item._id,item.size,Number(e.target.value))} className='border pt-0 w-8 h-8 sm:w-20 sm:text-lg text-gray-800 rounded sm:h-10 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
              <img onClick={()=>updateQuantity(item._id,item.size,0)} className='w-4 mr-4 sm:w-5 cursor-pointer ' src={assets.bin_icon} alt="" />
            </div>

          )
        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full mr-4 sm:w-[500px]'>
         <CartTotal/>
         <div>
            <button  onClick={()=>placeOrder()} className=' mt-10 bg-black text-white text-sm sm:text-lg rounded px-3 py-2 hover:bg-green-800 '>PROCEED TO CHECKOUT</button>
         </div>
        </div>
        
      </div>
      {/* ()=>navigate('/place-order') */}

    </div>
  )
}

export default Cart
