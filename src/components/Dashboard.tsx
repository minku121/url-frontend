import  { useContext, useEffect, useState } from 'react';
import { FaCopy, FaEye } from 'react-icons/fa';
import { IoOpenOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

interface Link {
  id: number;
  text: string;
  pageViews: any;
  longUrl: string;
  shortUrl: string;
  createdAt: any;
}

function Dashboard(): JSX.Element {
  const authContextdata = useContext(AuthContext);
  const contextName = authContextdata ? authContextdata.contextName : '';
  const navigate = useNavigate();
  const [linksData, setLinkData] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchlinks(): Promise<void> {
    setIsLoading(true); // Set loading state to true

    const token = localStorage.getItem("token");

    if (!token) {
      navigate('/');
    } else {
      try {
        const response = await fetch(`https://url-backend-9vfx.onrender.com/userDashboard`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "token": token
          })
        });

        const data = await response.json();
        const links: Link[] = data.links;
        if (response.ok) {
          console.log(links);
          setLinkData(links);
        }
      } catch (error) {
        console.log('failed to send response');
      } finally {
        setIsLoading(false); // Reset loading state
      }
    }
  }

  useEffect(() => {
    fetchlinks();
  }, []);

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

  function openLongLink(link: any) {
    window.open(link);
  }

  const handleCopyToClipboard = (linkgenerated: any) => {
    navigator.clipboard.writeText(linkgenerated)
      .then(() => {
        console.log('Link copied to clipboard:', linkgenerated);
        darkToast("Link Copied", <FaCopy style={{ color: '#0f0', fontSize: '1.1em', filter: 'drop-shadow(0 0 10px #0f0)' }} />, '#0f0');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  return (
    <div className="relative gap-0 items-center justify-center w-full h-full min-h-[100vh] min-w-[100vw]">
      <h2 className="block justify-center top-5 mt-[100px] text-4xl text-center text-fuchsia-400">
        Welcome {contextName} To Your DashBoard
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center mt-8">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : (
        <div className="cards flex flex-wrap justify-center mt-[50px]">
          {linksData.map((item: Link) => {
            const formattedTime = new Date(item.createdAt).toLocaleString();

            return (
              <div className="flex flex-col items-center bg-[#6a369a] rounded-lg shadow-md p-4 m-4 w-[350px]">
                <div className="flex flex-col w-full mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#ccc] overflow-hidden whitespace-nowrap text-overflow-ellipsis w-[100%] ">{item.longUrl}</span>
                    <a href="#" className="flex items-center text-blue-500 hover:text-blue-700">
                      <IoOpenOutline className="mr-2 ml-4" onClick={() => { openLongLink(item.longUrl) }} />
                    </a>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#ccc] overflow-hidden whitespace-nowrap text-overflow-ellipsis">{`http://localhost:5173/` + item.shortUrl}</span>
                    <a href="#" className="flex items-center text-green-500 hover:text-green-700">
                      <FaCopy className="mr-2" onClick={() => handleCopyToClipboard(`http://localhost:5173/${item.shortUrl}`)} />
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#ccc] overflow-hidden whitespace-nowrap text-overflow-ellipsis">{'pageView : ' + item.pageViews}</span>
                    <span className="flex items-center text-white hover:text-green-700">
                      <FaEye className="mr-2" />
                    </span>
                  </div>
                </div>
                <p className='text-white overflow-x-hidden whitespace-nowrap'>{formattedTime}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;