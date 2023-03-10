import React from 'react'
import { Card } from 'react-bootstrap'
import { AiOutlineExpand, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Image from '../../Share/img/Image'
const Featured = (props) => {
    const itemProduct = props.itemProduct
    return (
        <>
            <div className='row card-product'>
                <div className='col-md-12 col-xl-4 col-sm-12'>
                    <Card.Img src={Image.collection}></Card.Img>
                </div>
                {
                    itemProduct && itemProduct.map(value => (
                        <div className="col-md-6 col-xl-2 col-sm-6" key={value._id}>
                            <div className="product">
                                <div className="position-relative mb-3 product-new">
                                    <Link className="d-block" to={`/detail/${value._id}`}>
                                        <Card.Img className='img-banner' src={value.avt} alt='...'></Card.Img>
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
                                        <button type='button' className='btn-addtocart'><AiOutlineShoppingCart /> Thêm giỏ hàng</button>
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
            </div>
        </>
    )
}

export default Featured