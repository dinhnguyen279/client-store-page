import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import "./Favorites.css"
import { AiOutlineClose } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { HOST } from '../domain/host/host'
import axios from 'axios'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ModalDeleted from '../components/ModalDeleted'
import queryString from 'query-string'
import alertify from 'alertifyjs'
import ModalDeletedAll from '../components/ModalDeletedAll'

const Favorites = (props) => {
    const URL_GETFAVORITES = `${HOST}/favorite`
    const URL_GETPRODUCTS = `${HOST}/product`
    const URL_AddToCart = `${HOST}/addToCart`;

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
            const listIdFavorites = favorites.map(val => val._id)
            const listIdUser = favorites.map(val => val.idUser)
            const listSizeFavorites = favorites.map(val => val.size)
            const listName = getDataFavorites.map(val => val.name)
            const listPrice = getDataFavorites.map(val => val.promotionPrice ? val.promotionPrice : val.price)
            const listIdProduct = getDataFavorites.map(val => val._id)
            const listQuantity = getDataFavorites.map(val => val.quantity)
            const listImages = getDataFavorites.map(val => val.avt)
            for (let i = 0; i < listIdFavorites.length; i++) {
                const oFavorites = {}
                oFavorites.id = listIdFavorites[i];
                oFavorites.idUser = listIdUser[[i]]
                oFavorites.size = listSizeFavorites[i];
                oFavorites.name = listName[i];
                oFavorites.price = listPrice[i];
                oFavorites.idProduct = listIdProduct[i]
                oFavorites.stock = listQuantity[i];
                oFavorites.stock = listQuantity[i];
                oFavorites.avt = listImages[i];
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
            await props.setHandleCount(false);
        } catch (error) {
            console.log(error);
            alertify.success("Xóa Không Thành Công!");
        }
    }

    const addToCart = async (idProduct, name, price, avt, size) => {
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
        await props.setHandleCount(false);
        alertify.set("notifier", "position", "bottom-left");
        alertify.success("Bạn Đã Thêm Hàng Thành Công!");
    };
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
            {listFavorites.length !== 0 ? (
                <section className='main-cart p-l-55 p-r-55 p-b-50 bg-light'>
                    <div className='container main-wishlist'>
                        <div className=''>
                            <h3 className="title-header">Sản phẩm yêu thích</h3>
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
                                                    <AiOutlineClose className='text-muted text-base' />
                                                </button>
                                            </div>
                                            <div className='wishlist-item col-lg-3 col-md-5'>
                                                <Link to={`/detail/${val.idProduct}`}>
                                                    <img src={val.avt} alt="Name Product" className='img-product' />
                                                </Link>
                                            </div>
                                            <div className='wishlist-item-second col-lg-4 col-md-7'>
                                                <div className=''>
                                                    <h5 className='mb-3'>
                                                        {val.name}
                                                    </h5>
                                                    <div>
                                                        <b>Size:</b> <span className='mr-3'>{val.size}</span>
                                                        <b>Kho:</b><span> {val.stock}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='wishlist-item-third col-lg-5'>
                                                <button
                                                    onClick={() => handleShow(val.id, val.idUser, val.idProduct, val.size)}
                                                    className="reset-anchor remove_cart btn-base"
                                                >
                                                    <AiOutlineClose className='text-muted text-base' />
                                                </button>
                                                <p className='py-3 text-lg'>
                                                    {parseInt(val.price).toLocaleString()}₫
                                                </p>
                                                <button className='btnAddToCart bg-warning' onClick={() => addToCart(val.idProduct, val.name, val.price, val.avt, val.size)}>
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
                </section>
            ) : (
                <section className="cart-empty">
                    <p className="text-lg mb-3">Danh sách yêu thích rỗng</p>
                    <a className='btn-buy btn btn-dark' href="/">
                        Tiếp tục xem sản phẩm
                    </a>
                </section>

            )}
        </>
    )
}

export default Favorites