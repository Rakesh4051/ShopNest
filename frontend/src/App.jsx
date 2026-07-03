import React from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Disclaimer from './pages/Disclaimer';
import ReturnPolicy from './pages/ReturnPolicy';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Profile from './pages/Profile';
import AdminDashboard from './admin/AdminDashboard';
import AdminOrders from './admin/AdminOrders';
import AdminProducts from './admin/AdminProducts'
import AddProduct from './admin/AddProduct';
import AdminUsers from './admin/AdminUsers';
import EditProduct from './admin/EditProduct'


function App(){
  return (
    <Router>
      <Navbar/>
      <div className='main-content'>
        <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/about" element = {<About/>}/>
        <Route path="/return" element = {<ReturnPolicy/>}/>
        <Route path="/disclaimer" element = {<Disclaimer/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/register" element = {<Register/>}/>
        <Route path="/product/:id" element = {<ProductDetail/>}/>
        <Route path="/shop" element = {<Shop/>}/>
        <Route path="/cart" element = {<Cart/>}/>
        <Route path="/checkout" element = {<Checkout/>}/>
        <Route path="/orderSuccess" element = {<OrderSuccess/>}/>
        <Route path="/profile" element = {<Profile/>}/>
        <Route path="/admin" element = {<AdminDashboard/>}/>
        <Route path="/admin/add-product" element = {<AddProduct/>}/>
        <Route path="/admin/products" element = {<AdminProducts/>}/>
        <Route path="/admin/edit-product/:id" element = {<EditProduct/>}/>
        <Route path="/admin/orders" element = {<AdminOrders/>}/>
        <Route path="/admin/users" element = {<AdminUsers/>}/>
      </Routes>
      </div>
      <Footer/>
    </Router>
  )
}

export default App;

