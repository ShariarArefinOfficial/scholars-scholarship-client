//import React from 'react';

import { Link, useLoaderData } from "react-router-dom";
import SectionTitle from "../../CommonComponent/SectionTitle/SectionTitle";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { TbDetails } from "react-icons/tb";
//import useApplication from "../../Hooks/useApplication";
import { useState } from "react";

const ManageAppliedApplications = () => {
    const initialData = useLoaderData();
    const [data, setData] = useState(initialData);
      const axiosSecure = useAxiosSecure();

      const handleDeleteItem = (item) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await axiosSecure.delete(`/applications/${item._id}`);
              if (res.data.deletedCount > 0) {
                // Update the state to remove the deleted item
                setData(data.filter(application => application._id !== item._id));
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `This scholarship has been deleted`,
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            } catch (error) {
              console.error("Error deleting item:", error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          }
        });
      };
    
    


  return (
    <div>
      <SectionTitle
        heading="Manage Applied Applications "
        subHeading=""
      ></SectionTitle>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="bg-orange-500 text-white font-bold rounded-xl">
                <th>#</th>
                <th>University Name</th>
                <th>ScholarShip Name</th>
                <th> Application Fees</th>
                <th>Details</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id}
                className="text-orange-500 font-semibold"
                >
                  <td>{index + 1}</td>
                  <td>{item.university_name}</td>
                  <td>{item.scholarship_category}</td>
                  <td>{item.application_fees}</td>
                  <td>
                    <Link>
                      <button
                      
                      onClick={()=>document.getElementById('my_modal_4').showModal()}
                      className="btn btn-ghost btn-lg text-white bg-orange-500">
                        <TbDetails className="text-white" />
                      </button>
                    </Link>
                    <dialog id="my_modal_4" className="modal">
                      <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">{item.university_name}</h3>
                        <p className="py-2 font-semibold"><span className="mr-4 text-orange-500 font-bold">Subject Name:</span>{item.scholarship_category}</p>
                        <p className="py-2 font-semibold"><span className="mr-4 text-orange-500 font-bold">Subject Name:</span>{item.application_fees}</p>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-ghost btn-lg"
                    >
                      <FaTrashAlt className="text-red-600"></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAppliedApplications;

