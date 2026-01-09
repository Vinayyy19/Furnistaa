import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api/axios";

const categories = [
  "Placing a new order",
  "Order modification",
  "Delivery related information",
  "Issue with / information about delivered products",
  "Return & replacement",
  "Order cancellation",
  "Others",
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    category: "",
    description: "",
  });
  const [loading,setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCategorySelect = (category) => {
    setFormData((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/orders/contact-us", formData);
      toast.success("Message sent successfully");

      setFormData({
        name: "",
        email: "",
        mobile: "",
        pincode: "",
        category: "",
        description: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white">
      <div
        className="w-full h-60 sm:h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85')",
        }}
      >
        <h1 className="text-3xl sm:text-5xl font-serif text-black">
          Contact Us
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="space-y-10 p-10">
          <div>
            <h2 className="text-2xl font-serif mb-6">Come, meet us!</h2>

            <p className="font-semibold mb-2">
              Manufactured, Packed & Marketed By:
            </p>

            <p className="text-gray-700 leading-relaxed">
              Furnista | Where Quality meets Quantity <br />
              Address: Some Address here, <br />
              address part 2, <br />
              address part 3 and street, <br />
              Landmark here, <br />
              address district here , <br />
              Maharastra, India.
            </p>
          </div>

          <div>
            <button className="w-full bg-black text-white py-4 rounded-md text-lg font-medium">
              Chat with us
            </button>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Experience our new chatbot for the resolution of your queries.
              Our chat has the lowest wait and resolution time.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="text-gray-600">
            Want to connect with us for something else? <br />
            Message us here and we'll get back to you soon!
          </p>

          <div>
            <label className="block mb-1">Enter Name :</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-3"
              placeholder="Enter Name"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Enter Email Address :</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-3"
              placeholder="Enter Email Address"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Enter Mobile Number :</label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-3"
                placeholder="Enter Mobile Number"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Enter Pincode :</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-3"
                placeholder="Enter Pincode"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-3">Select Category:</label>

            <div className="flex flex-wrap gap-3">
              {categories.map((item) => {
                const isSelected = formData.category === item;
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => handleCategorySelect(item)}
                    className={`px-4 py-2 rounded-md border transition cursor-pointer
                      ${
                        isSelected
                          ? "bg-primary text-black border-primary"
                          : "border-primary text-black hover:bg-purple-50"
                      }
                    `}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block mb-1">Description :</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="w-full border rounded-md px-4 py-3"
              placeholder="Enter description"
            />
          </div>

          <button
              type="submit"
              disabled={loading}
              className="bg-primary text-black cursor-pointer px-8 py-3 rounded-md font-medium hover:bg-primary disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
