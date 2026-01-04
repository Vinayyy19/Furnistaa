const TrustInfo = () => {
  return (
    <div className="mt-6 p-4 text-gray-100 text-sm space-y-4 max-w-md">
      
      <div className="flex gap-3 items-start">
        <div className="text-gray-500 text-lg">🛡️</div>
        <p>
          <span className="font-semibold">Safe and Secure Payments.</span> 
          {" "}Easy returns. 100% Authentic products.
        </p>
      </div>

      <p>
        By continuing with the order, you confirm that you are above 18 years of
        age, and you agree to the{" "}
        <span className="text-blue-600 cursor-pointer">
          Terms of Use
        </span>{" "}
        and{" "}
        <span className="text-blue-600 cursor-pointer">
          Privacy Policy
        </span>
      </p>
    </div>
  );
};


export default TrustInfo