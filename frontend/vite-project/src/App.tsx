import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact"
import Login from "./pages/Login";
import Register from "./pages/Register";

import Picoles from "./pages/products/Picoles";
import IceCakes from './pages/products/IceCakes';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/cart/Cart";
import DataUser from "./pages/cart/DataUser";
import Verification from "./pages/cart/Verification";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route path="/picoles" element={<Picoles/>} />
          <Route path="/icecakes" element={<IceCakes/>} />

          <Route path="/dashboard/*" element={<Dashboard/>} />

          <Route path="/cart" element={<Cart/>} />
          <Route path="/productdetails/:id" element={<ProductDetails/>} />
          <Route path="/datauser" element={<DataUser/>} />
          <Route path="/verification" element={<Verification/>} />


        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
