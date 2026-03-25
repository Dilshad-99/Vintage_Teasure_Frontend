import { Outlet, Navigate, useLocation } from 'react-router-dom';

function Auth() {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  const role  = localStorage.getItem("role");

  const isLoggedIn = token && token !== "null" && token !== "undefined";

  const adminRoutes = ["/admin", "/manageUser", "/addcategory", "/addsubcategory", "/addreview"];
  const userRoutes  = ["/user", "/addproduct"];

  const is = (list) => list.some(r => pathname.startsWith(r));

  if (!isLoggedIn)                        return <Navigate to="/login" />;
  if (role === "admin" && is(userRoutes)) return <Navigate to="/admin" />;
  if (role === "user"  && is(adminRoutes)) return <Navigate to="/user" />;

  return <Outlet />;
}

export default Auth;