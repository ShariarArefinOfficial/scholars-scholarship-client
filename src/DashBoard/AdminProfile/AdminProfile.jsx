//import React from 'react';


import useAuthContext from "../../Hooks/useAuthContext";

const AdminProfile = () => {
    const user=useAuthContext()
    
    //console.log(user.user)
    
    return (
        <div className="w-full h-[500px] flex flex-col justify-center items-center">
            <img src={user.user.photoURL}  className=' w-[100px]  rounded-xl mb-10' alt="" />
            <div className="text-center">
                <h2 className="font-bold text-orange-500">Admin Name : {user.user.displayName} </h2>
                <p className="font-bold text-orange-500"><span>Email :</span>{user.user.email}</p>
            </div>
            
        </div>
    );
};

export default AdminProfile;