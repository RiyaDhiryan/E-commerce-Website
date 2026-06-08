import React, { useContext } from 'react'
import {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../Context/ShopContext'
const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext)
  
     const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1 text-lg font-medium ${
      isActive ? 'text-blue-500' : 'text-gray-900 hover:text-blue-500'
    }`

    const logout = ()=>{
      navigate('/login')
      localStorage.removeItem('token')
      setToken('')
      setCartItems({})
      
    }
  return (
    <div>
    <div className='flex justify-between items-center  py-4 px-5 sm:px-15 '>
       <Link to='/' > <img src={assets.logo} alt='logo' className='h-25 w-40 relative sm:ml-30  md:ml-2 lg:ml-40 md:w-30 md:h-20 lg:h-25 lg:w-50'/></Link>
        <div className='hidden sm:flex gap-5 text-sm md:text-xs lg:text-sm'>
      <NavLink  to ='/' className={navLinkClass}>
      <p>HOME</p>
      </NavLink>
       <NavLink  to ='/collection' className={navLinkClass}>
      <p>COLLECTION</p>
      </NavLink>
       <NavLink  to ='/about' className={navLinkClass}>
      <p>ABOUT</p>
      </NavLink>
       <NavLink  to ='/contact' className={navLinkClass}>
      <p>CONTACT</p>
      </NavLink>
      </div>
       <div className='flex flex-row sm:flex items-center gap-6 sm:ml-20 md:ml-2 lg:ml-20'>
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt='search' className='w-5 cursor-pointer'/>
        <div className='group relative'>
           <img onClick={()=>token ? null : navigate('/login')} src={assets.profile_icon} alt='profile' className='w-5 cursor-pointer'/>
         {/*  -------------- DropDown Menu --------------- */}
         {
          token && 
          <div  className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className=' flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                     <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                     <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                </div>  
            </div>     
         }
           
        </div>
         <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} alt='cart' className='w-5 cursor-pointer'/>
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
              
       </div>
       <div>  
        <img  onClick={()=>setVisible(true)} src={assets.menu_icon} alt='menu' className='w-5 cursor-pointer sm:hidden relative' />
       {/* Sidebar menu for small screens */}
       <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible?'w-full':'w-0'}`}>
              <div  className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                <img src={assets.dropdown_icon} alt='menu' className='h-4 rotate-180'/>
                <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-1 font-bold' to='/' ><p>HOME</p></NavLink> 
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-1 font-bold' to='/collection' >COLLECTION</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-1 font-bold' to='/about' >ABOUT</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-1 font-bold' to='/contact' >CONTACT</NavLink>
                {token ?
                 <>
                   <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-1 font-bold'to='/orders' ><p>Orders</p></NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-1 font-bold' onClick={logout} to='/login' ><p>Logout</p></NavLink>
                 </>:
                 <>
                 <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-1 font-bold'to='/login'><p>Login</p></NavLink>
                 </>}

                </div></div>
       </div>
       
    </div>
    </div>
  )
}

export default Navbar
