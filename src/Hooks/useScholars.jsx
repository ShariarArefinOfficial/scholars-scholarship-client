//import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useScholars = () => {
    const axiosPublic = useAxiosPublic();
   
    const {data: scholarship = [], isPending: loading, refetch} = useQuery({
        queryKey: ['scholarship'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/scholarship');
            return res.data.results;
        }
    })


    return [scholarship, loading, refetch]
};

export default useScholars;