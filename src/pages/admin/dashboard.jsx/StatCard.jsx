const StatCard = ({ label, value }) => {
  return (
    <div className="bg-[#1c1c1c] border border-neutral-800 rounded-xl p-5">
      <p className="text-sm text-neutral-400">{label}</p>

      <h2 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;
