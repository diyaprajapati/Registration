import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Registration() {

    const [popup, setPopup] = useState({
        visible: false,
        message: '',
        success: false
      });

    const [registrationData, setRegistrationData] = useState({
        username: '',
        password: ''
    })
    const handleRegistrationChange = (e) => {
        const {name, value} = e.target;

        setRegistrationData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleRegistrationSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:8000/register', registrationData);
            const { success, message } = response.data;
            console.log(response.data);

            if(success) {
                setPopup({ visible: true, message: 'Registration Successful!', success: true });
                console.log('Registration Successful:', message);
            } 
            else {
                setPopup({ visible: true, message: message || 'Registration failed!', success: false });
                console.log('Registration Failed:', message);
            }
        }

        catch(error) {
            setPopup({ visible: true, message: 'Registration error, please try again!', success: false });
            console.log(error);
        }
        setRegistrationData({
            username: '',
            password: ''
        })

        setTimeout(() => {
            setPopup((prevPopup) => ({ ...prevPopup, visible: false }));
          }, 3000);
    }

  return (
    <div>
      <h1 className='text-center text-3xl p-5 mt-10 mb-8 font-bold underline'>Registration</h1>

      {popup.visible && (
        <div
          className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 p-5 rounded-md shadow-lg 
            ${popup.success ? '!bg-green-200 !text-green-800 !border-green-600' : 'bg-red-200 text-red-800 border-red-600'}`}
        >
          <p>{popup.message}</p>
        </div>
      )}


      <form onSubmit={handleRegistrationSubmit}>
        <div className='flex flex-col items-center p-5 gap-5'>
        
        <div className='flex flex-col text-center gap-3'>
        {/* for username */}
            <h2 className='text-left font-medium'>Username: </h2>
            <input className='border-2 py-2 px-8 rounded-xl focus:outline-none border-gray-400' type='text' name='username' placeholder='username'
            value={registrationData.username} required onChange={handleRegistrationChange}></input>
            
        {/* for password */}
            <h2 className='text-left font-medium'>Password: </h2>
            <input className='border-2 py-2 px-8 rounded-xl focus:outline-none border-gray-400' type='password' name='password' placeholder='password'
            value={registrationData.password} required onChange={handleRegistrationChange}></input>
        </div>

        {/* for button */}
        <div className='border-2 border-green-600 mt-7 py-4 px-20 text-xl font-semibold rounded-xl hover:bg-green-600 hover:text-white hover:transition-all hover:ease-in-out hover:duration-300 cursor-pointer'>
            <button type='submit'>Register</button>
        </div>

        <div className='flex gap-4'>
            <p className='font-semibold'>Already registered? </p> 
            <Link className='font-medium text-blue-700 hover:text-blue-800 hover:underline' to='/login'> Login Here</Link>
        </div>

        </div>
      </form>
    </div>
  )
}
