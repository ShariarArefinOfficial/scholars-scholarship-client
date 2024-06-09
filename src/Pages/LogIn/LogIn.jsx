//import React from 'react';

import PageTitle from "../../CommonComponent/PageTitle/PageTitle";
import LogInPage from "./LogInPage";

const title='Log In'
const LogIn = () => {
    return (
        <>
            <PageTitle title={title}></PageTitle>
            <LogInPage></LogInPage>

        </>
    );
};

export default LogIn;