//import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../../assets/hero/harvard-university-campus.jpg'
import img2 from '../../../assets/hero/london.jpg'
import img3 from '../../../assets/hero/Students-graduating-in-London.jpg'


const Hero = () => {
    
    return (
        <div>
            <Carousel>
        <div className="h-[500px]">
            <img src={img1}  className="h-full" />
        </div>
        <div className="h-[500px]">
            <img src={img2} className="h-full" />
        </div>
        <div className="h-[500px]">
            <img src={img3} className="h-full"/>
        </div>
        
    </Carousel>
            
        </div>
    );
};

export default Hero;