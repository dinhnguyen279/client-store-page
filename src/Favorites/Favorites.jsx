import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import "./Favorites.css"
import { Link } from 'react-router-dom'
import { HOST } from '../domain/host/host'
import axios from 'axios'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ModalDeleted from '../components/ModalDeleted'
import queryString from 'query-string'
import alertify from 'alertifyjs'
import ModalDeletedAll from '../components/ModalDeletedAll'
import { CountContext } from '../Context/CountContext'

const Favorites = (props) => {
    const URL_GETFAVORITES = `${HOST}/favorite`
    const URL_GETPRODUCTS = `${HOST}/product`
    const URL_AddToCart = `${HOST}/addToCart`;

    // Hàm này dùng useContext để cập nhật số lượng ở header
    const { setReloadCount } = useContext(CountContext)

    const [favorites, setFavorites] = useState([])
    const [getDataFavorites, setGetDataFavorites] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [showAll, setShowAll] = useState(false);
    const handleCloseDeleteAll = () => setShowAll(false);
    const [dataDelete, setDataDelete] = useState({
        idFavorite: "",
        idUser: "",
        idProduct: "",
        size: ""
    })
    const [listFavorites, setListFavorites] = useState([])
    // Kiểm tra lấy id nếu idUser không có thì lấy id Khách
    let getIdUser = ""
    if (sessionStorage.getItem("id_user")) {
        const id_user = sessionStorage.getItem("id_user");
        getIdUser = id_user;
    }
    else if (localStorage.getItem("id_user_clientage")) {
        const id_user_clientage = localStorage.getItem("id_user_clientage")
        getIdUser = id_user_clientage;
    }

    // Gọi ra danh sách thông tin FAVORITES
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await axios.get(`${URL_GETFAVORITES}/${getIdUser}`)
                if (res.data.length === 0) {
                    return
                }
                setFavorites(res.data)
                // Dựa vào data get từ FAVORITES để lấy sản phẩm trong product
                if (res.data.length > 0) {
                    const data = res.data
                    const dataFavorites = data.map(val => axios.get(`${URL_GETPRODUCTS}/${val.idProduct}`))
                    Promise.all(dataFavorites).then(res => {
                        const dataProduct = res.map(res => res.data)
                        setGetDataFavorites(dataProduct)
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchFavorites()
    }, [])

    // Hàm này sẽ ghép id của bảng favorites và sản phẩm lấy được dựa vào idProduct đưa vào listFavorites
    useEffect(() => {
        const alistFavorites = []
        if (favorites.length > 0 && getDataFavorites.length > 0) {
            const listDataFromFavorites = favorites.map(val => val);
            const listDataFromProducts = getDataFavorites.map(val => val);

            for (let i = 0; i < listDataFromFavorites.length; i++) {
                const oFavorites = {}
                oFavorites.id = listDataFromFavorites[i]._id;
                oFavorites.idUser = listDataFromFavorites[i].idUser;
                oFavorites.size = listDataFromFavorites[i].size;
                oFavorites.name = listDataFromProducts[i].name;
                oFavorites.price = listDataFromProducts[i].promotionPrice ? listDataFromProducts[i].promotionPrice : listDataFromProducts[i].price
                oFavorites.idProduct = listDataFromProducts[i]._id;
                oFavorites.stock = listDataFromProducts[i].quantity;
                oFavorites.avt = listDataFromProducts[i].avt;
                alistFavorites.push(oFavorites);
            }
        }
        setListFavorites(alistFavorites)
    }, [favorites, getDataFavorites])

    // Show popup xóa sản phẩm khỏi wishlist
    const handleShow = (id, idUser, idProduct, size) => {
        const data = { idFavorite: id, idUser: idUser, idProduct: idProduct, size: size }
        setDataDelete(data);
        setShow(true);
    }
    const handlerDelete = async () => {
        const params = {
            idFavorite: dataDelete.idFavorite,
            idUser: dataDelete.idUser,
            idProduct: dataDelete.idProduct,
            size: dataDelete.size
        };
        const query = '?' + queryString.stringify(params)

        try {
            await axios.delete(`${HOST}/deleteFavorite${query}`)
            alertify.set("notifier", "position", "bottom-left");
            alertify.success("Bạn Đã Xóa Thành Công!");
            await props.setHandleCount(false);
        } catch (error) {
            console.log(error);
            alertify.success("Xóa Không Thành Công!");
        }
    }

    // Hàm này sẽ xóa toàn bộ sản phẩm yêu thích
    const handleShowAll = () => {
        setShowAll(true);
    }
    const handleDeleteAll = async () => {
        try {
            await axios.delete(`${HOST}/deleteAllFavorite/${getIdUser}`)
            alertify.set("notifier", "position", "bottom-left");
            alertify.success("Bạn Đã Xóa Thành Công!");
            await setReloadCount(false);
        } catch (error) {
            console.log(error);
            alertify.success("Xóa Không Thành Công!");
        }
    }

    const addToCart = async (idProduct, name, price, avt, size, stock) => {
        // idUser
        const id_user_cart = sessionStorage.getItem("id_user");
        // idUser khách
        const id_user_clientage = localStorage.getItem("id_user_clientage");

        const data = {
            idUser: id_user_cart ? id_user_cart : id_user_clientage,
            idProduct: idProduct,
            quantity: 1,
            nameProduct: name,
            price: price,
            img: avt,
            size: size,
        };
        await axios.post(URL_AddToCart, data)
        await setReloadCount(false);
        alertify.set("notifier", "position", "bottom-left");
        alertify.success("Bạn Đã Thêm Hàng Thành Công!");
    };
    return (
        <>
            <div className='main-cart'>
                <section className="py-3 bg-light mb-1 header-contact">
                    <div className="container">
                        <ol className="breadcrumb justify-content-start">
                            <li className="breadcrumb-item"><a href={"/"}>Trang chủ</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Yêu Thích</li>
                        </ol>
                    </div>
                </section>
                {
                    listFavorites.length !== 0 ? (
                        <section className='p-l-55 p-r-55 p-b-50 bg-light'>
                            <div className='container main-wishlist'>
                                <div className=''>
                                    <h3 className="title-header text-uppercase fw-normal">Sản phẩm yêu thích</h3>
                                    <div className='d-flex justify-content-end'>
                                        <button className='btnAddToCart bg-danger text-light' onClick={() => handleShowAll()}>
                                            Xóa toàn bộ yêu thích
                                        </button>
                                        {
                                            showAll && <ModalDeletedAll showAll={showAll} handleCloseAll={handleCloseDeleteAll} handlerDeleteAll={handleDeleteAll} />
                                        }
                                    </div>
                                    {listFavorites && listFavorites.map((val, idx) => {
                                        return (
                                            <div className='my-4' key={idx + 1}>
                                                <div className='wishlist-list row'>
                                                    <div className='wishlist-item-first col-lg-12 d-block d-lg-none'>
                                                        <button
                                                            onClick={() => handleShow(val.id, val.idUser, val.idProduct, val.size)}
                                                            className="reset-anchor remove_cart btn-base"
                                                        >
                                                            <i className="fas fa-trash-alt text-muted"></i>
                                                        </button>
                                                    </div>
                                                    <div className='wishlist-item col-lg-3 col-md-5'>
                                                        <Link to={`/detail/${val.idProduct}`}>
                                                            <img src={val.avt} alt="Name Product" className='img-product' />
                                                        </Link>
                                                    </div>
                                                    <div className='wishlist-item-second col-lg-4 col-md-7'>
                                                        <div className=''>
                                                            <h5 className='mb-3 fw-normal'>
                                                                {val.name}
                                                            </h5>
                                                            <div>
                                                                <b className='fw-bold'>Size:</b> <span className='mr-3'>{val.size}</span>
                                                                <b className='fw-bold'>Kho:</b><span> {val.stock < 1 ? <span className='animation-stock'>Đã hết hàng</span> : val.stock}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='wishlist-item-third col-lg-5'>
                                                        <button
                                                            onClick={() => handleShow(val.id, val.idUser, val.idProduct, val.size)}
                                                            className="reset-anchor remove_cart btn-base"
                                                        >
                                                            <i className="fas fa-trash-alt text-muted"></i>
                                                        </button>
                                                        <p className='py-3 text-lg'>
                                                            {parseInt(val.price).toLocaleString()}₫
                                                        </p>
                                                        <button className={`btnAddToCart btn
                                                ${val.stock < 1 ? "btn-dark text-gray" : "btn-warning "}`}
                                                            onClick={() => addToCart(val.idProduct, val.name, val.price, val.avt, val.size)}
                                                            disabled={val.stock < 1 ? true : false}
                                                        >
                                                            <AiOutlineShoppingCart /> Thêm giỏ hàng
                                                        </button >
                                                    </div>
                                                    {show &&
                                                        <ModalDeleted show={show} handleClose={handleClose} handlerDelete={handlerDelete} />
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </section >
                    ) : (
                        <section className="cart-empty">
                            <p className="text-lg mb-3">Danh sách yêu thích rỗng</p>
                            <a className='btn-buy btn btn-dark' href="/">
                                Tiếp tục xem sản phẩm
                            </a>
                        </section>

                    )
                }
            </div >
        </>
    )
}

export default Favorites