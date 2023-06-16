import App from "./App";
import { createBrowserRouter, useLocation } from "react-router-dom";
import Home from "./tabs/Home";
import ErrorComponent from "./components/ErrorComponent";
import Soon from "./tabs/Soon";
import Playing from "./tabs/Playing";
import NotFound from "./tabs/NotFound";


export const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:"",
        element:<Home />,
        errorElement:<ErrorComponent />,
      },
      {
        path:"detail/:id",
        element:<Home />,
      },

      {
        path:"coming-soon",
        element:<Soon />,
        errorElement:<ErrorComponent />,
      },
      {
        path:"coming-soon/detail/:id",
        element:<Soon />,
      },
      {
        path:"now-playing",
        element:<Playing />,
        errorElement:<ErrorComponent />,
      },
      {
        path:"now-playing/detail/:id",
        element:<Playing />,

      },
      
    ],
    errorElement:<NotFound />,
  }
]);
