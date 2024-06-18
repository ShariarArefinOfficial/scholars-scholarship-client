//import React from 'react';
import axios from 'axios';

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useScholarShip from "../../Hooks/useScholarShip";
import SectionTitle from "../../CommonComponent/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useScholars from '../../Hooks/useScholars';

const ManageScholarShip = () => {
    const [scholarship, , refetch] = useScholars();


    const axiosPublic=useAxiosPublic()
    const axiosSecure = useAxiosSecure();


    // const {data: scholarship = [], isPending: loading, refetch} = useQuery({
    //     queryKey: ['scholarship'], 
    //     queryFn: async() =>{
    //         const res = await axiosPublic.get('/scholarship');
    //         //console.log(res.data.results)
    //         return res.data.results;
    //     }
    // })
    // console.log(scholarship)

    
   // const [scholarship,setScholarship]=useState([])
   console.log(scholarship)

   const handleDeleteItem = (item) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/scholarship/${item._id}`);
            // console.log(res.data);
            if (res.data.deletedCount > 0) {
                // refetch to update the ui
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `This scholarship has been deleted`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }


        }
    });
}

    return (
        <div>
             <div>
            <SectionTitle heading="Manage All ScholarShips!!!" subHeading="Hurry up"></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>ScholarShip Name</th>
                                <th>University Name</th>
                                <th>Applied Degree</th>
                                <th> Application Fees</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                scholarship.map((item, index) => <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                      {item.scholarship_category}
                                    </td>
                                    <td>
                                        {item.university_name}
                                    </td>
                                    <td >{item.degree_name}</td>
                                    <td>{item.application_fees}</td>
                                    <td>
                                        <Link to={`/dashboard/update/${item._id}`}>
                                            <button
                                                className="btn btn-ghost btn-lg bg-orange-500">
                                                <FaEdit className="text-white 
                                        "></FaEdit>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
            
        </div>
    );
};

export default ManageScholarShip;



