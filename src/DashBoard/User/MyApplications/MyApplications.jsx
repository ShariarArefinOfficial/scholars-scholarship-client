import  { useState } from 'react';
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import SectionTitle from "../../../CommonComponent/SectionTitle/SectionTitle";
import useApplication from "../../../Hooks/useApplication";
import { Link } from "react-router-dom";
import { TbDetails } from "react-icons/tb";
import useAuthContext from '../../../Hooks/useAuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyApplications = () => {
  const [application, refetch] = useApplication();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const {user}=useAuthContext()
  const axiosSecure=useAxiosSecure()

  //console.log(user)
  const onSubmit = async (data) => {
    //console.log(data);
    // Handle form submission, e.g., send data to the server
    const menuRes = await axiosSecure.post('/reviews', data);
        console.log(menuRes.data)
        if(menuRes.data.insertedId){
            // show success popup
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Review is added .`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    reset();
   // document.getElementById("reviewModal").close();
  };
  const {displayName,email,photoURL}=user
 // console.log(displayName,email)
  const openReviewModal = (item,name=displayName,mail=email,userImg=photoURL) => {
   // console.log(item)
   //console.log(name,mail)
   const {university_name,
    subject_name,
    degree_name,
    application_fees,
    scholarship_category,_id}=item
    const data={
        name,
        mail,
        userImg,
        university_name,
    subject_name,
    degree_name,
    application_fees,
    scholarship_category,
    _id
        
        
    }
    //console.log(data)

    setSelectedApplication(data);
    document.getElementById("reviewModal").showModal();
  };

  return (
    <>
      <div>
        <SectionTitle heading="My Applications" subHeading=""></SectionTitle>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className='bg-orange-500 py-4 text-white'>
                <th>#</th>
                <th>University Name</th>
                <th>University Address</th>
                {application.feedback ? <th>Application Feedback</th> : <></>}
                <th>Subject Name</th>
                <th>Applied Degree</th>
                <th>Application Fees</th>
                <th>Application Status</th>
                <th>Details</th>
                <th>Add Review</th>
              </tr>
            </thead>
            <tbody>
              {application.map((item, index) => (
                <tr  className='text-center' key={item._id}>
                  <td className="font-semibold">{index + 1}</td>
                  <td className="font-semibold">{item.university_name}</td>
                  <td className="font-semibold">
                    <span>{item.university_location.city},</span>
                    <span>{item.university_location.country},</span>
                  </td>
                  {
                    item.feedback ? <td>{item.feedback}</td> : <></>
                  }
                  <td className="font-semibold">{item.subject_name}</td>
                  <td className="font-semibold">{item.degree_name}</td>
                  <td className="font-semibold">{item.application_fees}</td>
                  <td className="font-semibold text-center">
                    {item.application_status === "pending" ? (
                      <span className="text-blue-500">Pending</span>
                    ) : item.application_status === "processing" ? (
                      <span className="text-orange-500">Processing</span>
                    ) : item.application_status === "Completed" ? (
                      <span className="text-green-500">Completed</span>
                    ) : (
                      <span className="text-red-500">Cancel</span>
                    )}
                  </td>
                  <td>
                    <Link>
                      <button
                        onClick={() => document.getElementById(`detailsModal-${index}`).showModal()}
                        className="btn btn-ghost btn-lg text-white bg-orange-500"
                      >
                        <TbDetails className="text-white" />
                      </button>
                    </Link>
                    <dialog id={`detailsModal-${index}`} className="modal">
                      <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">
                          {item.university_name}
                        </h3>
                        <p className="py-2 font-semibold">
                          <span className="mr-4 text-orange-500 font-bold">
                            Subject Name:
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
                      onClick={() => openReviewModal(item)}
                      className="btn btn-ghost btn-lg bg-orange-500"
                    >
                      <FaEdit className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedApplication && (
        <dialog id="reviewModal" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg text-orange-500">Add A Review</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" value={selectedApplication.university_name} {...register('university_name')} />
              <input type="hidden" value={selectedApplication._id} {...register('university_id')} />
              <input type="hidden" value={selectedApplication.name} {...register('user_name')} />
              <input type="hidden" value={selectedApplication.mail} {...register('user_email')} />
              <input type="hidden" value={selectedApplication.userImg} {...register('user_photo')} />


              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Review Point:</span>
                </div>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  name="rating"
                  min="1"
                  max="5"
                  required
                  {...register('rating', { required: true })}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Review Comment:</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24"
                  name="comment"
                  placeholder="Write a review"
                  {...register('comment', { required: true })}
                ></textarea>
              </label>

              <label className="form-control w-full">
                <label className="label">
                  <span className="label-text">Review Date*</span>
                </label>
                <input
                  type="date"
                  name="reviewDate"
                  className="p-4 border-2 rounded-xl"
                  {...register('reviewDate', { required: true })}
                  required
                />
              </label>

              <button type="submit" className="btn">
                Add Review
              </button>
            </form>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default MyApplications;

