import  { useState, FormEvent, useContext } from 'react';
import './home.css';
import { FaCopy, FaLink } from "react-icons/fa6";
import { IoSettingsOutline, IoStatsChartOutline } from 'react-icons/io5';
import { LuLink } from "react-icons/lu";
import { FaRegCopy } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';
import { CiWarning } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

function Home() {
  const [Custom, setCustom] = useState(false);
  const [longUrl, setLongUrl] = useState('');
  const [customLink, setCustomLink] = useState('');
  const [success, setSuccess] = useState(false);
  const [iserror, setisErr] = useState(false);
  const [linkgenerated, setLinkgenerated] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return null;
  }

  const { userId, isLoggedin } = authContext;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(linkgenerated)
      .then(() => {
        console.log('Link copied to clipboard:', linkgenerated);
        darkToast("Link Copied", <FaCopy style={{ color: '#0f0', fontSize: '1.1em', filter: 'drop-shadow(0 0 10px #0f0)' }} />, '#0f0');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        alert('failed to copy');
        console.log(iserror);
      });
  };

  const handleShortMoreLink = () => {
    setLongUrl('');
    setCustomLink('');
    setSuccess(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch('https://url-backend-9vfx.onrender.com/v1/short-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longUrl,
          customLink,
          userId
        })
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setSuccess(true);
        setLinkgenerated("http://localhost:5173/" + data.shortUrl);
        setisErr(false);
      } else {
        console.log(data);
        setisErr(true);
        setSuccess(false);
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const darkToast = (message: (any), icon: any, color: any) =>
    toast(message, {
      icon: icon,
      style: {
        borderRadius: "12px",
        background: "#223243",
        color: color,
        boxShadow: `-5px -5px 15px rgba(255, 255, 255, 0.1),
            5px 5px 15px rgba(0, 0, 0, 0.35)`,
      },
      position: "bottom-left",
    });

  const viewStats = () => {
    if (!isLoggedin) {
      darkToast("Login To View Stats", <CiWarning style={{ color: 'yellow', fontSize: '1.1em', filter: 'drop-shadow(0 0 10px yellow)' }} />, 'yellow');
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <div className="container">
      <div className="home-container min-w-full">
        <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent mt-[10vh]">TinyPath Url Shortner :)</h2>
        <p className='bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent font-bold  pt-5 pl-10 pr-10 text-center'>tiny path is a short url converter tool, you can enter the big link and convert to short link from here</p>

        {isLoading ? ( // Render loader if loading
          <div className="flex justify-center items-center mt-8">
            <ClipLoader color="#36d7b7" size={50} />
          </div>
        ) : (
          success && linkgenerated ? ( // Render createdBox if success and linkgenerated
            <div className="createdBox mb-10">
              <span className='box_title'>Link Generated &nbsp; &#10024;</span>
              <hr className='hrtag' /><br />
              <div className="linkBox1">
                <span className='genicon genlinkicon'><LuLink /></span>
                <input type='text' className='geninputfield genoutput' value={linkgenerated} />
              </div>
              <div className="cbox_btns">
                <button className='cbtn btnshare' onClick={viewStats}>Stats <IoStatsChartOutline /> </button>
                <button className='cbtn btncopy' onClick={handleCopyToClipboard}>Copy <FaRegCopy /> </button>
                <button className='cbtn btnnewlink' onClick={handleShortMoreLink}>Short More Link <IoMdAdd /> </button>
              </div>
            </div>
          ) : ( // Render form if not loading and not success
            <form className='form' onSubmit={handleSubmit}>
              <div className="inputBox1">
                <span className='icon linkIcon'><FaLink /></span>
                <input type='text' className='inputfield inputlong' placeholder='Enter long link Here ... ' onChange={(e) => { setLongUrl(e.target.value) }} value={longUrl} />
              </div>

              <label className="setting-auto" onClick={() => setCustom(!Custom)}>Advance &nbsp; <IoSettingsOutline /></label>

              <div className={`secondInput ${Custom ? 'active' : ''}`}>
                <input type='text' className='inputfield2' placeholder='Enter BackHalf Link' value={customLink} onChange={(e) => { setCustomLink(e.target.value) }} />
              </div>

              <div className="submitBox">
                <input type="submit" value="Generate" className='submitbtn' />
              </div>
            </form>
          )
        )}
      </div>
    </div>
  );
}

export default Home;