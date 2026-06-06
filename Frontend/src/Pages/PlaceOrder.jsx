import React, { useContext, useState,useEffect } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const PlaceOrder = () => {
  const [method,setMethod] = useState('cod')
  const {navigate,backendUrl,token,cartItems,setCartItems,cartAmount,delivery_fee,products} = useContext(ShopContext)
  const [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

const onChangeHandler = (e)=>{
  const name = e.target.name
  const value = e.target.value
  setFormData(data =>({...data,[name]:value}))
}
const initPay = (order)=>{
  const options ={
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount : order.amount,
    currency : order.currency,
    name:'Order Payment',
    description:'Order Payment',
    order_id:order.id,
    receipt:order.receipt,
    handler: async(response)=>{
      console.log(response);
      try {
        const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay', response ,{headers:{token}})
        if(data.success){
          navigate('/orders')
          setCartItems({})
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
    }

    
  }
      
  const rzp = new window.Razorpay(options)
  rzp.open()
}

const submitHandler = async(e)=>{
e.preventDefault()
try {
  let orderItems = []
  for(const itemId in cartItems){
          for(const size in cartItems[itemId]){
            if(cartItems[itemId][size]>0){
              const itemInfo = structuredClone(products.find(product => product._id === itemId))
              if(itemInfo){
                itemInfo.size = size
                itemInfo.quantity = cartItems[itemId][size]
                orderItems.push(itemInfo)
              }
            }
          }
  }  
  let orderData = {
    address:formData,
    items:orderItems,
    amount : cartAmount() + delivery_fee
  }
  switch(method){
    case 'cod':
    const response = await axios.post(backendUrl + '/api/order/place',orderData, {headers:{token}})
    
    if(response.data.success){
      setCartItems({})
      navigate('/orders')
    }else{
      toast.error(response.data.message)
    }
           break;
           case 'stripe':
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          }else{
            toast.error(responseStripe.data.message)
          }
            break;
            case 'razorpay':

          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay' ,orderData,{headers:{token}})
          if(responseRazorpay.data.success){
               initPay(responseRazorpay.data.order)
          }
              break;
       default:
            break;
  }
  
  } catch (error) {
   console.log(error);
   toast.error(error.message)
   
}
}
useEffect(()=>{
   if(!token){
      navigate('/login')
   }
},[token])

  return (
    <form onSubmit={submitHandler} className='max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-20 overflow-hidden flex flex-col sm:flex-row justify-between gap-10 border-t pt-10 mb-40'>
      {/* Left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
           <div>
            <Title text1={'YOUR'} text2={'INFORMATION'}/>
           </div>
           <div className='flex gap-3'>
          <input type="text" onChange={onChangeHandler} name='firstName' value={formData.firstNamestName} placeholder='First Name' className='border border-gray-300 rounded py-2 px-4 w-full text-black' required/>
          <input type="text" onChange={onChangeHandler} name='lastName' value={formData.lastName} placeholder='Last Name' className='border border-gray-300 rounded py-2 px-4 w-full text-black' required/>
           </div>
             <input type="email" onChange={onChangeHandler} name='email' value={formData.email} placeholder='Email' className='border border-gray-300 rounded py-2 px-4 w-full text-black' required/>
               <input type="text" onChange={onChangeHandler} name='street' value={formData.street} placeholder='Street' className='border border-gray-300 rounded py-2 px-4 w-full text-black' required/>
                  <div className='flex gap-3'>
          <input type="text" onChange={onChangeHandler} name='city' value={formData.city}  placeholder='City' className='border border-gray-300 rounded py-2 px-4 w-full text-black' required/>
          <input type="text" onChange={onChangeHandler} name='state' value={formData.state}  placeholder='State' className='border border-gray-300 rounded py-2 px-4 w-full text-black' />
           </div>
               <div className='flex gap-3'>
          <input type="number" onChange={onChangeHandler} name='zipcode' value={formData.zipcode}  placeholder='Zipcode' className='border border-gray-300 rounded py-2 px-4 w-full text-black' required/>
          <input type="text" onChange={onChangeHandler} name='country' value={formData.country}  placeholder='Country' className='border border-gray-300 rounded py-2 px-4 w-full text-black' required />
           </div>
            <input type="text" onChange={onChangeHandler} name='phone' value={formData.phone}  placeholder='Phone Number' className='border border-gray-300 rounded py-2 px-4 w-full text-black' required/>
      </div>
      {/* Right side */}
      <div className='mt-12'>
        <div className='w-full sm:min-w-[450px]'>
           <CartTotal/>
        </div>
      <div className='mt-10 '>
        <Title text1={'PAYMENT'} text2={'METHOD'} className='sm:text-xl'/>
        {/* -----------Payment Methods------------ */}
        <div className='flex gap-3 flex-col sm:flex-row mt-10'>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-1 border py-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full text-gray-600 ${ method  === 'razorpay' ? 'bg-green-400' : '' } `}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
              <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border py-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full text-gray-600 ${ method  === 'stripe' ? 'bg-green-400' : '' } `}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
              <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border py-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full text-gray-600 ${ method  === 'cod' ? 'bg-green-400' : '' } `}></p>
              <p className='font-medium'>CASH ON DELIVERY</p>
            </div>
        </div>
        <div className='flex justify-end '>
          <button type='submit'className=' mt-10 bg-black text-white text-lg sm:text-lg py-2 px-20 rounded hover:bg-green-700'>PLACE ORDER</button>
        </div>
      </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
