import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Auth.css'
import { AiFillEye, AiFillEyeInvisible, AiOutlineLock, AiOutlineMail, AiOutlineUser, AiOutlinePhone } from "react-icons/ai"
import axiosClient from '../API/axiosClient';
import alertify from 'alertifyjs';
import LoginWithFirebase from './components/LoginWithFirebase';
SignUp.propTypes = {

};

function SignUp(props) {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')


    const [success, setSuccess] = useState(false)

    const [errors, setErrors] = useState({})
    // Show/hide password
    const [typePassWord, setTypePassWord] = useState("password")
    const REGISTER_URL = "/signup"

    const onChangeName = (e) => {
        setFullName(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value.replace(/\s/g, ""))
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value.replace(/\s/g, ""))
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value.replace(/\s/g, ""))
    }

    const validateEmail = (email) => {
        const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/
        return validEmail.test(String(email).toLowerCase())
    }

    const validatePhoneNumber = (phone) => {
        const validPhone = /^(\+84|0)\d{9,10}$/;
        return validPhone.test(phone)
    }

    const validatePassword = (password) => {
        const validPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;
        return validPassword.test(password)
    }

    const validateForm = () => {
        let isValid = true;
        const error = {};

        if (!fullName) {
            isValid = false;
            error.fullName = "Tên không được để trống!"
        }

        if (!email) {
            isValid = false;
            error.email = "Email không được để trống!"
        } else if (!validateEmail(email)) {
            isValid = false;
            error.email = "Địa chỉ email không hợp lệ!"
        }

        if (!password) {
            isValid = false;
            error.password = "Mật khẩu không được để trống!"
        } else if (!validatePassword(password)) {
            isValid = false;
            error.password = "Mật khẩu phải từ 7-19 ký tự, ít nhất một chữ cái, một chữ số và một ký tự đặc biệt!"
        }

        if (!phone) {
            isValid = false;
            error.phone = "Số điện thoại không được để trống!"
        } else if (!validatePhoneNumber(phone)) {
            isValid = false;
            error.phone = "Số điện thoại không hợp lệ!"
        }
        setErrors(error);
        return isValid
    }

    const handlerSignUp = async (e) => {
        e.preventDefault()
        if (validateForm()) {

            const params = {
                fullname: fullName,
                email: email,
                password: password.toUpperCase(),
                phone: phone
            }
            await axiosClient.post(REGISTER_URL, params)
                .then((res) => {
                    if (res.data.error === undefined) {
                        alertify.set("notifier", "position", "bottom-left");
                        alertify.success("Chào mừng người mới");
                        setSuccess(true)
                    } else {
                        alertify.set("notifier", "position", "bottom-right");
                        alertify.error(res.data.error);
                    }
                })
                .catch(err => {
                    console.log("err", err);
                    alertify.set("notifier", "position", "bottom-right");
                    alertify.error("Lỗi hệ thống vui lòng thử lại sau!");
                })
        }
    }
    return (
        <div className="limiter">
            <div className="container-login100 row">
                <div className='col-md-12 col-xl-4'>
                </div>
                <div className='wrap-login100 col-md-12 col-xl-8'>
                    <div className='form-signin'>
                        <form onSubmit={handlerSignUp}>
                            <div className="signUpForm">
                                <p className="signup100-form-title">
                                    Đăng ký
                                </p>
                                <div className="wrap-input100 validate-input" >
                                    <AiOutlineUser className='icon-form' />
                                    <input className="input100" value={fullName} onChange={onChangeName} type="text" placeholder="Họ và Tên" />
                                </div>
                                {errors.fullName && <p className="text-danger">{errors.fullName}</p>}

                                <div className="wrap-input100 rs1 validate-input" >
                                    <AiOutlineMail className='icon-form' />
                                    <input className="input100" value={email} onChange={onChangeEmail} type="text" placeholder="Email" />
                                </div>
                                {errors.email && <p className="text-danger">{errors.email}</p>}

                                <div className="wrap-input100 rs1 validate-input">
                                    <AiOutlineLock className='icon-form' />
                                    <input className="input100" value={password} onChange={onChangePassword} type={typePassWord} placeholder="Mật khẩu" />
                                    {typePassWord === "password" ? (
                                        <button type='button' className='show-password' onClick={() => setTypePassWord("text")}>
                                            <AiFillEye />
                                        </button >
                                    ) : (
                                        <button type='button' className='show-password' onClick={() => setTypePassWord("password")}>
                                            <AiFillEyeInvisible />
                                        </button>
                                    )}
                                </div>
                                {errors.password && <p className="text-danger">{errors.password}</p>}

                                <div className="wrap-input100 rs1 validate-input">
                                    <AiOutlinePhone className='icon-form' />
                                    <input className="input100" value={phone} onChange={onChangePhone} type="number" placeholder="Số điện thoại" />
                                </div>
                                {errors.phone && <p className="text-danger">{errors.phone}</p>}

                                {/* <div className="container-login100-form-btn m-t-20"> */}
                                <div className="login-box">
                                    {success && <Navigate replace to="/signin" />}
                                    <button className="" type='submit'>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        {/* <button className="login100-form-btn" type='submit'> */}
                                        Đăng ký
                                    </button>
                                </div>
                                <p className='text-center'>
                                    Hoặc
                                </p>
                            </div>
                        </form>
                        <div className="p-t-30">
                            <LoginWithFirebase />
                            <div className="text-center p-t-30">
                                <span className="txt1">Đăng nhập?</span>
                                &nbsp;
                                <Link to="/signin" className="txt2 hov1">
                                    Click
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SignUp;