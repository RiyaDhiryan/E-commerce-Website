import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Product from './Pages/Product'
import Contact from './Pages/Contact'
import Collection from './Pages/Collection'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import PlaceOrder from './Pages/PlaceOrder'
import Orders from './Pages/Orders'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import SearchBar from './Components/SearchBar'
 import { ToastContainer, toast } from 'react-toastify';
 import Verify from './Pages/Verify'
const App = () => {
  return (
    <div className='sm-[5vw] md-[7vw] lg-[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
         <Route path='/products/:productId' element={<Product/>}/>
          <Route path='/contact' element={<Contact/>}/>
           <Route path='/collection' element={<Collection/>}/>
            <Route path='/cart' element={<Cart/>}/>
             <Route path='/login' element={<Login/>}/>
              <Route path='/place-order' element={<PlaceOrder/>}/>
               <Route path='/orders' element={<Orders/>}/>
               <Route path='/verify' element={<Verify/>} />
      </Routes>
            <Footer/>
    </div>
  )
}

export default App
