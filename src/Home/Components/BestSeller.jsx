import React from 'react'
import { Card } from 'react-bootstrap'
import { AiOutlineExpand, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const BestSeller = (props) => {
    const itemBestSeller = props.itemBestSeller
    return (
        <>
            <div className='row card-product'>
                {
                    itemBestSeller && itemBestSeller.map(value => (
                        <div className="col-md-6 col-xl-3 col-sm-6" key={value._id}>
                            <div className="product product-bestseller">
                                <div className="position-relative mb-3">
                                    <Link className="d-block h-100" to={`/detail/${value._id}`}>
                                        <Card.Img src={value.avt} alt='...'></Card.Img>
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
                                    </div >
                                    <div>
                                        <button type='button' className='btn-addtocart'><AiOutlineShoppingCart /> Thêm giỏ hàng</button>
                                    </div>
                                </div >
                                <Card.Link href={`detail/${value._id}`} className='title-product'>{value.name}</Card.Link>
                                <Card.Text style={{ color: "red" }}>{value.promotionPrice}₫
                                    <span style={{ color: "grey", paddingLeft: "10px" }}>
                                        <del>{value.price}₫</del>
                                    </span>
                                </Card.Text>
                            </div >
                        </div >
                    ))
                }
            </div >
        </>
    )
}

export default BestSeller