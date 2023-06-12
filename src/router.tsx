import App from "./App";
import { createBrowserRouter } from "react-router-dom";
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
        path:"coming-soon",
        element:<Soon />,
      },
      {
        path:"now-playing",
        element:<Playing />,
      },
    ],
    errorElement:<NotFound />,
  }
]);
