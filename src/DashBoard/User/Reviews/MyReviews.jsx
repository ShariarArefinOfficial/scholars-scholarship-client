



import  { useEffect, useState } from 'react';
import SectionTitle from "../../../CommonComponent/SectionTitle/SectionTitle";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAuthContext from "../../../Hooks/useAuthContext";
import Reviews from "./Reviews";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();
  const { email } = user;
  const [review, setReview] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/reviews?email=${email}`)
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, [email]);

  const openReviewModal = (item) => {
    setSelectedReview(item);
    document.getElementById("reviewModal").showModal();
  };

  const handleDelete = async (item) => {
    const id=item._id;
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Review deleted successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setReview(review.filter(item => item._id !== id));
      } else {
        throw new Error('Failed to delete review');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete review',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div>
      <div>
        <SectionTitle heading="My Reviews" subheading=""></SectionTitle>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>University Name</th>
                <th>Review Comment</th>
                <th>Date</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {review.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.university_name}</td>
                  <td>{item.comment}</td>
                  <td>{item.reviewDate}</td>
                  <td>
                    <button
                      onClick={() => openReviewModal(item)}
                      className="btn btn-ghost btn-lg bg-orange-500"
                    >
                      <FaEdit className="text-white"></FaEdit>
                    </button>
                  </td>
                  <td>
                    <button
                     onClick={() => handleDelete(item)}

                    className="btn btn-ghost btn-lg">
                      <FaTrashAlt className="text-red-600"></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <dialog id="reviewModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <Reviews review={selectedReview} />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyReviews;

