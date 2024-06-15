//import React from 'react';

import { useEffect, useState } from "react";
import SectionTitle from "../../../CommonComponent/SectionTitle/SectionTitle";
import AllScholarTableData from "../../AllScholarShips/AllScholarTableData";
import { Link } from "react-router-dom";


const sectionTitle='Top Scholarships'
const description='you will find news and information about events, projects or announcements as well as reports from all over the world, features, interviews and profiles from the Scholar network. Register now and stay up to date.'

const TopScholarships = () => {
    const [scholarship,setScholarship]=useState([])

    useState(()=>{
        fetch(`${import.meta.env.VITE_URL}/scholarship`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.results)
            setScholarship(data.results)
        })
    },[])
    

    const [filteredScholarships, setFilteredScholarships] = useState([]);

    useEffect(() => {
      const filterScholarships = () => {
        const today = new Date(); // Today's date
        const thresholdDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7); // 7 days ago
  
        const filtered = scholarship.filter(scholarships => {
            const item=scholarships.application_fees
            < 100 || new Date(scholarships.post_date) >= thresholdDate;
           // console.log(item)
          return item;
        });
  
        setFilteredScholarships(filtered);
      };
  
      filterScholarships();
    }, [scholarship]);
    
    
   

    
    return (
        <div>
            <SectionTitle heading={sectionTitle} description={description} ></SectionTitle>
            <div className=" max-w-7xl mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {
                filteredScholarships.slice(0,6).map(item=><AllScholarTableData
                key={item._id}
                item={item}
                ></AllScholarTableData>)
            }
            </div>
            <div className=" my-10 text-center">
                <Link to='/allscholarship'>
                <button className="btn bg-orange-500 text-white">Visit All ScholarShips</button>
                </Link>
                
            </div>
            
        </div>
    );
};

export default TopScholarships;