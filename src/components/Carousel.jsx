import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../css/Carousel.css"
import Image from '../Share/img/Image';

import { Navigation, Pagination, Autoplay } from "swiper";
import { Card } from 'react-bootstrap';
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
                    <Card.Img src={Image.banner1} alt="banner2" />
                </SwiperSlide>
                <SwiperSlide>
                    <Card.Img src={Image.banner2} alt="banner3" />
                </SwiperSlide>
                <SwiperSlide>
                    <Card.Img src={Image.banner3} alt="banner3" />
                </SwiperSlide>
                <SwiperSlide>
                    <Card.Img src={Image.banner4} alt="banner4" />
                </SwiperSlide>
                <SwiperSlide>
                    <Card.Img src={Image.banner5} alt="banner5" />
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