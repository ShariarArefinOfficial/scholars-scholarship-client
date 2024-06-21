//import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAuthContext from "./useAuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useModerator = () => {
    const { user } = useAuthContext();
    const axiosSecure = useAxiosSecure();
    const { data: isModerator, isPending: isModeratorLoading } = useQuery({
        queryKey: [user?.email, 'isModerator'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/moderator/${user.email}`);
            console.log(res.data);
            return res.data?.moderator;
        }
    })
    return [isModerator, isModeratorLoading]
};

export default useModerator;