import { Outlet, Navigate, useLocation } from 'react-router-dom';

function Auth() {
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");
  const role  = localStorage.getItem("role");

  const isLoggedIn = token && token !== "null" && token !== "undefined";

  const publicRoutes = ["/success", "/charity"]; // ✅ only these public

  const adminRoutes = ["/admin", "/manageUser", "/addcategory", "/addsubcategory", "/addreview", "/donationhistory"];
  
  const userRoutes  = ["/user", "/addproduct"];

  const is = (list) => list.some(r => pathname.startsWith(r));

  // ✅ public access
  if (is(publicRoutes)) return <Outlet />;

  // 🔐 login required
  if (!isLoggedIn) return <Navigate to="/login" />;

  // 🔐 role-based access
  if (role === "admin" && is(userRoutes)) return <Navigate to="/admin" />;
  if (role === "user"  && is(adminRoutes)) return <Navigate to="/user" />;

  return <Outlet />;
}

export default Auth;