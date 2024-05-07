'use client'
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname} from 'next/navigation';
import Image from 'next/image';
import { useContextProvider } from '../ContextApi/AppContextProvider';
import chip from '@/public/chip.png';
import { useAlertContextProvider } from "../ContextApi/AlertContextProvider";
import { useTheme } from 'next-themes';

export default function ProfilePopUp(){
    const [popUp, setPopUp] = useState(false);
    const profileRef = useRef();
    const profileDivRef = useRef();
    const pathname = usePathname();
    const { handleLoginState, userName, owner } = useContextProvider();
    const { alertDispatch } = useAlertContextProvider();
    const { theme, setTheme, systemTheme } = useTheme(); // for dark/light mode
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if(popUp) setPopUp(false)
    },[pathname])

    function handleProfilePopUP(){
        setPopUp(!popUp)    
    }

    function handleWindowClick(e){
        if(!profileDivRef?.current?.contains(e.target)){
            if(profileRef?.current?.contains(e.target)) return
            else if(popUp && !profileRef?.current?.contains(e.target)) setPopUp(false)
        }    
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleWindowClick);
        return () => {
            document.removeEventListener('mousedown', handleWindowClick)
        }
    },[popUp])

    function handleLogOut() {
        console.log("Cookie remove");
        handleProfilePopUP();
        handleLoginState();
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "owner=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
    }

    function handleComingSoon(){
        handleAlert();
        handleProfilePopUP();
    }
    
    function handleThemeChange(){
        if(theme === 'light') setTheme('dark');
        else setTheme('light');
        handleProfilePopUP();
    }

// getting the first leter of UserName
  const name = userName;
  const firstLetter = name?.charAt(0);

  function handleAlert(){
    console.log("handleAlert ")
    alertDispatch({type:"showComingSoon"})
    setTimeout(()=>{
      alertDispatch({type: "hideComingSoon"})
    }, 2500)
  }

  // to Avoid UI Hydraytion Mismatch for Dark Mode
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }
  const currentTheme = theme === 'system' ? systemTheme : theme;
    return (
        <div className="w-full h-full relative">
            {/* Profile */}
            <button ref={profileDivRef} onClick={handleProfilePopUP} className="w-full h-full flex flex-col justify-center items-center">
                {/* Image */}
                <div className="w-6 h-6">
                    <span className='w-full h-full  bg-[#7A1CA4] flex justify-center items-center uppercase text-sm font-bold text-white rounded-[50%]'>{firstLetter}</span>
                </div>
                <span className="hidden res-856:block h-4 dark:text-[#BBBCBD] dark:hover:text-white text-[#666666] text-xs">Me 
                    {popUp ? (
                            <FaCaretUp className="inline w-4 h-4" />
                        )  :   (
                            <FaCaretDown className="inline w-4 h-4" />
                        )
                    }
                </span>
            </button>
            {/* Popup-Div */}
            <div ref={profileRef} className={"w-[16.5rem] h-[24.6875rem] outline outline-1 dark:bg-[rgb(27,31,35)] dark:outline-none outline-[#c0bbbb] z-0 bg-white absolute right-0 -bottom-[403px] rounded-tl-lg rounded-b-lg " 
            + (popUp ? "" : "hidden")}>
                <div className="w-full h-full">
                    {/* Image & profile */}
                    <header className="w-full h-[6.5rem] p-2 flex flex-col justify-between border-b border-opacity-30 border-[#666666]">
                        {/* Image & userName */}
                        <Link onClick={handleProfilePopUP} href={`/user/${owner}`} className="w-full h-14 dark:text-[rgb(255,255,255,0.9)] text-black" >
                            <div className="w-full h-full flex items-center">
                                {/* image */}
                                <div className="w-14 h-14 rounded-[50%]">
                                    <span className='w-full h-full bg-[#7A1CA4] flex justify-center items-center uppercase text-3xl font-bold text-white rounded-[50%]'>{firstLetter}</span>
                                </div>
                                {/* username */}
                                <div className="w-[calc(100%-56px)] pl-2 h-11 flex flex-col justify-center items-center">
                                   <div className="w-full h-6 flex items-center capitalize">{userName}</div> 
                                   <div className="w-full h-5">.</div> 
                                </div>
                            </div>
                        </Link>
                        {/* View Profile */}
                        <Link onClick={handleProfilePopUP} href={`/user/${owner}`} className="w-full h-6 px-3 py-0.5 dark:text-[rgb(82,133,182)] text-[#0A66C2] font-semibold rounded-2xl outline outline-1 
                            outline-[#0A66C2] dark:outline-[rgb(82,133,182)] flex justify-center items-center hover:outline-2 dark:hover:bg-[rgb(31,47,65)] hover:bg-[#def2fd]">View Profile
                        </Link>
                    </header>
                    {/* Account, manage & SignIn/SignOut */}
                    <ul className="w-full h-[17.9375rem] list-none">
                        {/* Account */}
                        <li className="w-full px-1 h-[9.5625rem] border-b border-opacity-30 border-[#666666]">
                            <h3 className="w-full px-3 pt-3 h-8 font-semibold text-base dark:text-[rgb(255,255,255,0.9)] flex items-center">Account</h3>
                            <ul className="w-full h-[7.25rem] list-none flex flex-col">
                                {/* Retry Premium */}
                                <li className="w-full px-1 h-8 flex items-center">
                                    <Link onClick={handleComingSoon} href={"#"} className="w-full h-full px-3 pt-1 flex items-center">
                                        <span className="h-full w-full flex items-center">
                                            {/* Icon*/}
                                            <Image src={chip} alt="premiumChip" width={20} height={20} className="mr-1"/>
                                            {/* <FaMicrochip className="w-5 h-5 mr-1 fill-[#EAA142]" /> */}
                                            <span className="w-[calc(100%-28px)] h-full dark:text-[rgb(255,255,255,0.6)] text-[#8c8c8c] hover:underline hover:text-[#2c5f9d] flex items-center font-medium text-sm">Retry Premium Free</span>
                                        </span>
                                    </Link>
                                </li>
                                {/* Change your  password */}
                                <li className="w-full px-1 h-7 flex items-center"> 
                                    <Link onClick={handleProfilePopUP} href={"/updatepassword"} className="w-full h-full px-3 py-1 dark:text-[rgb(255,255,255,0.6)] flex hover:underline text-[#636363] text-sm">Change your password</Link>
                                </li>
                                 {/* Change your  Theme color */}  
                                <li className="w-full px-1 h-7 flex items-center">
                                    {currentTheme === 'dark' ? 
                                        <Link href={"#"}
                                        onClick={handleThemeChange} className="w-full h-full px-3 py-1 flex hover:underline dark:text-[rgb(255,255,255,0.6)] text-[#636363] text-sm">Change to Light Mode</Link> 
                                        :
                                        <Link href={"#"}
                                        onClick={handleThemeChange} className="w-full h-full px-3 py-1 flex hover:underline dark:text-[rgb(255,255,255,0.6)] text-[#636363] text-sm">Change to Dark Mode</Link>
                                    }     
                                </li>
                                <li onClick={handleComingSoon} className="w-full px-1 h-7 flex items-center">
                                    <Link href={"#"} className="w-full h-full px-3 py-1 flex hover:underline dark:text-[rgb(255,255,255,0.6)] text-[#636363] text-sm">Language</Link>
                                </li>                    
                            </ul>
                        </li>
                        {/* Manage */}
                        <li className="w-full px-1 h-[5.8125rem] border-b border-opacity-30 border-[#666666]">
                            <h3 className="w-full px-3 pt-3 h-5 font-semibold text-base dark:text-[rgb(255,255,255,0.9)] flex items-center">Manage</h3>
                            <ul className="w-full h-14 my-1 flex flex-col">
                                <li onClick={handleComingSoon} className="w-full py-1">
                                    <Link href={"#"} className="w-full h-full px-3 py-1 hover:underline dark:text-[rgb(255,255,255,0.6)] text-[#636363] text-sm">Posts & Activity</Link>
                                </li>
                                <li onClick={handleComingSoon} className="w-full py-1">
                                    <Link href={"#"} className="w-full h-full px-3 py-1 hover:underline dark:text-[rgb(255,255,255,0.6)] text-[#636363] text-sm">Job Posting Account</Link>
                                </li>
                            </ul>
                        </li>
                        {/* Signout */}
                        <li onClick={handleLogOut} className="w-full px-1 h-8 flex items-center">
                            <Link href={"/"} className="w-full h-full px-3 py-3 dark:text-[rgb(255,255,255,0.6)] my-1 hover:underline text-[#636363] text-sm">Sign Out</Link>
                        </li>
                    </ul>
                </div>        
            </div>            
        </div>
    )
}

