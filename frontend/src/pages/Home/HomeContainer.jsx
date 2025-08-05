import React, { useEffect, useState } from "react";
import Header from "../Navbar/Header";
import { Outlet } from "react-router-dom";

function HomeContainer() {
  return (
    <div>
      <div className="mx-5 md:mx-20 lg:mx-36">
        <Outlet />
      </div>
    </div>
  );
}

export default HomeContainer;
