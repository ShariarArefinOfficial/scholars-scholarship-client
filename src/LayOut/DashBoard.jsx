//import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import PageTitle from "../CommonComponent/PageTitle/PageTitle";
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdAddCard } from "react-icons/md";
import { MdSettingsApplications } from "react-icons/md";



const DashBoard = () => {
    const title='DashBoard'
   const  isAdmin=true
    return (
        <>
            <PageTitle title={title}></PageTitle>
            <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                         <>
                           
                            <li>
                                <NavLink to="/dashboard/Profile">
                                <MdOutlineAdminPanelSettings />
                                    Admin Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addscholarship">
                                <MdAddCard />

                                    Add Scholarship</NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/managescholarship">
                                    <FaList></FaList>
                                    Manage ScholarShip</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageAppliedApplications">
                                    <MdSettingsApplications></MdSettingsApplications>
                                    Manage Applications</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation">
                                        <FaCalendar></FaCalendar>
                                        Reservation</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaAd></FaAd>
                                        Add a Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaList></FaList>
                                        My Bookings</NavLink>
                                </li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaSearch></FaSearch>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
        </>
    );
};

export default DashBoard;