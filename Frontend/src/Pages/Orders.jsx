import React, { useContext } from 'react'
import Title from '../Components/Title'
import { ShopContext } from '../Context/ShopContext'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
  const {backendUrl,token,currency} = useContext(ShopContext)
  const [orderData,setOrderData] = useState([])

  const loadOrderData = async()=>{
    try {
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}} )
      
        if(response.data.success){
            let allOrdersItem = []
            response.data.orders.map((order)=>{
              order.items.map((item)=>{
                item['status'] = order.status
                item['payment'] = order.payment
                item['paymentMethod'] = order.paymentMethod
                item['date'] = order.date
                allOrdersItem.push(item)
              })
            })
            setOrderData(allOrdersItem.reverse());
            
        }else{
          toast.error(response.data.message)
        }
        
     
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  useEffect(()=>{
      if(!token){
      navigate('/login')
      return
   }
    loadOrderData()
  },[token])
  return (
    <div className='sm:mx-40 mx-4 mb-40'>
      <div className='mt-10 mb-10'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div>
        {
        orderData.map((item,idx)=> (
          <div key={idx} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 '>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
              <div>
               <p className='font-medium text-s sm:text-lg'>{item.name}</p>
               <div className='text-xs sm:text-base flex gap-6 mt-2'>
                <p >{currency}{item.price}</p>
                <p>Quantity : {item.quantity}</p>
                <p>Size : {item.size}</p>
                </div>
                 <p className='mt-2 sm:text-sm text-xs text-gray-500'>Date:{new Date(item.date).toDateString()}</p>
                 <p className='mt-2 sm:text-sm text-xs text-gray-500'>Payment:{item.paymentMethod}</p>
               </div>
            </div> 
           <div className='md:w-1/2 flex justify-between'>
           <div className='flex items-center gap-2'>
            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
            <p className='text-sm md:text-base'>{item.status}</p>
           </div>
           <button onClick={loadOrderData} className='border px-4 py-2 sm:text-base text-xs  font-medium rounded-sm'>Track Order</button>
           </div>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Orders
