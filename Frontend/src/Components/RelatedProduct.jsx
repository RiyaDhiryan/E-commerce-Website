import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProduct = ({category,subCategory}) => {
    const {products} = useContext(ShopContext)
    const [related,setRelated] = useState([])

    useEffect(()=>{
        if(products.length >0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=>category.toLowerCase()  === item.category.toLowerCase() ) 
             productsCopy = productsCopy.filter((item)=>subCategory.toLowerCase()  === item.subCategory.toLowerCase() ) 
             setRelated(productsCopy.slice(0,5));
             
        }
    },[products,category,subCategory])
  return (
    <div>
        <div className='text-center' >
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='ml-4 sm:ml-40 sm:mr-40 mr-4 mb-40 mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                related.map((item,idx)=>(
                    <ProductItem key={idx} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))
            }

        </div>
    </div>
  )
}

export default RelatedProduct
