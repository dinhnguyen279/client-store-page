import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../Redux/Action/ActionCart";
import { addSession } from "../../Redux/Action/ActionSession";

import { Link } from "react-router-dom";
import LogoutLink from "../../Authentication/LogoutLink";
import Name from "../../Authentication/Name";
import {
  AiOutlineSearch,
  AiOutlineOrderedList,
  AiOutlineShoppingCart,
  AiOutlineCaretRight,
  AiOutlineShopping,
} from "react-icons/ai";
import { FaAngleDown, FaAngleRight, FaThList } from "react-icons/fa";
// React-Bootstrap
import {
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import ProductAPI from "../../API/ProductAPI";
import Categories from "../../API/Categories";
import { HOST } from "../../domain/host/host";
import axios from "axios";
import axiosClient from "../../API/axiosClient";
import CartAPI from "../../API/CartAPI";
import queryString from "query-string";

function Header(props) {
  const countCart = props.countCart;
  // const [active, setActive] = useState('Home')
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);

  const [dataCategories, setDataCategories] = useState([]);

  // const [countCart, setCountCart] = useState(0)

  // var idUser = useSelector(state => state.Session.idUser)
  var idUser = sessionStorage.getItem("id_user");
  //Get idtemp từ redux khi user chưa đăng nhập
  // var idTemp = useSelector(state => state.Cart.id_user)

  const [loginUser, setLoginUser] = useState(false);
  const [nameUser, setNameUser] = useState(false);

  useEffect(() => {
    if (!idUser) {
      setLoginUser(false);
      setNameUser(false);
    } else {
      setLoginUser(true);
      setNameUser(true);
    }
  }, [idUser]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleOnBlur = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const fecthData = async () => {
      await Categories.getAllCategories()
        .then((res) => setDataCategories(res.data))
        .catch((err) => console.log(err));
    };
    fecthData();
  }, []);
  return (
    <>
      <Navbar
        bg="light"
        expand={"lg"}
        className="pt-3 bg-body"
        style={{ zIndex: 10 }}
        fixed="top"
      >
        <Container>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Link className="logo-navbar h4" to={"/"}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Sports Zone
          </Link>

          {/* Navbar.Offcanvas là dữ liệu được đưa vào responsive */}
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-lg`} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <Link className="logo-navbar h4" to={"/"}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Sports Zone
                </Link>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-block d-lg-flex  justify-content-between align-item-center">
              {/* Form search */}
              <Form
                className="input-search-type d-flex justify-content-between align-item-center"
                as={Col}
              >
                <input
                  type="search"
                  placeholder="Search Products"
                  className="input-search"
                  aria-label="Search"
                />
                <span className="search-button d-none d-lg-block">Search</span>
                <span className="search-button search-icon d-block d-lg-none">
                  <AiOutlineSearch />
                </span>
              </Form>

              {/* Giỏ hàng màn hình desktop */}
              <Nav className="justify-content-end">
                <ul className="nav-list-respon">
                  {nameUser && (
                    <li className="nav-item position-relative d-none d-lg-block">
                      <Link
                        className="nav-link quantity-cart"
                        to={`/cart`}
                        data-order={countCart}
                      >
                        <AiOutlineShoppingCart className="icon-cart" />
                      </Link>
                    </li>
                  )}
                  {nameUser ? <Name /> : " "}
                  {loginUser ? " " : <LogoutLink />}
                </ul>
              </Nav>
              {/* Giỏ hàng màn hình desktop */}

              <div className="under-navbar d-block d-lg-none">
                <Container className="d-block navbar-categories">
                  <div className="navbar-button mr-4">
                    <button
                      className="btn-open-categories"
                      onClick={handleOpen}
                      onBlur={handleOnBlur}
                      title="All Categories"
                    >
                      <span>
                        {" "}
                        <FaThList /> All Categories
                      </span>
                      <span>
                        <FaAngleDown />
                      </span>
                    </button>
                    {isOpen ? (
                      <ul className={`navbar-nav nav-link-page`}>
                        {dataCategories.map((val, idx) => {
                          return (
                            <li className="nav-item-list" key={idx + 1}>
                              <a href={`/shop/${val._id}`}>
                                {val.nameCate}{" "}
                                <FaAngleRight style={{ border: "none" }} />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="">
                    <ul className="navbar-nav nav-menu">
                      <Link className="nav-link" to={`/`}>
                        Trang Chủ
                      </Link>
                    </ul>
                  </div>

                  <div className="d-flex">
                    <ul className="navbar-nav nav-menu">
                      <Link className="nav-link" to={`/shop`}>
                        Cửa Hàng
                      </Link>
                    </ul>
                  </div>

                  <div className="d-flex">
                    <ul className="navbar-nav nav-menu">
                      <Link className="nav-link" to={`/contact`}>
                        Liên Hệ
                      </Link>
                    </ul>
                  </div>
                </Container>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          {/* Giỏ hàng màn hình điện thoại */}
          <div className="d-block d-lg-none">
            <li className="nav-item position-relative">
              <Link
                className="nav-link quantity-cart"
                to={`/cart`}
                data-order={countCart}
              >
                <AiOutlineShopping className="icon-cart" />
              </Link>
            </li>
          </div>
          {/* Giỏ hàng màn hình điện thoại */}
        </Container>
      </Navbar>

      {/* Navbar màn hình desktop */}
      <div className="under-navbar d-none d-lg-block">
        <Container className="d-flex navbar-categories">
          <div className="navbar-button mr-4">
            <button
              className="btn-open-categories"
              onClick={handleOpen}
              onBlur={handleOnBlur}
            >
              <span>
                {" "}
                <FaThList /> All Categories
              </span>
              <span>
                <FaAngleDown />
              </span>
            </button>
            {isOpen ? (
              <ul className={`navbar-nav nav-link-page`}>
                {dataCategories.map((val, idx) => {
                  return (
                    <li className="nav-item-list" key={idx + 1}>
                      <Link to={`/shop/category/${val.nameCate}`}>
                        {val.nameCate}{" "}
                        <FaAngleRight style={{ border: "none" }} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </div>
          <div className="">
            <ul className="navbar-nav nav-menu">
              <Link className="nav-link" to={`/`}>
                Trang Chủ
              </Link>
            </ul>
          </div>

          <div className="d-flex">
            <ul className="navbar-nav nav-menu">
              <Link className="nav-link" to={`/shop`}>
                Cửa Hàng
              </Link>
            </ul>
          </div>

          <div className="d-flex">
            <ul className="navbar-nav nav-menu">
              <Link className="nav-link" to={`/contact`}>
                Liên Hệ
              </Link>
            </ul>
          </div>
          <div className="d-flex">
            <ul className="navbar-nav nav-menu">
              <Link className="nav-link" to={`/cart`}>
                Giỏ Hàng
              </Link>
            </ul>
          </div>
        </Container>
      </div>
      {/* Navbar màn hình desktop */}
    </>
  );
}

export default Header;
