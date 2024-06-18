//import React from 'react';

import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../CommonComponent/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UpdateScholarship = () => {
  const item = useLoaderData();
  const axiosSecure=useAxiosSecure()
  const { register, handleSubmit } = useForm();
  const axiosPublic=useAxiosPublic();
  //console.log(item)

  const {
    scholarship_description,
    service_charge,
    university_name,
    scholarship_category,
    application_deadline,
    university_location,
    stipend,
    application_fees,
    subject_name,
    post_date,
    degree_name,
    university_image,
    _id,
  } = item;
  const onSubmit = async (data) => {
    //console.log(data);
    const{
        City,
        DeadlinedateField,
        PostingdateField,
        description,
        Subject,
        country,
        degree,
        image,
        scholarShipCaregory,
        service,
        stipend,
        universityName,
        fees }=data;
        console.log(data)
        const imageFile = { image: image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
           headers: {
               'content-type': 'multipart/form-data'
           }
        });
        if (res.data.success){
            const scholarshipItem = {
                university_name: universityName,
                scholarship_category: scholarShipCaregory,
                university_location:{
                    city:City,
                    country:country
                },
                scholarship_description:description,
                application_fees: fees,
                subject_name: Subject,
                degree_name:degree,
                stipend:stipend,
                service_charge:service,
                application_deadline:DeadlinedateField,
                post_date:PostingdateField,
                university_image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.patch(`/scholarship/${_id}`, scholarshipItem);
            console.log(menuRes.data)
            if(menuRes.data.modifiedCount > 0){
                // show success popup
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `This item is updated to the card.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log( 'with image url', res.data);

        

  };
  //console.log(university_name)
  return (
    <div>
      <SectionTitle
        heading="Update This ScholarShip"
        subHeading=""
      ></SectionTitle>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">University Name*</span>
            </label>
            <input
              type="text"
              placeholder="University Name"
              {...register("universityName", { required: true })}
              defaultValue={university_name}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">ScholarShip name*</span>
            </label>
            <input
              type="text"
              placeholder="Write Scholarship name"
              defaultValue={scholarship_category}
              {...register("scholarShipCaregory", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-row justify-center items-center gap-5">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Post Date*</span>
              </label>
              <input
                type="date"
                id="dateField"
                defaultValue={post_date}
                className="p-4 border-2 rounded-xl"
                {...register("PostingdateField", { required: true })}
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Application DeadLIne Date*</span>
              </label>
              <input
                type="date"
                id="dateField"
                className="p-4 border-2 rounded-xl"
                defaultValue={application_deadline}
                {...register("DeadlinedateField", { required: true })}
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-5">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">City*</span>
              </label>
              <input
                type="text"
                placeholder="City"
                defaultValue={university_location.city}
                {...register("City", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Country*</span>
              </label>
              <input
                type="text"
                placeholder="country"
                defaultValue={university_location.country}
                {...register("country", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-5">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Degree Name*</span>
              </label>
              <input
                type="text"
                placeholder="degree"
                defaultValue={degree_name}
                {...register("degree", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Subject Name*</span>
              </label>
              <input
                type="text"
                placeholder="Subject"
                defaultValue={subject_name}
                {...register("Subject", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-5">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Stipend</span>
              </label>
              <input
                type="text"
                defaultValue={stipend}
                placeholder="Stipend"
                {...register("stipend")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Service Charge</span>
              </label>
              <input
                type="text"
                defaultValue={service_charge}
                placeholder="service"
                {...register("service")}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Application fees*</span>
            </label>
            <input
              type="text"
              defaultValue={application_fees}
              placeholder="fees"
              {...register("fees", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* recipe details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">ScholarShip Description</span>
            </label>
            <textarea
              {...register("description")}
              defaultValue={scholarship_description}
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-orange-500 w-full text-white">Update Scholarship</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateScholarship;
