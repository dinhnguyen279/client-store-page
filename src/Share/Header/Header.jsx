import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { Card, Col, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import ProductAPI from '../../API/ProductAPI';
import Categories from '../../API/Categories';
import { HOST } from '../../domain/host/host';
import axios from 'axios';
import axiosClient from '../../API/axiosClient';
import CartAPI from '../../API/CartAPI';
import queryString from 'query-string';

function Header(props) {
  // Hàm này lấy số lượng sản phẩm trong giỏ hàng
  const countCart = props.countCart
  // Api search
  const URL_SEARCH = `${HOST}/searchProducts`;

  const [valueSearch, setValueSearch] = useState('')
  const [searchProducts, setSearchProducts] = useState([])
  const delaySearchTextTimeOut = useRef(null)
  const [loginUser, setLoginUser] = useState(false)
  const [nameUser, setNameUser] = useState(false)
  const [close, setClose] = useState(false)
  const [closeFocusInput, setCloseFocusInput] = useState(true)

  const onChangeText = (e) => {
    const value = e.target.value
    setValueSearch(value)
    if (handleSearch) {
      //Nếu người dùng đang nhập thì mình clear cái giây đó
      if (delaySearchTextTimeOut.current) {
        clearTimeout(delaySearchTextTimeOut.current)
      }

      delaySearchTextTimeOut.current = setTimeout(() => {
        handleSearch(value)
      }, 500)
    }
    setClose(false)
  }

  const handleSearch = (value) => {
    const dataSearch = {
      value: value,
      fildter: "name"
    }
    const query = "?" + queryString.stringify(dataSearch)
    axios.get(`${URL_SEARCH}${query}`)
      .then((res) => {
        const data = res.data.splice(0, 6);
        setSearchProducts(data)
      })
      .catch((err) => console.log("err search", err))
  }

  const [isOpen, setIsOpen] = useState(false);

  const [dataCategories, setDataCategories] = useState([]);

  var idUser = sessionStorage.getItem("id_user");

  useEffect(() => {
    if (!idUser) {
      setLoginUser(false)
      setNameUser(false)
    } else {
      setLoginUser(true)
      setNameUser(true)
    }
  }, [idUser])

  const reloadPage = () => {
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }
  const onClickItem = () => {
    setClose(!close)
    setValueSearch("")
    reloadPage()
  }

  const handleCloseInput = () => {
    setTimeout(() => {
      setCloseFocusInput(false)
    }, 500)
  }

  const handleOpenInput = () => {
    setCloseFocusInput(true)
  }

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 500)
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
              <Form className="mb-2 input-search-type d-flex justify-content-between align-item-center" as={Col} onBlur={handleCloseInput} onClick={handleOpenInput}>
                <input
                  type="search"
                  placeholder="Tìm kiếm tên sản phẩm"
                  className="input-search"
                  aria-label="Search"
                  value={valueSearch}
                  onChange={onChangeText}
                />
                <span className='search-button d-none d-lg-block'>Search</span>
                <span className='search-button search-icon d-block d-lg-none'><AiOutlineSearch /></span>
                {/* Form Search */}
                {
                  // Đóng input khi người dùng click outside 
                  closeFocusInput && (
                    <div className={`product-search-main  ${valueSearch.length > 0 ? "product-search-main-block" : "product-search-main-none"} `}>
                      <div className={`product-search-submain`}>
                        {!close && (
                          searchProducts && searchProducts.map((val, idx) => {
                            return (
                              <div className='product-search' key={idx + 1}>
                                <div>
                                  <Link to={`/detail/${val._id}`} onClick={onClickItem} className='text-uppercase'>{val.name}</Link>
                                  <p>{val.promotionPrice ? parseInt(val.promotionPrice).toLocaleString() : parseInt(val.price).toLocaleString()}₫</p>
                                </div>
                                <Link onClick={onClickItem} to={`/detail/${val._id}`} className='image-search-product'>
                                  <Card.Img src={val.avt} />
                                </Link>
                              </div>
                            )
                          })
                        )
                        }
                        {
                          !close && (
                            searchProducts.length > 0 ? (
                              <div className="text-search-header" >
                                <Link onClick={onClickItem} to={"/shop"} >Xem Thêm...</Link>
                              </div>
                            ) : (
                              <div className='check-no-product'>
                                <p>Không có sản phẩm nào!</p>
                              </div>
                            )
                          )
                        }
                      </div>
                    </div>
                  )
                }
              </Form>

              {/* Giỏ hàng màn hình desktop */}
              <Nav className="justify-content-end">
                <ul className='nav-list-respon'>
                  <li className="nav-item position-relative d-none d-lg-block">
                    <Link className="nav-link quantity-cart" to={`/cart`} data-order={countCart}>
                      <AiOutlineShoppingCart className='icon-cart' />
                    </Link>
                  </li>
                  {nameUser ? (<Name handleReloadPage={reloadPage} />) : ' '}
                  {loginUser ? ' ' : (<LogoutLink reloadPage={reloadPage} />)}
                </ul>
              </Nav>
              {/* Giỏ hàng màn hình desktop */}

              <div className='under-navbar d-block d-lg-none' style={{ zIndex: 100 }}>
                <div className="navbar-button mr-4 navbar-categories">
                  <button className='btn-open-categories' onClick={handleOpen} onBlur={handleOnBlur} title='All Categories'>
                    <span> <FaThList /> Bộ Sưu Tập</span>
                    <span><FaAngleDown /></span>
                  </button>
                  {isOpen ? (
                    <ul className={`navbar-nav nav-link-page`}>
                      {
                        dataCategories.map((val, idx) => {
                          return (
                            <li className="nav-item-list" key={idx + 1}>
                              <a href={`/shop/category/${val.nameCate}`} onClick={reloadPage}>
                                {val.nameCate} <FaAngleRight style={{ border: "none" }} />
                              </a>
                            </li>
                          )
                        })
                      }
                    </ul>
                  ) : ""}
                </div>
                <ul className='nav-list-respon'>
                  <li className="navbar-nav nav-menu">
                    <Link className="nav-link" to={`/`} onClick={reloadPage}>
                      Trang Chủ
                    </Link>
                  </li>

                  <li className="navbar-nav nav-menu">
                    <Link className="nav-link" to={`/shop`} onClick={reloadPage}>
                      Cửa Hàng
                    </Link>
                  </li>

                  <li className="navbar-nav nav-menu">
                    <Link className="nav-link" to={`/contact`} onClick={reloadPage}>
                      Liên Hệ
                    </Link>
                  </li>

                  <li className="navbar-nav nav-menu">
                    <Link className="nav-link" to={`/cart`} onClick={reloadPage}>
                      Giỏ Hàng
                    </Link>
                  </li>
                </ul>
              </div >
            </Offcanvas.Body >
          </Navbar.Offcanvas >

          {/* Giỏ hàng màn hình điện thoại */}
          <div className='d-block d-lg-none' >
            <li className="nav-item position-relative">
              <Link className="nav-link quantity-cart" to={`/cart`} data-order={countCart}>
                <AiOutlineShopping className='icon-cart' />
              </Link>
            </li>
          </div >
          {/* Giỏ hàng màn hình điện thoại */}
        </Container >
      </Navbar >

      {/* Navbar màn hình desktop */}
      < div className="under-navbar d-none d-lg-block" >
        <Container className="d-flex navbar-categories">
          <div className="navbar-button mr-4">
            <button
              className="btn-open-categories"
              onClick={handleOpen}
              onBlur={handleOnBlur}
            >
              <span>
                <FaThList /> Bộ Sưu Tập
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
                      <a href={`/shop/category/${val.nameCate}`}>
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
          <div className="d-flex">
            <ul className="navbar-nav nav-menu">
              <Link className="nav-link" to={`/cart`}>
                Giỏ Hàng
              </Link>
            </ul>
          </div>
        </Container>
      </div >
      {/* Navbar màn hình desktop */}
    </>
  );
}

export default Header;
