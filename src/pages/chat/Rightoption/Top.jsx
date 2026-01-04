import { EllipsisVertical } from 'lucide-react';

const Top = () => {
  return (
    <>
      <div className="flex justify-between items-center w-full p-2">
        <div>
          <h1 className='font-bold text-2xl'>Live Support</h1>
          <div className='flex text-xs'>
            <div className='w-2 h-2 mt-1 mr-1 rounded-full bg-green-700'></div>
            <p>Chat with admin</p>
        </div>
        </div>

        <EllipsisVertical />
      </div>

      <hr className="w-full" />
    </>
  );
};

export default Top;
