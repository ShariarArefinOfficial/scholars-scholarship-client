import { createBrowserRouter } from "react-router-dom";
import ClientLayOut from "../LayOut/ClientLayOut";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import AllScholarShips from "../Pages/AllScholarShips/AllScholarShips";

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
      }
      ]
    },
  ]);


export default router;