import { Link } from "react-router-dom";

const AllScholarTableData = ({ item }) => {
  const {
    university_name,
    scholarship_category,
    application_deadline,
    application_fees,
    subject_name,
    post_date,
  } = item;
  return (
    <>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{university_name}</h2>
          <p ><span className=" font-bold">ScholarShip Category</span>: {scholarship_category}</p>
          <p ><span className=" font-bold">Subject Name</span>: {subject_name}</p>
          <p ><span className=" font-bold">Post Date</span>: {post_date}</p>
          <p ><span className=" font-bold">Application DeadLine</span>: {application_deadline}</p>
          <p ><span className=" font-bold">Application Fees</span>: {application_fees}</p>
          <div className="card-actions justify-start">
            <button className="btn  border-2 border-orange-500">View Details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllScholarTableData;
