//import React from 'react';

import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useAuthContext = () => {
    const allData=useContext(AuthContext)
    return allData;
};

export default useAuthContext;