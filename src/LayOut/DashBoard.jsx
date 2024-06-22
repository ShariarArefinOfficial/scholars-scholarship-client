//import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import PageTitle from "../CommonComponent/PageTitle/PageTitle";
import {
  FaAd,
  
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
 
  FaUsers,
  
} from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdAddCard } from "react-icons/md";
import { MdSettingsApplications } from "react-icons/md";
import useAdmin from "../Hooks/useAdmin";
import useModerator from "../Hooks/useModerator";

const DashBoard = () => {
  const title = "DashBoard";
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
  const user = (
    <>
     
      <li>
        <NavLink to="dashboard/userProfile">
          <MdOutlineAdminPanelSettings />
          User Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="dashboard/Reviews">
          <FaAd></FaAd>
          Review
        </NavLink>
      </li>
      <li>
        <NavLink to="dashboard/applications">
          <FaList></FaList>
          My Applications
        </NavLink>
      </li>
    </>
  );

  const Admin = (
    <>
      <li>
        <NavLink to="/dashboard/Profile">
          <MdOutlineAdminPanelSettings />
          Admin Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/addscholarship">
          <MdAddCard />
          Add Scholarship
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/managescholarship">
          <FaList></FaList>
          Manage ScholarShip
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageAppliedApplications">
          <MdSettingsApplications></MdSettingsApplications>
          Manage Applications
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageReview">
          <MdSettingsApplications></MdSettingsApplications>
          Manage Reviews
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/users">
          <FaUsers></FaUsers>
          All Users
        </NavLink>
      </li>
    </>
  );

  const moderator = (
    <>
      <li>
        <NavLink to="dashboard/userProfile">
          <MdOutlineAdminPanelSettings />
          Moderator Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageAppliedApplications">
          <MdSettingsApplications></MdSettingsApplications>
          Manage Applications
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/addscholarship">
          <MdAddCard />
          Add Scholarship
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/managescholarship">
          <FaList></FaList>
          Manage ScholarShip
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageReview">
          <MdSettingsApplications></MdSettingsApplications>
          Manage Reviews
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <PageTitle title={title}></PageTitle>
      <div className="flex">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-orange-400">
          <ul className="menu p-4">
            {isAdmin ? 
            Admin 
            : 
            isModerator ? 
            moderator
             :
             user}
            {/* shared nav links */}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/order/salad">
                <FaSearch></FaSearch>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/order/contact">
                <FaEnvelope></FaEnvelope>
                Contact
              </NavLink>
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
