'use client'
import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import Logo from '../../public/logo.png';
import { IoBagHandle } from "react-icons/io5";
import { IoMdTrendingUp } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { RiArticleLine } from "react-icons/ri";
import learningg from '@/public/learningg.png';
import AlertBox from './AlertBox';
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';

const LogoutNavbar = () => {
  const { alertDispatch } = useAlertContextProvider()
  function handleAlert(){
    console.log("handleAlert ")
    alertDispatch({type:"showComingSoon"})
    setTimeout(()=>{
      alertDispatch({type: 'hideComingSoon'})
    }, 2500)
  }
  return (
    <header className="w-screen fixed top-0 left-0 right-[-17px] h-[80px] pt-3 pb-4 z-20 bg-white ">
      {/* main navbar */}
      <div className="w-full res-1128:w-[1128px] res-1128:mx-[calc((100%-1128px)/2)] px-4 res-1162:px-0 h-full flex items-center relative">
        {/* Logo */}
        <div className='w-[135px] h-[44px] mr-[calc(100%-353px)] res-992:mr-[calc(100%-758px)] res-1128:mr-[370px] flex items-center'>
          <Image src={Logo} alt="Logo" width={135} height={44} className='w-[135px] h-[38px]' />  
        </div> 
        {/* ul */}
        <ul className='hidden res-992:flex w-fit h-full items-center mr-1'>
          {/* Trending */}
          <li onClick={handleAlert} className="w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] text-[#666666] " >
            <Link href="/feed" className="w-full h-full flex flex-col justify-center items-center border-[#191919] " >
              <div className="w-6 h-6"><IoMdTrendingUp className="w-full h-full" /></div>
              <span className="hidden res-856:block h-4 text-xs">Trending</span>
            </Link>
          </li>
          {/* Articles */}
          <li onClick={handleAlert} className="w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] text-[#666666] " >
            <Link href="#" className="w-full h-full flex flex-col justify-center items-center border-[#191919] " >
              <div className="w-6 h-6"><RiArticleLine className="w-full h-full " /></div>
              <span className="hidden res-856:block h-4  text-xs">Articles</span>
            </Link>
          </li>
            {/* People */}
            <li onClick={handleAlert} className="w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] text-[#666666] "> 
            <Link href="#" className="w-full h-full flex flex-col justify-center items-center border-[#191919] " >
              <div className="w-6 h-6"><BsPeopleFill className="w-full h-full" /></div>
              <span className="hidden res-856:block h-4 text-xs">People</span>
            </Link>
          </li>
          {/* Learning */}
          <li onClick={handleAlert} className="w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] text-[#666666] "> 
            <Link href="#" className="w-full h-full flex gap-[3px] flex-col justify-center items-center border-[#191919] "> 
                <Image src={learningg} alt='learningg' width={24} height={24} className='w-5 h-5' />
                <span className="hidden res-856:block h-4 mt-[-1px] text-xs">Notification</span>
            </Link>
          </li>
            {/* Jobs */}
            <li onClick={handleAlert} className="w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] text-[#666666] "> 
            <Link href="#" className="w-full h-full flex flex-col justify-center items-center border-[#191919] "> 
              <div className="w-6 h-6"><IoBagHandle className="w-full h-full fill" /></div>
              <span className="hidden res-856:block h-4  text-xs">Jobs</span>
            </Link>
          </li>
          {/* break */}
          <div className=' res-856:block w-[1px] h-[37px] bg-[#B2B2B2]  '></div>
        </ul>
        {/* buttons */}
        <div className='w-[218.5px] h-12'>
          <Link href={"signup"} className='w-fit h-full px-6 py-3 font-semibold text-base text-[#404040] rounded-3xl hover:bg-[#E8E8E8] flex items-center ' >Join Know</Link>
        </div> 
      </div>
      {/* AlertBox */}
      <AlertBox />   
    </header>
  )
}

export default LogoutNavbar;
