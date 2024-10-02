import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle";

const Category = () => {
  return (
    <div>
      <SectionTitle
        heading={"From 11.00am to 10.00pm"}
        subHeading={"Order Online"}
      />
      <Swiper
        slidesPerView={3}
        spaceBetween={-200}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slide1} alt="" />
          <h3 className="text-4xl ml-8 font-bold text-white/90 uppercase -mt-14">
            salad
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" />
          <h3 className="text-4xl ml-8 font-bold text-white/90 uppercase -mt-14">
            Pizza
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" />
          <h3 className="text-4xl ml-8 font-bold text-white/90 uppercase -mt-14">
            Soup
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="" />
          <h3 className="text-4xl ml-8 font-bold text-white/90 uppercase -mt-14">
            cake
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide5} alt="" />
          <h3 className="text-4xl ml-8 font-bold text-white/90 uppercase -mt-14">
            salad
          </h3>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Category;
