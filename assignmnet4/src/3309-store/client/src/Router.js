import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "views/App";
import Login from "views/Login";
import InvalidPath from "views/InvalidPath";

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
