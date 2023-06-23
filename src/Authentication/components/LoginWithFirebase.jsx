import React from 'react'
import { signInWithFacebook, signInWithGoogle } from "../../service/firebaseConfig"

const LoginWithFirebase = () => {
    return (
        <>
            <button className='btn-google' onClick={signInWithGoogle} style={{ color: "black" }}>
                <div>
                    <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" width="35" alt="google logo" />
                </div>
                <span >
                    Đăng nhập bằng Google
                </span>
            </button>
            <button className='btn-google m-t-15' onClick={signInWithFacebook} style={{ color: "black" }}>
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkz0gp0kiXdelqEiJXK-2JuVDIicj1DURmn9Vxd72S_mLHWb4&s" width="35" alt="facebook logo" />
                </div>
                <span >
                    Đăng nhập bằng FaceBook
                </span>
            </button>
        </>

    )
}

export default LoginWithFirebase