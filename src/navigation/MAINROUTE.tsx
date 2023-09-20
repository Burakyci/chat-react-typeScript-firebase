import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Page404Found from "../pages/Page404Found";
import Navbar from "../components/Navbar";

const MAINROUTE: React.FC = () => {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Page404Found />} />
      </Route>
    </Routes>
  );
};

export default MAINROUTE;
