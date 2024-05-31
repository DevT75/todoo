import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";

const Layout = ({ children }) => {
  const { handleLogout } = useAuth();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const u = JSON.parse(sessionStorage.getItem('user'));
    setUser(u);
  },[]);
  const Router = useRouter();
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    if (user) {
      handleLogout();
    }
    else {
      Router.push('/login');
    }
  }
  const toggleClick = () => {
    setClicked(!clicked);
  }
  return (
    <div className="min-h-screen w-full bg-custom-gradient filter-custom-filter overflow-x-hidden flex flex-col justify-center items-center">
      <div className="z-10 w-full h-8 top-0 absolute flex flex-row justify-between items-center py-8 md:px-8 px-4 bg-white/30 backdrop-blur-lg shadow-md">
        <div className="w-72 items-center justify-center flex text-white text-3xl">Todo App</div>
        <div className='relative'>
          {
            <AiOutlineUser className='bg-white text-black rounded-full p-2' size={40} onClick={toggleClick} />
          }
          {
            clicked &&
            <div className='right-0 absolute flex flex-col items-center bg-white rounded-md mt-1 border border-black shadow-lg'>
              {
                user && <label className='text-black font-semibold text-center text-xs py-2 w-24'>{`Hi, ${user}`}</label>
              }
              <label className={`font-semibold text-black ${user ? "border-t-2" : ""} bg-white rounded py-2 text-center hover:cursor-pointer text-xs w-24 hover:text-white hover:text-semibold hover:bg-black`} onClick={handleClick}>{
                user ? 'Logout' : 'Login'
              }</label>
            </div>
          }

        </div>

      </div>
      {children}
    </div>
  );
};

export default Layout;