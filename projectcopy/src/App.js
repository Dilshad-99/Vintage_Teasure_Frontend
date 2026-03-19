import './App.css';
import { Routes, Route } from 'react-router-dom';

import Footer from './components/FooterComponent/Footer';
import Header from './components/HeaderComponent/Header';
import Main from './components/MainComponent/Main';
import Nav from './components/NavComponent/Nav';
import About from './components/AboutComponent/About';
import Contact from './components/ContactComponent/Contact';
import Service from './components/ServiceComponent/Service';
import Register from './components/RegisterComponent/Register';
import Login from './components/LoginComponent/Login';
import Logout from './components/logout/Logout';
import Userhome from './components/UserHomeComponent/UserHome';
import Adminhome from './components/AdminHomeComponent/AdminHome';
import ManageUser from './components/manageUserComponent/ManageUser';
import ChangePassword from './components/changePasswordComponent/ChangePassword';
import EditProfile from './components/editprofilecomponent/EditProfile';
import ForgetPassword from './components/ForgetPasswordComponent/ForgetPassword';
import Verifyuser from './components/verifyUser/VerifyUser';
import AddCategory from './components/AddCategory/AddCategory';
import AddSubCategory from './components/AddSubCategory/AddSubCategory';
import ViewCategory from './components/ViewCategoryComponent/ViewCategory';
import ViewSubCategory from './components/ViewSubCategoryComponent/ViewSubCategory';
import ProductDetails from './components/ProductDetailsComponent/ProductDetails';
import AIClient from './components/aiChatComponent/AIClient';
import Charity from './components/CharityComponent/Charity';
import AddProduct from './components/AddProductComponent/AddProduct';
import ViewProduct from './components/ViewProductCategory/ViewProduct';
import AddReview from './components/AddReviewComponent/AddReview';
import Auth from './components/AuthComponent/Auth';

// Wrapper to protect admin-only routes
const AdminRoute = ({ element }) => <><Auth />{element}</>;

// Wrapper to protect user-only routes
const UserRoute = ({ element }) => <><Auth />{element}</>;

// Wrapper for routes accessible by BOTH admin and user
const ProtectedRoute = ({ element }) => <><Auth />{element}</>;

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Nav />

      <div className="app-content-area">
        <main className="app-main">
          <Routes>

            {/* ===== Public Routes ===== */}
            <Route path="/"                   element={<Main />} />
            <Route path="/about"              element={<About />} />
            <Route path="/contact"            element={<Contact />} />
            <Route path="/service"            element={<Service />} />
            <Route path="/register"           element={<Register />} />
            <Route path="/login"              element={<Login />} />
            <Route path="/charity"            element={<Charity />} />
            <Route path="/aiclient"           element={<AIClient />} />
            <Route path="/ForgetPassword"     element={<ForgetPassword />} />
            <Route path="/vemail/:email"      element={<Verifyuser />} />
            <Route path="/logout"             element={<Logout />} />

            {/* ===== Shared Protected Routes (both admin + user) ===== */}
            <Route path="/changepassword"     element={<ProtectedRoute element={<ChangePassword />} />} />
            <Route path="/editprofile"        element={<ProtectedRoute element={<EditProfile />} />} />

            {/* ViewCategory and ViewSubCategory — both admin and user need these
                Admin uses them to browse products and add reviews
                User uses them to browse and add products                         */}
            <Route path="/viewcategory"             element={<ProtectedRoute element={<ViewCategory />} />} />
            <Route path="/viewsubcategory/:cnm"     element={<ProtectedRoute element={<ViewSubCategory />} />} />
            <Route path="/viewproduct/:scnm"        element={<ProtectedRoute element={<ViewProduct />} />} />

            {/* Product detail — both admin and user can view it
                ✅ Fixed: was "/productdetails/:id", now matches Link to="/productdetail/:id" */}
            <Route path="/productdetail/:id"        element={<ProtectedRoute element={<ProductDetails />} />} />

            {/* ===== Admin Only Routes ===== */}
            <Route path="/admin"              element={<AdminRoute element={<Adminhome />} />} />
            <Route path="/addcategory"        element={<AdminRoute element={<AddCategory />} />} />
            <Route path="/addsubcategory"     element={<AdminRoute element={<AddSubCategory />} />} />
            <Route path="/manageUser"         element={<AdminRoute element={<ManageUser />} />} />

            {/* Only admin can add reviews */}
            <Route path="/addreview/:id"      element={<AdminRoute element={<AddReview />} />} />

            {/* ===== User Only Routes ===== */}
            <Route path="/user"               element={<UserRoute element={<Userhome />} />} />

            {/* Only user can add products */}
            <Route path="/addproduct"         element={<UserRoute element={<AddProduct />} />} />

            {/* ===== 404 ===== */}
            <Route path="*" element={
              <div className="page-section" style={{ textAlign: 'center' }}>
                <h2>404 - Page Not Found</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
                  The page you're looking for doesn't exist.
                </p>
              </div>
            } />

          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;