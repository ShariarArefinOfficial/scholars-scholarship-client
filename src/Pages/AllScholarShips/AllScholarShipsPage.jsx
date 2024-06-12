//import React from 'react';

import Cover from "../../CommonComponent/Cover/Cover";
import useScholarShip from "../../Hooks/useScholarShip";
const title='All ScholarShips'
const AllScholarShipsPage = () => {
    const [scholarship]=useScholarShip()
    return (
        <div>
            <Cover title={title}></Cover>
            {
                scholarship.map(item=><p>item</p>)
            }
            
        </div>
    );
};

export default AllScholarShipsPage;