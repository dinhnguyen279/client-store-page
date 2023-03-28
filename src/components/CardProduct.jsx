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

  return (
    <div className="product">
      <div className="position-relative mb-3 product-new">
        <a className="d-block" href={`/detail/${itemProduct._id}`}>
          <Card.Img
            className="img-banner"
            src={itemProduct.avt}
            alt="..."
          ></Card.Img>
        </a>
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
          <a
            type="button"
            className="btn-addtocart"
            href={`/detail/${itemProduct._id}`}
          >
            Thông tin sản phẩm
          </a>
        </div>
      </div>
      <Card.Link
        href={`detail/${itemProduct._id}`}
        className="title-product h6"
      >
        {itemProduct.name}
      </Card.Link>
      {itemProduct.promotionPrice === "" ? (
        <Card.Text>{parseInt(itemProduct.price).toLocaleString()}₫</Card.Text>
      ) : (
        <Card.Text style={{ color: "red" }}>
          {(parseInt(itemProduct.promotionPrice)).toLocaleString()}₫
          <span style={{ color: "grey", paddingLeft: "10px" }}>
            <del>{parseInt(itemProduct.price).toLocaleString()}₫</del>
          </span>
        </Card.Text>
      )}
    </div>
  );
};

export default CardProduct;
