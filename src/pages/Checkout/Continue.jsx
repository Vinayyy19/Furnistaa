import { useNavigate } from "react-router-dom";

const Continue = ({ allDetails, email }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-white bg-[#3b3225] border rounded-md px-6 py-4 flex items-center justify-between">
      <p>
        Order confirmation will be sent on{" "}
        <span className="font-semibold">{email}</span>
      </p>

      <button
        disabled={!allDetails}
        onClick={() => navigate("/payment")}
        className="border bg-yellow-400 cursor-pointer px-6 py-2 rounded text-black font-semibold hover:bg-yellow-300 disabled:bg-neutral-500"
      >
        CONTINUE
      </button>
    </div>
  );
};

export default Continue;
