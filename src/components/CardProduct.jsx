import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Image from '../Share/img/Image'

const CardProduct = (props) => {
    const itemProduct = props.itemProduct
    return (
        <>
            <header className="text-center">
                <h2 className="h2 text-uppercase mb-4">Top sản phẩm nổi bật</h2>
            </header>
            <div className='row card-product'>
                <div className='col-md-12 col-xl-4 col-sm-12'>
                    <Card.Img src={Image.collection}></Card.Img>
                </div>
                {
                    itemProduct && itemProduct.map(value => (
                        <div className="col-md-6 col-xl-2 col-sm-6" key={value._id}>
                            <div className="product">
                                <div className="position-relative mb-3">
                                    {/* <div className="badge text-white"></div> */}
                                    <Link className="d-block" to={`/detail/${value._id}`}>
                                        <Card.Img src={value.avt} alt='...'></Card.Img>
                                    </Link>

                                    <div className="product-overlay">
                                        <ul className="mb-0 list-inline">
                                            <li className="list-inline-item m-0 p-0">
                                                <a className="btn btn-sm btn-outline-dark icon-product">
                                                    <i className="far fa-heart"></i>
                                                </a>
                                            </li>
                                            <li className="list-inline-item m-0 p-0">
                                                <Link className="btn btn-sm btn-dark" to={`/detail/${value._id}`}>
                                                    Thông tin sản phẩm
                                                </Link>
                                            </li>
                                            <li className="list-inline-item mr-0">
                                                {/* Dùng Modal phải có href để nó hiện ra thằng đó và thuộc tính data-toggle="modal" để mở modal*/}
                                                <a className="btn btn-sm btn-outline-dark" href={`#product_${value._id}`} data-toggle="modal">
                                                    <i className="fas fa-expand"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <Card.Title className='title-product'>{value.name}</Card.Title>
                                <Card.Text style={{ color: "red" }}>{value.reducedPrice}₫
                                    <span style={{ color: "grey", paddingLeft: "10px" }}>
                                        <del>{value.price}₫</del>
                                    </span>
                                </Card.Text>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default CardProduct