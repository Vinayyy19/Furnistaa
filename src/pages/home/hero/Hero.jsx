const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1697538022262-7eb736179973?q=80&w=1284&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; 
const CTA_LABEL = "Shop New Arrivals";
const HEADER_TEXT = "The 2026 Autumn Collection";
const BG_ALT_TEXT = "A modern, luxurious living room with elegant furniture in warm, ambient lighting.";

const Hero = () => {
  return (
    <div className="@container"> 
      <div className="p-4 @[480px]:px-4 @[480px]:py-3">
        <div 
          className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-background-dark rounded-xl min-h-80" 
          role="img" 
          aria-label={BG_ALT_TEXT} 
          style={{ 
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("${HERO_IMAGE_URL}")` 
          }}
        >
          <div className="flex flex-col p-6 gap-4">
            <p className="text-white tracking-tight text-3xl font-bold leading-tight">
              {HEADER_TEXT}
            </p>
            <div className="flex">
              <button 
                className="flex min-w-[84px] max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 
                           bg-primary text-background-dark text-base font-bold tracking-wide transition duration-200 hover:opacity-90"
                type="button"
              >
                <span className="truncate">{CTA_LABEL}</span>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;