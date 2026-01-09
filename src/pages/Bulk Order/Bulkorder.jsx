import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api/axios";

const BulkOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    requirements: "",
    pincode: "",
    organisation: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/orders/Bulk-order", formData);
      toast.success("Request submitted successfully");

      setFormData({
        name: "",
        email: "",
        mobile: "",
        requirements: "",
        pincode: "",
        organisation: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white">
      <div
        className="w-full h-60 sm:h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1575501265016-ae78c708a09c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU2fHxmdXJuaXR1cmV8ZW58MHx8MHx8fDA%3D')",
        }}
      >
        <h1 className="text-3xl sm:text-5xl font-serif text-black">
          Bulk Order
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
            alt="Product"
            className="rounded-xl w-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Enquire Now</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border rounded-md px-4 py-3"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="border rounded-md px-4 py-3"
                required
              />

              <div className="flex border rounded-md overflow-hidden">
                <span className="bg-black text-white px-3 flex items-center">
                  +91
                </span>
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="w-full px-4 py-3 outline-none"
                  required
                />
              </div>
            </div>

            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Tell us your requirements"
              rows="4"
              className="w-full border rounded-md px-4 py-3"
              required
            />

            <p className="text-xs text-gray-500">
              Please include details of quantity, type of products, type of
              establishment, etc.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="border rounded-md px-4 py-3"
              />

              <input
                name="organisation"
                value={formData.organisation}
                onChange={handleChange}
                placeholder="Organisation"
                className="border rounded-md px-4 py-3"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-black cursor-pointer px-8 py-3 rounded-md font-medium hover:bg-primary disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Request a Call"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BulkOrder;
