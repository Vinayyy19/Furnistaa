import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import api from "../../../api/axios";

const Login = () => {
  const { setUser } = useUser();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const loginhere = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user.name.firstName);
      setUser(response.data.user);
      toast.success("Login successful! Welcome back to Furnista.");
      navigate("/");
    } catch (error) {
      toast.error(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Network error. Please try again.");
      }
      setpassword("");
    }
  };
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2sOLfkuwxha-I6y2gvBRu6e3iC774mcbvrhdiuOnFitbS1zEmLHuA7pIjapr0p2pzHZ8tzXNk5sL_bd1tD4SpTZy7eRMkrOHkZDV_57DFW-9cayQCs98J2IUGBObn0iYXooyklsiFQM6KtkAXfv5mD68u3ja3UV2WHolZbQn10nMgWqBKQAnjN6vBG0z0UfgqOCMPiGEbP7qv4znmfZ-xm0SbkiAfO90S3pd7nzpl1-aq7gXS6lKXXDDWCzuX6qR9aRjJZB8Fm_cw')`,
          }}
        >
          <div className="w-full h-full bg-black/60"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-md flex-col items-center">
          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-bold text-primary cursor-pointer"
          >
            Furnista
          </h1>

          <div className="w-full mt-10">
            <h2 className="text-center text-3xl font-bold tracking-tight text-on-surface-dark">
              Welcome Back
            </h2>
          </div>

          <form className="w-full mt-8 space-y-6" onSubmit={loginhere}>
            <div className="flex flex-col flex-1 min-w-40">
              <label className="text-on-surface-dark text-base font-medium pb-2">
                Email
              </label>
              <input
                className="form-input w-full rounded-lg text-on-surface-dark
                focus:outline-0 focus:ring-2 focus:ring-primary/50
                border border-primary/40 bg-surface-dark/80
                h-14 p-4 placeholder:text-on-surface-dark-secondary/70
                backdrop-blur-sm"
                placeholder="Enter your Email"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="flex flex-col flex-1 min-w-40">
              <label className="text-on-surface-dark text-base font-medium pb-2">
                Password
              </label>
              <input
                type="password"
                className="form-input w-full rounded-lg text-on-surface-dark
                focus:outline-0 focus:ring-2 focus:ring-primary/50
                border border-primary/40 bg-surface-dark/80
                h-14 p-4 placeholder:text-on-surface-dark-secondary/70"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <p className="text-on-surface-dark-secondary text-sm text-right underline cursor-pointer hover:text-primary">
              Forgot Password
            </p>

            <button
              className="w-full rounded-lg bg-primary-dark px-6 py-4 text-base font-bold text-primary hover:opacity-90 cursor-pointer"
              type="submit"
            >
              Log In
            </button>

            <div className="relative my-6">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t border-primary/40"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background-dark px-2 text-on-surface-dark-secondary">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex h-12 items-center justify-center gap-x-3 rounded-lg border border-primary/40 bg-surface-dark/80 text-on-surface-dark transition-colors hover:bg-surface-dark backdrop-blur-sm">
                <span className="text-sm font-medium">Apple</span>
              </button>
              <button className="flex h-12 items-center justify-center gap-x-3 rounded-lg border border-primary/40 bg-surface-dark/80 text-on-surface-dark transition-colors hover:bg-surface-dark backdrop-blur-sm">
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-on-surface-dark">
            Don't have an account ?{" "}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:text-primary/90"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
