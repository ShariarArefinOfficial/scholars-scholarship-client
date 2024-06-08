import { createBrowserRouter } from "react-router-dom";
import ClientLayOut from "../LayOut/ClientLayOut";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
    
    {
        /** Client View */
      path: "/",
      element: <ClientLayOut></ClientLayOut>,
      children:[
        {
            
            path:'/',
            element:<Home></Home>,
        }
      ]
    },
  ]);


export default router;