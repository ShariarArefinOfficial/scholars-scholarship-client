//import React from 'react';

import { useState } from "react";
import Cover from "../../CommonComponent/Cover/Cover";
import useScholarShip from "../../Hooks/useScholarShip";
import AllScholarTableData from "./AllScholarTableData";
//import AllScholarTableData from "./AllScholarTableData";
const title = "All ScholarShips";
const AllScholarShipsPage = () => {
    const [search, setSearch] = useState({});
    const [scholarship] = useScholarShip(search);
    //console.log(scholarship)

    const handleSearch =e=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchTxt = formData.get('search');
        setSearch(searchTxt)
    }
  return (
    <div>
      <Cover title={title}></Cover>
      <div className="flex justify-center items-center">
      <form onSubmit={handleSearch} className=" flex justify-center items-center join w-full text-center py-5">
           <input name='search' className="input input-bordered join-item w-[500px]" placeholder="Type Here For Search ....."/>
           <button className="btn join-item ">Search</button>
      </form>
      </div>
      <div className=" max-w-7xl mx-auto gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10">
        {
            scholarship.map((item)=><AllScholarTableData item={item} key={item._id}></AllScholarTableData>)
        }

      </div>
     
    </div>
  );
};

export default AllScholarShipsPage;
