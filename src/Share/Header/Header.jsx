import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../Redux/Action/ActionCart';
import { addSession } from '../../Redux/Action/ActionSession';

import { Link } from 'react-router-dom';
import LogoutLink from '../../Authentication/LogoutLink';
import Name from '../../Authentication/Name';
import { AiOutlineSearch } from "react-icons/ai"

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
                            <Form className="d-flex justify-content-center position-relative" as={Col}>
                                <Form.Control
                                    style={{ width: "80%" }}
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <span className='search-icon'><AiOutlineSearch /></span>
                            </Form>

                            <Nav className="justify-content-end">
                                <ul className='nav-list-respon'>
                                    {nameUser && <li className="nav-item">
                                        <Link className="nav-link" to={`/cart`} >
                                            <i className="fas fa-dolly-flatbed mr-1 text-gray"></i>Giỏ hàng
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
                    <Navbar.Toggle aria-controls={`list-categories`} >
                        <i className="fa fa-list-alt" aria-hidden="true"></i> Danh sách các loại sản phẩm
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
                                            <NavDropdown.Item href="#action/3.1">
                                                Quần áo sale
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">
                                                Giày bóng đá sale
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
                                            <NavDropdown.Item href="#action/3.1">Giày đá bóng</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">
                                                Quần áo bóng đá
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Phụ kiện bóng đá</NavDropdown.Item>
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
                                            <NavDropdown.Item href="#action/3.1">Áo Bóng Đá BulBal</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">
                                                Áo Bóng Đá Trẻ Em
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Quần Áo Đá Bóng Chính Hãng</NavDropdown.Item>
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
