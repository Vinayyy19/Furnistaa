import { useEffect, useState } from "react";

const Chat = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <div className="h-full rounded-xl bg-[#1c1c1c] overflow-hidden">
        <div
          className={`
            absolute inset-0 z-20
            flex items-center justify-center
            bg-black/40 backdrop-blur-sm
            transition-opacity duration-300
            ${showOverlay ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <div
            className={`
              max-w-sm text-center
              px-6 py-5 rounded-2xl
              bg-white/10 text-white
              shadow-xl backdrop-blur-lg
              transform transition-all duration-300
              ${
                showOverlay
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-95"
              }
            `}
          >
            <div className="text-2xl mb-2 animate-pulse">🚧</div>

            <h2 className="text-base font-semibold mb-2">
              Feature under development
            </h2>

            <p className="text-sm text-white/80 leading-relaxed">
              This section is being built. Other admin features remain fully
              accessible.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chat;
