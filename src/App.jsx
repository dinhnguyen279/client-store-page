import "./App.css";
import "./css/custom.css";
import "./css/style.default.css";
// import'./css/main.css'
import "bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Share/Header/Header";
// import Chat from "./Share/Chat/Chat";
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
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
        </Routes>
      </BrowserRouter>
      {/* <Chat /> */}
      <Footer />
    </div>
  );
}

export default App;
