import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Image from "../../Share/img/Image"
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

ListCart.propTypes = {
    listCart: PropTypes.array,
    onDeleteCart: PropTypes.func,
    onUpdateCount: PropTypes.func
};

ListCart.defaultProps = {
    listCart: [],
    onDeleteCart: null,
    onUpdateCount: null
}

function ListCart(props) {

    const { listCart, onDeleteCart, onUpdateCount } = props

    const listProducts = listCart.data
    console.log('listProducts', listProducts);

    const handlerChangeText = (e) => {

        console.log(e.target.value)

    }

    const handlerDelete = (getUser, getProduct) => {

        if (!onDeleteCart) {
            return
        }

        onDeleteCart(getUser, getProduct)
    }

    const handlerDown = (getIdUser, getIdProduct, getCount) => {

        if (!onUpdateCount) {
            return
        }

        if (getCount === 1) {
            return
        }

        //Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
        const updateCount = parseInt(getCount) - 1

        onUpdateCount(getIdUser, getIdProduct, updateCount)

    }

    const handlerUp = (getIdUser, getIdProduct, getCount) => {

        if (!onUpdateCount) {
            return
        }

        //Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
        const updateCount = parseInt(getCount) + 1

        onUpdateCount(getIdUser, getIdProduct, updateCount)

    }

    return (
        <div className="mb-4">
            {
                listProducts && listProducts.map((value, index) => (
                    <>
                        <div className='row listcart-product position-relative' key={index}>
                            <div className='col-md-3 mb-3'>
                                <Link className="reset-anchor d-block animsition-link">
                                    <Card.Img src={Image.product_1} />
                                </Link>
                            </div>
                            <div className='col-md-6'>
                                <Card.Title className='mb-3'>{value.nameProduct}</Card.Title>
                                <Card.Subtitle className='mb-3'>Size {"S"}</Card.Subtitle>
                                <div className="quantity">
                                    <button className="dec-btn p-0"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handlerDown(value.idUser, value.idProduct, value.count)} >
                                        <AiFillCaretLeft />
                                    </button>
                                    <input
                                        className="form-control form-control-sm border-0 shadow-0 p-0"
                                        type="text"
                                        value={value.count}
                                        onChange={handlerChangeText} />
                                    <button className="inc-btn p-0"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handlerUp(value.idUser, value.idProduct, value.count)} >
                                        <AiFillCaretRight />
                                    </button>
                                </div>
                                <div className="align-middle border-0">
                                    <p className="mb-0 small">{parseInt(value.priceProduct) * parseInt(value.count)},000₫</p>
                                </div>
                            </div>
                            <div className='col-md-3 text-end'>
                                <a href='/cart'
                                    className="reset-anchor remove_cart"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handlerDelete(value.idUser, value.idProduct)}>
                                    <i className="fas fa-trash-alt text-muted"></i></a>
                            </div>
                            <div className='col-md-12 d-flex justify-content-between total-listcart'>
                                <p style={{ fontWeight: "700" }}>Thành tiền:</p>
                                <p className="mb-0 small" style={{ color: "red", fontWeight: "700" }}>{parseInt(value.priceProduct) * parseInt(value.count)},000₫</p>
                            </div>
                        </div>
                    </>

                    // {/*   // <tr className="text-center" key={index}>

                    //         //             <Link className="reset-anchor d-block animsition-link" to={`/detail/${value.idProduct}`}>
                    //         //                 <img src={value.img} alt="..." width="70" />
                    //         //             </Link>
                    //         //         </div>
                    //         //     
                    //         //             <Link className="reset-anchor h6 animsition-link" to={`/detail/${value.idProduct}`}>
                    //         //                 {value.nameProduct}
                    //         //             </Link>

                    //         //         <p className="mb-0 small">${value.priceProduct}</p>
                    //         //                 style={{ cursor: 'pointer' }}
                    //         //                 onClick={() => handlerDown(value.idUser, value.idProduct, value.count)} >
                    //         //                 <i className="fas fa-caret-left"></i>
                    //         //             </button>
                    //         //             <input
                    //         //                 className="form-control form-control-sm border-0 shadow-0 p-0"
                    //         //                 type="text"
                    //         //                 value={value.count}
                    //         //                 onChange={handlerChangeText} />
                    //         //             <button className="inc-btn p-0"
                    //         //                 style={{ cursor: 'pointer' }}
                    //         //                 onClick={() => handlerUp(value.idUser, value.idProduct, value.count)} >
                    //         //                 <i className="fas fa-caret-right"></i>
                    //         //             </button>
                    //         //         </div>
                    //         //     </td>
                    //         //     <td className="align-middle border-0">
                    //         //         <p className="mb-0 small">${parseInt(value.priceProduct) * parseInt(value.count)}</p>
                    //         //     </td>
                    //         //     <td className="align-middle border-0">
                    //         //         <a href='/'
                    //         //             className="reset-anchor remove_cart"
                    //         //             style={{ cursor: 'pointer' }}
                    //         //             onClick={() => handlerDelete(value.idUser, value.idProduct)}>
                    //         //             <i className="fas fa-trash-alt small text-muted"></i></a>
                    //         //     </td>
                    //         // </tr>*/}
                ))
            }
            {/* </tbody>
            </table> */}
        </div>
    );
}

export default ListCart;