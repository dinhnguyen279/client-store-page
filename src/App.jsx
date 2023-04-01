import "./App.css";
import "./css/custom.css";
import "./css/style.default.css";
import "bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Share/Header/Header";
import Footer from "./Share/Footer/Footer";

import Home from "./Home/Home";
import Detail from "./Detail/Detail";
import Cart from "./Cart/Cart";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Checkout from "./Checkout/Checkout";
import Shop from "./Shop/Shop";
import Contact from "./Contact/Contact";
import UserProfile from "./Authentication/UserProfile";
import MainHistory from "./History/MainHistory";
import DetailHistory from "./History/DetailHistory";
import ErrorPage from "./Share/404/404";
import ScrollToTopButton from "./Share/ScrollTop/ScrollTopButton";
import React, { useEffect, useState } from "react";
import CartAPI from "./API/CartAPI";
import ShopFilterByCate from "./Shop/ShopFilterByCate"
import Favorites from "./Favorites/Favorites"
import Introduce from "./pageBranch/introduce/introduce";
import PrivacyPolicy from "./pageBranch/PrivacyPolicy/PrivacyPolicy";
import ReturnPolicy from "./pageBranch/returnPolicy/ReturnPolicy";
import TermsOfService from "./pageBranch/termsOfService/termsOfService";
import axios from "axios";
import FavoriteAPI from "./API/Favorites";
function App() {
  const [countCart, setCountCart] = useState(0)
  const [countWishlist, setCountWishlist] = useState(0)
  let idUser = ""
  if (sessionStorage.getItem("id_user")) {
    const id_user = sessionStorage.getItem("id_user");
    idUser = id_user;

  }
  else if (localStorage.getItem("id_user_clientage")) {
    const id_user_clientage = localStorage.getItem("id_user_clientage")
    idUser = id_user_clientage;
  }

  const fecthCount = async () => {
    const getCount = (getCount) => {
      let count = getCount
      let totalCount = 0
      count.map((val) => {
        return (
          totalCount += val.quantity
        )
      })
      setCountCart(totalCount)
    }

    if (idUser) {
      await CartAPI.getCartById(`/${idUser}`)
        .then((res) => getCount(res.data))
        .catch(error => console.log(error))

      await FavoriteAPI.getFavoriteById(`/${idUser}`)
        .then(res => setCountWishlist(res.data))
        .catch(error => console.log(error))
    }
  }
  fecthCount()

  return (
    <div className="App">
      <BrowserRouter>
        <Header countCart={countCart} countWishlist={countWishlist.length} />
        <ScrollToTopButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail fecthCount={fecthCount} />} />
          <Route path="/cart" element={<Cart fecthCount={fecthCount} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shop/" element={<Shop />} />
          <Route path="/shop/category/:id" element={<ShopFilterByCate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/detail-user" element={<UserProfile />} />
          <Route path="/history" element={<MainHistory />} />
          <Route path='/history/:id' element={<DetailHistory />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/wishlist' element={<Favorites fecthCount={fecthCount} />} />
          <Route path='/gioi-thieu' element={<Introduce />} />
          <Route path='/chinh-sach-bao-mat' element={<PrivacyPolicy />} />
          <Route path='/chinh-sach-doi-tra' element={<ReturnPolicy />} />
          <Route path='/dieu-khoan-dich-vu' element={<TermsOfService />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
