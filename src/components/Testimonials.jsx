import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState();
  useEffect(() => {
    fetch("https://bistro-boss-practive-recap-server.vercel.app/review")
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div className="text-center ">
      <SectionTitle
        heading={"What our client say"}
        subHeading={"testimonial"}
      />
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews?.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="m-24 flex flex-col items-center">
              <Rating
                style={{ maxWidth: 180 }}
                value={review?.rating}
                readonly
              />
              <p className="my-4">{review.details}</p>
              <h2 className="text-orange-500 text-3xl">{review?.name}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
