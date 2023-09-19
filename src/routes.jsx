/* eslint-disable react/prop-types */
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/index";
import SignUp from "./Pages/SignUp/index";
import SignIn from "./Pages/SignIn/index";

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = localStorage.getItem("token");
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={redirectTo} />;
  }
}

function UnprotectedRoutes() {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to={"/home"} />;
  } else {
    return <Outlet />;
  }
}

function MainRoutes() {
  return (
    <Routes>
      <Route element={<UnprotectedRoutes />}>
        <Route path="/" element={<SignUp />} />
      </Route>

      <Route element={<UnprotectedRoutes />}>
        <Route path="/signin" element={<SignIn />} />
      </Route>

      <Route element={<ProtectedRoutes redirectTo={"/"} />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
