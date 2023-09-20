import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Page404Found from "../pages/Page404Found";

const LOADINGROUTE: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<Page404Found />} />
    </Routes>
  );
};

export default LOADINGROUTE;
