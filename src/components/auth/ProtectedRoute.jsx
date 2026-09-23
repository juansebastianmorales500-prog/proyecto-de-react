import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const logueado = localStorage.getItem("logueado");
  const location = useLocation();

  if (logueado === "true") {
    return <Outlet />;
  }

  return (
    <Navigate
      to="/login"
      replace
      state={{ from: location }}
    />
  );
}

export default ProtectedRoute;