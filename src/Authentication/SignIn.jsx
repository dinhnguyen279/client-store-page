import React, { useEffect, useState } from 'react';
import { Link, Navigate, parsePath } from 'react-router-dom';
import './Auth.css'
import { AiOutlineLock, AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai"
import axiosClient from '../API/axiosClient';
import alertify from 'alertifyjs';
import LoginWithFirebase from './components/LoginWithFirebase';
import FormForgotPassword from './components/ForgotPassword';
import firebase from "../service/firebaseConfig"


function SignIn(props) {
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState({})
    const [dataLogin, setDataLogin] = useState({
        loginValue: "",
        loginType: "",
        password: ""
    })
    const [formForgotPassword, setFormForgotPassword] = useState(false)
    // Show/hide password
    const [typePassWord, setTypePassWord] = useState("password");
    const [checked, setChecked] = useState(false)

    // Cấu hình lưu thông tin khách hàng đăng nhập bằng google và facebook
    useEffect(() => {
        // Check localStorage nếu có thông tin user thì gọi ra trước
        if (localStorage.getItem("accountName") && localStorage.getItem("password") && localStorage.getItem("loginType")) {
            const accountName = localStorage.getItem("accountName")
            const password = localStorage.getItem("password")
            const loginType = localStorage.getItem("loginType")
            setDataLogin({ ...dataLogin, loginValue: accountName, password: password, loginType: loginType })
            setChecked(true)
        }
        firebase.auth().onAuthStateChanged(result => {
            if (result) {
                const user = result.providerData
                sessionStorage.setItem("access_token", result.refreshToken)
                sessionStorage.setItem("fullname", user[0].displayName)
                sessionStorage.setItem("email", user[0].email)
                sessionStorage.setItem("avatar", user[0].photoURL)
                sessionStorage.setItem("id_user", user[0].uid)
            }
        })
    }, [])

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
                    if (res.data.status) {
                        setUser(res.data)
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
                    alertify.set("notifier", "position", "bottom-right");
                    alertify.error("Bạn Đã Đăng Nhập Thất Bại!");
                }
                )
        }

    }
    if (user._id) {
        // Lưu id-user vào sessionStorage 
        const idUser = sessionStorage.setItem('id_user', user._id)
        return idUser;
    }
    const showFormForgotPassword = () => {
        setFormForgotPassword(pre => !pre)
    }

    const handleRemember = (e) => {
        const { checked } = e.target
        if (checked) {
            setChecked(true)
            localStorage.setItem("accountName", dataLogin.loginValue)
            localStorage.setItem("password", dataLogin.password)
            localStorage.setItem("loginType", dataLogin.loginType)
        } else {
            setChecked(false)
            localStorage.removeItem("accountName")
            localStorage.removeItem("password")
            localStorage.removeItem("loginType")
        }
    }
    return (
        <>
            <div className="limiter">
                <div className="container-login100 main-login">
                    <div className='col-md-12 col-xl-4'>
                    </div>
                    <div className='wrap-login100 col-md-12 col-xl-8'>
                        <div className='form-signin'>
                            {
                                !formForgotPassword ? (
                                    <>
                                        <form onSubmit={onSubmit} >
                                            <div className="signInForm">
                                                <p className="login100-form-title">
                                                    Đăng nhập
                                                </p>
                                                <div className="wrap-input100 validate-input" >
                                                    <AiOutlineUser className='icon-form' />
                                                    <input className="input100" type="text" placeholder="Email hoặc Số Điện Thoại" value={dataLogin.loginValue} onChange={onChangeAccountName} />
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
                                                <div className='d-flex justify-content-between'>
                                                    <div className='input-remember'>
                                                        <input type="checkbox" className='mr-1' checked={checked} onChange={handleRemember} />
                                                        <label className='m-0'>Nhớ tài khoản</label>
                                                    </div>
                                                    <button type='button' className='forgot-password' onClick={showFormForgotPassword}>
                                                        Quên mật khẩu?
                                                    </button>
                                                </div>
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
                                                <p className='text-center'>
                                                    Hoặc
                                                </p>
                                            </div>
                                        </form>
                                        <div className='p-t-30'>
                                            <LoginWithFirebase />
                                            <div className="text-center p-t-30 p-b-4">
                                                <span className="txt1">Tạo một tài khoản?</span>
                                                &nbsp;
                                                <Link to="/signup" className="txt2 hov1">
                                                    Đăng ký
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                ) : <FormForgotPassword backFormLogin={setFormForgotPassword} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;