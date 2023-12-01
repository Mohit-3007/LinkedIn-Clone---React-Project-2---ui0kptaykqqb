import React from 'react'
import Link from "next/link";
import { GrLinkedin } from "react-icons/gr";
import { HiOutlineSearch } from "react-icons/hi";
import { ImHome3 } from "react-icons/im";
import { IoBagHandle } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import ProfilePopUp from './ProfilePopUp';

// ui0kptaykqqb


const NavBar = () => {

  return (
    <header className="w-screen fixed top-0 left-0 right-[-17px] px-6 h-[3.25rem] z-30 bg-white  border-b border-opacity-30 border-[#666666] outline-none shadow-sm">
      
        <div className="res-1176:mx-[calc((100%-1128px)/2)] w-full res-1176:w-[1128px] h-full  flex items-center">

          {/* Logo */}
          <Link href="/" className="w-[41px] h-[41px] mr-0.5 flex items-center"><GrLinkedin className="w-9 h-9 text-[#0A66C2] rounded" /></Link>

          {/* Search */}
          <div className="w-[35.46%] h-[34px] bg-red-400">
            <div className="res-1056:w-[280px] w-full rounded h-full bg-yellow-400">
              {/* for lg-screen */}
              <div className="w-full h-full relative">
                <input className="w-full h-full px-10" placeholder="Search" type="text" />
                <div className="absolute res-1056:right-[240px] top-0 w-10 h-full pl-4 pr-2 py-2"><HiOutlineSearch className="w-full h-full" /></div>
              </div>
              {/* for sm-screen- 1024px */}
              {/* <button className="hidden"></button> */}
            </div>
          </div>

          {/* Nav Icons */}
          {/* min 856px___w-686px--?? */}
          <nav className="res-856:w-[686px] h-full dark:bg-black">
            <ul className="w-full h-full flex">
              {/* Home */}
              <li className="w-20 h-full list-none">
                <Link href="/feed" className="w-full h-full flex flex-col justify-center items-center">
                  <div className="w-6 h-6"><ImHome3 className="w-full h-full fill-[#666666]" /></div>
                  <span className="h-4 text-[#666666] text-xs">Home</span>
                </Link>
              </li>
              {/* Network */}
              <li className="w-20 h-full list-none">
                <Link href="/mynetwork" className="w-full h-full flex flex-col justify-center items-center">
                  <div className="w-6 h-6"><BsPeopleFill className="w-full h-full fill-[#666666]" /></div>
                  <span className="h-4 text-[#666666] text-xs">My Network</span>
                </Link>
              </li>
              {/* Jobs */}
              <li className="w-20 h-full list-none">
                <Link href="/jobs" className="w-full h-full flex flex-col justify-center items-center">
                  <div className="w-6 h-6"><IoBagHandle className="w-full h-full fill-[#666666]" /></div>
                  <span className="h-4 text-[#666666] text-xs">Jobs</span>
                </Link>
              </li>
              {/* Messaging */}
              <li className="w-20 h-full list-none">
                <Link href="/messaging" className="w-full h-full flex flex-col justify-center items-center">
                  <div className="w-6 h-6"><AiFillMessage className="w-full h-full fill-[#666666]" /></div>
                  <span className="h-4 text-[#666666] text-xs">Messaging</span>
                </Link>
              </li>
              {/* Notification */}
              <li className="w-20 h-full list-none">
                <Link href="/notification" className="w-full h-full flex flex-col justify-center items-center">
                  <div className="w-8 h-6"><IoMdNotifications className="w-full h-full fill-[#666666]" /></div>
                  <span className="h-4 text-[#666666] text-xs">Notification</span>
                </Link>
              </li>
              {/* Profile-component */}
              <li className="w-20 h-full list-none border-r border-opacity-30 border-[#666666]">
                <ProfilePopUp />
              </li>
              {/* For Business */}
              <li className="w-[6.625rem] h-full">

              </li>
              {/* Retry Premium */}
              <li className="w-[6.25rem] h-full bg-yellow-300 z-20">
                <Link href={"/premium"} className="w-full h-full pt-2 text-[#915907] underline text-xs flex text-center">Retry Premium Free</Link> 
              </li>

            </ul>
          </nav>

        </div>

    </header>
  )
}

export default NavBar