import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Image from "../../Share/img/Image";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import axios from "axios";
import { HOST } from "../../domain/host/host";

function ListCart(props) {
  const URL_getProductById = `${HOST}/product`;

  const getCart = props.getCart;
  const onDeleteCart = props.onDeleteCart;
  const onUpdateCount = props.onUpdateCount;
  const idUser = props.idUser;
  const quantity = props.quantity;

  const [dataProduct, setDataProduct] = useState([]);

  const handlerChangeText = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${URL_getProductById}/${getCart}`)
      .then((response) => setDataProduct(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handlerDelete = (getUser, getProduct) => {
    if (!onDeleteCart) {
      return;
    }

    onDeleteCart(getUser, getProduct);
  };

  const handlerDown = (getIdUser, getIdProduct, getCount) => {
    if (!onUpdateCount) {
      return;
    }

    if (getCount === 1) {
      return;
    }

    //Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
    const updateCount = parseInt(getCount) - 1;

    onUpdateCount(getIdUser, getIdProduct, updateCount);
  };

  const handlerUp = (getIdUser, getIdProduct, getCount) => {
    if (!onUpdateCount) {
      return;
    }

    //   Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
    const updateCount = parseInt(getCount) + 1;

    onUpdateCount(getIdUser, getIdProduct, updateCount);
  };

  return (
    <div className="mb-4">
      <div className="row listcart-product position-relative">
        <div className="col-md-3 mb-3">
          <Link className="reset-anchor d-block animsition-link">
            <Card.Img src={dataProduct.avt} />
          </Link>
        </div>
        <div className="col-md-6">
          <Card.Title className="mb-3">{dataProduct.name}</Card.Title>
          <Card.Subtitle className="mb-3">Size {"S"}</Card.Subtitle>
          <div className="quantity">
            <button
              className="dec-btn p-0"
              style={{ cursor: "pointer" }}
              onClick={() => handlerDown(idUser, getCart, quantity)}
            >
              <AiFillCaretLeft />
            </button>
            <input
              className="form-control form-control-sm border-0 shadow-0 p-0"
              type="text"
              value={quantity}
              onChange={handlerChangeText}
            />
            <button
              className="inc-btn p-0"
              style={{ cursor: "pointer" }}
              onClick={() => handlerUp(idUser, getCart, quantity)}
            >
              <AiFillCaretRight />
            </button>
          </div>
          <div className="align-middle border-0">
            <p className="mb-0 small">
              {parseInt(dataProduct.price) * parseInt(1)}₫
            </p>
          </div>
        </div>
        <div className="col-md-3 text-end">
          <a
            href="/cart"
            className="reset-anchor remove_cart"
            style={{ cursor: "pointer" }}
            onClick={() => handlerDelete(idUser, getCart)}
          >
            <i className="fas fa-trash-alt text-muted"></i>
          </a>
        </div>
        <div className="col-md-12 d-flex justify-content-between total-listcart">
          <p style={{ fontWeight: "700" }}>Thành tiền:</p>
          <p className="mb-0 small" style={{ color: "red", fontWeight: "700" }}>
            {parseInt(dataProduct.price) * parseInt(1)}₫
          </p>
        </div>
      </div>
    </div>
  );
}

export default ListCart;
