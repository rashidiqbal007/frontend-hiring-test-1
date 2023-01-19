import { React, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './style.css'
import logo from '../../Assets/images/TTLogo.png'


export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate("/call-list")
    }

  }, [])




  async function auth() {
    let item = { email, password }
    let result = await fetch(`http://localhost:5000/auth/login`, {
      // mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(item)
    });
    result = await result.json();
    localStorage.setItem('user-info', JSON.stringify(result));
    navigate("/call-list")
  }

  return (
    <><div className='navbar-style'>
      <img src={logo} alt="" className='image-style' />
    
    </div><div className='login-container'>

        <div className="login-fields">
          <h2>Login</h2>
          <p style={{ color: "grey" }}>Enter your credentials</p>
          <div className="credentials">
            <input type="text" name="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={auth}>Login</button>
          <br />
          <a href="/signup">Click here to Signup</a>
        </div>
      </div></>
  )
}

export default Login;