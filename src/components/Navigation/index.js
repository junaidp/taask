import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../pages/Home";
import Portfolio from "../../pages/Portfolio";
import Lifecycle from "../../pages/Lifecycle";
import Project from "../../pages/Projects";
import Resources from "../../pages/Resources";
import Reporting from "../../pages/Reporting";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/lifecycle" element={<Lifecycle />} />
      <Route path="/project" element={<Project />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/reporting" element={<Reporting />} />
    </Routes>
  );
};

export default Navigation;
