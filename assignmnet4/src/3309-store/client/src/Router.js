import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "components/App";
import Login from "components/Login";
import InvalidPath from "components/InvalidPath";

//router component for switching pages
const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" caseSensitive={false} element={<App />} />
      <Route path="/login" caseSensitive={false} element={<Login />} />
      <Route path="*" element={<InvalidPath />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
