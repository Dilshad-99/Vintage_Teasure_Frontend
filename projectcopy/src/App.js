import { useLocation, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/HeaderComponent/Header';
import Nav from './components/NavComponent/Nav';
import Footer from './components/FooterComponent/Footer';
import Sidebar from './components/SidebarComponent/Sidebar';

import Main from './components/MainComponent/Main';
import About from './components/AboutComponent/About';
import Contact from './components/ContactComponent/Contact';
import Service from './components/ServiceComponent/Service';
import Charity from './components/CharityComponent/Charity';
import AIClient from './components/aiChatComponent/AIClient';

import Register from './components/RegisterComponent/Register';
import Login from './components/LoginComponent/Login';
import Logout from './components/logout/Logout';
import ForgetPassword from './components/ForgetPasswordComponent/ForgetPassword';
import Verifyuser from './components/verifyUser/VerifyUser';

import ChangePassword from './components/changePasswordComponent/ChangePassword';
import EditProfile from './components/editprofilecomponent/EditProfile';

import ViewCategory from './components/ViewCategoryComponent/ViewCategory';
import ViewSubCategory from './components/ViewSubCategoryComponent/ViewSubCategory';
import ViewProduct from './components/ViewProductCategory/ViewProduct';
import ProductDetails from './components/ProductDetailsComponent/ProductDetails';
import AddReview from './components/AddReviewComponent/AddReview';
import EditProduct from './components/EditProductComponent/EditProduct';

import Adminhome from './components/AdminHomeComponent/AdminHome';
import AddCategory from './components/AddCategory/AddCategory';
import AddSubCategory from './components/AddSubCategory/AddSubCategory';
import ManageUser from './components/manageUserComponent/ManageUser';

import Userhome from './components/UserHomeComponent/UserHome';
import AddProduct from './components/AddProductComponent/AddProduct';

import Auth from './components/AuthComponent/Auth';
import DonationHistory from './components/DonationComponent/DonationHistory';
import Success from './components/SuccessComponent/Success';

function App() {
  const location = useLocation();

  return (
    <div className="app-wrapper">
      <Header />
      <Nav />

      <div className="app-content-area">
        <main className="app-main">
          <Routes>

            <Route path="/"            element={<Main />} />
            <Route path="/about"       element={<About />} />
            <Route path="/contact"     element={<Contact />} />
            <Route path="/service"     element={<Service />} />
            <Route path="/charity"     element={<Charity />} />
            <Route path="/success" element={<Success />} />
            <Route path="/aiclient"    element={<AIClient />} />

            <Route path="/register"       element={<Register />} />
            <Route path="/login"          element={<Login />} />
            <Route path="/logout"         element={<Logout />} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/vemail/:email"  element={<Verifyuser />} />

            <Route element={<Auth />}>
              <Route path="/changepassword"       element={<ChangePassword />} />
              <Route path="/editprofile"          element={<EditProfile />} />
              <Route path="/viewcategory"         element={<ViewCategory />} />
              <Route path="/viewsubcategory/:cnm" element={<ViewSubCategory />} />
              <Route path="/viewproduct/:scnm"    element={<ViewProduct />} />
              <Route path="/productdetail/:id"    element={<ProductDetails />} />
              <Route path="/editproduct/:id"      element={<EditProduct />} />
              <Route path="/addreview/:id"        element={<AddReview />} />
              <Route path="/admin"                element={<Adminhome />} />
              <Route path="/addcategory"          element={<AddCategory />} />
              <Route path="/addsubcategory"       element={<AddSubCategory />} />
              <Route path="/manageUser"           element={<ManageUser />} />
              <Route path="/user"                 element={<Userhome />} />
              <Route path="/addproduct"           element={<AddProduct />} />
              <Route path="/donationhistory" element={<DonationHistory />} />
            </Route>

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

        {location.pathname === '/' && <Sidebar />}
      </div>

      <Footer />
    </div>
  );
}

export default App;