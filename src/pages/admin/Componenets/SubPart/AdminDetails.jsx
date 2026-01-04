import { Trash2 } from "lucide-react";
import api from "../../../../../api/axios";
import { toast } from "react-toastify";

const AdminDetails = ({ admin, onDelete, disableDelete }) => {
  const deleteAdmin = async () => {
    if (disableDelete) return;

    try {
      await api.delete(`/admin/deleteAdmin/${admin._id}`);
      toast.success(`${admin.role} ${admin.name.firstName} delted Successfuly`);
      onDelete(admin._id);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="border border-neutral-700 rounded-lg p-4 flex justify-between items-center bg-[#141414]">
      <div>
        <div className="text-white font-medium">
          {admin.name.firstName} {admin.name.lastName}
        </div>
        <div className="text-sm text-neutral-400">{admin.role}</div>
      </div>

      <button
        onClick={deleteAdmin}
        disabled={disableDelete}
        className={`w-10 h-10 flex items-center justify-center rounded-lg
          ${
            disableDelete
              ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
              : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
          }`}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default AdminDetails;
