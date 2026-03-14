import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supaBaseClient'
import UserList from './UserList'
import ChatPage from './ChatPage'

const DashBoard = () => {

    const [user, setUser] = useState(null)
    const [name, setName] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const { data, error } = await supabase.auth.getUser()  //to get current  user

        console.log("Full response:", data)

        const authUser = data.user
        console.log("Auth ID:", authUser.id)


        if (data?.user) {
            setUser(data.user)

            const { data: profile, error: profileError } = await supabase
                .from('users')
                .select("name")
                .eq('id', authUser.id)
                .single()

            if (profileError) {
                console.log("error", profileError)
            }
            if (profile) {
                setName(profile.name)
            }
            console.log(profile.name, "name")
        }
    }



    return (
        <>
            <div className='flex justify-center bg-blue-400/10 p-4'>


                <div className='flex flex-col gap-3'>

                    {user ? <>

                        <h1 className='text-white text-2xl italic'>Hi, {name}</h1>
                        <button onClick={async () => {
                            const { error } = await supabase.auth.signOut()
                            alert("loggedOut")
                            navigate("/login")
                        }}
                            className='bg-red-400 p-3'>
                            <Link className='text-xl outline-none text-white' to="/login">SignOut</Link>

                        </button>

                        <div className='flex gap-3'>
                            <UserList user={user} setSelectedUser={setSelectedUser}/>
                            <ChatPage user={user} selectedUser={selectedUser}/>
                        </div>

                    </>
                        :
                        <>
                            <h1 className='text-white text-2xl italic'>SignUp or Login to Start Chatting</h1>
                            <button className='bg-red-400 p-3'>
                                <Link className='text-xl outline-none text-white' to="/signup">Sign Up</Link>

                            </button>
                            <button className='bg-red-400 p-3'>
                                <Link className='text-xl outline-none text-white' to="/login">Login</Link>

                            </button>
                        </>}




                </div>
            </div>
        </>
    )
}

export default DashBoard