import { useState } from "react";

const Left = ({ primaryImg, setPrimaryImg, images = [] }) => {
  const [bgPos, setBgPos] = useState("50% 50%");
  const [bgSize, setBgSize] = useState("100%");

  const handleMove = (e) => {
    setBgSize("200%");

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setBgPos(`${x}% ${y}%`);
  };

  const handleLeave = () => {
    setBgPos("50% 50%");
    setBgSize("100%");
  };

  return (
    <div>
      {/* Main Image */}
      <div
        className="w-full h-[420px] rounded-xl overflow-hidden cursor-zoom-in"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          backgroundImage: `url(${primaryImg})`,
          backgroundPosition: bgPos,
          backgroundSize: bgSize,
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Thumbnails */}
      <div className="mt-4 flex gap-3 overflow-x-auto whitespace-nowrap hide-scrollbar">
        {images.map((img, index) => {
          const imgUrl = img.url;

          return (
            <div
              key={img.publicId || index}
              className={`h-24 min-w-[110px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all shrink-0 ${
                primaryImg === imgUrl
                  ? "border-yellow-400"
                  : "border-transparent"
              }`}
              onClick={() => setPrimaryImg(imgUrl)}
            >
              <img
                src={imgUrl}
                alt={`product-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Left;
