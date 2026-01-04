import { ArrowLeftRight } from 'lucide-react';
const Return = () => {
  return (
    <div className="flex p-3 hover:text-black rounded-xl transition-all duration-200 hover:bg-primary hover:scale-[1.02] hover:shadow-lg cursor-pointer">
        <ArrowLeftRight />
        <p className='ml-3'>Return</p>
    </div>
  )
}

export default Return