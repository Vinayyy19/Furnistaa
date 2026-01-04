import AdminSide from "./AdminSide";
import UserSide from "./Userside";

const Medium = () => {
  return (
    <div>
      <div className="p-2 flex justify-center text-xs">
        <div className="rounded-2xl bg-neutral-700 px-3 py-1">
          You are connected with admin
        </div>
      </div>
      <div>
        <AdminSide />
        <UserSide />
      </div>
    </div>
  );
};

export default Medium;
