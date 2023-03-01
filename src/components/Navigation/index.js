import React from "react";
import { Routes, Route } from "react-router-dom";

import UpcomingItems from "../../pages/UpcomingItems";
import Portfolio from "../../pages/Portfolio";
import Lifecycle from "../../pages/Lifecycle";
import Project from "../../pages/Projects";
import Resources from "../../pages/Resources";
import Reporting from "../../pages/Reporting";
import Customer from "../../pages/Customer";
import CustomerTasks from "../../pages/CustomerTasks";
import Snapshots from "../Snapshots";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<UpcomingItems />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/customerTasks" element={<CustomerTasks />} />
      <Route path="/project" element={<Project />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/snapshots" element={<Snapshots />} />
    </Routes>
  );
};

export default Navigation;
