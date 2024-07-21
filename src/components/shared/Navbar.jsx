import React, { useEffect, useState } from 'react';
import { IoReorderThreeOutline, IoSearch } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { PiDotsNine } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setSearchText } from '../../redux/appSlice';
import Avatar from 'react-avatar';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Navbar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { authUser } = useSelector(state => state.app);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    dispatch(setSearchText(search));
  }, [search, dispatch]);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => dispatch(setAuthUser(null)))
      .catch((e) => console.error(e));
  }

  return (
    <div className='flex items-center gap-5 cursor-pointer p-4 relative'>
      <div className='flex items-center gap-4 w-1/5'>
        <IoReorderThreeOutline size={33} aria-label="Menu" />
        <img 
          src="https://static.vecteezy.com/system/resources/previews/020/964/377/non_2x/gmail-mail-icon-for-web-design-free-png.png" 
          alt="Gmail Icon" 
          className='w-8 h-8' 
        />
        <h1 className='text-2xl text-[#6e7072]'>Gmail</h1>
      </div>

      <div className='flex items-center gap-2 flex-grow'>
        <div className='relative w-full'>
          <IoSearch className='absolute top-1/2 left-3 transform -translate-y-1/2 text-xl text-gray-500' aria-label="Search" />
          <input 
            onChange={(e) => setSearch(e.target.value)} 
            type="text" 
            placeholder='Search mail' 
            value={search} 
            className='w-full bg-[#eaf1fb] rounded-3xl text-lg pl-10 pr-4 py-2'
            aria-label="Search mail"
          />
        </div>
      </div>

      <div className='flex items-center gap-4 ml-auto'>
        <BsQuestionCircle size={25} aria-label="Help" />
        <CiSettings size={25} aria-label="Settings" />
        <PiDotsNine size={25} aria-label="Apps" />

        <div className='relative'>
          <Avatar src={authUser.photoURL} round={true} size='50' onClick={() => setLogout(!logout)} />  
          <div className={`logout-menu ${logout ? "show" : ""}`}>
            <p className="underline text-blue-600" onClick={logoutHandler}>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
