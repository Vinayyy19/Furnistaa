import { Settings } from 'lucide-react';
const Setting = () => {
  return (
    <div className="cursor-pointer hover:text-black flex p-3 rounded-xl transition-all duration-200 hover:bg-primary hover:scale-[1.02] hover:shadow-lg">
        <Settings />
        <p className='ml-3'>Settings</p>
    </div>
  )
}

export default Setting