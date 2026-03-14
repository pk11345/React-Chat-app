import React, { useState } from 'react'
import { data, Form, Link } from 'react-router-dom'
import { supabase } from '../../lib/supaBaseClient'



const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const handleSubmit = async (e) => {

        e.preventDefault()
        const userData = {
            name: name,
            email: email,
            password: password
        }


        // Step 1: Signup user in Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            console.log(error.message);
            alert(error.message);
            return;
        }

        // Step 2: Insert user into users table
        const user = data.user;

        const { error: dbError } = await supabase.from("users").insert([
            {
                id: user.id,
                name: name,
                email: email
            }
        ]);

        if (dbError) {
            console.log(dbError.message);
            alert("Error saving user");
            return;
        }

        console.log("User created:", userData);


        setName("")
        setEmail("")
        setPassword("")
        console.log(userData)

        alert("user created")
    }



    return (
        <>
            <div className='flex flex-col items-center justify-center text-white'>
                <h1>Signup</h1>
                <form className='flex flex-col gap-3 '
                    onSubmit={handleSubmit}>

                    <div className='text-white items-center space-x-4'>
                        <label className=' text-xl'
                            htmlFor="name">Name</label>

                        <input onChange={(e) => {
                            setName(e.target.value)
                        }} value={name}
                            className=' text-white bg-gray-700/30 p-2 text-xl'
                            type="text" placeholder='Enter your name' required />
                    </div>

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
                    <Link className='text-xl outline-none text-white' to="/login">Login</Link>

                </button>
            </div>
        </>
    )
}

export default Signup