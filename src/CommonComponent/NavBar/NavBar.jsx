//import React from 'react';
import { Link, Navigate } from "react-router-dom";
import useAuthContext from "../../Hooks/useAuthContext";


const NavBar = () => {
   const {user,logOut}=useAuthContext();
   const handleSignOut = () => {
    logOut().then().catch();
    Navigate("/");
  };
    const navBar=<>
        <li>
           <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/allscholarship'>All ScholarShips</Link>
        </li>
       {
        (!user)?
       <>
        <li>
        <Link to='/login'>Log In</Link>
     </li>
     <li>
        <Link to='/signUp'>Sign Up</Link>
     </li>
       </>:
     <></>
       }
        
      
    </>
    return (
        <div className=" max-w-screen-xl mx-auto">
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      {
         navBar
      }
      </ul>
    </div>
    <Link className="btn btn-ghost text-xl text-orange-500">Scholar</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
  
  {
    navBar
  }
    </ul>
  </div>
  <div className="navbar-end">
  {user ? (
            <>
              <div className="dropdown  dropdown-hover mr-0 md:mr-10 ">
                <div tabIndex={0} role="button" className="btn m-1">
                  <Link>
                    <img
                      src={user.photoURL}
                      alt=""
                      className="w-10 rounded-full mr-4"
                    />
                  </Link>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-20 menu  shadow bg-base-100 rounded-box w-40"
                >
                  <li>
                    <Link>{user.displayName}</Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="btn">
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
              <Link className="btn bg-orange-600 text-white font-bold">DashBoard</Link>
            </>
          ) : (
            <>
          
            </>
          )}
    
  </div>
</div>
            
        </div>
    );
};

export default NavBar;