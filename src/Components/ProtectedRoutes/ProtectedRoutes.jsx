import React from "react";

import { useContext, useEffect, useState } from "react";

import { Outlet, Routes, Navigate } from "react-router-dom";

import { AuthContext } from "../../Contexts/AuthContext";

import Login from "../Pages/Login/Login";

import { auth } from "../../firebase/config";

const ProtectedRoutes = () => {
  const { currentUser } = useContext(AuthContext);
  const user = currentUser || JSON.parse(localStorage.getItem("user"));

  return <>{user ? <Outlet /> : <Login />}</>;
};

export default ProtectedRoutes;
