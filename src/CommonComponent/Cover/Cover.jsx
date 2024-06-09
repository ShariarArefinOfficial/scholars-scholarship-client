//import React from 'react';
import { Parallax } from 'react-parallax';
import img1 from '../../assets/scholarships-hero.jpg'

const Cover = ({title}) => {
    return (
        <Parallax
           
            bgImage={img1}
           
            
        >
            <div className="hero h-[500px]">
                <div className="hero-overlay "></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md border-y-2 border-orange-500">
                        <h1 className="mb-5 text-5xl font-bold uppercase text-orange-500">{title}</h1>

                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default Cover;