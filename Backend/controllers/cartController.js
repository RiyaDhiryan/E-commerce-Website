import userModel from "../models/userModel.js"



const addToCart = async(req,res)=>{
    try {
const {userId,itemId,size} = req.body
const userData = await userModel.findById(userId)
let cartData = await userData.cartData;
if(cartData[itemId]){
    if(cartData[itemId][size]){
        cartData[itemId][size] += 1
    }else{
        cartData[itemId][size] = 1
    }
}else{
cartData[itemId] ={}
cartData[itemId][size] = 1
}
await userModel.findByIdAndUpdate(userId,{cartData})
res.status(200).json({success:true,message:'Added to cart'})
} catch (error) {
    console.log(error);
    
    res.json({success:false,message:error.message})
}
}


const updateCart = async(req,res)=>{
    try {
          const {userId,itemId,quantity,size} = req.body
  const userData = await userModel.findById(userId)
  let cartData = await userData.cartData
  cartData[itemId][size] = quantity
  await userModel.findByIdAndUpdate(userId,{cartData})
  res.json({success:true,message:"Cart Updated"})
    } catch (error) {
        console.log(error);
        
          res.status(500).json({success:false,message:error.message})
    }

}


const getUserCart = async (req,res)=>{
   try {
    const {userId} = req.body
    let cartData ={}
    if(!userId){
     return res.json({success:true,cartData:{}})
    }
    const userData = await userModel.findById(userId)
      if(!userData){
         return res.json({
            success:true,
            cartData:{}
         })
      }
      res.json({
         success:true,
         cartData: await userData.cartData
      })
    // let cartData = await userData.cartData
    // res.json({success:true,cartData})
   } catch (error) {
    console.log(error);
    
        res.status(500).json({success:false,message:error.message})
   }
}
export {addToCart,updateCart,getUserCart}