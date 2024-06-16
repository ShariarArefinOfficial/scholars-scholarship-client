//import React from 'react';
import { useQuery } from "@tanstack/react-query";

import useAuthContext from "./useAuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useApplication = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuthContext();
    const { refetch, data: application = [] } = useQuery({
        queryKey: ['application', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/applications?email=${user.email}`);
            return res.data;
        }
    })

    return [application, refetch]
};

export default useApplication;