import { useState, useEffect } from "react";
import { UserRound, PencilLine, MapPinPen } from "lucide-react";
import { useUser } from "../../../context/UserContext";
import api from "../../../../api/axios";
import { toast } from "react-toastify";
import LoadingBox from "../../../Loading/LoadingBox";

/* ---------- SAFE INITIAL STATE ---------- */
const EMPTY_STATE = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  street: "",
  city: "",
  pinCode: "",
};

const Setting = () => {
  const [isEditingP, setisEditingP] = useState(false);
  const [isEditingA, setisEditingA] = useState(false);

  const { user, setUser } = useUser();

  const [editedData, setEditedData] = useState(EMPTY_STATE);
  const [originalData, setOriginalData] = useState(EMPTY_STATE);

  /* ---------- LOAD USER ---------- */
  useEffect(() => {
    if (!user) {
      api
        .get("/users/profile")
        .then((res) => setUser(res.data.user))
        .catch(() => toast.error("Failed to load profile"));
    }
  }, [user, setUser]);

  /* ---------- SYNC LOCAL STATE ---------- */
  useEffect(() => {
    if (!user) return;

    const data = {
      firstName: user?.name?.firstName || "",
      lastName: user?.name?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      pinCode: user?.address?.postalCode || "",
    };

    setOriginalData(data);
    setEditedData(data);
  }, [user]);

  const handleInputChange = (field, value) => {
    if (field === "pinCode") {
      if (!/^\d*$/.test(value)) {
        toast.error("Pin code must contain only numbers");
        return;
      }
      if (value.length > 6) {
        toast.error("Pin code must be exactly 6 digits");
        return;
      }
    }

    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async (type) => {
    const changedFields = {};

    Object.keys(editedData).forEach((key) => {
      if (editedData[key] !== originalData[key]) {
        changedFields[key] = editedData[key];
      }
    });

    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes to save");
      type === "personal" ? setisEditingP(false) : setisEditingA(false);
      return;
    }

    /* ---------- PINCODE → POSTALCODE ---------- */
    const payload = { ...changedFields };
    if (payload.pinCode !== undefined) {
      payload.postalCode = payload.pinCode;
      delete payload.pinCode;
    }

    try {
      const res = await api.patch("/users/update", payload);

      toast.success("Profile updated successfully");

      setUser(res.data.user);
      setOriginalData(editedData);

      type === "personal" ? setisEditingP(false) : setisEditingA(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      setEditedData(originalData);
    }
  };

  const handleCancel = () => {
    setEditedData(originalData);
    setisEditingP(false);
    setisEditingA(false);
  };

  if (!user) return <LoadingBox />;

  return (
    <div className="p-5 space-y-6 h-screen overflow-auto">
      <div className="p-10 space-y-6 overflow-auto hide-scrollbar h-screen">
        <div>
          <div className="text-white text-3xl font-bold">Account Settings</div>
          <div className="text-neutral-400">
            Manage your Profile Information
          </div>
        </div>

        {/* ---------- PERSONAL INFO ---------- */}
        <div className="border border-neutral-400 rounded-lg">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2 text-white text-2xl font-semibold">
              <UserRound />
              <span>Personal Information</span>
            </div>
            <button
              disabled={isEditingP}
              onClick={() => setisEditingP(true)}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-neutral-700 hover:bg-neutral-600 disabled:bg-neutral-800 disabled:text-neutral-500"
            >
              <div className="flex gap-2">
                <PencilLine size={18} /> <p>Edit</p>
              </div>
            </button>
          </div>

          <div className="border-t border-neutral-400" />

          <div className="p-4 space-y-6">
            <div className="flex gap-5">
              <label className="flex-1">
                <p className="text-neutral-300">First Name</p>
                <input
                  type="text"
                  disabled={!isEditingP}
                  className="w-full p-3 mt-2 bg-neutral-800 border border-neutral-600 rounded-lg text-white"
                  value={editedData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
              </label>

              <label className="flex-1">
                <p className="text-neutral-300">Last Name</p>
                <input
                  type="text"
                  disabled={!isEditingP}
                  className="w-full p-3 mt-2 bg-neutral-800 border border-neutral-600 rounded-lg text-white"
                  value={editedData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
              </label>
            </div>

            <div className="flex gap-5">
              <label className="flex-1">
                <p className="text-neutral-300">Email</p>
                <input
                  type="email"
                  disabled
                  className="w-full p-3 mt-2 bg-neutral-800 border border-neutral-600 opacity-60 rounded-lg text-white"
                  value={user.email}
                />
              </label>

              <label className="flex-1">
                <p className="text-neutral-300">Phone</p>
                <input
                  type="text"
                  disabled={!isEditingP}
                  className="w-full p-3 mt-2 bg-neutral-800 border border-neutral-600 rounded-lg text-white"
                  value={editedData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
              </label>
            </div>
          </div>
        </div>

        {isEditingP && (
          <div className="flex justify-end gap-4">
            <button
              className="px-6 py-3 rounded-md text-white bg-neutral-700"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 rounded-md text-white bg-blue-600"
              onClick={() => handleSaveChanges("personal")}
            >
              Save Changes
            </button>
          </div>
        )}

        {/* ---------- ADDRESS ---------- */}
        <div className="border border-neutral-400 rounded-lg">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2 text-white text-2xl font-semibold">
              <MapPinPen />
              <span>Address</span>
            </div>
            <button
              disabled={isEditingA}
              onClick={() => setisEditingA(true)}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-neutral-700 hover:bg-neutral-600 disabled:bg-neutral-800"
            >
              <div className="flex gap-2">
                <PencilLine size={18} /> <p>Edit</p>
              </div>
            </button>
          </div>

          <div className="border-t border-neutral-400" />

          <div className="p-4">
            <label>
              <p className="text-neutral-300">Address</p>
              <textarea
                disabled={!isEditingA}
                className="w-full p-3 mt-2 bg-neutral-800 border border-neutral-600 rounded-lg text-white"
                value={editedData.street}
                onChange={(e) =>
                  handleInputChange("street", e.target.value)
                }
              />
            </label>

            <div className="flex gap-5 mt-5">
              <label className="flex-1">
                <p className="text-neutral-300">City</p>
                <input
                  type="text"
                  disabled={!isEditingA}
                  className="w-full p-3 mt-2 bg-neutral-800 border border-neutral-600 rounded-lg text-white"
                  value={editedData.city}
                  onChange={(e) =>
                    handleInputChange("city", e.target.value)
                  }
                />
              </label>

              <label className="flex-1">
                <p className="text-neutral-300">Pin Code</p>
                <input
                  type="text"
                  disabled={!isEditingA}
                  className="w-full p-3 mt-2 bg-neutral-800 border border-neutral-600 rounded-lg text-white"
                  value={editedData.pinCode}
                  onChange={(e) =>
                    handleInputChange("pinCode", e.target.value)
                  }
                />
              </label>
            </div>
          </div>
        </div>

        {isEditingA && (
          <div className="flex justify-end gap-4">
            <button
              className="px-6 py-3 rounded-md text-white bg-neutral-700"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 rounded-md text-white bg-blue-600"
              onClick={() => handleSaveChanges("address")}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;
