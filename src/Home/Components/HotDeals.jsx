import React from 'react'
import { Card } from 'react-bootstrap'
import { AiOutlineExpand, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Image from '../../Share/img/Image'

const HotDeals = (props) => {
    const itemHotDeals = props.itemHotDeals
    return (
        <>
            <div className="row">
                <div className="col-md-12 col-xl-4 col-sm-6">
                    <Card.Img className='img-banner' src={Image.product_under_banner} alt="..." />
                </div>
                {
                    itemHotDeals.map((val, idx) => {
                        return (
                            <div className="col-md-6 col-xl-2 col-sm-6 product-hot-deals">
                                <div className='mb-3 card-product-endPage'>
                                    <Link className="d-block" to={`/detail/${val._id}`}>
                                        <Card.Img className='img-banner' src={val.avt} alt='...'></Card.Img>
                                    </Link>
                                    <div className='product-sale'>
                                        <div className='content-product-sale'>
                                            <span>-30%</span>
                                        </div>
                                    </div>
                                    <div className="product-overlay">
                                        <ul className="">
                                            <li className="list-item-overlay">
                                                {/* Dùng Modal phải có href để nó hiện ra thằng đó và thuộc tính data-toggle="modal" để mở modal */}
                                                <a className="btn btn-sm btn-outline-dark" href={`#product_${val._id}`} data-toggle="modal">
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
                                <Card.Link href={`detail/${val._id}`} className='title-product h5'>{val.name}</Card.Link>
                                <Card.Text style={{ color: "red" }}>{val.promotionPrice}₫
                                    <span style={{ color: "grey", paddingLeft: "10px" }}>
                                        <del>{val.price}₫</del>
                                    </span>
                                </Card.Text>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default HotDeals