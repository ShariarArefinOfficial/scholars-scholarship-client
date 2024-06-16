//import React from 'react';

import SectionTitle from "../../CommonComponent/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
//import { FaUtensils } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddScholarShips = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
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
    // image upload to imgbb and then get an url
    const imageFile = { image: image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
       headers: {
           'content-type': 'multipart/form-data'
       }
    });
    if (res.data.success) {
        // now send the menu item data to the server with the image url
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
        
        // 
        const menuRes = await axiosSecure.post('/scholarship', scholarshipItem);
        console.log(menuRes.data)
        if(menuRes.data.insertedId){
            // show success popup
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${scholarShipCaregory} is added to the menu.`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
    console.log( 'with image url', res.data);
  };

  return (
    <div>
      <SectionTitle
        heading="add a ScholarShip"
        subHeading="What's new?"
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

          <button className="btn">
            Add Scholarship 
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddScholarShips;

// _id
// 666d489bd05d96c1c0c27097
// university_name
// "Harvard University"
// university_image
// "https://www.harvard.edu/sites/default/files/content/harvard-logo.png"
// scholarship_category
// "Harvard Financial Aid Initiative"

// university_location
// Object
// application_deadline
// "2024-11-15"
// subject_name
// "Various Disciplines"
// scholarship_description
// "The Harvard Financial Aid Initiative is designed to make a Harvard edu…"
// stipend
// "Based on need"
// post_date
// "2024-06-01"
// service_charge
// "No service charge"
// application_fees
// 75
// degree_name
// "Bachelor of Science"

// reviews



////
// City

// DeadlinedateField

// PostingdateField

// description

// Subject

// country

// degree

// image

// scholarShipCaregory

// service

// stipend

// universityName
