import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineExpand,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Card } from "react-bootstrap";

const CardProduct = (props) => {
  const itemsProducts = props.itemsProducts;
  return (
    <div className="w-100 d-flex">
      {itemsProducts &&
        itemsProducts.map((value) => (
          <div
            className="modal fade show"
            id={`product_${value._id}`}
            key={value._id}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-body p-0">
                  <div className="row align-items-stretch">
                    <div className="col-lg-6 p-lg-0">
                      <img
                        className="product-view w-100"
                        src={value.avt}
                        data-lightbox={`product_${value._id}`}
                      />
                    </div>
                    <div className="col-lg-6">
                      <a
                        className="close p-4"
                        type="button"
                        href="#section_product"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        ×
                      </a>
                      <div className="p-5 my-md-4">
                        <ul className="list-inline mb-2">
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                        </ul>
                        <h2 className="h4">{value.name}</h2>
                        <p className="text-muted">${value.price}</p>
                        <p className="text-small mb-4">{value.description}</p>
                        <div className="row align-items-stretch mb-4">
                          <div className="col-sm-12 pl-sm-0 fix_addwish mb-2">
                            <button
                              type="button"
                              className="btn-warning btn btn-sm btn-block"
                            >
                              <AiOutlineShoppingCart /> Thêm giỏ hàng
                            </button>
                          </div>
                          <div className="col-sm-12 pl-sm-0 fix_addwish">
                            <a className="btn btn-dark btn-sm btn-block">
                              <i className="far fa-heart mr-2"></i>Thêm danh
                              sách yêu thích
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {itemsProducts.map((value, key) => (
        <div className="col-lg-4 col-sm-6 Section_Category" key={key}>
          <div className="product">
            <div className="position-relative mb-3 product-new">
              <Link className="d-block" to={`/detail/${value._id}`}>
                <Card.Img
                  className="img-banner"
                  src={value.avt}
                  alt="..."
                ></Card.Img>
              </Link>
              <div className="product-overlay">
                <ul className="">
                  <li className="list-item-overlay">
                    <a
                      className="btn btn-sm btn-outline-dark"
                      href={`#product_${value._id}`}
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
                <button type="button" className="btn-addtocart">
                  <AiOutlineShoppingCart /> Thêm giỏ hàng
                </button>
              </div>
            </div>
            <Card.Link
              href={`detail/${value._id}`}
              className="title-product h5"
            >
              {value.name}
            </Card.Link>
            {value.promotionPrice === "" ? (
              <Card.Text>{value.price}₫</Card.Text>
            ) : (
              <Card.Text style={{ color: "red" }}>
                {value.promotionPrice}₫
                <span style={{ color: "grey", paddingLeft: "10px" }}>
                  <del>{value.price}₫</del>
                </span>
              </Card.Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardProduct;
