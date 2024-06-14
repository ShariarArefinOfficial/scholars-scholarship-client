//import React from 'react';

import { useState } from "react";
import Cover from "../../CommonComponent/Cover/Cover";
import useScholarShip from "../../Hooks/useScholarShip";
import AllScholarTableData from "./AllScholarTableData";
//import AllScholarTableData from "./AllScholarTableData";
const title = "All ScholarShips";
const AllScholarShipsPage = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const limit = 6;
   
    const [scholarship,loading] = useScholarShip(search, page, limit);

    

  
    const handlePageChange = (newPage) => {
      setPage(newPage);
  };
 

    const handleSearch =e=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchTxt = formData.get('search');
        setSearch(searchTxt)
        setPage(1);
    }
  return (
    <div>
      <Cover title={title}></Cover>
      <div className="flex justify-center items-center">
      <form onSubmit={handleSearch} className=" flex justify-center items-center join w-full text-center py-5">
           <input name='search' className="input input-bordered join-item w-[500px]" placeholder="Type Here For Search ....."/>
           <button className="btn join-item bg-orange-500 text-white ">Search</button>
      </form>
      </div>
      <div className=" max-w-7xl mx-auto gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10">
        {
            loading ? 
            <>
            <div className="w-full h-[500px] flex justify-center items-center">
            <span className="loading loading-bars loading-lg"></span>

            </div>
            </>
            :
            scholarship.map((item)=><AllScholarTableData item={item} key={item._id}></AllScholarTableData>)
        }

      </div>
      {
        search ? 
        <></> 
        :
        <>
        <div className="flex justify-center items-center gap-5 py-5">
           <button className="btn btn-primary bg-orange-500 text-white" onClick={() => handlePageChange(page - 1)}>Previous</button>
           <button className="btn btn-primary bg-orange-500 text-white" onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
        </>
      }
     
    </div>
  );
};

export default AllScholarShipsPage;
