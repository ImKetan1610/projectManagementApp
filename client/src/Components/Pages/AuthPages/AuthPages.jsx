import React from "react";
import { Outlet } from "react-router-dom";

const AuthPages = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthPages;
