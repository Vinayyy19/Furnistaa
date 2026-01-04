import { MessageSquareText } from 'lucide-react';
const Chat = () => {
  return (
    <div className="flex hover:text-black p-3 rounded-xl transition-all duration-200 hover:bg-primary hover:scale-[1.02] hover:shadow-lg cursor-pointer">
        <MessageSquareText />
        <p className='ml-3'>Chat</p>
    </div>
  )
}

export default Chat