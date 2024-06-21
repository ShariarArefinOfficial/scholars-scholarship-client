// //import React from 'react';

// import { useForm } from "react-hook-form";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const Reviews = ({item}) => {
//     const axiosSecure=useAxiosSecure()
    
//     const { register, handleSubmit, reset } = useForm();


//     console.log(item)
//     const onSubmit = async (data) => {
//         //console.log(data);
//         // Handle form submission, e.g., send data to the server
//         const menuRes = await axiosSecure.post("/reviews", data);
//         console.log(menuRes.data);
//         if (menuRes.data.insertedId) {
//           // show success popup
//           reset();
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: `Review is added .`,
//             showConfirmButton: false,
//             timer: 1500,
//           });
//         }
//         reset();
//         // document.getElementById("reviewModal").close();
//       };

//     return (
//         <div>
//             <form onSubmit={handleSubmit(onSubmit)} action="">
//                             <label className="form-control w-full">
//                               <div className="label">
//                                 <span className="label-text font-bold">
//                                   Review Point:
//                                 </span>
//                               </div>
//                               <input
//                                 type="number"
//                                 className="input input-bordered w-full"
//                                 name="rating"
//                                 min="1"
//                                 max="5"
//                                 required
//                                 {...register("rating", { required: true })}
//                               />
//                             </label>

//                             <label className="form-control w-full">
//                               <div className="label">
//                                 <span className="label-text font-bold">
//                                   Review Comment:
//                                 </span>
//                               </div>
//                               <textarea
//                                 className="textarea textarea-bordered h-24"
//                                 name="comment"
//                                 placeholder="Write a review"
//                                 {...register("comment", { required: true })}
//                               ></textarea>
//                             </label>

//                             <label className="form-control w-full">
//                               <label className="label">
//                                 <span className="label-text">Review Date*</span>
//                               </label>
//                               <input
//                                 type="date"
//                                 name="reviewDate"
//                                 className="p-4 border-2 rounded-xl"
//                                 {...register("reviewDate", { required: true })}
//                                 required
//                               />
//                             </label>

//                             <button type="submit" className="btn">
//                               Edit Review
//                             </button>
//                           </form>
//         </div>
//     );
// };

// export default Reviews;




import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Reviews = ({ review }) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      _id: '',
      university_name: '',
      comment: '',
      reviewDate: ''
    }
  });
console.log(review)
  useEffect(() => {
    if (review) {
      // Set form values when review changes
      setValue('_id', review._id);
      setValue('university_name', review.university_name);
      setValue('comment', review.comment);
      setValue('reviewDate', review.reviewDate);
    }
  }, [review, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/reviews/${data._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          title: 'Success!',
          text: 'Review updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        reset();
        document.getElementById('reviewModal').close();
      } else {
        throw new Error('Failed to update review');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update review',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('_id')} />
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold">University Name:</span>
        </div>
        <input
          type="text"
          disabled
          className="input input-bordered w-full"
          {...register('university_name', { required: true })}
          readOnly
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold">Review Comment:</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          {...register('comment', { required: true })}
          placeholder="Write a review"
        ></textarea>
      </label>
      <label className="form-control w-full">
        <label className="label">
          <span className="label-text">Review Date*</span>
        </label>
        <input
          type="date"
          className="p-4 border-2 rounded-xl"
          {...register('reviewDate', { required: true })}
          required
        />
      </label>
      <button type="submit" className="btn">
        Update Review
      </button>
    </form>
  );
};

export default Reviews;
