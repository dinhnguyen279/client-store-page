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
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState({})
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // Show/hide password
    const [typePassWord, setTypePassWord] = useState("password")

    // const [redirect, setRedirect] = useState(false)


    const SIGNIN_URL = "/login"

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    //validate
    const validateEmail = (email) => {
        const validEmail = /\S+@\S+\.\S+/;
        return validEmail.test(String(email).toLowerCase())
    }

    const validateFormSignin = () => {
        let isValid = true;
        const error = {};

        if (!email) {
            isValid = false;
            error.email = "Email không được để trống!"
        } else if (!validateEmail(email)) {
            isValid = false;
            error.email = "Email không hợp lệ!"
        }

        if (!password) {
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
                email: email,
                password: password
            }
            await axiosClient.post(SIGNIN_URL, data)
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
                <div className="container-login100 row m-t-100">
                    <div className='col-md-12 col-xl-4'>
                    </div>
                    <div className="wrap-login100 signInForm p-l-55 p-r-55 p-t-55 p-b-50 col-md-12 col-xl-8">
                        <span className="login100-form-title">
                            Đăng nhập
                        </span>
                        <div className="wrap-input100 validate-input" >
                            <AiOutlineMail className='icon-form' />
                            <input className="input100" type="text" placeholder="Email" value={email} onChange={onChangeEmail} />
                        </div>
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                        <div className="wrap-input100 validate-input">
                            <AiOutlineLock className='icon-form' />
                            <input className="input100" type={typePassWord} placeholder="Mật khẩu" value={password} onChange={onChangePassword} />
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