import Leftside from "./leftSide/Leftside";
import Productfilter from "./Productfilter";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Product = () => {
  const { categoryId } = useParams();
  const [selectedMat, setSelectedMat] = useState("");
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(100000);
    
  return (
    <div className="flex">
      <div className="p-4 w-1/4">
        <Productfilter
          selectedMat={selectedMat}
          setSelectedMat={setSelectedMat}
          minPrice={minPrice}
          setminPrice={setminPrice}
          maxPrice={maxPrice}
          setmaxPrice={setmaxPrice}
        />
      </div>

      <div className="p-4 w-3/4">
        <Leftside
          selectedCat={categoryId}
          selectedMat={selectedMat}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
    </div>
  );
};

export default Product;
