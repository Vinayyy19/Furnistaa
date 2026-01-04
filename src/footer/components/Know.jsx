import { Link } from "react-router-dom";

const Know = () => {
  return (
    <div className="px-10 mt-5">
      <h1 className="font-thin">Get to Know Us</h1>

      <div className="mt-4 font-semibold space-y-1">
        <h1>About Us</h1>
        <Link to={"/user/return"}><h1>Return Policy</h1></Link>
        <h1>Privacy Policy</h1>
        <h1>Warranty</h1>
      </div>

      <div className="flex mt-6 space-x-3 overflow-x-auto py-2">

        <img className="h-10 bg-white p-2 rounded object-contain"
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
          alt="Visa"
        />

        <img className="h-10 bg-white p-2 rounded object-contain"
          src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
          alt="Mastercard"
        />

        <img className="h-10 bg-white p-2 rounded object-contain"
          src="data:image/png;base64,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"
          alt="RuPay"
        />


        <img className="h-10 bg-white p-2 rounded object-contain"
          src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg"
          alt="UPI"
        />

        <img className="h-10 bg-white p-2 rounded object-contain"
          src="https://cdn-icons-png.flaticon.com/512/891/891407.png"
          alt="Net Banking"
        />
      </div>
    </div>
  );
};

export default Know;
