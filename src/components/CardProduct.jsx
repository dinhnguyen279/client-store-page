import axios from "axios";
import React from "react";
import { Card } from "react-bootstrap";
import {
    AiOutlineExpand,
    AiOutlineHeart,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { HOST } from "../domain/host/host";
const CardProduct = (props) => {
    const itemProduct = props.itemProduct;
    const sort = props.sort;

    const URL_AddToCart = `${HOST}/addToCart`;
    const URL_UpdateToCart = `${HOST}/updateCart`;


    if (sort === "DownToUp") {
        itemProduct.sort((a, b) => {
            return a.price - b.price;
        });
    } else if (sort === "UpToDown") {
        itemProduct.sort((a, b) => {
            return b.price - a.price;
        });
    }
    const addToCart = (idProduct) => {
        const data = {
            idUser: sessionStorage.getItem("id_user"),
            idProduct: idProduct,
            quantity: 1,
        };
        console.log("data", data);
        axios
            .post(URL_AddToCart, data)
    };
    return (
        <div className="col-md-6 col-xl-2 col-sm-6">
            <div className="product">
                <div className="position-relative mb-3 product-new">
                    <Link className="d-block" to={`/detail/${itemProduct._id}`}>
                        <Card.Img
                            className="img-banner"
                            src={itemProduct.avt}
                            alt="..."
                        ></Card.Img>
                    </Link>
                    <div className="product-overlay">
                        <ul className="">
                            <li className="list-item-overlay">
                                {/* Dùng Modal phải có href để nó hiện ra thằng đó và thuộc tính data-toggle="modal" để mở modal */}
                                <a
                                    className="btn btn-sm btn-outline-dark"
                                    href={`#product_${itemProduct._id}`}
                                    data-toggle="modal"
                                >
                                    <AiOutlineExpand />
                                </a>
                            </li>
                            <li className="list-item-overlay">
                                <a className="btn btn-sm btn-outline-dark">
                                    <AiOutlineHeart />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn-addtocart"
                            onClick={() => addToCart(itemProduct._id)}
                        >
                            <AiOutlineShoppingCart />
                            Thêm giỏ hàng
                        </button>
                    </div>
                </div>
                <Card.Link
                    href={`detail/${itemProduct._id}`}
                    className="title-product h5"
                >
                    {itemProduct.name}
                </Card.Link>
                {itemProduct.promotionPrice === "" ? (
                    <Card.Text>{itemProduct.price}₫</Card.Text>
                ) : (
                    <Card.Text style={{ color: "red" }}>
                        {itemProduct.promotionPrice}₫
                        <span style={{ color: "grey", paddingLeft: "10px" }}>
                            <del>{itemProduct.price}₫</del>
                        </span>
                    </Card.Text>
                )}
            </div>
        </div>
    );
};

export default CardProduct;
