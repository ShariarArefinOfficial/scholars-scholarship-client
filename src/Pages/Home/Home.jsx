//import React from 'react';

import PageTitle from "../../CommonComponent/PageTitle/PageTitle";
import Hero from "./Hero/Hero";
import TopScholarships from "./TopScholarShips/TopScholarships";

const title='Home'
const Home = () => {
    return (
        <>
            <PageTitle title={title}></PageTitle>
            <Hero></Hero>
            <TopScholarships></TopScholarships>
            
        </>
    );
};

export default Home;