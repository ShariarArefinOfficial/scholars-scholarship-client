//import React from 'react';

import PageTitle from "../../CommonComponent/PageTitle/PageTitle";
import SignUpPage from "./SignUpPage";

const title='Sign Up'
const SignUp = () => {
    return (
        <>
        <PageTitle title={title}></PageTitle>
        <SignUpPage></SignUpPage>
        </>
    );
};

export default SignUp;