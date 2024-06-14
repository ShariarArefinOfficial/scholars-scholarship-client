//import React from 'react';

import { useLoaderData } from "react-router-dom";

const ScholarShipDetails = () => {
    const scholarship=useLoaderData()
    console.log(scholarship)
    const {
        university_name,
        scholarship_category,
        application_deadline,
        application_fees,
        subject_name,
        post_date,
        degree_name,
        scholarship_description,
        university_location

      } = scholarship;
      console.log(university_name)
    return (
        <div className=" max-w-7xl mx-auto">
            <div className="flex justify-center items-center my-5">
                <img 
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" 
                alt=""
                className="rounded-xl"
                />
            </div>
            <div className=" max-w-4xl mx-auto  my-10">
                <h2 className=" text-center text-3xl text-orange-500 font-bold">{university_name}</h2>
                <div className="my-5 space-y-3" >
                    <p className=" font-medium"><span className="text-xl font-bold mr-4 text-orange-500">Degree Name :</span> {degree_name} </p>
                    <p className=" font-medium"><span className="text-xl font-bold mr-4 text-orange-500"> ScholarShip Description :</span> {scholarship_description} </p>
                    <p className=" font-medium"><span className="text-xl font-bold mr-4 text-orange-500">ScholarShip Category :</span> {scholarship_category} </p>
                    <p className=" font-medium"><span className="text-xl font-bold mr-4 text-orange-500">Subject Name :</span> {subject_name} </p>
                    <p className=" font-medium"><span className="text-xl font-bold mr-4 text-orange-500">Post Date :</span> {post_date} </p>

                    <p className=" font-medium"><span className="text-xl font-bold mr-4 text-orange-500">DeadLine :</span> {application_deadline} </p>
                    <p className=" font-medium"><span className="text-xl font-bold mr-4 text-orange-500">Location :</span><br /> City : {university_location.city} <br /> Country : {university_location.country} </p>

                </div>
                <div className="text-center my-10">
                    <button className="btn bg-orange-500 text-white">Apply This ScholarShip</button>
                </div>
            </div>

            
        </div>
    );
};

export default ScholarShipDetails;
