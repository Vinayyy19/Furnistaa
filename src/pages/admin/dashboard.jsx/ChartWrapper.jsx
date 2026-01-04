const ChartWrapper = ({ title, children }) => {
  return (
    <div className="bg-[#1c1c1c] border border-neutral-800 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default ChartWrapper;
