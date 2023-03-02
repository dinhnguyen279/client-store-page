import React from 'react'
import { Card } from 'react-bootstrap'
import { AiOutlineExpand, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import Image from '../Share/img/Image'

const HotDeals = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12 col-xl-4 col-sm-6">
                    <Card.Img className='img-banner' src={Image.product_under_banner} alt="..." />
                </div>
                <div className="col-md-6 col-xl-2 col-sm-6 product-hot-deals">
                    <div className='mb-3 card-product-endPage'>
                        <Card.Img className='img-banner' src={Image.product_1} alt="..." />
                        <Card.Img className='img-banner img-hidden' src={Image.product_1_1} alt="..." />
                        <div className='product-sale'>
                            <div className='content-product-sale'>
                                <span>-30%</span>
                            </div>
                        </div>
                        <div className="product-overlay">
                            <ul className="">
                                <li className="list-item-overlay">
                                    {/* Dùng Modal phải có href để nó hiện ra thằng đó và thuộc tính data-toggle="modal" để mở modal */}
                                    <a className="btn btn-sm btn-outline-dark" href={`#product_`} data-toggle="modal">
                                        <AiOutlineExpand />
                                    </a>
                                </li>
                                <li className="list-item-overlay">
                                    <a className="btn btn-sm btn-outline-dark">
                                        <AiOutlineHeart />
                                    </a>
                                </li>
                            </ul>
                        </div >
                        <button type='button' className='btn-addtocart'>
                            <AiOutlineShoppingCart /> Thêm giỏ hàng
                        </button>
                    </div>
                    <Card.Title className='title-product'>ÁO POLO NAM PORADA</Card.Title>
                    <Card.Text style={{ color: "red" }}>299,000₫
                        <span style={{ color: "grey", paddingLeft: "10px" }}>
                            <del>399,000₫</del>
                        </span>
                    </Card.Text>
                </div>
                <div className="col-md-6 col-xl-2 col-sm-6 product-hot-deals">
                    <div className='mb-3 card-product-endPage'>
                        <Card.Img className='img-banner' src={Image.product_1_1} alt="..." />
                        <Card.Img className='img-banner img-hidden' src={Image.product_1} alt="..." />
                        <div className='product-sale'>
                            <div className='content-product-sale'>
                                <span>-20%</span>
                            </div>
                        </div>
                        <div className="product-overlay">
                            <ul className="">
                                <li className="list-item-overlay">
                                    {/* Dùng Modal phải có href để nó hiện ra thằng đó và thuộc tính data-toggle="modal" để mở modal */}
                                    <a className="btn btn-sm btn-outline-dark" href={`#product_`} data-toggle="modal">
                                        <AiOutlineExpand />
                                    </a>
                                </li>
                                <li className="list-item-overlay">
                                    <a className="btn btn-sm btn-outline-dark">
                                        <AiOutlineHeart />
                                    </a>
                                </li>
                            </ul>
                        </div >
                        <button type='button' className='btn-addtocart'>
                            <AiOutlineShoppingCart /> Thêm giỏ hàng
                        </button>
                    </div>
                    <Card.Title className='title-product'>ÁO POLO NAM PORADA</Card.Title>
                    <Card.Text style={{ color: "red" }}>299,000₫
                        <span style={{ color: "grey", paddingLeft: "10px" }}>
                            <del>399,000₫</del>
                        </span>
                    </Card.Text>
                </div>
                <div className="col-md-6 col-xl-2 col-sm-6 product-hot-deals">
                    <div className='mb-3 card-product-endPage'>
                        <Card.Img className='img-banner' src={Image.product_1_1} alt="..." />
                        <Card.Img className='img-banner img-hidden' src={Image.product_1} alt="..." />
                        <div className='product-sale'>
                            <div className='content-product-sale'>
                                <span>-20%</span>
                            </div>
                        </div>
                        <div className="product-overlay">
                            <ul className="">
                                <li className="list-item-overlay">
                                    {/* Dùng Modal phải có href để nó hiện ra thằng đó và thuộc tính data-toggle="modal" để mở modal */}
                                    <a className="btn btn-sm btn-outline-dark" href={`#product_`} data-toggle="modal">
                                        <AiOutlineExpand />
                                    </a>
                                </li>
                                <li className="list-item-overlay">
                                    <a className="btn btn-sm btn-outline-dark">
                                        <AiOutlineHeart />
                                    </a>
                                </li>
                            </ul>
                        </div >
                        <button type='button' className='btn-addtocart'>
                            <AiOutlineShoppingCart /> Thêm giỏ hàng
                        </button>
                    </div>
                    <Card.Title className='title-product'>ÁO POLO NAM PORADA</Card.Title>
                    <Card.Text style={{ color: "red" }}>299,000₫
                        <span style={{ color: "grey", paddingLeft: "10px" }}>
                            <del>399,000₫</del>
                        </span>
                    </Card.Text>
                </div>
            </div>
        </>
    )
}

export default HotDeals