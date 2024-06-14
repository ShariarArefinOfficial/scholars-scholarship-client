//import React from 'react';
import PageTitle from "../../CommonComponent/PageTitle/PageTitle"
//import useScholarShip from "../../Hooks/useScholarShip";
import AllScholarShipsPage from "./AllScholarShipsPage";

const title='All ScholarShip'

const AllScholarShips = () => {
    
    
    return (
        <>
        <PageTitle title={title}></PageTitle>
        <AllScholarShipsPage></AllScholarShipsPage>
            
        </>
    );
};

export default AllScholarShips;