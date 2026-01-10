import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";
import api from "../../../api/axios";

const fieldVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

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

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/users/register", {
        name: { firstName, lastName },
        email,
        phoneNumber,
        password,
      });

      if (response.status === 201) {
        toast.success(
          "Welcome to Furnista! Your account has been created successfully."
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", firstName);
        setUser(response.data.user);
        navigate("/");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Network error. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center px-4 py-8">
      <h1
        onClick={() => navigate("/")}
        className="text-3xl font-bold text-primary cursor-pointer mb-6"
      >
        Furnista
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-xl bg-[#2b2414] rounded-2xl border border-[#685a31] shadow-lg p-6 sm:p-8"
      >
        <motion.form
          onSubmit={submitUser}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="flex flex-col gap-5"
        >
          <motion.div variants={fieldVariant}>
            <h2 className="text-white text-2xl sm:text-3xl font-bold">
              Create Your Account
            </h2>
            <p className="text-[#cbbc90] text-sm mt-1">
              Discover timeless elegance and craftsmanship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div variants={fieldVariant}>
              <label className="text-white text-sm font-medium">
                First Name
              </label>
              <input
                className="mt-2 w-full h-12 rounded-xl border border-[#685a31] bg-[#342d18] px-4 text-white focus:ring-2 focus:ring-primary/50 focus:outline-none"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              />
            </motion.div>

            <motion.div variants={fieldVariant}>
              <label className="text-white text-sm font-medium">
                Last Name
              </label>
              <input
                className="mt-2 w-full h-12 rounded-xl border border-[#685a31] bg-[#342d18] px-4 text-white focus:ring-2 focus:ring-primary/50 focus:outline-none"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </motion.div>
          </div>

          <motion.div variants={fieldVariant}>
            <label className="text-white text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              className="mt-2 w-full h-12 rounded-xl border border-[#685a31] bg-[#342d18] px-4 text-white focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </motion.div>

          <motion.div variants={fieldVariant}>
            <label className="text-white text-sm font-medium">
              Phone Number
            </label>
            <input
              className="mt-2 w-full h-12 rounded-xl border border-[#685a31] bg-[#342d18] px-4 text-white focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
            />
          </motion.div>

          <motion.div variants={fieldVariant}>
            <label className="text-white text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              className="mt-2 w-full h-12 rounded-xl border border-[#685a31] bg-[#342d18] px-4 text-white focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="Create password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </motion.div>

          <motion.div variants={fieldVariant}>
            <label className="text-white text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-2 w-full h-12 rounded-xl border border-[#685a31] bg-[#342d18] px-4 text-white focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </motion.div>

          <motion.p
            variants={fieldVariant}
            className="text-xs text-[#cbbc90] text-center leading-relaxed"
          >
            By creating an account, you agree to our{" "}
            <Link
              to="/termsofservice"
              className="text-primary underline font-medium"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-primary underline font-medium"
            >
              Privacy Policy
            </Link>
          </motion.p>

          <motion.button
            variants={fieldVariant}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-2 h-12 rounded-xl cursor-pointer bg-primary text-background-dark font-bold hover:opacity-90 transition"
          >
            Create Account
          </motion.button>

          <motion.p
            variants={fieldVariant}
            className="text-center text-sm text-[#cbbc90]"
          >
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold cursor-pointer">
              Log In
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Signup;
