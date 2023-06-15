import App from "./App";
import { createBrowserRouter, useLocation } from "react-router-dom";
import Home from "./tabs/Home";
import ErrorComponent from "./components/ErrorComponent";
import Soon from "./tabs/Soon";
import Playing from "./tabs/Playing";
import NotFound from "./tabs/NotFound";
import Modal from "./tabs/Modal";


export const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />,
    children:[
      {
   
        path:"",
        element:<Home />,
        errorElement:<ErrorComponent />,
        children:[
          {
            path:"detail/:id",
            element:<Modal />,
            errorElement:<ErrorComponent />,
          },
        ],
      },
      {
        path:"coming-soon",
        element:<Soon />,
        errorElement:<ErrorComponent />,
      },
      {
        path:"now-playing",
        element:<Playing />,
        errorElement:<ErrorComponent />,
      },
      
    ],
    errorElement:<NotFound />,
  }
]);
