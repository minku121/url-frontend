import  { useState , useContext} from 'react';
import { FaLock } from 'react-icons/fa6';
import './signup.css'
import { ImEnvelop } from 'react-icons/im';
import { Link } from 'react-router-dom';
import toast ,{ Toaster} from 'react-hot-toast';
import {  IoAlert, IoCheckmark } from 'react-icons/io5';
import { VscServerProcess } from 'react-icons/vsc';
import AuthContext from '../context/AuthContext';


  const darkToast = (message: (any) , icon: any,color:any) =>
  toast(message, {
      icon: icon,
      
      style: {
          borderRadius: "12px",
          background: "#223243",
          color: color,
          boxShadow:`-5px -5px 15px rgba(255, 255, 255, 0.1),
          5px 5px 15px rgba(0, 0, 0, 0.35)`,
      },
      position: "bottom-left",
  });
  


function Login() {

  const [email , setEmail]= useState('');
  const [password , setPassword] = useState('');
  

  const authContextdata = useContext(AuthContext);

  if(!authContextdata){
    return null;
  }
 
 const {setUserId,contextName,setContextName , setContextEmail , isLoggedin , setIsLoggedIn} = authContextdata;

 
  
  const handleLogin = async(e:any) =>{

   e.preventDefault();
    if(!email || !password){
        darkToast("All fields Are Required", <IoAlert style={{fontSize:'1.5em',color:'yellow',filter:'drop-shadow(0 0 10px yellow)'}}/>,"yellow")
        return false;
    }
    try{
      darkToast('Checking Credentials' , <VscServerProcess style={{color:'yellow',fontSize:'1.5em',filter:'drop-shadow(0 0 10px yellow)'}} /> , 'yellow');
      const response = await fetch('https://url-backend-9vfx.onrender.com/login',{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({email,password}),
      });
  
      const data = await response.json();

      if(response.status == 200){
        darkToast(data.message , <IoCheckmark style={{color:'#0f0',fontSize:'1.5em',filter:'drop-shadow(0 0 10px #0f0)'}} /> , '#0f0');
          localStorage.setItem('token',await data.token); 
        setContextName(data.name)  ;
        setContextEmail(data.email) ;
        setUserId(data.id) ;
        setIsLoggedIn(true);

      }

     else if(response.status==403){
        darkToast(data.message , <IoCheckmark style={{color:'#0f0',fontSize:'1.5em',filter:'drop-shadow(0 0 10px #0f0)'}} /> , '#0f0');
       
      }

      
     else{
      darkToast("Invalid Credentails" , <IoAlert style={{fontSize:'1.5em',color:'red',filter:'drop-shadow(0 0 10px red)'}}/>,"red")
     } 

    }

    catch(error){

    }
    console.log(isLoggedin,contextName)
  }
  
  return (

 <>
 <Toaster/>
<div className="formcontainer">
 
    <form className="form signup" onSubmit={handleLogin}>
      <h2>Login To TinyPath</h2>
      
      <div className="inputBox">
        <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} required  />
        <ImEnvelop className='icon email'/>
        <span>Email address</span>
      </div>
      <div className="inputBox">
        <input type="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
        <FaLock className='icon pass'/>
        <span>password</span>
      </div>
    
      <div className="inputBox">
        <input type="submit" value="Sign in"/>
      </div>
      <p>Not Have Account ? <Link to='/signup' className="login">Create one</Link></p>
    </form>
  
  </div>
  </>
  );
}

export default Login;
