import Bottom from "./Rightoption/bottom";
import Medium from "./Rightoption/Medium";
import Top from "./Rightoption/Top";

const Rightbox = () => {
  return (
    <div className=" relative flex flex-col h-full">
      <Top />
      <div className="flex-1 overflow-auto">
        <Medium />
      </div>
      <Bottom />
    </div>
  );
};

export default Rightbox;
