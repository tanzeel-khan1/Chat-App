import React from 'react'

const Messages = ({message}) => {
  const authUser = localStorage.getItem("userInfo");
  const itsme = message.senderId === authUser._id
  const chatName = itsme? "chat-end" : "chat-start";
  
  
  return (
    <>
    <div className="p-4">
     <div className='chat chat-end'>
       <div className="flex justify-end">
        <div className="bg-blue-500 text-white px-4 py-2 rounded-xl rounded-br-none max-w-xs">
          {message.message}
        </div>
      </div>
     </div>
      <div className='chat chat-start'>
        <div className="flex justify-start">
        <div className="bg-gray-300 text-gray-900 px-4 py-2 rounded-xl rounded-bl-none max-w-xs">
          I am the Senate!
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Messages
