//import React from 'react';
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuthContext from "../../Hooks/useAuthContext";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../CommonComponent/SectionTitle/SectionTitle";

const ManageReviews = () => {
  // const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();
  const { email } = user;
  const [review, setReview] = useState([]);
  // const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/reviews`)
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, [email]);

  console.log(review);
  const handleDelete = async (item) => {
    const id = item._id;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/reviews/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Deleted!",
          text: "Review deleted successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        setReview(review.filter((item) => item._id !== id));
      } else {
        throw new Error("Failed to delete review");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete review",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <div>
        <div>
          <SectionTitle heading="ALL Reviews" subheading=""></SectionTitle>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Image</th>
                  <th>User Name</th>
                  <th>University Name</th>
                  <th>Review Comment</th>
                  <th>Review Date</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {review.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={item.user_photo} />
                        </div>
                      </div>
                    </td>
                    <td>{item.user_name}</td>
                    <td>{item.university_name}</td>
                    <td>{item.comment}</td>
                    <td>{item.reviewDate}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item)}
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
    </div>
  );
};

export default ManageReviews;
