import axios from 'axios';
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineLock, AiOutlineUser } from 'react-icons/ai'
import axiosClient from '../../API/axiosClient';
import { useLocation } from 'react-router-dom';
import alertify from 'alertifyjs';
const ResetPassword = () => {
    const RESETPASSWORD = "/reset-password"
    const [errors, setErrors] = useState({})
    const [typePassWord, setTypePassWord] = useState("password");
    const [typeConfirmPassWord, setTypeConfirmPassWord] = useState("password");
    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    })

    // lấy resetCode để gửi về server
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const resetCode = searchParams.get("token");
    const resetCodeEncoded = encodeURIComponent(resetCode);

    const onChangeNewPassword = (e) => {
        setPassword({ ...password, newPassword: e.target.value })
    }

    const onChangeConfirmPassword = (e) => {
        setPassword({ ...password, confirmPassword: e.target.value })
    }

    const validateFormSignin = () => {
        let isValid = true;
        const error = {};

        if (!password.newPassword) {
            isValid = false;
            error.newPassword = "Mật khẩu mới không được để trống!"
        }

        if (!password.confirmPassword) {
            isValid = false;
            error.confirmPassword = "Xác nhận mật khẩu không được để trống!"
        }

        if (password.newPassword !== password.confirmPassword) {
            isValid = false;
            error.matchingPassword = "Hai mật khẩu chưa trùng khớp"
        }

        setErrors(error)
        return isValid

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (validateFormSignin()) {
            const url = `${RESETPASSWORD}/${resetCodeEncoded}`
            await axiosClient
                .patch(url, { newPassword: password.newPassword.toUpperCase() })
                .then(() => {
                    alertify.set("notifier", "position", "top-right");
                    alertify.success("Bạn Đã Thay Đổi Mật Khẩu Thành Công!");
                    setTimeout(() => {
                        window.location.href = "http://localhost:5173/signin"
                    }, 500);
                })
                .catch(err => {
                    if (err.response.data.message) {
                        alertify.set("notifier", "position", "top-right");
                        alertify.error("Mã xác thực đã hết hạn!");
                    }
                    alertify.set("notifier", "position", "top-right");
                    alertify.error(err.response.data);
                })
        }
    }

    return (
        <>
            <div className="limiter">
                <div className="container-login100">
                    <div className='wrap-resetPassword100'>
                        <div className='form-signin'>
                            <form onSubmit={onSubmit} >
                                <div className="signInForm">
                                    <p className="h1 text-center text-uppercase">
                                        Đặt lại mật khẩu
                                    </p>
                                    <div className="wrap-input100 validate-input">
                                        <AiOutlineLock className='icon-form' />
                                        <input className="input100" type={typePassWord} placeholder="Mật khẩu mới" value={password.newPassword} onChange={onChangeNewPassword} />
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
                                    {errors.newPassword && <p className="text-danger">{errors.newPassword}</p>}
                                    <div className="wrap-input100 validate-input">
                                        <AiOutlineLock className='icon-form' />
                                        <input className="input100" type={typeConfirmPassWord} placeholder="Xác nhận mật khẩu" value={password.confirmPassword} onChange={onChangeConfirmPassword} />
                                        {typeConfirmPassWord === "password" ? (
                                            <button type='button' className='show-password' onClick={() => setTypeConfirmPassWord("text")}>
                                                <AiFillEye />
                                            </button >
                                        ) : (
                                            <button type='button' className='show-password' onClick={() => setTypeConfirmPassWord("password")}>
                                                <AiFillEyeInvisible />
                                            </button>)
                                        }
                                    </div>
                                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                                    {errors.matchingPassword && <p className="text-danger">{errors.matchingPassword}</p>}
                                    <button className="btn-resetpassword" type='submit'>
                                        Đặt lại mật khẩu
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword