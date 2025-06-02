import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import DashboardScreen from "./components/DashBoardScreen";
import PolicyScreen from "./components/PolicyScreen";
import ProtectedRoute from "./components/ProtectedRoutes";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import TowerScreen from "./components/TowerScreen";
import DeviceScreen from "./components/DeviceScreen";
import UserScreen from "./components/UserScreen";

const App = () => {
  const { accessToken, role } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={accessToken ? <Navigate to="/dashboard" /> : <LoginForm />}
      />
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin", "user", "viewer"]}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/policy/:towerId" element={<PolicyScreen />} />
        <Route path="/towers" element={<TowerScreen />} />
        <Route path="/devices" element={<DeviceScreen />} />
        <Route path="/users" element={<UserScreen />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
