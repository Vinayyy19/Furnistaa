import { useEffect, useState } from "react";
import Bottom from "./Rightoption/Bottom";
import Medium from "./Rightoption/Medium";
import Top from "./Rightoption/Top";

const Rightbox = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowOverlay(true), 100);
  }, []);

  return (
    <div className="relative flex flex-col h-full">
      <Top />
      <div className="flex-1 overflow-auto">
        <Medium />
      </div>
      <Bottom />
      <div
        className={`
          absolute inset-0 z-50
          flex items-center justify-center
          bg-black/50 backdrop-blur-sm
          transition-opacity duration-300 ease-out
          ${showOverlay ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <div
          className={`
            max-w-md text-center
            px-8 py-6 rounded-2xl
            bg-white/10 text-white
            shadow-2xl backdrop-blur-lg

            transform transition-all duration-500 ease-out
            ${
              showOverlay
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95"
            }
          `}
        >
          <div className="text-2xl mb-2 animate-pulse">🚧</div>

          <h2 className="text-lg font-semibold mb-2">
            This feature is currently under development
          </h2>

          <p className="text-sm text-white/80">
            We’re building it for you. In the meantime, feel free to explore
            the rest of the website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rightbox;
