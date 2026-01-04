import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import api from "../../../api/axios";

const Signup = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const submitUser = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await api.post("/users/register",
        {
          name:{
            firstName,
            lastName
          },
          email,
          phoneNumber,
          password,
        }
      );
      if (response.status === 201) {
        toast.success(
          "Welcome to Furnista! Your account has been created successfully."
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", firstName);
        setUser(response.data.user);
        navigate("/");
      } else {
        setfirstName("");
        setlastName("");
        setemail("");
        setphoneNumber("");
        setpassword("");
        setconfirmPassword("");
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Network error. Please try again.");
        setfirstName("");
        setlastName("");
        setemail("");
        setphoneNumber("");
        setpassword("");
        setconfirmPassword("");
      }
    }
  };
  // https://wallpapers.com/images/hd/high-resolution-wood-background-mc5m7on7t7ung98b.jpg
  return (
    <div className="px-50 py-5 min-h-screen bg-background-dark">
      <h1
        onClick={() => navigate("/")}
        className="text-3xl font-bold text-primary cursor-pointer flex justify-center"
      >
        Furnista
      </h1>
      <form
        className="flex flex-1 flex-col px-4 pt-6 pb-8"
        onSubmit={submitUser}
      >
        <h2 className="text-white text-[32px] font-bold leading-tight tracking-tight text-left">
          Create Your Furnista Account
        </h2>
        <p className="text-white text-base font-normal leading-normal pt-1 pb-6">
          Discover timeless elegance and craftsmanship.
        </p>

        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4 w-full">
            <label className="flex flex-col w-1/2">
            <p className="text-white text-base font-medium leading-normal pb-2">
              First Name
            </p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-[#685a31] bg-[#342d18] h-14 p-4 text-base font-normal leading-normal text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Enter your first name"
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </label>
          <label className="flex flex-col w-1/2">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Last Name
            </p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-[#685a31] bg-[#342d18] h-14 p-4 text-base font-normal leading-normal text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Enter your Last name"
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </label>
          </div>

          <label className="flex flex-col">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Email Address
            </p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-[#685a31] bg-[#342d18] h-14 p-4 text-base font-normal leading-normal text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Enter your email address"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </label>

          <label className="flex flex-col">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Phone Number
            </p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-[#685a31] bg-[#342d18] h-14 p-4 text-base font-normal leading-normal text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Enter your phone number"
              type="text"
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
            />
          </label>

          <label className="flex flex-col">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Password
            </p>
            <div className="relative flex w-full items-center">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-[#685a31] bg-[#342d18] h-14 p-4 pr-12 text-base font-normal leading-normal text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
          </label>

          <label className="flex flex-col">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Confirm Password
            </p>
            <div className="relative flex w-full items-center">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-[#685a31] bg-[#342d18] h-14 p-4 pr-12 text-base font-normal leading-normal text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </div>
          </label>
        </div>
        <p className="text-[#cbbc90] text-sm text-center font-normal leading-normal pt-6">
          By creating an account, you agree to our <br />{" "}
          <Link
            className="font-medium text-primary underline"
            to="/termsofservice"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className="font-medium text-primary underline" to="/privacy">
            Privacy Policy
          </Link>
        </p>
        <div className="mt-auto pt-8">
          <button
            className="flex w-full items-center justify-center rounded-xl bg-primary h-14 px-6 text-base font-bold text-background-dark transition-opacity hover:opacity-90 cursor-pointer"
            type="submit"
          >
            Create Account
          </button>
        </div>
        <p className="text-[#cbbc90] text-center text-base font-normal leading-normal pt-6">
          Already have an account?{" "}
          <Link className="font-bold text-primary" to="/login">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
