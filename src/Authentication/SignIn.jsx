import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
// import UserAPI from '../API/UserAPI';
import { addSession } from '../Redux/Action/ActionSession';
import './Auth.css'
import queryString from 'query-string'
import CartAPI from '../API/CartAPI';
import axios from 'axios';

function SignIn(props) {
    //test new validate

    const [errors, setErrors] = useState({})

    //listCart được lấy từ redux
    const listCart = useSelector(state => state.Cart.listCart)

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const [user, setUser] = useState([])

    // const [errorEmail, setErrorEmail] = useState(false)
    // const [emailRegex, setEmailRegex] = useState(false)
    // const [errorPassword, setErrorPassword] = useState(false)

    const [redirect, setRedirect] = useState(false)

    const [checkPush, setCheckPush] = useState(false)

    const dispatch = useDispatch()

    // useEffect(() => {

    //     const fetchData = async () => {
    //         const response = await UserAPI.getAllData()
    //         setUser(response)

    //     }

    //     fetchData()

    // }, [])
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('http://localhost:3003/users')
                .then((res) => {
                    setUser(res.data)
                })
        }
        fetchData()

    }, [])
    console.log('response user: ', user);

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    //test new validate
    const validateEmail = (email) => {
        const validEmail = /\S+@\S+\.\S+/;
        return validEmail.test(String(email).toLowerCase())
    }
    const validateFormSignin = () => {
        let isValid = true;
        const error = {};

        if (!email) {
            isValid = false;
            error.email = "Email không tồn tại!"
        } else if (!validateEmail(email)) {
            isValid = false;
            error.email = "Email không hợp lệ!"
        }

        if (!password) {
            isValid = false;
            error.password = "Mật khẩu không đúng!"
        }
        setErrors(error)
        return isValid

    }

    const onSubmit = (e) => {
        e.preventDefault();
        validateFormSignin();

        const findUser = user.find(value => {
            return value.email === email
        })

        sessionStorage.setItem('id_user', findUser._id)
        sessionStorage.setItem('name_user', findUser.fullname)

        const action = addSession(sessionStorage.getItem('id_user'))
        dispatch(action)
        setCheckPush(true)
    }

    //Hàm này dùng để đưa hết tất cả carts vào API của user
    useEffect(() => {
        const fetchData = async () => {
            //Lần đầu sẽ không thực hiện insert được vì addCart = ''
            if (checkPush === true) {

                for (let i = 0; i < listCart.length; i++) {

                    //Nó sẽ lấy idUser và idProduct và count cần thêm để gửi lên server
                    const params = {
                        idUser: sessionStorage.getItem('id_user'),
                        idProduct: listCart[i].idProduct,
                        count: listCart[i].count
                    }

                    const query = '?' + queryString.stringify(params)

                    const response = await CartAPI.postAddToCart(query)
                    console.log(response)

                }

                setRedirect(true)
            }

        }

        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkPush])

    return (
        <form onSubmit={onSubmit}>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 signInForm p-l-55 p-r-55 p-t-65 p-b-50">
                        <span className="login100-form-title p-b-33">
                            Sign In
                        </span>
                        <div className="wrap-input100 validate-input" >
                            <input className="input100" type="text" placeholder="Email" value={email} onChange={onChangeEmail} />
                        </div>
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                        <div className="wrap-input100 rs1 validate-input">
                            <input className="input100" type="password" placeholder="Mật khẩu" value={password} onChange={onChangePassword} />
                        </div>
                        {errors.password && <p className="text-danger">{errors.password}</p>}

                        <div className="container-login100-form-btn m-t-20">
                            {
                                redirect && <Navigate replace to="/" />
                            }
                            <button className="login100-form-btn" type='submit'>
                                Đăng nhập
                            </button>
                        </div>

                        <div className="text-center p-t-45 p-b-4">
                            <span className="txt1">Create an account?</span>
                            &nbsp;
                            <Link to="/signup" className="txt2 hov1">
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SignIn;