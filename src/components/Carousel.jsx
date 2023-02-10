import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../css/Carousel.css"
import Image from '../Share/img/Image';

import { Navigation, Pagination, Autoplay } from "swiper";
const Carousel = () => {

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="container py-5 content-carousel">
                        <div className="row px-4 px-lg-5">
                            <div className="col-lg-6">
                                <p className="text-muted small text-uppercase mb-2">Hỗ trợ trả góp 0đ</p>
                                <h1 className="h2 text-uppercase mb-3">iPhone 14 Pro Max</h1><a className="btn btn-dark" href="shop">Mua ngay</a>
                            </div>
                        </div>
                    </div>
                    <img src={Image.banner} alt="banner" />
                </SwiperSlide>
                <SwiperSlide>
                    <div className="container py-5 content-carousel">
                        <div className="row px-4 px-lg-5">
                            <div className="col-lg-6">
                                <p className="text-muted small text-uppercase mb-2">Hỗ trợ trả góp 0đ</p>
                                <h1 className="h2 text-uppercase mb-3">iPhone 14 Pro Max</h1><a className="btn btn-dark" href="shop">Mua ngay</a>
                            </div>
                        </div>
                    </div>
                    <img src={Image.banner2} alt="banner2" />
                </SwiperSlide>
                <SwiperSlide>
                    <div className="container py-5 content-carousel">
                        <div className="row px-4 px-lg-5">
                            <div className="col-lg-6">
                                <p className="text-muted small text-uppercase mb-2">Hỗ trợ trả góp 0đ</p>
                                <h1 className="h2 text-uppercase mb-3">iPhone 14 Pro Max</h1><a className="btn btn-dark" href="shop">Mua ngay</a>
                            </div>
                        </div>
                    </div>
                    <img src={Image.banner3} alt="banner3" />
                </SwiperSlide>
                <SwiperSlide>
                    <div className="container py-5 content-carousel">
                        <div className="row px-4 px-lg-5">
                            <div className="col-lg-6">
                                <p className="text-muted small text-uppercase mb-2">Hỗ trợ trả góp 0đ</p>
                                <h1 className="h2 text-uppercase mb-3">iPhone 14 Pro Max</h1><a className="btn btn-dark" href="shop">Mua ngay</a>
                            </div>
                        </div>
                    </div>
                    <img src={Image.banner4} alt="banner4" />
                </SwiperSlide>
                <SwiperSlide>
                    <div className="container py-5 content-carousel">
                        <div className="row px-4 px-lg-5">
                            <div className="col-lg-6">
                                <p className="text-muted small text-uppercase mb-2">Hỗ trợ trả góp 0đ</p>
                                <h1 className="h2 text-uppercase mb-3">iPhone 14 Pro Max</h1><a className="btn btn-dark" href="shop">Mua ngay</a>
                            </div>
                        </div>
                    </div>
                    <img src={Image.banner5} alt="banner5" />
                </SwiperSlide>
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </>
    )
}

export default Carousel