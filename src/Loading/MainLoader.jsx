const MainLoader = ({ isVisible }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black
        transition-opacity duration-700 ease-in-out
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <div className="relative flex items-center justify-center w-28 h-28">
        <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-primary animate-spin" />

        <div
          className="absolute inset-4 rounded-full border-2 border-white/20 border-b-primary animate-spin"
          style={{ animationDelay: "0.4s" }}
        />

        <div className="absolute w-16 h-16 rounded-full bg-primary/30 blur-2xl animate-pulse" />

        <img
          src="/FurnistaLogo.png"
          alt="Loading"
          className="relative w-10 h-10 object-contain animate-pulse"
        />
      </div>
    </div>
  );
};

export default MainLoader;
