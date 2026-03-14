import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supaBaseClient'

const UserList = ({ user,setSelectedUser }) => {

    const [userList, setUserList] = useState([])


    useEffect(() => {

        const fetchUsers = async () => {
            const { data, error } = await supabase
                .from("users")
                .select("id, name")
                .neq("id", user.id)

            if (data) {
                setUserList(data)
            }
        }

        if (user?.id) {
            fetchUsers()
        }

    }, [user])


    return (
        <>
            <div className='w-full'>
                <div className="userContainer bg-black/30 p-4 text-white space-y-6">
                    <h1 className='text-white text-2xl italic'>
                        Choose Person You Want to Talk.
                    </h1>
                    <div>
                        <ul className='space-y-3'>
                            {userList?.map((user) => {
                                return <>

                                    <li className=' hover:cursor-pointer uppercase hover:bg-gray-400'
                                     onClick={()=>{
                                        setSelectedUser(user)
                                    }}
                                    key={user.id}>{user.name}</li>


                                </>
                            })} </ul>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserList