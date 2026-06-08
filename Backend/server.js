import express from 'express';

import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js'
import cartRouter  from './routes/cartRoute.js'
import orderRouter from './routes/orderRoutes.js'
// APP config
const app = express();
const port = process.env.PORT || 5000
connectDB();
connectCloudinary();

// middleware
 app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World");
})
// api endpoints
app.use("/api/user",userRouter);
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})