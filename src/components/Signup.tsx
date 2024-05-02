import  { useState } from 'react'
import './signup.css'
import { BiUser } from 'react-icons/bi'
import { FaLock } from 'react-icons/fa6'
import { ImEnvelop } from 'react-icons/im'
import { Link} from 'react-router-dom'
import toast, {Toaster } from "react-hot-toast";
import { IoCloseCircleSharp } from 'react-icons/io5'
import { VscServerProcess } from 'react-icons/vsc'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'




const darkToast = (message: (any) , icon: any,color:any) =>
  toast(message, {
      icon: icon,
      
      style: {
          borderRadius: "12px",
          background:'#223243',
          color: color,
          boxShadow:`-5px -5px 15px rgba(255, 255, 255, 0.1),
          5px 5px 15px rgba(0, 0, 0, 0.35)`,
      },
      position: "bottom-left",
  });



function Signup() {

  const [Name , setName] = useState('');
  const [Email,SetEmail] = useState('');
  const [Password , SetPassword]  = useState('');
  const [ConfirmPassword , SetConfirmPass] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    if (!Name || !Email || !Password || !ConfirmPassword) {
      darkToast(
        "Fill All details Properly",
        <IoCloseCircleSharp
          style={{
            color: "red",
            fontSize: "1.5em",
            filter: "drop-shadow(0 0 10px red)",
          }}
        /> ,'red'
      );
      return;
    }
  
    // Use a more robust email validation regex or library
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(Email)) {
      darkToast(
        "Invalid Email Address",
        <IoCloseCircleSharp
          style={{
            color: "red",
            fontSize: "1.5em",
            filter: "drop-shadow(0 0 10px red)",
          }}
        /> , 'red'
      );
      return;
    }
  
    if (Password.length <= 8) {
      darkToast(
        "Password Should at least 8 characters",
        <IoCloseCircleSharp
          style={{
            color: "red",
            fontSize: "1.5em",
            filter: "drop-shadow(0 0 10px red)",
          }}
        /> , 'red'
      );
      return;
    }
  
    if (Password != ConfirmPassword) {
      darkToast(
        "Passowrd And Confirm Password Should Be Same",
        <IoCloseCircleSharp
          style={{
            color: "red",
            fontSize: "1.5em",
            filter: "drop-shadow(0 0 10px red)",
          }}
        /> ,'red'
      );
      return false;     
    }
    try{
      darkToast(
        "Your Registration in process",
        <VscServerProcess
          style={{
            color: "yellow",
            fontSize: "1.5em",
            filter: "drop-shadow(0 0 10px yellow)",
          }}
        /> , 'yellow'
      );
    const response = await fetch('https://url-backend-9vfx.onrender.com/register', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', // Specifying the content type as JSON
        // Add any other headers you need here
      },
      body: JSON.stringify({ name: Name, email: Email, password: Password }),
    });

    const data = await response.json();

    if(response.ok){
      darkToast(data.message,<IoMdCheckmarkCircleOutline style={{color:'#0f0' , fontSize:'1.5em',filter:'drop-shadow(0 0 10px #0f0)'}}/> ,'#0f0');
    }
    else{
      console.log(data);
      darkToast(data.error,<IoCloseCircleSharp style={{color:'red' , fontSize:'1.5em',filter:'drop-shadow(0 0 10px red)'}}/> , 'red');

    }
  }
  catch(error){
    darkToast("Error in sending Response",<IoCloseCircleSharp style={{color:'red' , fontSize:'1.5em',filter:'drop-shadow(0 0 10px red)'}}/> , 'red');
  }
  }


  return (
  <>
<Toaster/>
<div className="formcontainer">
    <form className="form signup" onSubmit={handleSubmit}>
      <h2>Sign Up To TinyPath</h2>
     
     <div className="inputBox">
        <input type="text" required value={Name} onChange={(e)=>{setName(e.target.value)}} />
       <BiUser className='icon user'/>
        <span>Name</span>
      </div>
      <div className="inputBox">
        <input type="text" required value={Email} onChange={(e)=>{SetEmail(e.target.value)}} />
        <ImEnvelop className='icon email'/>
        <span>email address</span>
      </div>
      <div className="inputBox">
        <input type="password" required value={Password} onChange={(e)=>{SetPassword(e.target.value)}}  />
        <FaLock className='icon pass'/>
        <span>create password</span>
      </div>
      <div className="inputBox">
        <input type="password" required value={ConfirmPassword} onChange={(e)=>{SetConfirmPass(e.target.value)}} />
       <FaLock className='icon pass pass2'/>
        <span>confirm password</span>
      </div>
      <div className="inputBox">
        <input type="submit" value="Create Account" />
      </div>
     
      <p>Already a member ? <Link to='/login' className="login">Log in</Link></p>
    </form>
  
  </div>
  </>
  )
}

export default Signup