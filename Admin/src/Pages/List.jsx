import React from 'react'
import { useState,useEffect } from 'react';
import { backendUrl,currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'



const List = ({token}) => {
  const navigate = useNavigate();
  const [list,setList] = useState([])
  const fetchData = async()=>{
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if(response.data.success){
         setList(response.data.products);
         toast.success(response.data.message)
      }
     else{
      toast.error(response.data.message)
     }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  const removeProduct = async(id)=>{
    try{
      const confirmDelete = window.confirm("Delete product permanently?");
      if(!confirmDelete) return;
      const response = await axios.post(backendUrl +'/api/product/remove',{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        fetchData()
      }
      }catch(err){
        console.log(err);
        toast.error(err.message)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <>
      <p className='mb-2 md:text-2xl font-medium'>ALL PRODUCTS LIST</p>
      <div className='flex flex-col  gap-2'>

        {/* ------------List Table--------------- */}
       <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 rounded text-sm border-1 border-gray-500'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className="text-center">Edit</b>
        <b className="text-center">Action</b>
      </div> 
      {/*-----------Product List----------------- */}
      {
        list.map((item,index)=>(
          <div className='grid grid-cols-[1fr_3fr_1fr_fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-15' src={item.image[0]}/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p className='justify-self-center flex justify-center items-center cursor-pointer bg-yellow-400 h-10 w-20 text-center text-black rounded text-base hover:bg-yellow-600 hover:text-white ' onClick={()=>navigate(`/edit/${item._id}`)}>Edit</p>
              <p onClick={()=>removeProduct(item._id)} className='justify-self-center cursor-pointer bg-red-500 h-7 w-7 text-white rounded text-lg md:text-center flex items-center justify-center'>X</p>

          </div>

        ))
      }
      </div>
      
    </>
  )
}

export default List
