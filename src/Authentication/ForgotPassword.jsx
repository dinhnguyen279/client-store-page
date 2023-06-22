import React, { useState } from 'react'
import { AiFillCloseCircle, AiFillCloseSquare, AiOutlineArrowLeft, AiOutlineClose, AiOutlineUser } from "react-icons/ai"
import axiosClient from '../API/axiosClient'
import alertify from 'alertifyjs'

const FormForgotPassword = (props) => {
    const RESETPASSWORD = "/reset-password"
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [value, setValue] = useState({
        inputValue: "",
        inputType: ""
    })
    const onChangeValue = (e) => {
        if (!isNaN(e.target.value)) {
            setValue({ ...value, inputValue: e.target.value, inputType: "phone" })
        } else {
            setValue({ ...value, inputValue: e.target.value, inputType: "email" })
        }
    }
    const handleBackFormLogin = () => {
        props.backFormLogin(pre => !pre)
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

    const validateForm = () => {
        let isValid = true;
        const error = {};

        if (value.inputType === "email") {
            if (!value.inputValue) {
                isValid = false;
                error.email = "Bạn cần nhập Email hoặc Số điện thoại!"
            } else if (!validateEmail(value.inputValue)) {
                isValid = false;
                error.email = "Email không hợp lệ!"
            }
        }

        if (value.inputType === "phone") {
            if (!value.inputValue) {
                isValid = false;
                error.phone = "Bạn cần nhập Email hoặc Số điện thoại!"
            }
            else if (!validatePhoneNumber(value.inputValue)) {
                isValid = false;
                error.phone = "Số điện thoại không hợp lệ!";
            }
        }

        setErrors(error)
        return isValid
    }

    const handleResetPassword = async () => {
        const data = {
            email: "",
            phone: ""
        }
        if (validateForm()) {
            setLoading(true)
            if (value.inputType === 'phone') {
                data.phone = value.inputValue
            } else if (value.inputType === 'email') {
                data.email = value.inputValue
            }
            await axiosClient
                .post(RESETPASSWORD, data)
                .then(() => {
                    setLoading(false)
                    alertify
                        .alert("Thành công", "Vui lòng kiểm tra email!").set("label", "Đóng", true)
                }
                )
                .catch(err => {
                    setLoading(false)
                    alertify
                        .alert("Lỗi", err.response.data).set("label", "Đóng", true)
                }
                )
        }

    }
    return (
        <>
            <button className='btn-back' onClick={handleBackFormLogin}>
                <AiOutlineArrowLeft className='text-dark text-lg' /> <span>
                    Quay lại
                </span>
            </button>
            <div>
                <h1 className="text-center text-xl p-1 text-uppercase">
                    Quên mật khẩu
                </h1>
                <div className="wrap-input100 validate-input" >
                    <AiOutlineUser className='icon-form' />
                    <input className="input100" type="text" placeholder="Email hoặc Số Điện Thoại" value={value.loginValue} onChange={onChangeValue} />
                </div>
                {errors.email && <p className="text-danger">{errors.email}</p>}
                {errors.phone && <p className="text-danger">{errors.phone}</p>}

                <button className='btn-resetpassword m-t-10' onClick={handleResetPassword}>
                    {
                        loading ?
                            <div className="spinner-border" style={{ margin: "auto" }} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            :
                            ("Đặt lại mật khẩu")
                    }
                </button>
            </div>
        </>
    )
}

export default FormForgotPassword