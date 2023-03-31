import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import "./Favorites.css"
import { AiOutlineClose } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { HOST } from '../domain/host/host'
import axios from 'axios'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ModalDelete from '../components/ModalDelete'
import queryString from 'query-string'

const Favorites = () => {
    const URL_GETFAVORITES = `${HOST}/favorite`
    const URL_GETPRODUCTS = `${HOST}/product`
    const [favorites, setFavorites] = useState([])
    const [getDataFavorites, setGetDataFavorites] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [dataDelete, setDataDelete] = useState({
        idFavorite: "",
        idUser: "",
        idProduct: "",
        size: ""
    })
    // Kiểm tra id nếu idUser không có thì lấy id Khách
    let getIdUser = ""
    if (sessionStorage.getItem("id_user")) {
        const id_user = sessionStorage.getItem("id_user");
        getIdUser = id_user;
    }
    else if (localStorage.getItem("id_user_clientage")) {
        const id_user_clientage = localStorage.getItem("id_user_clientage")
        getIdUser = id_user_clientage;
    }
    // Show popup xóa sản phẩm khỏi wishlist
    const handleShow = (idFavorite, idProduct, size) => {
        const data = { idFavorite: idFavorite, idUser: getIdUser, idProduct: idProduct, size: size }
        setDataDelete(data);
        setShow(true);
    }

    const handlerDelete = () => {
        if (getIdUser) {
            //Sau khi nhận được dữ liệu ở component con truyền lên thì sẽ gọi API xử lý dữ liệu
            const fetchDelete = async () => {
                const params = {
                    idFavorite: dataDelete.idFavorite,
                    idUser: dataDelete.idUser,
                    idProduct: dataDelete.idProduct,
                    size: dataDelete.size
                };
                const query = '?' + queryString.stringify(params)
                console.log(query);

                await axios.delete(`${HOST}/deleteFavorite${query}`)
                alertify.set("notifier", "position", "bottom-left");
                alertify.success("Bạn Đã Xóa Thành Công!");
            };
            fetchDelete();
        }
    }
    // Gọi ra danh sách thông tin FAVORITES
    useEffect(() => {
        const fetchFavorites = async () => {
            await
                axios
                    .get(`${URL_GETFAVORITES}/${getIdUser}`)
                    .then(res => setFavorites(res.data))
                    .catch(err => console.log(err))
        }
        fetchFavorites()
    }, [])
    // Dựa vào FAVORITES để lấy sản phẩm trong product
    useEffect(() => {
        const dataFavorites = favorites.map(val => axios.get(`${URL_GETPRODUCTS}/${val.idProduct}`))
        Promise.all(dataFavorites)
            .then(res => {
                const dataProduct = res.map(res => res.data)
                setGetDataFavorites(dataProduct)
            })
    }, [favorites])

    // Hàm này sẽ ghép id của bảng favorites và sản phẩm lấy được dựa vào idProduct
    const listFavorites = []
    if (favorites.length > 0) {
        const listIdFavorites = favorites.map(val => val._id)
        const listSizeFavorites = favorites.map(val => val.size)
        const listName = getDataFavorites.map(val => val.name)
        const listPrice = getDataFavorites.map(val => val.promotionPrice ? val.promotionPrice : val.price)
        const listIdProduct = getDataFavorites.map(val => val._id)
        const listQuantity = getDataFavorites.map(val => val.quantity)
        const listImages = getDataFavorites.map(val => val.avt)
        for (let i = 0; i < listIdFavorites.length; i++) {
            const oFavorites = {}
            oFavorites.id = listIdFavorites[i];
            oFavorites.size = listSizeFavorites[i];
            oFavorites.name = listName[i];
            oFavorites.price = listPrice[i];
            oFavorites.idProduct = listIdProduct[i]
            oFavorites.stock = listQuantity[i];
            oFavorites.stock = listQuantity[i];
            oFavorites.avt = listImages[i];
            listFavorites.push(oFavorites);
        }
    }
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
            <div className='main-cart p-l-55 p-r-55 p-b-50 bg-light'>
                <div className='container main-wishlist'>
                    <h3 className="title-header">Sản phẩm yêu thích</h3>
                    {listFavorites.length !== 0 ? (
                        <div className=''>
                            {listFavorites && listFavorites.map((val, idx) => {
                                return (
                                    <div className='my-4' key={idx + 1}>
                                        <div className='wishlist-list row'>
                                            <div className='wishlist-item-one col-lg-12'>
                                                <Button variant='light'
                                                    onClick={() => handleShow(val.id, val.idProduct, val.size)}
                                                    className="reset-anchor remove_cart"
                                                >
                                                    <AiOutlineClose />
                                                </Button>
                                                <ModalDelete show={show} handleClose={handleClose} handlerDelete={handlerDelete} />
                                            </div>
                                            <div className='wishlist-item col-lg-3'>
                                                <Link to={`/detail/${val.idProduct}`}>
                                                    <img src={val.avt} alt="Name Product" className='img-product' />
                                                </Link>
                                            </div>
                                            <div className='wishlist-item-two col-lg-4'>
                                                <div>
                                                    <h5>
                                                        {val.name}
                                                    </h5>
                                                    <b>Size:</b> {val.size}
                                                    <br />
                                                    <b>Kho:</b> {val.stock}
                                                </div>
                                            </div>
                                            <div className='wishlist-item-three col-lg-5'>
                                                <p className='py-3 text-lg'>
                                                    {parseInt(val.price).toLocaleString()}₫
                                                </p>
                                                <Button variant='warning'>
                                                    <AiOutlineShoppingCart /> Thêm giỏ hàng
                                                </Button >
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <section className="cart-empty">
                            <p className="text-lg mb-3">Danh sách yêu thích rỗng</p>
                            <a className='btn-buy btn btn-dark' href="/">
                                Tiếp tục xem sản phẩm
                            </a>
                        </section>
                    )}
                </div>
            </div>
        </>
    )
}

export default Favorites