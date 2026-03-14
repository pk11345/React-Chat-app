import React, { useState } from 'react'
import { supabase } from '../lib/supaBaseClient'

const ChatPage = ({user, selectedUser }) => {

    const [senderMessage, setSenderMessage] = useState("")

    const sendMessage = async () => {
        
        if (!selectedUser) return
        if (!senderMessage) return
         if (!senderMessage.trim()) return

        const { error: dbError } = await supabase
            .from("messages")
            .insert({ sender_id: user.id, reciever_id: selectedUser.id, message: senderMessage })

        if (dbError) {
            console.log("Message error:", dbError)
        }

        setSenderMessage("")
    }

    return (
        <>
            <div className='bg-green-500/40 p-4 w-full space-y-3'>
                <h1 className='text-3xl text-center text-bold uppercase'>ChatBox</h1>
                <div className="chatContainer w-[95%] space-y-3">
                    <h1 className='text-white '>Talking to:
                        <span className='text-orange-600 font-semibold uppercase'>
                            {selectedUser?.name || "select a user to chat"}
                        </span> </h1>
                    <div className="chatArea bg-white p-2 flex flex-col  justify-between w-full">

                        <div className="RecieverChat items-start ">
                            <h2>hi</h2>
                        </div>
                        <div className="SendersChat items-end ">
                            <h2 className='text-end '>{senderMessage}</h2>
                        </div>
                    </div>

                    <div className="inputMessage mt-2 flex gap-2 bg-gray-400 w-full">
                        <input onChange={(e) => {
                            setSenderMessage(e.target.value)
                        }} value={senderMessage}
                            className='p-1 bg-transparent outline-none text-white w-[90%] placeholder:text-white'
                            type="text" placeholder='type your message ...' />
                        <button onClick={sendMessage}
                            className='w-[20%] bg-red-400 font-semibold'>Send</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage