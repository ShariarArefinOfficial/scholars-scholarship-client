//import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuthContext from './useAuthContext';

const useReviews = () => {
    const axiosSecure = useAxiosSecure();
   const axiosPublic=useAxiosPublic()
    const { user} = useAuthContext();
    const { refetch, data: review = [] } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async() => {
            const res = await axiosPublic.get(`/reviews?email=${user.email}`);
            return res.data;
        }
    })

    return [review, refetch]
};

export default useReviews;