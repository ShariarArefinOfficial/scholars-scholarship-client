//import React from 'react';

import { useLoaderData } from "react-router-dom";
import Reviews from "./Reviews/Reviews";
import SectionTitle from "../../CommonComponent/SectionTitle/SectionTitle";
import PageTitle from "../../CommonComponent/PageTitle/PageTitle";

const heading='User Reviews'
const description='Explore genuine reviews from students who have benefited from our scholarship programs. Hear their stories, learn about their experiences, and see how these scholarships have impacted their educational journeys.'


const ScholarShipDetails = () => {
    const scholarship=useLoaderData()
   // console.log(scholarship)
    const {
        university_name,
        scholarship_category,
        application_deadline,
        application_fees,
        subject_name,
        post_date,
        degree_name,
        scholarship_description,
        university_location,
        reviews

      } = scholarship;
      const title=scholarship_category
     // console.log( title)
    return (
        <>
        <PageTitle title={title}></PageTitle>
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
                    <p className=" font-medium"><span className="text-xl font-bold mr-4 text-orange-500">Applicaition Fees :</span>$ {application_fees} </p>
                </div>
                <div className="text-center my-10">
                    <button className="btn bg-orange-500 text-white">Apply This ScholarShip</button>
                </div>
            </div>
            <SectionTitle heading={heading} description={description}></SectionTitle>
            <div >

                {
                    reviews ? <>
                    <Reviews scholarship={scholarship}> </Reviews>
                    </>:
                    <>
                    <div className="text-center">
                        <p className="text-orange-500 font-bold">No Review Found</p>
                    </div>
                    </>
                }

            </div>

            
        </div>
        </>
    );
};

export default ScholarShipDetails;