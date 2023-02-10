import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Auth.css'
import queryString from 'query-string'
import MessengerAPI from '../API/MessengerAPI';
import axios from 'axios';

SignUp.propTypes = {

};

function SignUp(props) {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')


    const [success, setSuccess] = useState(false)

    const [errors, setErrors] = useState({})

    const onChangeName = (e) => {
        setFullName(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const validateEmail = (email) => {
        const validEmail = /\S+@\S+\.\S+/;
        return validEmail.test(String(email).toLowerCase())
    }

    const validatePhoneNumber = (phone) => {
        const validPhone = /^\d{10}$/;
        return validPhone.test(phone)
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
        } else if (password.length < 6) {
            isValid = false;
            error.password = "Mật phải hơn 6 ký tự!"
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

    const handlerSignUp = (e) => {
        e.preventDefault()
        if (validateForm()) {

            const fetchSignUp = async () => {
                const params = {
                    fullname: fullName,
                    email: email,
                    password: password,
                    phone: phone
                }

                const query = '?' + queryString.stringify(params)
                console.log('query', query);
                const response = await axios.post(`http://localhost:3003/users/signup${query}`)
                console.log('okkk', response)
                setSuccess(true)
            }

            fetchSignUp()

            // Hàm này dùng để tạo các conversation cho user và admin
            const fetchConversation = async () => {

                const params = {
                    email: email,
                    password: password
                }

                const query = '?' + queryString.stringify(params)

                const response = await MessengerAPI.postConversation(query)
                console.log(response)

            }

            fetchConversation()
        }
    }

    return (
        <form onSubmit={handlerSignUp}>

            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 signUpForm p-l-55 p-r-55 p-t-65 p-b-50">
                        <span className="login100-form-title p-b-33">
                            Đăng ký
                        </span>
                        <div className="wrap-input100 validate-input" >
                            <input className="input100" value={fullName} onChange={onChangeName} type="text" placeholder="Họ và Tên" />
                        </div>
                        {errors.fullName && <p className="text-danger">{errors.fullName}</p>}

                        <div className="wrap-input100 rs1 validate-input" >
                            <input className="input100" value={email} onChange={onChangeEmail} type="text" placeholder="Email" />
                        </div>
                        {errors.email && <p className="text-danger">{errors.email}</p>}

                        <div className="wrap-input100 rs1 validate-input">
                            <input className="input100" value={password} onChange={onChangePassword} type="password" placeholder="Mật khẩu" />
                        </div>
                        {errors.password && <p className="text-danger">{errors.password}</p>}

                        <div className="wrap-input100 rs1 validate-input">
                            <input className="input100" value={phone} onChange={onChangePhone} type="text" placeholder="Số điện thoại" />
                        </div>
                        {errors.phone && <p className="text-danger">{errors.phone}</p>}

                        <div className="container-login100-form-btn m-t-20">
                            {success && <Navigate replace to="/signin" />}
                            <button className="login100-form-btn" type='submit'>
                                Sign Up
                            </button>
                        </div>

                        <div className="text-center p-t-45 p-b-4">
                            <span className="txt1">Login?</span>
                            &nbsp;
                            <Link to="/signin" className="txt2 hov1">
                                Click
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );
}

export default SignUp;