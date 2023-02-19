import React, { useEffect, useState } from 'react';
import Image from '../Share/img/Image'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from '../components/Carousel';
import ProductAPI from '../API/ProductAPI';

function Home(props) {

    const [products, setProducts] = useState([])
    // const URL_PRODUCT = 'http://localhost:3003/products'

    //Fetch Product
    useEffect(() => {

        const fetchData = async () => {

            // const response = await axios.get(URL_PRODUCT)
            // const data = response.data.splice(0, 8)
            // console.log("data products", data);
            // setProducts(data)

            const response = await ProductAPI.getAPI()

            const data = response.data.splice(0, 8)
            setProducts(data)

        }

        fetchData()

    }, [])


    return (
        <div className="page-holder m-t-10">
            <header className="header bg-white">
                {/* popover of products */}
                {
                    products && products.map(value => (
                        <div className="modal fade show" id={`product_${value._id}`} key={value._id}>
                            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-body p-0">
                                        <div className="row align-items-stretch">
                                            <div className="col-lg-6 p-lg-0">
                                                <img style={{ width: '100%' }} className="product-view d-block h-100 bg-cover bg-center" src={value.avt} data-lightbox={`product_${value._id}`} />
                                                {/* <img className="d-none" href={value.album} />
                                                <img className="d-none" href={value.avt} /> */}
                                            </div>
                                            <div className="col-lg-6">
                                                {/* Để tắt modal phải có class="close" và data-dissmiss="modal" và aria-label="Close" */}
                                                <a className="close p-4" type="button" href="#section_product" data-dismiss="modal" aria-label="Close">×</a>
                                                <div className="p-5 my-md-4">
                                                    <ul className="list-inline mb-2">
                                                        <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                        <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                        <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                        <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                        <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    </ul>
                                                    <h2 className="h4">{value.name}</h2>
                                                    <p className="text-muted">${value.price}</p>
                                                    <p className="text-small mb-4">{value.description}</p>
                                                    <div className="row align-items-stretch mb-4">
                                                        <div className="col-sm-5 pl-sm-0 fix_addwish">
                                                            <a className="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0">
                                                                <i className="far fa-heart mr-2"></i>Thêm yêu thích</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div >
                                    </div >
                                </div >
                            </div >
                        </div >
                    ))
                }


                <div className="container-fluid">
                    {/* Banner */}
                    <section>
                        <Carousel />
                    </section>



                    {/* dịch vụ */}
                    <section className="py-5 bg-light mt-5">
                        <div className="container p-0">
                            <div className="row text-center">
                                <div className="col-lg-4 mb-3 mb-lg-0">
                                    <div className="d-inline-block">
                                        <div className="media align-items-end">
                                            <svg className="svg-icon svg-icon-big svg-icon-light">
                                                <use xlinkHref="#delivery-time-1"></use>
                                            </svg>
                                            <div className="media-body text-left ml-3">
                                                <h6 className="text-uppercase mb-1">Miễn phí vận chuyển</h6>
                                                <p className="text-small mb-0 text-muted">Miễn phí vận chuyển</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3 mb-lg-0">
                                    <div className="d-inline-block">
                                        <div className="media align-items-end">
                                            <svg className="svg-icon svg-icon-big svg-icon-light">
                                                <use xlinkHref="#helpline-24h-1"> </use>
                                            </svg>
                                            <div className="media-body text-left ml-3">
                                                <h6 className="text-uppercase mb-1">Mẫu mã đa dạng</h6>
                                                <p className="text-small mb-0 text-muted">Mẫu mã đa dạng chính hãng</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="d-inline-block">
                                        <div className="media align-items-end">
                                            <svg className="svg-icon svg-icon-big svg-icon-light">
                                                <use xlinkHref="#label-tag-1"></use>
                                            </svg>
                                            <div className="media-body text-left ml-3">
                                                <h6 className="text-uppercase mb-1">Chính sách bảo hành</h6>
                                                <p className="text-small mb-0 text-muted">Bảo hành cam kết 12 tháng</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Giới thiệu danh mục */}
                    <section className="pt-5">
                        <header className="text-center">
                            <h2 className="h5 text-uppercase mb-4">Các sản phẩm của chúng tôi</h2>
                        </header>
                        <div className="row">
                            <div className="col-md-4 mb-4 mb-md-0">
                                <Link className="category-item" to={'/shop'}>
                                    <img className="img-fluid" src={Image.img1} alt="" />
                                    <strong className="category-item-title">Áo</strong>
                                </Link>
                            </div>
                            <div className="col-md-4 mb-4 mb-md-0">
                                <Link className="category-item mb-4" to={'/shop'}>
                                    <img className="img-fluid" src={Image.img2} alt="" />
                                    <strong className="category-item-title">Giày</strong>
                                </Link>
                                <Link className="category-item" to={'/shop'}>
                                    <img className="img-fluid" src={Image.img3} alt="" />
                                    <strong className="category-item-title">Bóng</strong>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link className="category-item" to={'/shop'}>
                                    <img className="img-fluid" src={Image.img4} alt="" />
                                    <strong className="category-item-title">iPad</strong>
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section className="py-5" id="section_product">
                        <header>
                            <h2 className="h5 text-uppercase mb-4">Top sản phẩm bán chạy</h2>
                        </header>
                        <div className="row">
                            {
                                products && products.map(value => (
                                    <div className="col-xl-3 col-lg-4 col-sm-6" key={value._id}>
                                        <div className="product text-center">
                                            <div className="position-relative mb-3">
                                                <div className="badge text-white badge-"></div>
                                                <Link className="d-block" to={`/detail/${value._id}`}>
                                                    <img className="img-fluid w-50" src={value.avt} alt="..." />
                                                </Link>
                                                <div className="product-overlay">
                                                    <ul className="mb-0 list-inline">
                                                        <li className="list-inline-item m-0 p-0"><a className="btn btn-sm btn-outline-dark"><i className="far fa-heart"></i></a></li>
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
                                            <h6 className="reset-anchor">{value.name}</h6>
                                            <i className="small text-muted">${value.price}</i>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                    <section className="py-5 bg-light">
                        <div className="container p-0">
                            <div className="row">
                                <div className="col-lg-6 mb-3 mb-lg-0">
                                    <h5 className="text-uppercase">Đăng ký thành viên</h5>
                                    <p className="text-small text-muted mb-0">Nisi nisi tempor consequat laboris nisi.</p>
                                </div>
                                <div className="col-lg-6">
                                    <form action="#">
                                        <div className="d-flex flex-column flex-sm-row mb-3">
                                            <input className="form-control py-3" type="email" placeholder="Enter your email address" aria-describedby="button-addon2" />
                                            <div className="input-group-append">
                                                <button className="btn btn-dark btn-block" id="button-addon2" type="submit">Subscribe</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </header >
        </div >
    );
}

export default Home;