import { SendHorizontal } from 'lucide-react';
const Bottom = () => {
  return (
    <div className="absolute bg-surface-dark bottom-0 left-0 w-full p-3">
      <div className="flex items-center bg-neutral-800 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Type a message"
          className="bg-transparent flex-1 outline-none text-white text-sm"
        />
        <div className='bg-primary p-2 rounded-lg text-black'><SendHorizontal /></div>
      </div>
    </div>
  );
};

export default Bottom;
