import { useNavigate } from "react-router-dom";

const UserDetails = ({ step, name, number, header }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#3b3225] border rounded-md border-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-start gap-4">
        <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center text-sm font-semibold text-black">
          {step}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p className="text-neutral-100 font-semibold tracking-wide">
              {header}
            </p>
            {name !== "Add Address" ? (
              <span className="text-blue-600 font-bold">✓</span>
            ) : (
              <span className="text-red-600 font-bold">✕</span>
            )}
          </div>

          <p className="text-white font-semibold mt-1">
            {name}
            {number && (
              <span className="text-neutral-300 font-normal ml-2">
                {number}
              </span>
            )}
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate("/user/setting")}
        className="border bg-yellow-400 px-6 py-2 rounded text-black font-semibold hover:bg-yellow-300"
      >
        CHANGE
      </button>
    </div>
  );
};

export default UserDetails;
