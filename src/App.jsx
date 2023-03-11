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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <ScrollToTopButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/detail-user" element={<UserProfile />} />
          <Route path="/history" element={<MainHistory />} />
          <Route path='/history/:id' element={<DetailHistory />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
