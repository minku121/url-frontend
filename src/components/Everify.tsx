import  { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/neutral.json';
import succesAnimation from '../assets/success.json';
import failedAnimation from '../assets/failed.json'
import { useNavigate } from 'react-router-dom';
function Everify() {
  const [isVerified, setIsVerified] = useState(false);
  const [isDataReceived, setIsDataReceived] = useState(false);
  const [successText , setSuccesstext] = useState('');
  const [errorText ,setErrortext] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const navigate = useNavigate();

    const verifyUser = async () =>{
      if(!token){
        navigate('/');
      }

      try{
        const response = await fetch('https://url-backend-9vfx.onrender.com/v1/verification',{
          method:'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({token})
        })

        const data = await response.json();

        if(response.status==200){
            setIsDataReceived(true);
            setIsVerified(true);
            setSuccesstext(data.message)

        }
        else if(response.status==208){
          setIsDataReceived(true);
          setIsVerified(true);
          setSuccesstext(data.message)
        }

        else if(response.status==401){
          setIsDataReceived(true);
          setIsVerified(false);
          setErrortext(data.error);
        }
        else{
          setIsDataReceived(true);
          setIsVerified(false);
          setErrortext(data.error);
        }
      }
      catch(error){
        alert('failed to fetch data from the server')
        setErrortext('failed to fetch data from server');
       setIsDataReceived(true);
       setIsVerified(false);

      }
    }

      useEffect(()=>{
          verifyUser();
      },[])

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center shadow-md p-10" style={{ maxWidth: '800px', minWidth: '200px', width: '80vw', padding: '50px' , boxShadow:'0 0 10px #191629'}}>
        <h3 className='text-center text-white text-3xl'>{isDataReceived ? isVerified ? <span style={{color:'#0f0'}}>{successText}</span> : <span style={{color:'red'}}>{errorText}</span> : <span style={{color:'yellow'}}>Your Account Verification In Progress</span>}</h3>
        <div className="mt-5">
          <Lottie animationData={isDataReceived ? isVerified ? succesAnimation : failedAnimation : animationData } className='w-52 h-52' />
         <button className='text-center justify-center text-2xl w-full text-[#0f0] bg-slate-500 rounded-full items-center'>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Everify;
