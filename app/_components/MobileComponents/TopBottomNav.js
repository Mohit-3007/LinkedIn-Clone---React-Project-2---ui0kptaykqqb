'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link';
import { HiOutlineSearch } from "react-icons/hi";
import { ImHome3 } from "react-icons/im";
import { IoBagHandle } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { FaSquarePlus } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import AlertBox from '../AlertBox';
import { useContextProvider } from '@/app/ContextApi/AppContextProvider';
import { useAlertContextProvider } from '@/app/ContextApi/AlertContextProvider';

const TopBottomNav = () => {
  const { userName } = useContextProvider()
  const { alertDispatch } = useAlertContextProvider()
  const inputRef = useRef()
  const [input, setInput] = useState('')
  const [fetch, setFetch] = useState(false);
  const router = useRouter();

// getting the first leter of UserName
    const name = userName;
    const firstLetter = name?.charAt(0);

  function handleAlert(){
      console.log("handleAlert ")
      alertDispatch({type:"showComingSoon"})
      setTimeout(()=>{
        alertDispatch({type: 'hideComingSoon'})
      }, 2500)
    }

  function handleRedirect(){
    console.log("re - routing")
    router.push('/searchresult/mobile-nav-search')
  }

  return (
    <div className='w-full '>
      {/* top nav */}
      <div className='w-full h-12 z-20 dark:bg-[rgb(27,31,35)] bg-white fixed top-0 pl-3 py-2 pr-1.5 flex items-center'>
        {/* profile */}
        <Link href={"#"} className='w-8 h-8 mr-2' >
          <span className='w-full h-full bg-[#7A1CA4] flex justify-center items-center uppercase text-base font-bold text-white rounded-[50%]'>{firstLetter}</span>
        </Link>
        {/* search bar */}
        <div onClick={handleRedirect} ref={inputRef} className="w-[calc(100%-32px-40px)] h-full  ">
          <div className="w-full h-full relative">
            <input onKeyDown={(e) => {
              if(e.key === 'Enter'){
                setFetch(!fetch)
                }
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-full bg-[#EDF3F8] dark:bg-[#38434F] dark:placeholder:text-[rgb(205,208,211)] rounded px-10" 
              placeholder="Search" type="text" />
            <div className="absolute left-0 top-0 w-10 h-full pl-4 pr-2 py-2"><HiOutlineSearch className="w-full h-full" /></div>
          </div>
        </div>
        {/* messages */}
        <ol className='w-10 h-full'>
          <li onClick={handleAlert} className="w-full h-full list-none dark:text-[#BBBCBD] dark:hover:text-white text-[#666666] hover:text-[#191919] ">
            <Link href="#" className="ml-2 w-8 h-full flex flex-col justify-center items-center ">
              <div className="w-6 h-6"><AiFillMessage className="w-full h-full fill" /></div>
            </Link>
          </li>
        </ol>
      </div>
      {/* bottom nav */}
      <ul className='w-full h-12 z-20 pt-0.5 flex dark:bg-[rgb(27,31,35)] bg-white fixed bottom-0 '>
        {/* Home */}
        <li className="w-1/5 h-full list-none dark:text-[#BBBCBD] dark:hover:text-white text-[#666666] hover:text-[#191919] ">
          <Link href="/feed" className="w-full h-full flex flex-col justify-center items-center ">
            <div className="w-8 h-6"><ImHome3 className="w-full h-full fill" /></div>
            <span className=" h-4 text-xs">Home</span>
          </Link>
        </li>
        {/* Network */}
        <li onClick={handleAlert} className="w-1/5 h-full list-none dark:text-[#BBBCBD] dark:hover:text-white text-[#666666] hover:text-[#191919] ">
          <Link href="#" className="w-full h-full flex flex-col justify-center items-center ">
            <div className="w-6 h-6"><BsPeopleFill className="w-full h-full fill" /></div>
            <span className=" h-4 text-xs overflow-hidden text-center">My Network</span>
          </Link>
        </li>  
        {/* Post */}
        <li onClick={() => router.push('/feed/overlay/post')} className="w-1/5 h-full list-none dark:text-[#BBBCBD] dark:hover:text-white text-[#666666] hover:text-[#191919] ">
          <Link href="#" className="w-full h-full flex flex-col justify-center items-center ">
            <div className="w-6 h-6"><FaSquarePlus className="w-full h-full fill" /></div>
            <span className=" h-4  text-xs">Post</span>
          </Link>
        </li>
        {/* Notification */}
        <li onClick={handleAlert} className="w-1/5 h-full list-none dark:text-[#BBBCBD] dark:hover:text-white text-[#666666] hover:text-[#191919] ">
          <Link href="#" className="w-full h-full flex flex-col justify-center items-center ">
            <div className="w-8 h-6"><IoMdNotifications className="w-full h-full fill " /></div>
            <span className=" h-4  text-xs">Notification</span>
          </Link>
        </li>
        {/* Jobs */}
        <li onClick={handleAlert} className="w-1/5 h-full list-none dark:text-[#BBBCBD] dark:hover:text-white text-[#666666] hover:text-[#191919] ">
          <Link href="#" className="w-full h-full flex flex-col justify-center items-center ">
            <div className="w-6 h-6"><IoBagHandle className="w-full h-full fill " /></div>
            <span className=" h-4  text-xs">Jobs</span>
          </Link>
        </li>
      </ul>       
      {/* Alert box */}
      <AlertBox />
    </div>
  )
}

export default TopBottomNav;
