import "./css/custom.css";
import "./css/style.default.css";
import "bootstrap/dist/css/bootstrap.min.css"

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

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
import React, { useContext } from "react";
import Favorites from "./Favorites/Favorites"
import Introduce from "./pageBranch/introduce/introduce";
import PrivacyPolicy from "./pageBranch/PrivacyPolicy/PrivacyPolicy";
import ReturnPolicy from "./pageBranch/returnPolicy/ReturnPolicy";
import TermsOfService from "./pageBranch/termsOfService/termsOfService";
import axios from "axios";
import { v4 as uuid } from "uuid"
import { HOST } from "./domain/host/host";
import RootLayout from "./layouts/RootLayout";
import { CountContext } from "./Context/CountContext";

function App() {
  const URL_CreateFavorites = `${HOST}/favorite/send`
  const { setReloadCount } = useContext(CountContext)

  let idUser = ""
  if (sessionStorage.getItem("id_user")) {
    const id_user = sessionStorage.getItem("id_user");
    idUser = id_user;

  }
  else if (localStorage.getItem("id_user_clientage")) {
    const id_user_clientage = localStorage.getItem("id_user_clientage")
    idUser = id_user_clientage;
  }
  const addWishlist = async (idProduct, sizeProduct) => {
    let id_user_clientage = "";
    if (!idUser) {
      if (!localStorage.getItem("id_user_clientage")) {
        // Nếu id fake chưa có thì chúng ta tiến tạo hành một id mới
        var unique_id = uuid();
        var create_id_user_fake = unique_id.slice(0, 8)
        localStorage.setItem("id_user_clientage", create_id_user_fake)
      }
    }
    if (!sizeProduct) {
      alertify.error("Bạn phải chọn size!");
      return;
    }
    // idUser khách
    id_user_clientage = localStorage.getItem("id_user_clientage");


    const data = {
      idUser: idUser ? idUser : id_user_clientage,
      idProduct: idProduct,
      size: sizeProduct
    }
    await axios.post(URL_CreateFavorites, data)
      .then(res => {
        if (res.data !== "") {
          setReloadCount(false)
          return
        } else {
          alertify.set("notifier", "position", "bottom-right");
          alertify.error("Sản phẩm đã có trong danh sách");
          return
        }
      })
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home handleAddWishlist={addWishlist} />} />
        <Route path="/detail/:id" element={<Detail handleAddWishlist={addWishlist} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shop/:id" element={<Shop handleAddWishlist={addWishlist} />} />
        <Route path="/shop/:id" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail-user" element={<UserProfile />} />
        <Route path="/history" element={<MainHistory />} />
        <Route path='/history/:id' element={<DetailHistory />} />
        <Route path='/wishlist' element={<Favorites />} />
        <Route path='/gioi-thieu' element={<Introduce />} />
        <Route path='/chinh-sach-bao-mat' element={<PrivacyPolicy />} />
        <Route path='/chinh-sach-doi-tra' element={<ReturnPolicy />} />
        <Route path='/dieu-khoan-dich-vu' element={<TermsOfService />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  );
}

export default App;
