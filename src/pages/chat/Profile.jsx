import { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import api from "../../../api/axios";
const Profile = () => {
  const { user ,setUser} = useUser();
  useEffect(() => {
    if (!user) {
      api
        .get("/users/profile")
        .then((res) => setUser(res.data.user))
        .catch((err) => console.log(err));
    }
  }, [user, setUser]);
  return (
    <div className="p-4 flex">
        <div className="h-10 w-10 rounded-full overflow-hidden bg-primary">
            <img className="w-full h-full object-cover object-top scale-125" src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png" alt="" />
        </div>
        <div className="ml-4">
            <h1 className="font-bold">{user?.name?.firstName || "Name here"}</h1>
            <p className="text-gray-400 text-xs">{user?.email || "Email here"}</p>
        </div>
    </div>
  )
}

export default Profile