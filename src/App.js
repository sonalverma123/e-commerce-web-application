import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import Registration from './components/Registration';
import Login from './components/Login';
import Checkout from './components/Checkout';
import Detail from './components/Detail';
import MenCategory from './components/MenCategory';
import WomenCategory from './components/WomenCategory';
import { CartProvider } from './components/useCart';
import Profile from './components/Profile';
import Bags from './components/Bags';
import Appliances from './components/Appliances';
import ItemAdd from './components/ItemAdd';
import Cart from './components/Cart';
import Shoes from './components/Shoes';
import Nav from './components/Nav';
import Contact from './components/Contact';

function App() {
  const [cartData, setCartData] = useState([]);

  return (
    <CartProvider>
      <>
        <Router>

          <Routes>
            <Route exact path="/navbar" element={<Navbar />} />
          </Routes>

          <Routes>
            <Route exact path="/contact" element={<Contact />} />
          </Routes>

          <Routes>
            <Route exact path="/topbar" element={<Topbar />} />
          </Routes>

          <Routes>
            <Route exact path="/ItemAdd" element={<ItemAdd />} />
          </Routes>

          <Routes>
            <Route exact path="/nav" element={<Nav />} />
          </Routes>

          <Routes>
            <Route exact path="/footer" element={<Footer />} />
          </Routes>

          <Routes>
            <Route exact path="/cart" element={<Cart setCartData={setCartData} />} />
          </Routes>

          <Routes>
            <Route exact path="/register" element={<Registration />} />
          </Routes>

          <Routes>
            <Route exact path="/login" element={<Login />} />
          </Routes>

          <Routes>
            <Route exact path="/checkout" element={<Checkout cartData={cartData} />} />
          </Routes>

          <Routes>
            <Route ProtectedRoute path="/profile" element={<Profile />} />
          </Routes>

          <Routes>
            <Route exact path="/mencategory" element={<MenCategory />} />
          </Routes>

          <Routes>
            <Route exact path="/womencategory" element={<WomenCategory />} />
          </Routes>

          <Routes>
            <Route exact path="/shoecategory" element={<Shoes />} />
          </Routes>

          <Routes>
            <Route exact path="/bagscategory" element={<Bags />} />
          </Routes>

          <Routes>
            <Route exact path="/appliances" element={<Appliances />} />
          </Routes>

          <Routes>
            <Route exact path="/detail/:category/:_id" element={<Detail />} />
          </Routes>

        </Router>
      </>
    </CartProvider>

  );
}
export default App;

