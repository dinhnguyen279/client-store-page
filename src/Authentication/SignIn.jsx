import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Auth.css'
import queryString from 'query-string'
import CartAPI from '../API/CartAPI';
import axios from 'axios';
import UserAPI from '../API/UserAPI';
import { AiOutlineLock, AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai"
import axiosClient from '../API/axiosClient';
import alertify from 'alertifyjs';

function SignIn(props) {
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState({})
    const [dataLogin, setDataLogin] = useState({
        loginValue: "",
        loginType: "",
        password: ""
    })
    // Show/hide password
    const [typePassWord, setTypePassWord] = useState("password")

    // const [redirect, setRedirect] = useState(false)

    const SIGNIN_URL = "/login"

    const onChangeAccountName = (e) => {
        const { value } = e.target
        // isNaN là hàm kiểm tra giá trị nhập vào có phải là số hay không
        if (!isNaN(value)) {
            setDataLogin({ ...dataLogin, loginValue: value, loginType: "phone" })
        } else {
            setDataLogin({ ...dataLogin, loginValue: value, loginType: "email" })
        }
    }

    const onChangePassword = (e) => {
        setDataLogin({ ...dataLogin, password: e.target.value })
    }

    //validate
    const validateEmail = (email) => {
        const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
        return validEmail.test(String(email).toLowerCase())
    }

    const validatePhoneNumber = (phone) => {
        const validPhone = /^(\+84|0)\d{9,10}$/;
        return validPhone.test(phone);
    };

    const validateFormSignin = () => {
        let isValid = true;
        const error = {};

        if (dataLogin.loginType === "email") {
            if (!dataLogin.loginValue) {
                isValid = false;
                error.email = "Tên đăng không được để trống!"
            } else if (!validateEmail(dataLogin.loginValue)) {
                isValid = false;
                error.email = "Email không hợp lệ!"
            }
        }

        if (dataLogin.loginType === "phone") {
            if (!dataLogin.loginValue) {
                isValid = false;
                error.phone = "Tên đăng không được để trống!"
            }
            else if (!validatePhoneNumber(dataLogin.loginValue)) {
                isValid = false;
                error.phone = "Số điện thoại không hợp lệ!";
            }
        }

        if (!dataLogin.password) {
            isValid = false;
            error.password = "Mật khẩu không được để trống!"
        }

        setErrors(error)
        return isValid

    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (validateFormSignin()) {
            const data = {
                email: "",
                phone: "",
                password: dataLogin.password.toUpperCase()
            };

            if (dataLogin.loginType === "phone") {
                data.phone = dataLogin.loginValue;
            } else if (dataLogin.loginType === "email") {
                data.email = dataLogin.loginValue;
            }

            await axiosClient.post(SIGNIN_URL, data)
                .then((res) => {
                    if (res.data !== null && typeof res.data === "object") {
                        setUser(res.data)
                        console.log("res.data", res.data);
                        alertify.set("notifier", "position", "bottom-left");
                        alertify.success("Bạn Đã Đăng Nhập Thành Công!");
                        setTimeout(() => {
                            window.location.href = "/"
                        }, 1000)
                    } else {
                        alertify.set("notifier", "position", "bottom-right");
                        alertify.error("Bạn Đã Đăng Nhập Thất Bại!");
                    }
                })
                .catch((err) => {
                    console.log("error: ", err)
                }
                )
        }

    }
    if (user._id) {
        // Lưu id-user vào sessionStorage 
        const idUser = sessionStorage.setItem('id_user', user._id)
        return idUser;
    }

    return (
        <form onSubmit={onSubmit} className="">
            <div className="limiter">
                <div className="container-login100 main-login">
                    <div className='col-md-12 col-xl-4'>
                    </div>
                    <div className="wrap-login100 signInForm p-l-55 p-r-55 p-t-55 p-b-50 col-md-12 col-xl-8">
                        <span className="login100-form-title">
                            Đăng nhập
                        </span>
                        <div className="wrap-input100 validate-input" >
                            <AiOutlineUser className='icon-form' />
                            {/* <input className="input100" type="text" placeholder="Email hoặc Số Điện Thoại" value={dataLogin.email || dataLogin.password} onChange={onChangeAccountName} /> */}
                            <input className="input100" type="text" placeholder="Email hoặc Số Điện Thoại" value={dataLogin.email || dataLogin.phone} onChange={onChangeAccountName} />
                        </div>
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                        {errors.phone && <p className="text-danger">{errors.phone}</p>}
                        <div className="wrap-input100 validate-input">
                            <AiOutlineLock className='icon-form' />
                            <input className="input100" type={typePassWord} placeholder="Mật khẩu" value={dataLogin.password} onChange={onChangePassword} />
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

                        <div className="login-box">
                            {/* <div className="container-login100-form-btn m-t-20"> */}
                            {/* <button className="login100-form-btn btn-form" type='submit'> */}
                            <button className="" type='submit'>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
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