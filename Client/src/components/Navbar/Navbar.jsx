import './navbar.css';
import logo from './Meemos_transparent.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { useState } from 'react';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';




const Navbar = () => {
  const  navigate = useNavigate()
  const signedInCookie = Cookies.get('name')

  const handleLogin = ()=>{
    if(!signedInCookie){
      navigate('/login')
    }
    else{
      toast.error("Already signedIn")
    }
  }

  const handleSignup = ()=>{
    if(!signedInCookie){
      navigate('/signup')
    }
    else{
      toast.error("Already signedIn")
    }
  }

  const handleLogout = () => {
    if (signedInCookie) {
      Cookies.remove('name');
      toast.success("Logged out successfully");
      navigate('/'); 
    } else {
      toast.error("You are not logged in");
    }
  };

  return (
    <div className='nav_container'>
      <NavLink to='/'><img className="logo" src={logo} alt="LOGO" /></NavLink>
      <div className='buttons'>
        <NavLink to="/upload" style={{ textDecoration: 'none' }} ><h2>Upload <MdOutlineFileUpload className='upload_icon'/></h2></NavLink> 
        <NavLink to="/" style={{ textDecoration: 'none' }} ><h2><IoHome className='home_icon'/>Home</h2></NavLink>       
        <NavLink to="/About" style={{ textDecoration: 'none' }} ><h2>About</h2></NavLink>
        <h2 onClick={handleSignup}>Signup</h2>
        <h2 onClick={handleLogin}>Login</h2>
        <h2 onClick={handleLogout}>Logout</h2>
      </div>
    </div>
  );
};

export default Navbar;
