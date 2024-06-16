//import React from 'react';

import Swal from "sweetalert2";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdAddModerator } from "react-icons/md";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic=useAxiosPublic()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

   const handleMakeModaretor=user=>{
    axiosPublic.patch(`/users/modaretor/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Moderator Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })

   }

   const updateUserRoleToModerator = async (userId) => {
    try {
      const response = await axiosSecure.patch(`/users/moderator/${userId}`);
      console.log('User role updated:', response.data);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center my-4">
                <h2 className="text-3xl text-orange-500 my-5 font-bold">All Users</h2>
                <h2 className="text-xl bg-orange-500 p-4 rounded-xl text-white">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    { user.role === 'admin' ? <MdAdminPanelSettings className="text-xl text-orange-500"/>
                                    : 
                                    (user.role === 'moderator')? 'Modaretor':
                                    <>
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-lg bg-orange-500">
                                        <MdAdminPanelSettings className="text-white 
                                        text-2xl"></MdAdminPanelSettings>
                                    </button>
                                    <button
                                        onClick={() => updateUserRoleToModerator(user._id)}
                                        className="btn btn-lg bg-orange-500">
                                        <MdAddModerator className="text-white 
                                        text-2xl"></MdAddModerator>
                                       
                                    </button>
                                    <button
                                        
                                        className="btn btn-lg bg-orange-500">
                                        <FaUsers className="text-white 
                                        text-2xl" ></FaUsers>
                                    </button>
                                    </>

                                    }
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
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

    );
};

export default AllUsers;