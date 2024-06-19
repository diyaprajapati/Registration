import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

export default function Login() {

    const [loginData, setLoginData] = useState({
        username:'',
        password:''
    })

    // submit function
    const handleLoginSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post 
            ('http://localhost:8000/login', loginData);
            const {success, message} = response.data;

            if(success) {
                console.log('Login Successfully')
            }
            else {
                console.log(message);
            }
        }
        catch(error) {
            console.error('Login error', error)
        }
        setLoginData({
            username: '',
            password: ''
        })
    }

    const handleLoginChange = (e) => {
        const {name, value} = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

  return (
    <div>
        <h1 className='text-center text-3xl p-5 mt-10 mb-8 font-bold underline'> Log-In </h1>

        <form onSubmit={handleLoginSubmit}>
            <div className='flex flex-col items-center p-5 gap-5'>
                {/* for username */}
                <div className='flex flex-col text-center gap-3'>
                    <h2 className='text-left font-medium'>Username: </h2>
                    <input className='border-2 py-2 px-8 rounded-xl focus:outline-none border-gray-400' type='text' name='username' placeholder='username' value={loginData.username} onChange={handleLoginChange} required></input>
                
                {/* for password */}
                    <h2 className='text-left font-medium'>Password: </h2>
                    <input className='border-2 py-2 px-8 rounded-xl focus:outline-none border-gray-400' type='password' name='password' placeholder='password' value={loginData.password} onChange={handleLoginChange} required></input>
                </div>

                {/* for button */}
                <div className='border-2 border-green-600 mt-7 py-4 px-20 text-xl font-semibold rounded-xl hover:bg-green-600 hover:text-white hover:transition-all hover:ease-in-out hover:duration-300 cursor-pointer'>
                    <button type='submit'>Login</button>
                </div>

                <div className='flex gap-4'>
                    <p className='font-semibold'>Not Registered yet?</p>
                    <Link className='font-medium text-blue-700 hover:text-blue-800 hover:underline' to='/registration'>Register here</Link>
                </div>
            </div>
        </form>
    </div>
  )
}
