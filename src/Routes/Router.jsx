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

        
      ]
    }
    
  ]);


export default router;