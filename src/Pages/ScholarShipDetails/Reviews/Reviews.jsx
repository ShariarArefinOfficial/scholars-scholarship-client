//import React from 'react';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const Reviews = ({scholarship}) => {
   const { reviews } =scholarship;
   //console.log(reviews)

    return (
        <div>
           <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

 {
    reviews.map((review,idx) => <SwiperSlide
        key={idx}
    >
        <div className="flex flex-col items-center mx-24 my-16">
            <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
            />
            <p className="py-8">{review.comment}</p>
            <h3 className="text-2xl text-orange-400">{review.user_name}</h3>
        </div>
    </SwiperSlide>)
} 
</Swiper>
        </div>
    );
};

export default Reviews;