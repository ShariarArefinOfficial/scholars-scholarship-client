//import React from 'react';
import { useQuery } from "@tanstack/react-query";

import useAuthContext from "./useAuthContext";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useApplication = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic=useAxiosPublic()
    const { user} = useAuthContext();
    const { refetch, data: application = [] } = useQuery({
        queryKey: ['applications', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/applications?email=${user.email}`);
            return res.data;
        }
    })

    return [application, refetch]
};

export default useApplication;