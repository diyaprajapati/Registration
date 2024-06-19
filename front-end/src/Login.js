import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

export default function Login() {

    const [popup, setPopup] = useState({
        visible: false,
        message: '',
        success: false
      });
      

    const [loginData, setLoginData] = useState({
        username:'',
        password:''
    })

    // submit function
    const handleLoginSubmit = async(e) => {
        e.preventDefault();

        // Simulating a successful login
    setPopup({ visible: true, message: 'Login Successfully!', success: true });

        try {
            const response = await axios.post 
            ('http://localhost:8000/login', loginData);
            const {success, message} = response.data;

            if(success) {
                // setPopup({ visible: true, message: 'Login Successfully!', success: true });
                console.log('Login Successful:', success, message)
            }
            else {
                // setPopup({ visible: true, message: message || 'Login failed!', success: false });
                console.log('Login Failed:', success, message);
            }
        }
        catch(error) {
            setPopup({ visible: true, message: 'Login error, please try again!', success: false });
            console.error('Login error', error)
        }
        setLoginData({
            username: '',
            password: ''
        });

        // Hide popup after 3 seconds
        setTimeout(() => {
            setPopup((prevPopup) => ({ ...prevPopup, visible: false }));
        }, 3000);
    };

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

        {popup.visible && (
        <div className={`p-5 rounded-md shadow-lg ${popup.success ? 'bg-green-200 text-green-800 border-green-600' : 'bg-red-200 text-red-800 border-red-600'}`}>
          <p>{popup.message}</p>
        </div>
      )}


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
