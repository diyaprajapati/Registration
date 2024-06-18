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
        <h1> Login Page </h1>

        <form onSubmit={handleLoginSubmit}>
            {/* for username */}
            <input type='text' name='username' placeholder='username' value={loginData.username} onChange={handleLoginChange} required></input>
            
            {/* for password */}
            <input type='password' name='password' placeholder='password' value={loginData.password} onChange={handleLoginChange} required></input>

            {/* for button */}
            <button type='submit'>Login</button>

            <p>Not Registered yet? <Link to='/registration'>Register here</Link></p>
        </form>
    </div>
  )
}
