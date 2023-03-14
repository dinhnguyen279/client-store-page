import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Image from "../../Share/img/Image";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import axios from "axios";
import { HOST } from "../../domain/host/host";

function ListCart(props) {

  const listProduct = props.getCart;
  const onDeleteCart = props.onDeleteCart;
  const onUpdateCount = props.onUpdateCount;

  const handlerChangeText = (e) => {
    console.log(e.target.value);
  };

  const handlerDelete = (getUser, getProduct, getQuantity) => {
    if (!onDeleteCart) {
      return;
    }
    onDeleteCart(getUser, getProduct, getQuantity);
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
    console.log(getCount);
    //   Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
    const updateCount = parseInt(getCount) + 1;
    console.log(updateCount);

    onUpdateCount(getIdUser, getIdProduct, updateCount);
  };

  return (
    <>
      {listProduct.map((val, key) => (
        <div className="mb-4" key={key + 1}>
          <div className="row listcart-product position-relative">
            <div className="col-md-3 mb-3">
              <Link className="reset-anchor d-block animsition-link">
                <Card.Img src={val.img} />
              </Link>
            </div>
            <div className="col-md-6">
              <Card.Title className="mb-3">{val.nameProduct}</Card.Title>
              <Card.Subtitle className="mb-3">Size {val.size}</Card.Subtitle>
              <div className="quantity">
                <button
                  className="dec-btn p-0"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlerDown(val.idUser, val.idProduct, val.quantity)}
                >
                  <AiFillCaretLeft />
                </button>
                <input
                  className="form-control form-control-sm border-0 shadow-0 p-0"
                  type="text"
                  value={val.quantity}
                  onChange={handlerChangeText}
                />
                <button
                  className="inc-btn p-0"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlerUp(val.idUser, val.idProduct, val.quantity)}
                >
                  <AiFillCaretRight />
                </button>
              </div>
              <div className="align-middle border-0">
                <p className="mb-0 small">
                  {parseInt(val.promotionPrice ? val.promotionPrice : val.price) * parseInt(val.quantity)}₫
                </p>
              </div>
            </div>
            <div className="col-md-3 text-end">
              <a
                href="/cart"
                className="reset-anchor remove_cart"
                style={{ cursor: "pointer" }}
                onClick={() => handlerDelete(val.idUser, val.idProduct, val.quantity)}
              >
                <i className="fas fa-trash-alt text-muted"></i>
              </a>
            </div>
            <div className="col-md-12 d-flex justify-content-between total-listcart">
              <p style={{ fontWeight: "700" }}>Thành tiền:</p>
              <p
                className="mb-0 small"
                style={{ color: "red", fontWeight: "700" }}
              >
                {parseInt(val.promotionPrice ? val.promotionPrice : val.price) * parseInt(val.quantity)}₫
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ListCart;
