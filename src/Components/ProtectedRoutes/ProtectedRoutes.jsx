import React from "react";

import { useContext, useEffect, useState } from "react";

import { Outlet, Routes, Navigate } from "react-router-dom";

import { AuthContext } from "../../Contexts/AuthContext";

import Login from "../Pages/Login/Login";

const ProtectedRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  return <>{currentUser ? <Outlet /> : <Login />}</>;
};

export default ProtectedRoutes;
