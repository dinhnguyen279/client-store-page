import React, { useEffect, useState } from 'react';
import Image from '../Share/img/Image'
import { Link } from 'react-router-dom';
import Carousel from './Components/Carousel';
import ProductAPI from '../API/ProductAPI';
import { Card } from 'react-bootstrap';
import { AiOutlineExpand, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import Featured from './Components/Featured';
import BestSeller from './Components/BestSeller';
import HotDeals from './Components/HotDeals';
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

    const [navContent, setNavContent] = useState("nav1")

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
                                                <img className="product-view w-100" src={value.avt} data-lightbox={`product_${value._id}`} />
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
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-12 col-sm-12 col-xl-6 col-xs-12 main-banner'>
                                    <Link to={"/abcs"}>
                                        <div>
                                            <img className='img-banner' src={Image.categorybanner1} alt="" />
                                        </div>
                                        <div className='content-banner'>
                                            <p>Cập nhật mẫu mới nhất</p>
                                            <h3 className='banner-item'>Giày Đá Banh Cỏ Nhân Tạo</h3>
                                            <p className='action-banner'>
                                                <span className='button'>
                                                    Xem Ngay
                                                </span>
                                            </p>
                                        </div>
                                    </Link>
                                </div>

                                <div className='col-md-6 col-sm-12 col-xl-3 col-xs-12 main-banner'>
                                    <Link to={"/abcs"}>
                                        <div>
                                            <img className='img-banner' src={Image.categorybanner2} alt="" />
                                        </div>
                                        <div className='content-banner'>
                                            <p>Cập Nhật Mẫu 2023</p>
                                            <h3>Quần Áo Bóng Đá</h3>
                                            <p className='action-banner'>
                                                <span className='button'>
                                                    Xem Ngay
                                                </span>
                                            </p>
                                        </div>
                                    </Link>
                                </div>

                                <div className='col-md-6 col-sm-12 col-xl-3 col-xs-12 main-banner'>
                                    <Link to={"/abcs"}>
                                        <div>
                                            <img className='img-banner' src={Image.categorybanner3} alt="" />
                                        </div>
                                        <div className='content-banner'>
                                            <p>New Arrival 2023</p>
                                            <h3 className='banner-item'>Phụ Kiện Bóng Đá</h3>
                                            <p className='action-banner'>
                                                <span className='button'>
                                                    Xem Ngay
                                                </span>
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sản phẩm nổi bật */}
                    <section className="py-5" id="section_product">
                        <header className="text-center">
                            <h2 className="h2 text-uppercase mb-4">Top sản phẩm nổi bật</h2>
                        </header>
                        <Featured itemProduct={products} />
                    </section>

                    <section>
                        <div className='container m-b-40 m-t-40 zoom-img'>
                            <Card.Img className='img-banner' src={Image.home_collection_banner} />
                        </div>
                    </section>

                    <section className='bg-light band-select'>
                        <div className='container p-t-30 p-b-30'>
                            <Card.Title style={{ marginBottom: "30px" }}>
                                <h3> Quần Áo Đá Banh Mới Nhất</h3>
                            </Card.Title>
                            <div className="images">
                                <div className="images-item">
                                    <Card.Img src={Image.lookbooks_1} />
                                    <div className='p-t-10'>
                                        <p style={{ fontSize: "18px", paddingBottom: "10px" }}>Buibal Falcon</p>
                                        <span className='text-uppercase text-lookbook' style={{ fontFamily: "sans-serif" }}>In ấn miễn phí</span>
                                    </div>
                                </div>
                                <div className="images-item">
                                    <Card.Img src={Image.lookbooks_2} />
                                    <div className='p-t-10'>
                                        <p style={{ fontSize: "18px", paddingBottom: "10px" }}>Quần Áo Bóng Đá Thái Lan</p>
                                        <span className='text-uppercase text-lookbook' style={{ fontFamily: "sans-serif" }}>In ấn font xịn</span>
                                    </div>
                                </div>
                                <div className="images-item">
                                    <Card.Img src={Image.lookbooks_3} />
                                    <div className='p-t-10'>
                                        <p style={{ fontSize: "18px", paddingBottom: "10px" }}>Quần Áo Đá Banh Trẻ Em Mới Nhất</p>
                                        <span className='text-uppercase text-lookbook' style={{ fontFamily: "sans-serif" }}>In ấn miễn phí</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Best Seller */}
                    <section className='py-5 container'>
                        <header className="text-center">
                            <h2 className="h2 text-uppercase mb-4">Best Seller</h2>
                        </header>
                        <BestSeller itemBestSeller={products} />
                    </section>

                    <section className='container'>
                        <div className='row main-product-hot'>
                            <div className="col-md-6 col-xs-12 img-product-hot">
                                <Card.Img className='img-banner' src={Image.pro_featured} />
                            </div>
                            <div className="col-md-6 col-xs-12 text-center body-product">
                                <p>Giày đá bóng</p>
                                <Card.Title> <h1> KAMITO TA11 </h1></Card.Title>
                                <div className='body-title-product'>
                                    <button className={`${navContent === "nav1" ? "text-dark" : "text-gray"}`} onClick={() => setNavContent("nav1")}>
                                        THÔNG RIN TA11
                                    </button>
                                    <button className={`${navContent === "nav2" ? "text-dark" : "text-gray"}`} onClick={() => setNavContent("nav2")}>
                                        TA11 CÓ GÌ MỚI?
                                    </button>
                                    <button className={`${navContent === "nav3" ? "text-dark" : "text-gray"}`} onClick={() => setNavContent("nav3")}>
                                        SIZE
                                    </button>
                                </div>
                                <div className='content-product m-b-10'>
                                    {navContent === "nav1" ? (
                                        <div>
                                            <p>
                                                <b> KAMITO TA11 </b> – mẫu giày mang đậm dấu ẩn của tuyển thủ
                                                <i> <b> Nguyễn Tuấn Anh </b> </i> sẽ mang đến cho bạn một trải nghiệm hoàn
                                                toàn khác biệt.
                                            </p>
                                            <p>
                                                Được áp dụng các công nghệ mới nhất như <b> KA-Spin, KA-Fit,
                                                    KA-Fiber </b> và đặc biệt là bộ đế giảm chấn <b> KA-Comfort </b>, KAMITO
                                                TA11 sẽ giúp bạn thi đấu thăng hoa và làm chủ hoàn toàn cuộc chơi.
                                            </p>
                                        </div>
                                    ) : " "}

                                    {navContent === "nav2" ? (
                                        <div>
                                            <p>
                                                Lớp da KA-FIBER ULTRA siêu mềm, tạo cảm giác như đi chân trần và với lớp da mới này, độ bền cũng đã được nâng cấp lên một tầm cao mới. <br />

                                                ✅ Thiết kế đặc biệt với những vân kim cương nổi trên thân giày, vừa tạo tính thẩm mỹ vừa hỗ trợ kiểm soát bóng tối ưu.<br />

                                                ✅ Bộ đế giày áp dụng công nghệ KA-SPIN với dàn đinh dăm được sắp xếp khoa học, giúp bám sân hiệu quả ngay cả khi trời mưa sân trơn bóng ướt.<br />

                                                ✅ Form giày áp dụng chuẩn KA-FIT, ôm sát và phù hợp với bàn chân người Việt.
                                            </p>

                                        </div>
                                    ) : " "}
                                    {navContent === "nav3" ? (
                                        <div>
                                            <p>
                                                Size: 38, 39, 40, 41, 42, 43
                                            </p>
                                        </div>
                                    ) : " "}

                                </div>
                                <button className='btn-view'>
                                    XEM NGAY
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Hot Deals */}
                    <section className='py-5'>
                        <header className="text-center">
                            <h2 className="text-uppercase mb-4">Hot Deals 2023</h2>
                        </header>
                        <HotDeals itemHotDeals={products} />
                    </section>

                    <section className="py-5">
                        <Card.Title className='text-center'><h2> Ảnh đẹp Sports Zone</h2></Card.Title>
                        <div className='post-grid'>
                            <div className="post-item"><Card.Img className='post-img' src={Image.Carouselendpage1} /></div>
                            <div className="post-item"><Card.Img className='post-img' src={Image.Carouselendpage2} /></div>
                            <div className="post-item"><Card.Img className='post-img' src={Image.Carouselendpage3} /></div>
                            <div className="post-item"><Card.Img className='post-img' src={Image.Carouselendpage4} /></div>
                            <div className="post-item"><Card.Img className='post-img' src={Image.Carouselendpage5} /></div>
                            <div className="post-item"><Card.Img className='post-img' src={Image.Carouselendpage6} /></div>
                        </div>
                    </section>
                </div>
            </header >
        </div >
    );
}

export default Home;