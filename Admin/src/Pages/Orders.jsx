import React from 'react'
import {backendUrl,currency} from '../App'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useContext } from 'react'
import { toast } from 'react-toastify';
import { assets } from '../assets/assets'
const Orders = ({token}) => { 
     const [order,setOrder] = useState([])
    
     const fetchAllOrders = async()=>{
      if(!token){
        return null;
      }
      try {
        const response = await axios.post(backendUrl + '/api/order/list',{},{headers:{token}})
        if(response.data.success){
          setOrder(response.data.orders.reverse())
        }else{
          toast.error(response.data.message)
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
     }

     const statusHandler = async(e,orderId)=>{
      try {
        const response = await axios.post(backendUrl + '/api/order/status' , {orderId,status:e.target.value} ,{headers:{token}})
        if(response.data.success){
                await fetchAllOrders()
        }else{
             toast.error(response.data.message)
        }
      } catch (error) {
         console.log(error);
        toast.error(error.message)
        
      }
     }
     useEffect(()=>{
      fetchAllOrders()
     },[token])
  return (

    <div>
      <h3 className='text-2xl font'>Orders</h3>
      <div>
        {
          order.map((item,idx)=>{
           return <div className='grid grid-cols-1  sm:grid-cols-[0.5fr_2fr_2fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr_0.1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8  my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={idx}>
                    <img className='w-15' src={assets.parcel_icon} alt="" />
                  <div>
                      <div>
                      {
                        item.items.map((el,idx)=>{
                          if(idx === item.items.length - 1){
                            return <p className='py-0.5' key={idx}>{el.name} x {el.quantity} <span>{el.size}</span></p>
                          }else{
                             return <p className='py-0.5' key={idx}>{el.name} x {el.quantity} <span>{el.size}</span>,</p>
                          }
                        })
                      }
                    </div>
                    <p className='mt-2 mb-2 font-medium'>{item.address.firstName + '' + item.address.lastName}</p>
                    <div>
                      <p>{item.address.street + ','}</p>
                      <p>{item.address.city+ ","} {item.address.state + ","}{item.address.country + ","}{item.address.zipcode} </p>
                    </div>
                    <p>{item.address.phone}</p>
                  </div>
                  <div>
                    <p className='text:sm sm:text-[15px] mb-3'>Items : {item.items.length}</p>
                    <p >Method : {item.paymentMethod}</p>
                    <p>Payment : {item.payment ? "Done":"Pending"}</p>
                    <p>Date : {new Date(item.date).toDateString()}</p>
                  </div>
                  <p className='text:sm sm:text-[17px] mb-3'>{currency}{item.amount}</p>
                  <select onChange={(e)=>statusHandler(e,item._id)} value={item.status} className='p-2 font-semibold text-center '>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Orders
