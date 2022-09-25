import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);

const CSlider = ({ data }) => {
    return (
        <Swiper watchSlidesProgress={true} spaceBetween={10} slidesPerView={4.5} className="mySwiper" navigation={true}>
            {data.map((course, index) => (
                <SwiperSlide key={index}>{course}</SwiperSlide>
            ))}
        </Swiper>
    )
}

export default CSlider