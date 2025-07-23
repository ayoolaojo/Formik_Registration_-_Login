// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");

  // If token exists, allow access to child routes
  return !token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
