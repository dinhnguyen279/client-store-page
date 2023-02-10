import React, { useEffect, useState } from 'react';
import queryString from 'query-string'
import CartAPI from '../API/CartAPI';
import CheckoutAPI from '../API/CheckoutAPI';
import './Checkout.css'

import io from "socket.io-client";
const socket = io("http://localhost:3003");

function Checkout(props) {

    const [carts, setCarts] = useState([])

    const [total, setTotal] = useState(0)

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const [errors, setErrors] = useState(false)

    const [success, setSuccess] = useState(false)

    const [load, setLoad] = useState(false)


    //Hàm này dùng để gọi API và render số sản phẩm
    useEffect(() => {

        if (sessionStorage.getItem('id_user')) {

            const fetchData = async () => {

                const params = {
                    idUser: sessionStorage.getItem('id_user')
                }

                const query = '?' + queryString.stringify(params)

                const response = await CartAPI.getCarts(query)

                console.log(response)

                setCarts(response)

                getTotal(response)

                if (response.length === 0) {
                    window.location.replace("/cart");
                }

            }

            fetchData()

        }

    }, [])

    //Hàm này dùng để tính tổng tiền carts
    function getTotal(carts) {
        let sub_total = 0

        const sum_total = carts.map(value => {
            return sub_total += parseInt(value.priceProduct) * parseInt(value.count)
        })

        // setTotal(sub_total)
        setTotal(sum_total)
    }

    const validateEmail = (email) => {
        const validEmail = /\S+@\S+\.\S+/;
        return validEmail.test(String(email).toLowerCase())
    }

    const validatePhoneNumber = (phone) => {
        const validPhone = /^\d{10}$/;
        return validPhone.test(phone)
    }
    //Check Validation
    const handlerSubmit = (e) => {
        e.preventDefault();

        let isValid = true;
        const error = {};

        if (!fullName) {
            isValid = false;
            error.fullName = "Họ và Tên không được bỏ trống!"
        }

        if (!email) {
            isValid = false;
            error.email = "Email không tồn tại!"
        } else if (!validateEmail(email)) {
            isValid = false;
            error.email = "Email không hợp lệ!"
        }

        if (!phone) {
            isValid = false;
            error.phone = "Số điện thoại không được để trống!"
        } else if (!validatePhoneNumber(phone)) {
            isValid = false;
            error.phone = "Số điện thoại không hợp lệ!"
        }

        if (!address) {
            isValid = false;
            error.address = "Địa chỉ không được bỏ trống!"
        } else {
            console.log("Thanh Cong")
            setLoad(!load)
        }

        setErrors(error)
        return isValid

    }

    //Hàm này bắt đầu gửi Email xác nhận đơn hàng
    useEffect(() => {

        if (load) {

            const sendMail = async () => {

                const params = {
                    to: email,
                    fullname: fullName,
                    phone: phone,
                    address: address,
                    idUser: sessionStorage.getItem('id_user')
                }

                const query = '?' + queryString.stringify(params)

                const response = await CheckoutAPI.postEmail(query)

                console.log(response)

            }

            sendMail()

            const data = sessionStorage.getItem('id_user')

            // Gửi socket lên server
            socket.emit('send_order', data)

            //Dùng setTimeout delay 3s
            //Sau 4s nó sẽ thực hiện 
            setTimeout(() => {
                setSuccess(!success)
                setLoad(!load)
            }, 4000);

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [load])

    const onChangeName = (e) => {
        setFullName(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const onChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    return (
        <div>
            {
                load && (
                    <div className="wrapper_loader">
                        <div className="loader"></div>
                    </div>
                )
            }

            <div className="container">
                <section className="py-5 bg-light">
                    <div className="container">
                        <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                            <div className="col-lg-6">
                                <h1 className="h2 text-uppercase mb-0">Thanh toán</h1>
                            </div>
                            <div className="col-lg-6 text-lg-right">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                                        <li className="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
                                        <li className="breadcrumb-item"><a href="cart.html">Giỏ hàng</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Thanh toán</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>

                {!success && (<section className="py-5">
                    <h2 className="h5 text-uppercase mb-4">Chi tiết thanh toán</h2>
                    <div className="row">
                        <div className="col-lg-8">
                            <form>
                                <div className="row">
                                    <div className="col-lg-12 form-group">
                                        <label className="text-small text-uppercase" htmlFor="Fullname">Họ và Tên:</label>
                                        <input className="form-control form-control-lg" value={fullName} onChange={onChangeName} type="text" placeholder="Enter Your Full Name Here!" />

                                        {errors.fullName && <span className="text-danger">{errors.fullName}</span>}
                                    </div>

                                    <div className="col-lg-12 form-group">
                                        <label className="text-small text-uppercase" htmlFor="Email">Email: </label>
                                        <input className="form-control form-control-lg" value={email} onChange={onChangeEmail} type="text" placeholder="Enter Your Email Here!" />

                                        {errors.email && <span className="text-danger">{errors.email}</span>}
                                    </div>

                                    <div className="col-lg-12 form-group">
                                        <label className="text-small text-uppercase" htmlFor="Phone">Số Điện Thoại: </label>
                                        <input className="form-control form-control-lg" value={phone} onChange={onChangePhone} type="text" placeholder="Enter Your Phone Number Here!" />

                                        {errors.phone && <span className="text-danger">{errors.phone}</span>}
                                    </div>

                                    <div className="col-lg-12 form-group">
                                        <label className="text-small text-uppercase" htmlFor="Address">Địa Chỉ: </label>
                                        <input className="form-control form-control-lg" value={address} onChange={onChangeAddress} type="text" placeholder="Enter Your Address Here!" />

                                        {errors.address && <span className="text-danger">{errors.address}</span>}
                                    </div>

                                    <div className="col-lg-12 form-group">
                                        <button className="btn btn-dark" style={{ color: 'white' }} type="submit" onClick={handlerSubmit}>Đặt hàng</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4">
                            <div className="card border-0 rounded-0 p-lg-4 bg-light">
                                <div className="card-body">
                                    <h5 className="text-uppercase mb-4">Đơn hàng của bạn</h5>
                                    <ul className="list-unstyled mb-0">
                                        {
                                            carts && carts.map(value => (
                                                <div key={value._id}>
                                                    <li className="d-flex align-items-center justify-content-between">
                                                        <strong className="small font-weight-bold">{value.nameProduct}</strong>
                                                        <span className="text-muted small">${value.priceProduct} x {value.count}</span>
                                                    </li>
                                                    <li className="border-bottom my-2"></li>
                                                </div>
                                            ))
                                        }
                                        <li className="d-flex align-items-center justify-content-between">
                                            <strong className="text-uppercase small font-weight-bold">Tổng cộng</strong>
                                            <span>${total}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>)}

                {success && (<section className="py-5">
                    <div className="p-5">
                        <h1>Bạn đã đặt hàng thành công!</h1>
                        <p style={{ fontSize: '1.2rem' }}>Vui lòng check mail.</p>
                    </div>
                </section>)}
            </div>
        </div>
    );
}

export default Checkout;