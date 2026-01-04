import { useEffect } from "react";
import Continue from "./Continue";
import FinalSummary from "./FinalSummary";
import PriceDetails from "./PriceDetails";
import TrustInfo from "./TrustInfo";
import UserDetails from "./UserDetails";
import { useUser } from "../../context/UserContext";
import api from "../../../api/axios";
import LoadingBox from "../../Loading/LoadingBox";

const CheckOut = () => {
  const { user, setUser } = useUser();
  useEffect(() => {
    if (!user) {
      api
        .get("/users/profile")
        .then((res) => setUser(res.data.user))
        .catch((err) => console.log(err));
    }
  }, [user, setUser]);
  const allDetails = Boolean(user?.address);
  return (
    <div>
      {!user ? <LoadingBox /> : <div className="flex p-10">
        <div className="w-3/4 space-y-5">
          <UserDetails
            step={1}
            name={user.name.firstName}
            number={user.phoneNumber}
            header={"LOGIN"}
          />
          <UserDetails
            step={2}
            name={user?.address?.street ? user.address.street : "Add Address"}
            number={user?.address?.city ? user.address.city : "Add City"}
            header={"DELIVERY ADDRESS"}
          />
          <FinalSummary />
          <Continue allDetails={allDetails} email={user.email}/>
        </div>
        <div className="w-2/5 ml-10">
          <PriceDetails />
          <TrustInfo />
        </div>
      </div>}
    </div>
  );
};

export default CheckOut;
