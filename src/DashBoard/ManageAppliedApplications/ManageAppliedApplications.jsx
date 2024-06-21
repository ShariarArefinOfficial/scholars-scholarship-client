
import { FcCancel } from "react-icons/fc";

import { FcProcess } from "react-icons/fc";
import { FaThumbsUp } from "react-icons/fa";

import { useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import SectionTitle from "../../CommonComponent/SectionTitle/SectionTitle";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { TbDetails } from "react-icons/tb";
import { RiFeedbackFill } from "react-icons/ri";

const ManageAppliedApplications = () => {
  const initialData = useLoaderData();
  const [data, setData] = useState(initialData);
  const [currentItem, setCurrentItem] = useState(null);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  console.log(data);

  const handleAddFeedBack = async (e) => {
    e.preventDefault();
    const feedback = e.target.Feedback.value;
    console.log(feedback, currentItem._id);
    const feedbackItem = { feedback };
    try {
      const res = await axiosSecure.patch(`/applications/${currentItem._id}`, feedbackItem);
      if (res.status === 200) {
        const updatedData = data.map((application) =>
          application._id === currentItem._id ? { ...application, feedback } : application
        );
        setData(updatedData);
        Swal.fire({
          icon: "success",
          title: "Feedback submitted successfully!",
        });
        setFeedbackModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleCurrentStatus = async (item, status) => {
    const statusItem = { application_status: status };
    try {
      const res = await axiosSecure.patch(`/applications/${item._id}`, statusItem);
      if (res.status === 200) {
        const updatedData = data.map((application) =>
          application._id === item._id ? { ...application, application_status: status } : application
        );
        setData(updatedData);
        Swal.fire({
          icon: "success",
          title: "Status changed successfully!",
        });
      }
    } catch (error) {
      console.error("Error changing status:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

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
            setData(data.filter((application) => application._id !== item._id));
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `This scholarship has been deleted`,
              showConfirmButton: false,
              timer: 1500,
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
    <>
      <SectionTitle heading="Manage Applied Applications " subHeading=""></SectionTitle>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-orange-500 text-white font-bold rounded-xl">
                <th>#</th>
                <th>University Name</th>
                <th>ScholarShip Name</th>
                <th> Application Fees</th>
                <th>FeedBack</th>
                <th>Application Status</th>
                <th>Status Change</th>
                <th>Details</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id} className="text-orange-500 font-semibold">
                  <td>{index + 1}</td>
                  <td>{item.university_name}</td>
                  <td>{item.scholarship_category}</td>
                  <td>{item.application_fees}</td>
                  <td>
                    <button
                      onClick={() => {
                        setCurrentItem(item);
                        setFeedbackModalOpen(true);
                      }}
                      className="btn border-2 border-orange-500"
                    >
                      <RiFeedbackFill className="text-orange-500" />
                    </button>
                  </td>
                  <td className="font-semibold text-center">
                    {item.application_status === "pending" ? (
                      <span className="text-blue-500">Pending</span>
                    ) : item.application_status === "processing" ? (
                      <span className="text-orange-500">Processing</span>
                    ) : item.application_status === "Completed" ? (
                      <span className="text-green-500">Completed</span>
                    ) : (
                      <span className="text-red-500">Canceled</span>
                    )}
                  </td>
                  <td className='flex items-center gap-2'>
                    <button
                      onClick={() => handleCurrentStatus(item, 'processing')}
                      className='btn btn-ghost bg-orange-500 text-white'><FcProcess className="text-lg text-white" /></button>
                    <button
                      onClick={() => handleCurrentStatus(item, 'Completed')}
                      className='btn btn-ghost bg-green-500 text-white'><FaThumbsUp  className="text-lg text-white"/></button>
                    <button
                      onClick={() => handleCurrentStatus(item, 'Canceled')}
                      className='btn btn-ghost bg-red-500 text-white'><FcCancel  className="text-lg text-white"/></button>
                  </td>
                  <td>
                    <Link>
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_4").showModal()
                        }
                        className="btn btn-ghost btn-lg text-white bg-orange-500"
                      >
                        <TbDetails className="text-white" />
                      </button>
                    </Link>
                    <dialog id="my_modal_4" className="modal">
                      <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">
                          {item.university_name}
                        </h3>
                        <p className="py-2 font-semibold">
                          <span className="mr-4 text-orange-500 font-bold">
                            Scholarship Category:
                          </span>
                          {item.scholarship_category}
                        </p>
                        <p className="py-2 font-semibold">
                          <span className="mr-4 text-orange-500 font-bold">
                            Application Fees:
                          </span>
                          {item.application_fees}
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
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
      {isFeedbackModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <button
              onClick={() => setFeedbackModalOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <form onSubmit={handleAddFeedBack}>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">FeedBack:</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24"
                  name="Feedback"
                  placeholder="Write a FeedBack"
                  required
                ></textarea>
              </label>
              <button className="btn bg-orange-500 mt-5 text-white">
                Submit Feedback
              </button>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ManageAppliedApplications;


