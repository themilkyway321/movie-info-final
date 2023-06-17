import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { useEffect } from "react";

export default function App() {
  
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
