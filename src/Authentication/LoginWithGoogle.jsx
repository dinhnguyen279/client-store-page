import React, { useEffect, useState } from 'react';

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const LoginWithGoogle = () => {

    const login = useGoogleLogin({
        onSuccess: (res) => {
            if (res.access_token) {
                const fetchProfileUser = async () => {
                    sessionStorage.setItem("access_token", res.access_token)
                    await axios
                        .get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${res.access_token}`, {
                            headers: {
                                Authorization: `Bearer ${res.access_token}`,
                                Accept: 'application/json'
                            }
                        })
                        .then((response) => {
                            sessionStorage.setItem("id_user", response.data.sub)
                            setTimeout(() => {
                                window.location.href = "/";
                            }, 500)
                        })
                        .catch((err) => console.log(err))
                }
                fetchProfileUser()
            }
        },
        onError: (error) => console.log("Login Failed:", error)
    });

    return (
        <button className='btn-google' onClick={() => login()} style={{ color: "black" }}>
            <div>
                <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" width="35" alt="google logo" />
            </div>
            <span >
                Đăng nhập bằng Google
            </span>
        </button>
    );
}
export default LoginWithGoogle;