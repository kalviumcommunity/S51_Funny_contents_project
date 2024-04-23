import './navbar.css';
import logo from './Meemos_transparent.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='nav_container'>
      <img className="logo" src={logo} alt="LOGO" />
      <div className='buttons'>
        <NavLink to="/login" style={{ textDecoration: 'none' }} ><h2>Upload ➕</h2></NavLink> 
        <NavLink to="/" style={{ textDecoration: 'none' }} ><h2>Home</h2></NavLink>       
        <NavLink to="/About" style={{ textDecoration: 'none' }} ><h2>About</h2></NavLink>
      </div>
    </div>
  );
};

export default Navbar;
