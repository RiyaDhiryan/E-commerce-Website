import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const {delivery_fee,currency,cartAmount,navigate} = useContext(ShopContext)
  return (
    <div className='w-full ml-4 mr-4'>
      <div>
          <Title text1={'CART'} text2={'TOTALS'}/>
      </div>
      <div className='flex flex-col gap-2 mt-5 text-sm sm:text-lg mr-4 sm:mr-40'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency}{cartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping fee</p>
            <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <b>Total</b>
            <b>{currency} {cartAmount() === 0 ? 0 : cartAmount() + delivery_fee}.00</b>
        </div>
      </div>
      <div>
</div>
    </div>
  )
}

export default CartTotal;
