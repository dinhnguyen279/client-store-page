import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineExpand, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { Card } from 'react-bootstrap';
import { func } from 'prop-types';

Products.propTypes = {
    products: PropTypes.array,
    sort: PropTypes.string,
};

Products.defaultProps = {
    products: [],
    sort: ''
}

function Products(props) {

    const { products, sort } = props

    if (sort === 'DownToUp') {
        products.sort((a, b) => {
            return a.price - b.price
        });
    }
    else if (sort === 'UpToDown') {
        products.sort((a, b) => {
            return b.price - a.price
        });
    }

    return (
        <div className="row">
            {
                products && products.map(value => (
                    <div className="col-lg-4 col-sm-6 Section_Category" key={value._id}>
                        <div className="product text-center">
                            <div className="position-relative mb-3 product-new">
                                <div className="badge text-white badge-"></div>
                                <Link className="d-block" to={`/detail/${value._id}`}>
                                    <img className="img-fluid w-100" src={value.avt} alt="..." />
                                </Link>
                                <div className="product-overlay">
                                    <ul className="">
                                        <li className="list-item-overlay">
                                            {/* Dùng Modal phải có href để nó hiện ra thằng đó và thuộc tính data-toggle="modal" để mở modal */}
                                            <a className="btn btn-sm btn-outline-dark" href={`#product_${value._id}`} data-toggle="modal">
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
                                    <button type='button' className='btn-addtocart' ><AiOutlineShoppingCart /> Thêm giỏ hàng</button>
                                </div>
                            </div>
                            <Card.Link href={`detail/${value._id}`} className='title-product h5'>{value.name}</Card.Link>
                            {
                                value.promotionPrice === "" ? (
                                    <Card.Text>
                                        {value.price}₫
                                    </Card.Text>
                                ) : (
                                    <Card.Text style={{ color: "red" }}>{value.promotionPrice}₫
                                        <span style={{ color: "grey", paddingLeft: "10px" }}>
                                            <del>{value.price}₫</del>
                                        </span>
                                    </Card.Text>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </div >
    );
}

export default Products;