import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Picoles from "./pages/products/Picoles";
import IceCakes from "./pages/products/IceCakes";
import Bebidas from "./pages/products/Bebidas";
import Paletas from "./pages/products/Paletas";
import Complementos from "./pages/products/Complementos";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/cart/Cart";
import DataUser from "./pages/cart/DataUser";
import Verification from "./pages/cart/Verification";

import Dashboard from "./pages/dashboard/Dashboard";
import PedidosEmAndamento from "./components/dashboard/PedidosRecebidos";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";
import SearchedItems from "./pages/SearchedItems";

import { useState } from "react";
import TrackOrder from "./pages/TrackOrder";

function App() {
  const [busca, setBusca] = useState("");
  console.log(busca)

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar busca={busca} setBusca={setBusca} />
        <Routes>
        <Route path="/" element={<Home/>}  />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/searchitems" element={<SearchedItems busca={busca} />} />


          <Route path="/picoles" element={<Picoles />} />
          <Route path="/icecakes" element={<IceCakes />} />
          <Route path="/bebidas" element={<Bebidas />} />
          <Route path="/paletasmexicanas" element={<Paletas />} />
          <Route path="/complementos" element={<Complementos />} />

          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/pedidosemandamento" element={<PedidosEmAndamento />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route path="/datauser" element={<DataUser />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/trackorder" element={<TrackOrder/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
