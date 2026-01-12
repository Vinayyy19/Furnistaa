import { useEffect, useState } from "react";
import Bottom from "./Rightoption/Bottom";
import Medium from "./Rightoption/Medium";
import Top from "./Rightoption/Top";

const Rightbox = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      <div className="relative flex-1 overflow-auto">
        <Top />
        <Medium />

        {showOverlay && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="max-w-md text-center px-8 py-6 rounded-2xl bg-white/10 text-white shadow-2xl backdrop-blur-lg">
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
        )}
      </div>

      <Bottom />
    </div>
  );
};

export default Rightbox;
