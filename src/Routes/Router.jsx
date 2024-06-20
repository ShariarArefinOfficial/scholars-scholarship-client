import { createBrowserRouter } from "react-router-dom";
import ClientLayOut from "../LayOut/ClientLayOut";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import AllScholarShips from "../Pages/AllScholarShips/AllScholarShips";
import PrivateRoute from "../Providers/PrivateRoute";
import ScholarShipDetails from "../Pages/ScholarShipDetails/ScholarShipDetails";
import DashBoard from "../LayOut/DashBoard";
import MyApplication from "../Pages/MyApplication/MyApplication";
import AllUsers from "../DashBoard/AllUsers/AllUsers";
import AdminProfile from "../DashBoard/AdminProfile/AdminProfile";
import AdminRoute from "./AdminRoute";
import AddScholarShips from "../DashBoard/AddScholarship/AddScholarShips";
import ManageScholarShip from "../DashBoard/ManageScholarShip/ManageScholarShip";
import UpdateScholarship from "../DashBoard/UpdateScholarship/UpdateScholarship";
import ManageAppliedApplications from "../DashBoard/ManageAppliedApplications/ManageAppliedApplications";

const router = createBrowserRouter([
    
    {
        /** Client View */
      path: "/",
      element: <ClientLayOut></ClientLayOut>,
      children:[
        {
            
            path:'/',
            element:<Home></Home>,
        },
        {
            
          path:'/login',
          element:<LogIn></LogIn>,
      },
      {
            
        path:'/signUp',
        element:<SignUp></SignUp>,
      },
      {
        path:'/allscholarship',
        element:<AllScholarShips></AllScholarShips>
      },
      {
        path:'/scholarship/:id',
        element:<PrivateRoute><ScholarShipDetails></ScholarShipDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_URL}/scholarship/${params.id}`)
      },
      {
        path: 'myApplication',
        element: <MyApplication></MyApplication>
      }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
      children: [
        {
          path:'/dashboard/users',
          element:<PrivateRoute><AllUsers></AllUsers></PrivateRoute>,
        },
        {
          path:'/dashboard/Profile',
          element:<PrivateRoute><AdminProfile></AdminProfile></PrivateRoute>,
        },
        {
          path:'/dashboard/addscholarship',
          element:<PrivateRoute><AddScholarShips></AddScholarShips></PrivateRoute>,
        },
        {
          path:'/dashboard/managescholarship',
          element:<PrivateRoute><ManageScholarShip></ManageScholarShip></PrivateRoute>,
        },
        {
          path:'/dashboard/update/:id',
          element:<UpdateScholarship></UpdateScholarship>,
          loader: ({params}) => fetch(`${import.meta.env.VITE_URL}/scholarship/${params.id}`)

        },
        {
          path:'/dashboard/manageAppliedApplications',
          element:<ManageAppliedApplications></ManageAppliedApplications>,
          loader: ({params}) => fetch(`${import.meta.env.VITE_URL}/applications`)

        }

        
      ]
    }
    
  ]);


export default router;