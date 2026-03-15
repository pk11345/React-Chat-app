import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supaBaseClient'

const ChatPage = ({ user, selectedUser }) => {
    

    const [senderMessage, setSenderMessage] = useState("")
    const [SendersMessage, setSendersMessage] = useState([])
    const [RecieversMessage, setRecieversMessage] = useState([])

    useEffect(() => {
        recieveMessage()
        sendersMessage()
    }, [selectedUser])

    const sendMessage = async () => {
         console.log("message sending")
        if (!selectedUser) return
       
        if (!senderMessage.trim()) return

        console.log(user.id, selectedUser.id, senderMessage)

        const { error: dbError } = await supabase
            .from("messages")
            .insert({ sender_id: user.id, reciever_id: selectedUser.id, message: senderMessage })

            console.log("Insert error:", dbError)
        if (dbError) {
            console.log("Insert error:", dbError)
            return
        }
       

        setSenderMessage("")

        recieveMessage()
        sendersMessage()
    }

    const sendersMessage = async () => {
        const { data, error } = await supabase
            .from("messages")
            .select("id,message")
            .eq("sender_id", user.id)
            .eq("reciever_id", selectedUser.id)
           

        console.log(data, "data")

        if (error) {
            console.log("error", error)
        }

        if (data) {
            setSendersMessage(data)
        }
    }

    const  recieveMessage =async ()=>{
         const { data, error } = await supabase
            .from("messages")
            .select("id,message")
            .eq("sender_id", selectedUser.id)
            .eq("reciever_id", user.id)
           

        console.log(data, "data")

        if (error) {
            console.log("error", error)
        }

        if (data) {
            setRecieversMessage(data)
        }
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
                             {RecieversMessage.map((msg) => (
                                <h2 key={msg.id} className="text-start">
                                    {msg.message}
                                </h2>
                            ))}
                        </div>
                        <div className="SendersChat items-end ">

                            {SendersMessage.map((msg) => (
                                <h2 key={msg.id} className="text-end">
                                    {msg.message}
                                </h2>
                            ))}

                        </div>
                    </div>

                    <div className="inputMessage mt-2 flex gap-2 bg-gray-400 w-full">
                        <input onChange={(e) => {
                            setSenderMessage(e.target.value)
                        }} value={senderMessage}
                            className='p-1 bg-transparent outline-none text-white w-[90%] placeholder:text-white'
                            type="text" placeholder='type your message ...' />
                        <button type='button'
                         onClick={()=>{
                            console.log("button clicked")
                            sendMessage()}}
                            className='w-[20%] bg-red-400 font-semibold pointer-events-auto'>Send</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage