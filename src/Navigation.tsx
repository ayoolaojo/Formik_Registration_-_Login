import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import PrivateRoute from "./navigations/PrivateRoute";
import PublicRoute from "./navigations/PublicRoute";

function Navigation() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route element={<Home />} path="/" />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Navigation;
