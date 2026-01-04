import Connect from "./components/Connect";
import Know from "./components/Know";
import Map from "./components/Map";

const Footer = () => {
  return (
    <div className="text-white bg-neutral-900">
      <div className="text-white bg-neutral-900 flex flex-col md:flex-row md:justify-between">
        <Know />
        <Connect />
        <Map />
      </div>

      <div className="px-4 mt-4">
        <div className="px-6 border-t border-neutral-600">
          <div className="text-center text-white text-lg font-medium p-4 select-none">
            <p>&copy; 2026 Furnita</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
