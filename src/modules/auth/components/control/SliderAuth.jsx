import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

SwiperCore.use([Navigation, Pagination, Autoplay]);
const SliderAuth = ({ data }) => {
    return (
        <Swiper style={{ height: "100%" }} slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
                delay: 1800
            }}
            pagination={{
                clickable: true
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper">
            {data.map((course, index) => (
                <SwiperSlide key={index} style={{ height: "100%" }}>
                    <div className='img_auth-container' style={{ width: "100%", height: "100%" }}>
                        <img style={{ width: "100%", height: "100%" }} className='img_auth' src={course} alt="" />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SliderAuth