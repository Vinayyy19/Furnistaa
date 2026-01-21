import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./Redux/cartSlice";
import ReactLenis from "lenis/react";

import Home from "./pages/home/home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Error404 from "./pages/Error404";
import Chat from "./pages/chat/Chatbox";
import Product from "./pages/productPage/Product";
import ParticularPro from "./pages/productPage/parProduct/ParticularPro";
import Cart from "./pages/Chart/Cart";
import CheckOut from "./pages/Checkout/CheckOut";
import Layout from "./Layout";
import ContactUs from "./pages/Contact/ContactUs";
import BulkOrder from "./pages/Bulk Order/Bulkorder";

import ProtectedRoute from "./Component/ProtectedRoute";
import AdminProtectedRoute from "./Component/AdminProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import Admin from "./pages/admin/Admin";

import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";

const AppShell = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/user");
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.cart.initialized);
  useEffect(() => {
    if (!initialized) dispatch(fetchCart());
  }, [dispatch, initialized]);

  const content = (
    <Routes>
      {/* PUBLIC */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<Product />} />
        <Route path="/search" element={<Product />} />
        <Route path="/product/:id" element={<ParticularPro />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/BulkOrder" element={<BulkOrder />} />
        <Route path="/contactUs" element={<ContactUs />} />
      </Route>

      {/* USER */}
      <Route element={<ProtectedRoute />}>
        <Route path="/user/*" element={<Chat />} />
      </Route>

      {/* ADMIN */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/*" element={<Admin />} />
      </Route>

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<AdminLogin />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );

  return isAdminRoute ? (
    content
  ) : (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
      }}
    >
      {content}
    </ReactLenis>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppShell />
        <ToastContainer />
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
