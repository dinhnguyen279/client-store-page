/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, updateCart } from '../Redux/Action/ActionCart';
import ListCart from './Components/ListCart';

import alertify from 'alertifyjs'
import { Link, Navigate } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"


function Cart(props) {

    //id_user được lấy từ redux
    const id_user = useSelector(state => state.Cart.id_user)

    //listCart được lấy từ redux
    const listCart = useSelector(state => state.Cart.listCart)
    // const listCart = useSelector(state => state)

    const [cart, setCart] = useState([])

    const [total, setTotal] = useState()

    const dispatch = useDispatch()

    const [showProduct, setShowProduct] = useState('')

    //State dùng để Load dữ liệu từ Redux
    const [loadRedux, setLoadRedux] = useState({
        idProduct: '',
        count: ''
    })

    //State dùng để Load dữ liệu từ API
    const [loadAPI, setLoadAPI] = useState(false)

    const URL_CART = 'http://localhost:3003/carts'

    //Hàm này dùng để Load dữ liệu ở Redux
    //Khi người dùng chưa đăng nhập
    useEffect(() => {
        const fetchDataRedux = () => {
            if (!sessionStorage.getItem('id_user')) {
                setCart(listCart)
                getTotal(listCart)
                return;
            }
        }
        fetchDataRedux()
    }, [loadRedux])

    //Hàm này dùng để tính tổng tiền carts
    function getTotal(carts) {
        let total = carts.data
        let sub_total = 0

        total.map(value => {
            return sub_total += parseInt(value.priceProduct) * parseInt(value.count)
        })

        setTotal(sub_total)
    }

    //Hàm này dùng để load dữ liệu từ API
    //Khi người dùng đã đăng nhập
    useEffect(() => {

        const fetchData = async () => {

            if (sessionStorage.getItem('id_user')) {

                const params = {
                    idUser: sessionStorage.getItem('id_user')
                }

                const query = '?' + queryString.stringify(params)

                console.log(query)

                // const response = await CartAPI.getCarts(query)
                const response = await axios.get(`${URL_CART}${query}`)

                setCart(response)

                getTotal(response)

            }

        }

        fetchData()

        setLoadAPI(false)

    }, [loadAPI])


    //Hàm này dùng để truyền xuống cho component con xử và trả ngược dữ liệu lại component cha 
    const onDeleteCart = (getUser, getProduct) => {
        console.log("idUser: " + getUser + ", idProduct: " + getProduct)

        if (sessionStorage.getItem('id_user')) { // user đã đăng nhập

            //Sau khi nhận được dữ liệu ở component con truyền lên thì sẽ gọi API xử lý dữ liệu
            const fetchDelete = async () => {

                const params = {
                    idUser: getUser,
                    idProduct: getProduct
                }

                const query = '?' + queryString.stringify(params)

                // const response = await CartAPI.deleteToCart(query)
                const response = await axios.delete(`${URL_CART}/delete${query}`)
                console.log(response)

            }

            fetchDelete()

            //Sau đó thay đổi state loadAPI và load lại hàm useEffect
            setLoadAPI(true)

            alertify.set('notifier', 'position', 'bottom-left');
            alertify.error('Bạn Đã Xóa Hàng Thành Công!');

        } else { // user chưa đăng nhập

            //Nếu không có phiên làm việc của Session User thì mình sẽ xử lý với Redux
            const data = {
                idProduct: getProduct,
                idUser: getUser,
            }

            //Đưa dữ liệu vào Redux
            const action = deleteCart(data)
            dispatch(action)

            alertify.set('notifier', 'position', 'bottom-left');
            alertify.error('Bạn Đã Xóa Hàng Thành Công!');

            //set state loadRedux để nó load lại hàm useEffect để tiếp tục lấy dữ liệu từ redux
            setLoadRedux({
                idProduct: getProduct,
                count: ''
            })

        }

    }

    //Hàm này dùng để truyền xuống cho component con xử và trả ngược dữ liệu lại component cha 
    const onUpdateCount = (getUser, getProduct, getCount) => {
        console.log("Count: " + getCount + ", idUser: " + getUser + ", idProduct: " + getProduct)

        if (sessionStorage.getItem('id_user')) { // user đã đăng nhập

            //Sau khi nhận được dữ liệu ở component con truyền lên thì sẽ gọi API xử lý dữ liệu
            const fetchPut = async () => {

                const params = {
                    idUser: getUser,
                    idProduct: getProduct,
                    count: getCount
                }

                const query = '?' + queryString.stringify(params)

                // const response = await CartAPI.putToCart(query)
                const response = await axios.put(`${URL_CART}/update${query}`)
                console.log(response)

            }

            fetchPut()

            //Sau đó thay đổi state loadAPI và load lại hàm useEffect
            setLoadAPI(true)

            console.log("Ban Da Dang Nhap!")

            alertify.set('notifier', 'position', 'bottom-left');
            alertify.success('Bạn Đã Sửa Hàng Thành Công!');

        } else {

            //Nếu không có phiên làm việc của Session User thì mình sẽ xử lý với Redux
            const data = {
                idProduct: getProduct,
                idUser: getUser,
                count: getCount
            }

            //Đưa dữ liệu vào Redux
            const action = updateCart(data)
            dispatch(action)

            alertify.set('notifier', 'position', 'bottom-left');
            alertify.success('Bạn Đã Sửa Hàng Thành Công!');

            //set state loadRedux để nó load lại hàm useEffect để tiếp tục lấy dữ liệu từ redux
            setLoadRedux({
                idProduct: getProduct,
                count: getCount
            })
        }

    }

    //Hàm này dùng để redirect đến page checkout
    const [redirect, setRedirect] = useState(false)

    const onCheckout = () => {

        if (!sessionStorage.getItem('id_user')) {
            alertify.set('notifier', 'position', 'bottom-left');
            alertify.error('Vui Lòng Kiểm Tra Lại Đăng Nhập!');
            return
        }

        if (cart.length === 0) {
            alertify.set('notifier', 'position', 'bottom-left');
            alertify.error('Vui Lòng Kiểm Tra Lại Giỏ Hàng!');
            return
        }

        setRedirect(true)

    }
    console.log('list Cart', listCart);

    return (
        <div className="p-t-160">
            <section className="py-3 bg-light">
                <div className="container">
                    <ol className="breadcrumb justify-content-start">
                        <li className="breadcrumb-item"><Link to={"/"}>Trang chủ</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Giỏ hàng</li>
                    </ol>
                </div>
            </section>

            {/* {!listProducts === undefined ? (
                <section className='cart-empty'>
                    <p className='text-lg mb-3'>Giỏ hàng của bạn rỗng</p>
                    <Button variant='dark' type='button' href='/'>Tiếp tục mua hàng</Button>
                </section>
            ) : ( */}
            <section className="py-5 container">
                <h4 className="text-uppercase mb-4 text-center">Giỏ hàng của bạn</h4>
                <div className="row">
                    <div className="col-lg-8 mb-4 mb-lg-0">
                        <ListCart
                            listCart={cart}
                            onDeleteCart={onDeleteCart}
                            onUpdateCount={onUpdateCount} />

                        <div className="bg-light px-4 py-3 continue-shopping">
                            <div className="row align-items-center text-center">
                                <div className="col-md-6 mb-3 mb-md-0 text-md-left">
                                    <Link className="btn btn-link text-dark btn-sm" to={`/shop`}>
                                        <AiOutlineArrowLeft className='mr-2 text-lg' />Tiếp mua mua sắm
                                    </Link>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="col-lg-4">
                        <div className="card border-0 rounded-0 p-lg-4 bg-light">
                            <div className="card-body">
                                <h5 className="text-uppercase mb-4">Thông tin đơn hàng</h5>
                                <ul className="list-unstyled mb-0">
                                    <li className="d-flex align-items-center justify-content-between"><strong className="small font-weight-bold">Thành tiền</strong><span className="text-muted small">{total},000₫</span></li>
                                    <li className="border-bottom my-2"></li>
                                    <li className="d-flex align-items-center justify-content-between mb-4"><strong className="small font-weight-bold">Tổng tiền</strong><span>{total},000₫</span></li>
                                </ul>
                                <div>
                                    {
                                        redirect && <Navigate replace to="/checkout" />
                                    }
                                    <button type='button' className="btn btn-dark btn-xs text-uppercase w-100" onClick={onCheckout}>
                                        Tiến hành thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* )} */}
        </div>
    );
}

export default Cart;