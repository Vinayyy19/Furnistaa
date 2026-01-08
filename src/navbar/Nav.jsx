import { memo } from "react";
import Logo from "./components/Logo";
import Searchbar from "./components/Searchbar";
import LoginButton from "./components/LoginButton";
import Profile from "./components/Profile";
import User from "./components/User";
import Cart from "./components/Cart";

const Nav = () => {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <nav className="flex items-center justify-between px-10 py-4 from-[#1f1b10] to-[#2a2416]">
      <Logo />
      <Searchbar />
      <div className="flex items-center gap-6 ml-5">
        <div className="hidden md:block">{isLoggedIn ? <User /> : <LoginButton />}</div>
        <Cart />
        <Profile />
      </div>
    </nav>
  );
};

export default memo(Nav);
