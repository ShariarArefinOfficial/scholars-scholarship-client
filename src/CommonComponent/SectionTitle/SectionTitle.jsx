//import React from 'react';

const SectionTitle = ({heading, description}) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-8">       
        <h3 className="text-3xl uppercase border-y-4 border-orange-500 py-4">{heading}</h3>
        <p className=" text-gray-500 py-4"> {description} </p>
    </div>
    );
};

export default SectionTitle;