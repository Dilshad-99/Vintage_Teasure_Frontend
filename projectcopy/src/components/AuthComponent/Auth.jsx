import { Outlet, Navigate, useLocation } from "react-router-dom";

function Auth() {
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isLoggedIn = token && token !== "null" && token !== "undefined";

  const publicRoutes = ["/success", "/charity"];

  const adminRoutes = [
    "/admin",
    "/manageUser",
    "/addcategory",
    "/addsubcategory",
    "/addreview",
    "/donationhistory",
  ];

  const userRoutes = ["/user", "/addproduct"];

  // exact match helper (safer than startsWith)
  const isExact = (list) => list.includes(pathname);

  const isPrefix = (list) =>
    list.some((route) => pathname.startsWith(route + "/") || pathname === route);

  const isPublic = isPrefix(publicRoutes);
  const isAdminRoute = isPrefix(adminRoutes);
  const isUserRoute = isPrefix(userRoutes);

  // ✅ public routes (no login required)
  if (isPublic) return <Outlet />;

  // 🔐 login required
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  // 🔐 role missing safety
  if (!role) return <Navigate to="/login" replace />;

  // 🔐 admin protection
  if (role === "admin" && isUserRoute) {
    return <Navigate to="/admin" replace />;
  }

  // 🔐 user protection
  if (role === "user" && isAdminRoute) {
    return <Navigate to="/user" replace />;
  }

  return <Outlet />;
}

export default Auth;