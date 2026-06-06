import { createContext ,useEffect,useState} from "react";
export const ShopContext = createContext()
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ShopContextProvider = (props)=>{
    const currency = '$'
    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search,setSearch] = useState('')
    const [showSearch,setShowSearch] = useState(false)
    const[cartItems,setCartItems] = useState({})
    const [products,setProducts] = useState([])
    const [token,setToken] = useState('')
     const navigate = useNavigate()
     
    const addToCart = async(itemId,size)=>{
      if(!token){
         toast.error('Please Login First!')
         navigate('/login')
      }
      if(!size && token){
         toast.error('Please select a size')
         return;
      }
          let cartData = structuredClone(cartItems);
          if(cartData[itemId]){
            if(cartData[itemId][size]){
              cartData[itemId][size] += 1;
            }
            else {
               cartData[itemId][size] = 1;
            }
          }else{
               cartData[itemId] = {};
               cartData[itemId][size] = 1;
            }
            setCartItems(cartData)
            if(token){
               try {
                  await axios.post(backendUrl + '/api/cart/add',
                     {itemId,size}
                     ,{headers:{token}}
                  )
               } catch (error) {
                  console.log(error);
                  toast.error(error.message)
               }
            }
    }


  const getCartCount = ()=>{
   let count = 0;
   for(let itemId in cartItems){
      for(let size in cartItems[itemId]){
         try{
            if(cartItems[itemId][size]>0){
               count+=cartItems[itemId][size]
            }  } catch(err){
               console.log(err)
            }
        
   }
  }
  return count;
}

   const updateQuantity= async(itemId,size,quantity)=>{
      let cartData = structuredClone(cartItems);
      cartData[itemId][size] = quantity;
      setCartItems(cartData)
      if(token){
         try {
            await axios.post(backendUrl + '/api/cart/update',
               {itemId,size,quantity},
               {headers:{token}}
            )

         } catch (error) {
              console.log(error);
                  toast.error(error.message)
               
         }
      }
   }

   const getUserCart = async(token)=>{
try {
   const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
   if(response.data.success){
      setCartItems(response.data.cartData)
   }
} catch (error) {
   console.log(error);
   toast.error(error.message)
   
   
}
   }

   const cartAmount = ()=>{
      let totalAmount = 0;
      for(let itemId in cartItems){
         let itemInfo = products.find((product)=> product._id === itemId)
         for(let size in cartItems[itemId]){
            try {
               if(cartItems[itemId][size]>0){
                  totalAmount += itemInfo.price * cartItems[itemId][size]
               }
            } catch (error) {
               console.log(error);
            }
         }
      }
      return totalAmount;
   }

//   --------------------Admin List se data aara-------------------

const getProductsData = async()=>{
   try {
      const response = await axios.get(backendUrl  + '/api/product/list')
      if(response.data.success){
         setProducts(response.data.products)
         toast.success(response.data.message)
      }else{
         toast.error(response.data.message)
      }
      
   } catch (error) {
      toast.error(error.message)
   }
}
useEffect(()=>{
   
   getProductsData()
},[])
useEffect(()=>{
   if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
   }
},[])
 const value ={
    products,currency,delivery_fee,
    search,setSearch,showSearch,setShowSearch,cartItems,setCartItems,addToCart,getCartCount,updateQuantity,cartAmount,
    navigate,backendUrl,token,setToken

 }
 return(
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
 )
}
export default ShopContextProvider;