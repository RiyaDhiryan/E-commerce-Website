import express from 'express'
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyStripe, verifyRazorpay} from '../controllers/orderController.js'
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();
router.post('/place',authUser,placeOrder)
router.post('/stripe',authUser,placeOrderStripe)
router.post('/razorpay',authUser,placeOrderRazorpay)
router.post('/userorders',authUser,userOrders)
router.post('/verifyStripe',authUser,verifyStripe)
router.post('/verifyRazorpay',authUser,verifyRazorpay)
// Admin 
router.post('/list',adminAuth,allOrders)
router.post('/status',adminAuth,updateStatus)

export default router;