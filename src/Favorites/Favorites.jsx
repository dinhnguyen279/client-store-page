import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import "./Favorites.css"
import { AiOutlineClose } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { HOST } from '../domain/host/host'
import axios from 'axios'

const Favorites = () => {
    const URL_GETFAVORITES = `${HOST}/favorite`
    const [favorites, setFavorites] = useState([])
    // Kiểm tra id nếu idUser không có thì lấy id Khách
    let idUser = ""
    if (sessionStorage.getItem("id_user")) {
        const id_user = sessionStorage.getItem("id_user");
        idUser = id_user;
    }
    else if (localStorage.getItem("id_user_clientage")) {
        const id_user_clientage = localStorage.getItem("id_user_clientage")
        idUser = id_user_clientage;
    }
    useEffect(() => {
        const fetchFavorites = async () => {
            await axios.get(`${URL_GETFAVORITES}/${idUser}`)
                .then(res => setFavorites(res.data))
                .catch(err => console.log(err))
        }
        fetchFavorites()
    }, [])

    return (
        <>
            <section className="py-3 bg-light mb-3 header-contact">
                <div className="container">
                    <ol className="breadcrumb justify-content-start">
                        <li className="breadcrumb-item"><a href={"/"}>Trang chủ</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Yêu Thích</li>
                    </ol>
                </div>
            </section>
            <section className='main-cart p-l-55 p-r-55 p-b-50'>
                <div className='container'>
                    <h3 className="title-header float-left">Sản phẩm yêu thích</h3>
                    <Table hover className=''>
                        {favorites.length !== 0 ? (
                            <>
                                <thead className='header-wishlist-title'>
                                    <tr>
                                        <th></th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Tồn kho</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    <tr className=''>
                                        <td className='w-25'>
                                            <Button variant='dark' className='mr-3'>
                                                <AiOutlineClose size={20} />
                                            </Button>
                                            <Link to={"#"}>
                                                <img src="" alt="Name Product" className='img-product' />
                                            </Link>
                                        </td>
                                        <td>Áo thi đấu bình dương</td>
                                        <td>199,000</td>
                                        <td>100</td>
                                        <td className='text-center'>
                                            <Button variant='warning'>
                                                Thêm giỏ hàng
                                            </Button >
                                        </td>
                                    </tr>
                                </tbody>
                            </>
                        ) : (
                            <section className="cart-empty">
                                <p className="text-lg mb-3">Danh sách yêu thích rỗng</p>
                                <a className='btn-buy btn btn-dark' href="/">
                                    Tiếp tục xem sản phẩm
                                </a>
                            </section>
                        )}
                    </Table>
                </div>
            </section>
        </>
    )
}

export default Favorites