const UserSide = () => {
  return (
    <div className="flex justify-end p-4">
      <div className="flex items-start">
        <div className="rounded-2xl bg-blue-600 px-3 py-2 text-white max-w-xs mr-2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
            eius?
          </p>
        </div>

        <div className="h-10 w-10 rounded-full overflow-hidden bg-primary">
          <img
            className="w-full h-full object-cover object-top scale-125"
            src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default UserSide;
