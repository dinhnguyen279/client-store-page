import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../Redux/Action/ActionCart';
import { addSession } from '../../Redux/Action/ActionSession';

import { Link } from 'react-router-dom';
import LogoutLink from '../../Authentication/LogoutLink';
import Name from '../../Authentication/Name';
import { AiOutlineSearch, AiOutlineOrderedList, AiOutlineShoppingCart, AiOutlineCaretRight } from "react-icons/ai"
import { FaAngleRight } from "react-icons/fa"
// React-Bootstrap
import { Col, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';

function Header(props) {
    // const [active, setActive] = useState('Home')
    const dispatch = useDispatch()

    //Sau khi F5 nó sẽ kiểm tra nếu phiên làm việc của Session vẫn còn thì nó sẽ tiếp tục
    // đưa dữ liệu vào Redux
    if (sessionStorage.getItem('id_user')) {
        const action = addSession(sessionStorage.getItem('id_user'))
        dispatch(action)
    } else {
        //Đưa idTemp vào Redux temp để tạm lưu trữ
        sessionStorage.setItem('id_temp', 'abc999')
        const action = addUser(sessionStorage.getItem('id_temp'))
        dispatch(action)
    }

    //Get IdUser từ redux khi user đã đăng nhập
    var idUser = useSelector(state => state.Session.idUser)
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

    return (

        <>
            <Navbar bg="light" expand={"md"} className="pt-3 bg-body" style={{ zIndex: 10 }} fixed='top'>
                <Container>
                    <Link to={"/"} className='logo-navbar'>
                        <h4>Sports Zone</h4>
                    </Link>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-md`}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title >
                                Sports Zone
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className=''>
                            <Form className="input-search-type d-flex justify-content-center align-item-center position-relative" as={Col}>
                                <input
                                    type="search"
                                    placeholder="Search Products"
                                    className="input-search"
                                    aria-label="Search"
                                />
                                <span className='search-button'>Search</span>
                                {/* <span className='search-button search-icon'><AiOutlineSearch /></span> */}
                            </Form>

                            <Nav className="justify-content-end">
                                <ul className='nav-list-respon'>
                                    {nameUser && <li className="nav-item position-relative">
                                        <Link className="nav-link quantity-cart" to={`/cart`} data-order="20">
                                            <AiOutlineShoppingCart className='text-xl  mr-1 pb-1 text-gray' />
                                        </Link>
                                    </li>}
                                    {nameUser ? (<Name />) : ' '}
                                    {loginUser ? ' ' : (<LogoutLink />)}
                                </ul>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>

            </Navbar>
            <Navbar bg="light" className='mb-3 m-t-70 shadow-lg' expand={"md"} fixed='top' style={{ zIndex: 2 }}>
                <Container >
                    <Navbar.Toggle aria-controls={`list-categories`} className="bg-dark text-light" >
                        <div className="d-flex flex-col">
                            <AiOutlineOrderedList className='mr-1' />Danh sách các loại sản phẩm
                        </div>
                    </Navbar.Toggle>
                    <Navbar.Offcanvas
                        id={`list-categories`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title >
                                Sports Zone
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ul className="navbar-nav nav-link-page" >
                                <li className="nav-item" >
                                    <Link className="nav-link" to={`/`}
                                    >Trang Chủ</Link>
                                </li>
                                <li className="nav-item">
                                    <Nav>
                                        <NavDropdown
                                            id="nav-dropdown-dark-example"
                                            title="Sản Phẩm SALE"
                                        >
                                            <NavDropdown.Item href="trang-nay-chua-co-nha">
                                                Quần áo sale <FaAngleRight />
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="trang-nay-chua-co-nha">
                                                Giày bóng đá sale <FaAngleRight />
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>

                                </li>
                                <li className="nav-item" >
                                    <Nav>
                                        <NavDropdown
                                            id="nav-dropdown-dark-example"
                                            title="Bóng Đá"
                                        >
                                            <NavDropdown.Item href="trang-nay-chua-co-nha">
                                                Giày đá bóng <FaAngleRight />
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="trang-nay-chua-co-nha">
                                                Quần áo bóng đá <FaAngleRight />
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="trang-nay-chua-co-nha">
                                                Phụ kiện bóng đá <FaAngleRight />
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </li>
                                <li className="nav-item" >
                                    <Link className="nav-link" to={`/shop`}>
                                        Giày Sneaker
                                    </Link>
                                </li>
                                <li className="nav-item" >
                                    <Link className="nav-link" to={`/shop`}>
                                        Adidas Chính hãng
                                    </Link>
                                </li>
                                <li className="nav-item" >
                                    <Nav>
                                        <NavDropdown
                                            id="nav-dropdown-dark-example"
                                            title="Quần Áo Bóng Đá"
                                        >
                                            <NavDropdown.Item href="trang-nay-chua-co-nha">
                                                Áo Bóng Đá BulBal <FaAngleRight />
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="trang-nay-chua-co-nha">
                                                Áo Bóng Đá Trẻ Em <FaAngleRight />
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="trang-nay-chua-co-nha">
                                                Quần Áo Đá Bóng Chính Hãng <FaAngleRight />
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </li>
                                <li className="nav-item" >
                                    <Link className="nav-link" to={`/contact`}
                                    >Liên Hệ</Link>
                                </li>
                            </ul>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>

    );
}

export default Header;
