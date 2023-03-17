import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../Redux/Action/ActionCart';
import { addSession } from '../../Redux/Action/ActionSession';

import { Link } from 'react-router-dom';
import LogoutLink from '../../Authentication/LogoutLink';
import Name from '../../Authentication/Name';
import { AiOutlineSearch, AiOutlineOrderedList, AiOutlineShoppingCart, AiOutlineCaretRight, AiOutlineShopping } from "react-icons/ai"
import { FaAngleDown, FaAngleRight, FaThList } from "react-icons/fa"
// React-Bootstrap
import { Col, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import ProductAPI from '../../API/ProductAPI';
import Categories from '../../API/Categories';
import { HOST } from '../../domain/host/host';
import axios from 'axios';
import axiosClient from '../../API/axiosClient';
import CartAPI from '../../API/CartAPI';
import queryString from 'query-string';

function Header(props) {
    // const [active, setActive] = useState('Home')
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)

    const [dataCategories, setDataCategories] = useState([])

    const [countCart, setCountCart] = useState(0)

    const URL_CART = `${HOST}/getCartById`

    //Sau khi F5 nó sẽ kiểm tra nếu phiên làm việc của Session vẫn còn thì nó sẽ tiếp tục
    // đưa dữ liệu vào Redux
    if (sessionStorage.getItem('id_user')) {
        // const action = addSession(sessionStorage.getItem('id_user'))
        // dispatch(action)
    } else {
        //Đưa idTemp vào Redux temp để tạm lưu trữ
        sessionStorage.setItem('fake_id_user', '012146547543135')
    }
    //Get IdUser từ redux khi user đã đăng nhập
    // var idUser = useSelector(state => state.Session.idUser)
    var idUser = sessionStorage.getItem('id_user')
    //Get idtemp từ redux khi user chưa đăng nhập
    var idTemp = useSelector(state => state.Cart.id_user)

    const [loginUser, setLoginUser] = useState(false)
    const [nameUser, setNameUser] = useState(false)

    useEffect(() => {
        if (!idUser) {
            setLoginUser(false)
            setNameUser(false)
        } else {
            setLoginUser(true)
            setNameUser(true)
        }
    }, [idUser])

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleOnBlur = () => {
        setIsOpen(false)
    }
    useEffect(() => {
        const fecthData = async () => {
            await Categories.getAllCategories()
                .then((res) => setDataCategories(res.data))
                .catch(err => console.log(err))

            if (idUser) {
                await CartAPI.getCartById(`/${idUser}`)
                    .then((res) => getCount(res.data))
                    .catch(error => console.log(error))
            }
        }
        fecthData()
    }, [])
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

    return (

        <>
            <Navbar bg="light" expand={"lg"} className="pt-3 bg-body" style={{ zIndex: 10 }} fixed='top'>
                <Container>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Link className='logo-navbar h4' to={"/"} >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Sports Zone
                    </Link>
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-lg`}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>
                                Sports Zone
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className='d-block d-lg-flex  justify-content-between align-item-center'>
                            <Form className="input-search-type d-flex justify-content-between align-item-center" as={Col}>
                                <input
                                    type="search"
                                    placeholder="Search Products"
                                    className="input-search"
                                    aria-label="Search"
                                />
                                <span className='search-button d-none d-lg-block'>Search</span>
                                <span className='search-button search-icon d-block d-lg-none'><AiOutlineSearch /></span>
                            </Form>

                            <Nav className="justify-content-end">
                                <ul className='nav-list-respon'>
                                    {nameUser && <li className="nav-item position-relative d-none d-lg-block">
                                        <Link className="nav-link quantity-cart" to={`/cart`} data-order={countCart}>
                                            <AiOutlineShoppingCart className='icon-cart' />
                                        </Link>
                                    </li>}
                                    {nameUser ? (<Name />) : ' '}
                                    {loginUser ? ' ' : (<LogoutLink />)}
                                </ul>
                            </Nav>
                            <div className='under-navbar d-block d-lg-none'>
                                <Container className='d-block navbar-categories'>
                                    <div className="navbar-button mr-4">
                                        <button className='btn-open-categories' onClick={handleOpen} onBlur={handleOnBlur} title='All Categories'>
                                            <span > <FaThList /> All Categories</span>
                                            <span><FaAngleDown /></span>
                                        </button>
                                        {isOpen ? (
                                            <ul className={`navbar-nav nav-link-page`}>
                                                {
                                                    dataCategories.map((val, idx) => {
                                                        return (
                                                            <li className="nav-item-list" key={idx + 1}>
                                                                <a href={`/shop/${val._id}`}>
                                                                    {val.nameCate} <FaAngleRight style={{ border: "none" }} />
                                                                </a>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        ) : ""}
                                    </div>
                                    <div className=''>
                                        <ul className="navbar-nav nav-menu">
                                            <Link className="nav-link" to={`/`}>
                                                Trang Chủ
                                            </Link>
                                        </ul>
                                    </div>

                                    <div className='d-flex'>
                                        <ul className="navbar-nav nav-menu">
                                            <Link className="nav-link" to={`/shop`}>
                                                Cửa Hàng
                                            </Link>
                                        </ul>
                                    </div>

                                    <div className='d-flex'>
                                        <ul className="navbar-nav nav-menu">
                                            <Link className="nav-link" to={`/contact`}>
                                                Liên Hệ
                                            </Link>
                                        </ul>
                                    </div>
                                </Container>
                            </div >
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <div className='d-block d-lg-none'>
                        <li className="nav-item position-relative">
                            <Link className="nav-link quantity-cart" to={`/cart`} data-order={countCart}>
                                <AiOutlineShopping className='icon-cart' />
                            </Link>
                        </li>
                    </div>
                </Container>
            </Navbar>
            <div className='under-navbar d-none d-lg-block'>
                <Container className='d-flex navbar-categories'>
                    <div className="navbar-button mr-4">
                        <button className='btn-open-categories' onClick={handleOpen} onBlur={handleOnBlur}>
                            <span> <FaThList /> All Categories</span>
                            <span><FaAngleDown /></span>
                        </button>
                        {isOpen ? (
                            <ul className={`navbar-nav nav-link-page`}>
                                {
                                    dataCategories.map((val, idx) => {
                                        return (
                                            <li className="nav-item-list" key={idx + 1}>
                                                <a href={`/shop/${val._id}`}>
                                                    {val.nameCate} <FaAngleRight style={{ border: "none" }} />
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        ) : ""}
                    </div>
                    <div className=''>
                        <ul className="navbar-nav nav-menu">
                            <Link className="nav-link" to={`/`}>
                                Trang Chủ
                            </Link>
                        </ul>
                    </div>

                    <div className='d-flex'>
                        <ul className="navbar-nav nav-menu">
                            <Link className="nav-link" to={`/shop`}>
                                Cửa Hàng
                            </Link>
                        </ul>
                    </div>

                    <div className='d-flex'>
                        <ul className="navbar-nav nav-menu">
                            <Link className="nav-link" to={`/contact`}>
                                Liên Hệ
                            </Link>
                        </ul>
                    </div>
                </Container>
            </div >
        </>

    );
}

export default Header;
