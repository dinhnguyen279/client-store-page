import React from 'react'
import { Card } from 'react-bootstrap'
import { AiOutlineExpand, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const BestSeller = (props) => {
    const productSale = props.productSale
    console.log("test", productSale);
    return (
        <>
            <header className="text-center">
                <h2 className="h2 text-uppercase mb-4">Best Seller</h2>
            </header>
            <div className='row card-product'>
                {
                    productSale && productSale.map(value => (
                        <div className="col-md-6 col-xl-3 col-sm-6" key={value._id}>
                            <div className="product product-bestseller">
                                <div className="position-relative mb-3">
                                    {/* <div className="badge text-white"></div> */}
                                    <Link className="d-block h-100" to={`/detail/${value._id}`}>
                                        <Card.Img src={value.avt} alt='...'></Card.Img>
                                    </Link>

                                    <div className="product-overlay-bestseller">
                                        <ul className="">
                                            <li className="list-item-bestseller">
                                                {/* Dùng Modal phải có href để nó hiện ra thằng đó và thuộc tính data-toggle="modal" để mở modal */}
                                                <a className="btn btn-sm btn-outline-dark" href={`#product_${value._id}`} data-toggle="modal">
                                                    <AiOutlineExpand />
                                                </a>
                                            </li>
                                            <li className="list-item-bestseller">
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
                                <Card.Title className='title-product'>{value.name}</Card.Title>
                                <Card.Text style={{ color: "red" }}>{value.reducedPrice}₫
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