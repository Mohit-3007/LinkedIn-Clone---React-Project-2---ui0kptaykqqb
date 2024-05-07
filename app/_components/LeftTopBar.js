'use client'
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useContextProvider } from '../ContextApi/AppContextProvider';
import leftBg from '@/public/leftBg.jpg';
import chip from '@/public/chip.png';
import darkCover from '@/public/darkCover.png';
import { FaBookmark } from "react-icons/fa";
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';
import { useTheme } from 'next-themes';


const LeftTopBar = ({showMore}) => {
  const { userName, owner } = useContextProvider();
  const { alertDispatch } = useAlertContextProvider();
  const [profileView, setProfileView] = useState(0);
  const [connections, setConnections] = useState(0);
  const {theme} = useTheme();

// getting the first leter of UserName
  const name = userName;
  const fullName = name?.replace(';', '');
  const firstLetter = name?.charAt(0);

  useEffect( () => {
    let profileViewers = Math.floor(Math.random() * (30 - 7 + 1)) + 7;
    let connection = Math.floor(Math.random() * (190 - 80 + 1)) + 80;
    setProfileView(profileViewers);
    setConnections(connection)
  },[])

  function handleAlert(){
    alertDispatch({type:"showComingSoon"})
    setTimeout(()=>{
      alertDispatch({type: 'hideComingSoon'})
    }, 2500)
  }

  return (
    <div className="dark:text-[#D2D3D3]">
      {/* image */}
      <div className='w-full h-fit px-3 pt-3 pb-4 border-b-[1px] text-[#191919] dark:text-[#D2D3D3]
       dark:bg-[#1B1F23] border-[#E8E8E8] dark:border-0 dark:outline-none relative'>
        {/* image div */}
        <Link href={`/user/${owner}`} className='w-[576px] res-768:w-[225px] h-[56px] absolute left-0 top-0 '>
          <Image src={theme === 'light' ? leftBg : darkCover} alt='background' width={225} className='w-[576px] res-768:w-[225px] h-[68px] ' />
        </Link>
        {/* user Link */}
        <Link href={`/user/${owner}`} className='w-full h-fit flex flex-col items-center mt-[68px]'>
          {/* user pic */}
          <div className='w-full h-[3.25rem] flex justify-center'>
            <div className='w-[68px] h-[68px] z-10 border border-0.5 -mt-[38px] mb-3 rounded-[50%]'>
              <span className='w-full h-full  bg-[#7A1CA4] flex justify-center items-center uppercase text-4xl font-bold text-white rounded-[50%]'>{firstLetter}</span>
            </div>
          </div>
          {/* name */}
          <div className='w-full h-6 flex justify-center capitalize hover:underline font-semibold text-base'>{fullName}</div>
        </Link>
        {/* break */}
        <p className='w-full mt-1 h-4'></p>
      </div>
      {/* profile viewers & connections */}
      <div className={'res-768:block w-full h-[5.5rem] py-3 border-b-[1px] dark:bg-[#1B1F23] dark:outline-none border-[#E8E8E8] dark:border-0 ' 
      + (showMore ? '' : 'hidden')}>
        <div className='w-full h-full flex flex-col'>
          <div className='w-full h-6 flex items-center px-3 justify-between text-xs font-semibold'>
            <span className='text-[#6E6E6E] dark:text-[rgba(255,255,255,0.6)]'>Profile viewers</span>
            <span className='text-[#0A66C2]'>{profileView}</span>
          </div>  
          <div className='w=full h-10 px-3 py-1'>
            <div className='w-full h-full flex justify-between text-xs font-semibold'>
              <div className='w-fit h-full flex flex-col'>
                <div className='w-fit h-4 text-[#6E6E6E] dark:text-[rgba(255,255,255,0.6)]'>Connections</div>
                <div className='w-fit h-4 dark:text-[rgba(255,255,255,0.9)] text-[#3F3F3F]'>Grow your network</div>
              </div>
              <div className='w-fit h-4 text-[#0A66C2]'>{connections}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Premium */}
      <Link href={"#"} className={'res-768:block w-full h-fit p-3 border-b-[1px] dark:bg-[#1B1F23] border-[#E8E8E8] dark:outline-none dark:border-0 ' 
      + (showMore ? '' : 'hidden')}>
        <h1 className='w-full h-fit dark:text-[rgba(255,255,255,0.6)] text-[#6E6E6E] text-xs'>
          Grow your career and get ahead.
        </h1>
        <span className='w-full h-4 flex mt-1'>
          <Image src={chip} alt='chip' className='w-4 h-4 mr-1' />
          <span onClick={handleAlert} className='w-fit h-full text-xs font-semibold dark:text-[rgba(255,255,255,0.9)] text-[#3F3F3F] hover:text-[#0A66C2]
           hover:underline'>Retry Premium for &#8377; 0</span>
        </span>
      </Link>
      {/* saved items */}
      <Link onClick={handleAlert} href={"#"} className={'res-768:block w-full h-10 p-3 dark:bg-[#1B1F23] dark:border-0 ' 
      + (showMore ? '' : 'hidden')}>
        <span className='w-full h-full flex text-[#727272] dark:text-[rgba(255,255,255,0.6)] text-xs font-semibold'>
          <FaBookmark className='w-4 h-4 mr-2' /> My items
        </span>
      </Link>
    </div>
  )
}

export default LeftTopBar