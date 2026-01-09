import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./Redux/cartSlice";

import Home from "./pages/home/home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Error404 from "./pages/Error404";
import Chat from "./pages/chat/Chatbox";
import Product from "./pages/productPage/Product";
import ParticularPro from "./pages/productPage/parProduct/ParticularPro";
import Cart from "./pages/Chart/Cart";
import CheckOut from "./pages/Checkout/CheckOut";

import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Component/ProtectedRoute";
import AdminProtectedRoute from "./Component/AdminProtectedRoute";

import Layout from "./Layout";
import { UserProvider } from "./context/UserContext";
import AdminLogin from "./pages/admin/AdminLogin";
import Admin from "./pages/admin/Admin";
import Payment from "./pages/Checkout/Payment";
import ContactUs from "./pages/Contact/ContactUs";
import BulkOrder from "./pages/Bulk Order/Bulkorder";

const App = () => {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.cart.initialized);

  useEffect(() => {
    if (!initialized) dispatch(fetchCart());
  }, [dispatch, initialized]);

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>

          {/* PUBLIC */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<Product />} />
            <Route path="/search" element={<Product />} />
            <Route path="/product/:id" element={<ParticularPro />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/BulkOrder" element={<BulkOrder />}/>
            <Route path="/contactUs" element={<ContactUs />} />
          </Route>

          {/* USER PROTECTED */}
          <Route element={<ProtectedRoute />}>
            <Route path="/payment" element={<Payment />} />
            <Route path="/user/*" element={<Chat />} />
          </Route>

          {/* ADMIN PROTECTED */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/*" element={<Admin />} />
          </Route>

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminLogin />} />

          <Route path="*" element={<Error404 />} />
        </Routes>

        <ToastContainer />
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
