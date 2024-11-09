import React from "react";
import { Login } from "../admin/Login";
import { Route, Routes } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Register } from "../admin/Register";
import { RecoverAccount } from "../admin/RecoverAccount";
import { Dashboard } from "../dashboard/pages/Dashboard";
import { Products } from "../dashboard/pages/Products";
import { Sales } from "../dashboard/pages/Sales";
import { AdminProfile } from "../dashboard/pages/AdminProfile";
import { Proforms } from "../dashboard/pages/Proforms";

export const AppRouter = () => {
  return (
    <>
      {/* <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recover" element={<RecoverAccount />} />
          </Route>
              <Route element={<DashboardLayout/>} >
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/sales" element={<Sales/>} />
                <Route path="/profile" element={<AdminProfile/>} />
                <Route path="/proforms" element={<Proforms/>} />
              </Route>
        </Route>
      </Routes> */}

      <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<RecoverAccount />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/sales" element={<Sales/>} />
            <Route path="/profile" element={<AdminProfile/>} />
            <Route path="/proforms" element={<Proforms/>} />
        </Route>
      </Route>
    </Routes>
    </>
  );
};
