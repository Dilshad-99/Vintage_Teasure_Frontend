import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Auth() {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path  = location.pathname;
    const token = localStorage.getItem("token");
    const role  = localStorage.getItem("role");

    const isLoggedIn = token && token !== "null" && token !== "undefined";

    const adminRoutes  = [ "/admin", "/manageUser", "/addcategory", "/addsubcategory", "/addreview" ];
    const userRoutes   = [ "/user", "/addproduct" ];
    const publicRoutes = [ "/", "/about", "/contact", "/service", "/login", "/register", "/ForgetPassword", "/vemail" ];

    const is = (list) => list.some(r => path.startsWith(r));

    if (is(publicRoutes)) return;
    if (!isLoggedIn) { navigate("/login"); return; }
    if (role === "admin" && is(userRoutes))  { navigate("/admin"); return; }
    if (role === "user"  && is(adminRoutes)) { navigate("/user");  return; }

  }, [location.pathname, navigate]);

  return null;
}

export default Auth;