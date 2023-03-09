import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { addSession } from '../Redux/Action/ActionSession';
import './Auth.css'
import queryString from 'query-string'
import CartAPI from '../API/CartAPI';
import axios from 'axios';
import UserAPI from '../API/UserAPI';
import { AiOutlineMail, AiOutlineLock, AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import axiosClient from '../API/axiosClient';
import alertify from 'alertifyjs';

function SignIn(props) {
    //test new validate

    const [errors, setErrors] = useState({})

    //listCart được lấy từ redux
    // const listCart = useSelector(state => state.Cart.listCart)

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    // Show/hide password
    const [typePassWord, setTypePassWord] = useState("password")

    // const [redirect, setRedirect] = useState(false)

    // push cart lên db
    // const [checkPush, setCheckPush] = useState(false)

    const SIGNIN_URL = "/login"

    const onChangeEmail = (e) => {
        setUser({ ...user, email: e.target.value })
    }

    const onChangePassword = (e) => {
        setUser({ ...user, password: e.target.value })
    }

    //test new validate
    const validateEmail = (email) => {
        const validEmail = /\S+@\S+\.\S+/;
        return validEmail.test(String(email).toLowerCase())
    }

    const validateFormSignin = () => {
        let isValid = true;
        const error = {};

        if (!user.email) {
            isValid = false;
            error.email = "Email không được để trống!"
        } else if (!validateEmail(user.email)) {
            isValid = false;
            error.email = "Email không hợp lệ!"
        }

        if (!user.password) {
            isValid = false;
            error.password = "Mật khẩu không được để trống!"
        }

        setErrors(error)
        return isValid

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (validateFormSignin()) {
            await axiosClient.post(SIGNIN_URL, user)
                .then((res) => {
                    setUser(res.data)
                    if (res.data !== null && typeof res.data === "object") {
                        alertify.set("notifier", "position", "bottom-left");
                        alertify.success("Bạn Đã Đăng Nhập Thành Công!");
                        setTimeout(() => {
                            window.location.href = "/"
                        }, 1000)
                    } else {
                        alertify.set("notifier", "position", "bottom-right");
                        alertify.error("Bạn Đã Đăng Nhập Thất Bại!");
                        setTimeout(() => {
                            window.location.href = "http://localhost:5173/signin"
                        }, 1000)
                    }
                })
                .catch((err) => {
                    console.log("error: ", err)
                }
                )
        }

    }
    sessionStorage.setItem('id_user', user._id)

    //Hàm này dùng để đưa hết tất cả carts vào API của user
    // useEffect(() => {
    //     const fetchData = async () => {
    //         //Lần đầu sẽ không thực hiện insert được vì addCart = ''
    //         if (checkPush === true) {

    //             for (let i = 0; i < listCart.length; i++) {

    //                 //Nó sẽ lấy idUser và idProduct và count cần thêm để gửi lên server
    //                 const params = {
    //                     idUser: sessionStorage.getItem('id_user'),
    //                     idProduct: listCart[i].idProduct,
    //                     count: listCart[i].count
    //                 }

    //                 const query = '?' + queryString.stringify(params)

    //                 const response = await CartAPI.postAddToCart(query)
    //                 console.log("fetchData cart", response)

    //             }

    //             setRedirect(true)
    //         }

    //     }

    //     fetchData()

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [checkPush])

    return (
        <form onSubmit={onSubmit} className="">
            <div className="limiter">
                <div className="container-login100 row m-t-100">
                    <div className='col-md-12 col-xl-4'>
                    </div>
                    <div className="wrap-login100 signInForm p-l-55 p-r-55 p-t-55 p-b-50 col-md-12 col-xl-8">
                        <span className="login100-form-title">
                            Đăng nhập
                        </span>
                        <div className="wrap-input100 validate-input" >
                            <AiOutlineMail className='icon-form' />
                            <input className="input100" type="text" placeholder="Email" value={user.email} onChange={onChangeEmail} />
                        </div>
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                        <div className="wrap-input100 validate-input">
                            <AiOutlineLock className='icon-form' />
                            <input className="input100" type={typePassWord} placeholder="Mật khẩu" value={user.password} onChange={onChangePassword} />
                            {typePassWord === "password" ? (
                                <button type='button' className='show-password' onClick={() => setTypePassWord("text")}>
                                    <AiFillEye />
                                </button >
                            ) : (
                                <button type='button' className='show-password' onClick={() => setTypePassWord("password")}>
                                    <AiFillEyeInvisible />
                                </button>)
                            }
                        </div>
                        {errors.password && <p className="text-danger">{errors.password}</p>}

                        <div className="container-login100-form-btn m-t-20">
                            <button className="login100-form-btn btn-form" type='submit'>
                                Đăng nhập
                            </button>
                        </div>

                        <div className="text-center p-t-45 p-b-4">
                            <span className="txt1">Tạo một tài khoản?</span>
                            &nbsp;
                            <Link to="/signup" className="txt2 hov1">
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </form >
    );
}

export default SignIn;