import './navbar.css';
import logo from './Meemos_transparent.png';
import { NavLink } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";


const Navbar = () => {
  return (
    <div className='nav_container'>
      <NavLink to='/'><img className="logo" src={logo} alt="LOGO" /></NavLink>
      <div className='buttons'>
        <NavLink to="/upload" style={{ textDecoration: 'none' }} ><h2>Upload <MdOutlineFileUpload className='upload_icon'/></h2></NavLink> 
        <NavLink to="/" style={{ textDecoration: 'none' }} ><h2><IoHome className='home_icon'/>Home</h2></NavLink>       
        <NavLink to="/About" style={{ textDecoration: 'none' }} ><h2>About</h2></NavLink>
      </div>
    </div>
  );
};

export default Navbar;
