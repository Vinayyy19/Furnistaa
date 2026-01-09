import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../../../api/axios";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/messages", {
        params: { page, limit: 10, type: type || undefined },
      });
      setMessages(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page, type]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Messages</h1>

      <select
        value={type}
        onChange={(e) => {
          setPage(1);
          setType(e.target.value);
        }}
        className="border px-4 py-2 rounded-md mb-6 bg-white text-black border-gray-300"
      >
        <option value="">All</option>
        <option value="contactUs">Contact Us</option>
        <option value="bulkOrder">Bulk Orders</option>
      </select>

      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-left">
          <thead className="bg-white text-black">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Mobile</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              messages.map((msg) => (
                <tr
                  key={msg._id}
                  onClick={() => setSelectedMsg(msg)}
                  className="cursor-pointer hover:bg-gray-700"
                >
                  <td className="p-3 border">{msg.name}</td>
                  <td className="p-3 border">{msg.email}</td>
                  <td className="p-3 border">{msg.mobile}</td>
                  <td className="p-3 border">{msg.category}</td>
                  <td className="p-3 border capitalize">{msg.type}</td>
                  <td className="p-3 border">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <AnimatePresence>
        {selectedMsg && (
          <motion.div
            className="fixed inset-0 bg-white/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMsg(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-black rounded-lg p-6 w-full max-w-lg"
            >
              <h2 className="text-xl font-semibold mb-4">Message Details</h2>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {selectedMsg.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedMsg.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {selectedMsg.mobile}
                </p>
                <p>
                  <strong>Pincode:</strong> {selectedMsg.pincode}
                </p>
                <p>
                  <strong>Category:</strong> {selectedMsg.category}
                </p>
                <p>
                  <strong>Type:</strong> {selectedMsg.type}
                </p>
                <p className="pt-2">
                  <strong>Description:</strong>
                  <br />
                  {selectedMsg.description}
                </p>
              </div>

              <button
                onClick={() => setSelectedMsg(null)}
                className="mt-6 w-full bg-black text-white py-2 rounded-md cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMessages;
