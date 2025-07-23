// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  // If token exists, allow access to child routes
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
