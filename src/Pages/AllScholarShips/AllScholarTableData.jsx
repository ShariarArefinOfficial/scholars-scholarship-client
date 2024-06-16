import { Link } from "react-router-dom";

const AllScholarTableData = ({ item }) => {
  const {
    university_name,
    scholarship_category,
    application_deadline,
    application_fees,
    subject_name,
    post_date,
    degree_name,
    university_image,
    _id
  } = item;
  return (
    <>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src={university_image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{university_name}</h2>
          <p ><span className=" font-bold">ScholarShip Category</span>: {scholarship_category}</p>
          <p ><span className=" font-bold">Subject Name</span>: {subject_name}</p>
          <p ><span className=" font-bold">Degree Name</span>: {degree_name}</p>

          <p ><span className=" font-bold">Post Date</span>: {post_date}</p>
          <p ><span className=" font-bold">Application DeadLine</span>: {application_deadline}</p>
          <p ><span className=" font-bold mr-2">Application Fees</span>:  ${application_fees}</p>
          <div className="card-actions justify-start">
            <Link to={`/scholarship/${_id}`}>
            <button className="btn  border-2 border-orange-500">View Details</button>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default AllScholarTableData;
