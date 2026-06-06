import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../Components/Title.jsx'
import ProductItem from '../Components/ProductItem.jsx'
const Collection = () => {
  const {products,search,showSearch} = useContext(ShopContext)
  const [showFilter,setShowFilter] = useState(false)
  const [filterProducts,setFilterProducts] = useState([])
  const [category,setCategory] = useState([])
  const [subCategory,setSubCategory] = useState([])
  const [sortType,setSortType] = useState('Relevent')

  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }
   const toggleSubCategory = (e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }
 const applyFilter =()=>{
  let productsCopy = products.slice();
  if(showSearch && search){
    productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
  }
  if(category.length>0){
    productsCopy = productsCopy.filter(item=>category.includes(item.category))
  }
  if(subCategory.length>0){
    productsCopy = productsCopy.filter(item=>subCategory.includes(item.subCategory))
  }
  setFilterProducts(productsCopy)
 }
 const sortProducts =()=>{
  let fpCopy = filterProducts.slice();
  switch(sortType){
    case 'low-high':
      setFilterProducts(fpCopy.sort((a,b)=>a.price-b.price))
      break;
    case 'high-low':
      setFilterProducts(fpCopy.sort((a,b)=>b.price-a.price))
      break;
      default:
        applyFilter();
        break;
  }
 }
  // useEffect(()=>{
  //     setFilterProducts(products)
  // },[])
  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch,products])
  useEffect(()=>{
    sortProducts();
  },[sortType])

  return (
    <div className='mx-10 sm:mx-40 flex flex-col sm:flex-row gap-1 sm:gap:10 pt-10'>
      {/* filter option / left side */}
      <div className='min-w-60' >
             <p  onClick={()=>setShowFilter(!showFilter)} className='cursor-pointer flex text-2xl sm:4xl mb-4 '>FILTERS
               <img className={`sm:hidden h-3 mt-2.5 ml-2 cursor-pointer ${showFilter?"rotate-90":""}`}src={assets.dropdown_icon} alt="menuIcon" />
             </p>
           
             {/* Category Filter */}
             <div className={`border border-gray-600 p-4 ${showFilter ? "" : 'hidden '} sm:block`}>
             <div>
              <p className='text-lg sm:text-lg mb-4'>CATEG0RIES</p>
              <div className='mb-1 flex flex-col gap-2 text-sm sm:text-base font-light text-gray-700'>
                <p className='flex gap-2 cursor-pointer'>
                  <input type='checkbox' value={'Women'} onChange={toggleCategory}/>Women
                </p>
              </div>
               <div className='mb-1 flex flex-col gap-2 text-sm sm:text-base font-light text-gray-700'>
                <p className='flex gap-2 cursor-pointer'>
                  <input type='checkbox'value={'Men'} onChange={toggleCategory} />Men
                </p>
              </div>
               <div className='flex flex-col gap-2 text-sm sm:text-base font-light text-gray-700'>
                <p className='flex gap-2 cursor-pointer'>
                  <input type='checkbox'value={'Kids'} onChange={toggleCategory}/>Kids
                </p>
              </div>
             </div></div>
             {/* Subcatogry */}
             <div className={`mt-5 border border-gray-600 p-4 ${showFilter ? "" : 'hidden' } sm:block`}>
             <p className='text-lg sm:text-lg mb-4'>TYPE</p>
             <div className='flex flex-col gap-2 text-sm sm:text-base font-light text-gray-700' >
              <p className='flex gap-2 mb-1 cursor-pointer'>
                <input type='checkbox' value={'Topwear'} onChange={toggleSubCategory}/>TopWear
              </p>
             </div>
                <div className='flex flex-col gap-2 text-sm sm:text-base font-light text-gray-700'>
              <p className='flex gap-2 mb-1 cursor-pointer'>
                <input type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory}/>BottomWear
              </p>
             </div>
                <div className='flex flex-col gap-2 text-sm sm:text-base font-light text-gray-700'>
              <p className='flex gap-2 cursor-pointer'>
                <input type='checkbox' value={'Winterwear'} onChange={toggleSubCategory}/>WinterWear
              </p>
             </div>
             </div>
      </div> 
      {/* Right Side */}
      <div className='sm:ml-20'>
        <div className='flex item'>
          <Title  text1={'ALL'} text2={'COLLECTION'} className='text-base flex items-center mb-8'/>
          {/* Product Sort */}
          <div className=' ml-auto flex justify-end'>
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300  text-sm h-8 sm:h-12 sm:py-1 sm:text-base '>
            <option value="Relevent">Sort by:Relevent</option>
            <option value="high-low">Sort by:High to Low</option>
            <option value="low-high">Sort by:Low to High</option>
          </select></div>
        </div>
        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mb-30'>
          {
            filterProducts.length > 0 ?
            (filterProducts.map((item,idx)=>(
            <ProductItem key={idx} id={item._id} image={item.image} price={item.price} name={item.name}   />)
            )): <div className='w-full h-1/2  flex justify-center ml-20 mt-20 mb-20 col-span-full text-center text-gray-500 text-3xl font-medium py-10'>
      No Products Found 🔍
    </div>
          }

        </div>
      </div>
    </div>
  )
}

export default Collection
