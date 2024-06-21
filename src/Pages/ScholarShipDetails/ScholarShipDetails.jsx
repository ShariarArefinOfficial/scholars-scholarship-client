//import React from 'react';

import { Navigate, useLoaderData } from "react-router-dom";
import Reviews from "./Reviews/Reviews";
import SectionTitle from "../../CommonComponent/SectionTitle/SectionTitle";
import PageTitle from "../../CommonComponent/PageTitle/PageTitle";
import Swal from "sweetalert2";
//import { useContext } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
//import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useApplication from "../../Hooks/useApplication";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
//import { useEffect, useState } from "react";

const heading='User Reviews'
const description='Explore genuine reviews from students who have benefited from our scholarship programs. Hear their stories, learn about their experiences, and see how these scholarships have impacted their educational journeys.'


const ScholarShipDetails = () => {
    const {user}=useAuthContext()
    const scholarship=useLoaderData()

    const axiosPublic=useAxiosPublic()
    const [, refetch] = useApplication();

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
        reviews,
        _id,
        university_image

      } = scholarship;
      const title=scholarship_category
     //console.log( user.email)
     const handleAddApplication = () => {
        if (user && user.email) {
            //send cart item to the database
            const applicationItem = {
                scholarshipId: _id,
                email: user.email,
                application_status:'pending',
                university_name,                
                university_image,
                application_fees,
                scholarship_category,
                degree_name,
                university_location,
                subject_name

            }
            axiosPublic.post('/applications', applicationItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: ` added to your application list`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart to update the cart items count
                        refetch();
                    }

                })
        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //   send the user to the login page
                    Navigate('/login', { state: { from: location } })
                }
            });
        }
    }
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
                    <button
                    onClick={handleAddApplication}
                    className="btn bg-orange-500 text-white">Apply This ScholarShip</button>
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
