import jwt from 'jsonwebtoken'

const authUser = (req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        res.status(400).json({success:false,message:'Not Authorized Login Again'})
    }
    try {
       const token_decode = jwt.verify(token,process.env.JWT_SECRET)
    req.body.userId = token_decode.id
    next()
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
    
}
export default authUser;
