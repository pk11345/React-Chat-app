import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supaBaseClient'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()
        

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

         if(error){
            alert(error.message)
            console.log("error", error.message)
            return
         }

         console.log("loggedIn User", data.user)
         alert("Loggedin ")
        setEmail("")
        setPassword("")
        setTimeout(() => {
            navigate("/")
        }, 2000);
        
    }

    return (
        <>
            <div className='flex flex-col items-center justify-center text-white'>
                <h1>Login</h1>
                <form className='flex flex-col gap-3 '
                    onSubmit={handleSubmit}
                >


                    <div className='text-white items-center space-x-4'>
                        <label className=' text-xl'
                            htmlFor="name">Email</label>

                        <input onChange={(e) => {
                            setEmail(e.target.value)
                        }} value={email}
                            className=' text-white bg-gray-700/30 p-2 text-xl'
                            type="email" placeholder='Enter your email' required />
                    </div>

                    <div className='text-white items-center space-x-4'>
                        <label className=' text-xl'
                            htmlFor="name">Password</label>

                        <input onChange={(e) => {
                            setPassword(e.target.value)
                        }} value={password}
                            className=' text-white bg-gray-700/30 p-2 text-xl'
                            type="password" placeholder='Enter your password' required />
                    </div>

                    <button
                        className='bg-red-400 p-3'>
                        Submit
                    </button>


                </form>

                <h1>Or</h1>

                <button className='bg-red-400 p-3'>
                    <Link className='text-xl outline-none text-white' to="/signup">Sign Up</Link>

                </button>
            </div>
        </>
    )
}

export default Login