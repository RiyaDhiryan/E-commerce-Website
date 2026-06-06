import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

const ProductItem = ({id,image,price,name}) => {
    const {currency} = useContext(ShopContext)
  return (
    <div>
      <Link className='text-gray-800 cursor-pointer' to={`/products/${id}`} >
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt='productImg'/>
      </div>
        <p className='pt-3 pb-1 text-sm text-gray-600 font-medium'>{name}</p>
        <p className='text-m font-bold text-gray-700'>{currency}{price}</p>
      </Link>
    </div>
  )
}

export default ProductItem;
