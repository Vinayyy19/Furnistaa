const Circle = ({ name, imgUrl, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="shrink-0 w-28 flex flex-col items-center cursor-pointer"
    >
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img src={imgUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <p className="mt-2 text-white text-sm text-center">{name}</p>
    </div>
  );
};

export default Circle;
