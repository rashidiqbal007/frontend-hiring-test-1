import React from 'react'
import './navbar.css'
import logo from '../Assets/images/TTLogo.png'
import { useNavigate } from "react-router-dom";


const navbar = () => {
    const navigate = useNavigate();

    const logout =()=>{
        localStorage.clear();
        navigate("/")
    }
    return (
        
        <><div className='navbar-style'>
            <img src={logo} alt="" className='image-style' />
            <button className="logout-btn" onClick={logout}>Logout</button>
        </div><hr /></>
    )
}

export default navbar