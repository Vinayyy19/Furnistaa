const AdminSide = () => {
  return (
    <div className="flex justify-start p-4">
      <div className="flex items-start">
        <div className="h-10 w-10 rounded-full overflow-hidden bg-primary mr-2">
          <img
            className="w-full h-full object-cover object-top scale-125"
            src="https://www.shutterstock.com/image-vector/call-center-customer-care-executive-600nw-2443464305.jpg"
            alt=""
          />
        </div>

        <div className="rounded-2xl bg-neutral-700 px-3 py-2 max-w-xs">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
            eius?
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSide;