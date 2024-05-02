import { useState , useContext } from 'react'
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";

import './navbar.css';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';




function Navbar() {

  const authcontext = useContext(AuthContext);

  if(!authcontext){
    return;
  }

  const {isLoggedin  , contextName , setContextName ,setIsLoggedIn ,  setContextEmail , setUserId   } = authcontext;

  function logout(){
    localStorage.clear();
    setIsLoggedIn(false)
    setContextName('');
    setContextEmail('');
    setUserId('');
    }

    const [opennav , setOpennav] = useState(false);

  return (
    <div className='w-full'>
      <nav className='navbar fixed top-0 left-1/2 -translate-x-1/2 flex justify-between items-center w-[100%] max-w-[1200px] h-[8vh] max-h-[50px]  p-2 backdrop-blur-lg border-solid border-b-1 border-[#ccc] '>
        <div className='logo'>
          <h1 className='ml-5 text-[#1bd6d6]'>TinyPath</h1>
        </div>
        <ul className={`navelements ${opennav?'active':''}`}>
         <NavLink to='/' className='navlink l1'> <li className='mx-4 hover:text-[#09b699] transition-all cursor-pointer'>Home</li></NavLink>
      {isLoggedin ?  <NavLink to='/dashboard' className='navlink l1' >  <li className='mx-4 hover:text-[#a344f7] transition-all cursor-pointer'>Your Links</li></NavLink> : ''}
       
         <li className='loginbtn mx-4 hover:text-violet-300 duration-75 transition-all cursor-pointer'><Link to='/login' style={{padding:'10px'}}>{isLoggedin ? <span title={`Logout As ` + contextName} onClick={logout}>logout</span> : <span>login</span>}</Link></li>
        </ul>

    <div className="navbtn text-[#1bd6d6]" onClick={()=>{setOpennav(!opennav)}}>
        {opennav ? <IoCloseSharp /> : <HiBars3BottomRight />}
    </div>
      </nav>
    </div>
  )
}

export default Navbar