import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Registration() {

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
            const response = await axios.post('http://localhost:8000/register', registrationData)
            console.log(response.data);
        }

        catch(error) {
            console.log(error);
        }
        setRegistrationData({
            username: '',
            password: ''
        })
    }

  return (
    <div>
      <h1>Registration Page</h1>

      <form onSubmit={handleRegistrationSubmit}>
        
        <input type='text' name='username' placeholder='username'
        value={registrationData.username} required onChange={handleRegistrationChange}></input>
        
        {/* for password */}
        <input type='password' name='password' placeholder='password'
        value={registrationData.password} required onChange={handleRegistrationChange}></input>

        <button type='submit'>Register</button>

        <p>Already registered? <Link to='/login'> Login Here</Link></p>
      </form>
    </div>
  )
}
