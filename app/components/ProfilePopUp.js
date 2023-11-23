'use client'
import { ImHome3 } from "react-icons/im";
import { FaCaretDown } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Premium from '../../public/premium.png'





export default function ProfilePopUp(){
    const [popUp, setPopUp] = useState(false);
    const profileRef = useRef();
    const profileDivRef = useRef();
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if(popUp) setPopUp(false)
    },[pathname])

    function handleProfilePopUP(){
        setPopUp(!popUp)  
        console.log("router ",router);    
        console.log("pathname ",pathname);    
        console.log("searchParams ",searchParams);    
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

    return (
        <div className="w-full h-full relative">
            {/* Profile */}
            <button ref={profileDivRef} onClick={() => handleProfilePopUP()} className="w-full h-full flex flex-col justify-center items-center">
                {/* Image */}
                <div className="w-6 h-6"><ImHome3 className="w-full h-full fill-[#666666]" /></div>
                <span className="h-4 text-[#666666] text-xs">Me <FaCaretDown className="inline w-4 h-4" /></span>
            </button>
            {/* Popup-Div */}
            <div ref={profileRef} className={"w-[16.5rem] h-[24.6875rem] outline outline-1 outline-[#c0bbbb] z-30 bg-white absolute right-0 -bottom-[403px] rounded-tl-lg rounded-b-lg " 
            + (popUp ? "" : "hidden")}>
                <div className="w-full h-full">

                    {/* Image & profile */}
                    <header className="w-full h-[6.5rem] p-2 flex flex-col border-b border-opacity-30 border-[#666666]">
                        {/* Image & userName */}
                        <Link href={"profile"} className="w-full h-14 text-black" >
                            <div className="w-full h-full flex items-center">
                                {/* image */}
                                <div className="w-14 h-14 rounded-[50%]">
                                    <img src="#" alt="user pic" className=" w-full h-full rounded-[50%] bg-black"></img>
                                </div>
                                {/* username */}
                                <div className="w-[calc(100%-56px)] pl-2 h-11 flex flex-col justify-center items-center">
                                   <div className="w-full h-6 flex items-center">Mohit Khurana</div> 
                                   <div className="w-full h-5">.</div> 
                                </div>
                            </div>
                        </Link>
                        {/* View Profile */}
                        <Link href={"profile"} className="w-full h-6 px-3 py-0.5 text-[#0A66C2] font-semibold flex justify-center items-center">View Profile</Link>
                    </header>

                    {/* Account, manage & SignIn/SignOut */}
                    <ul className="w-full h-[17.9375rem] list-none">

                        {/* Account */}
                        <li className="w-full px-1 h-[9.5625rem] border-b border-opacity-30 border-[#666666]">
                            <h3 className="w-full px-3 pt-3 h-8 font-semibold text-base flex items-center">Account</h3>
                            <ul className="w-full h-[7.25rem] list-none flex flex-col">
                                <li className="w-full px-1 h-8 flex items-center">
                                    <Link href={"#"} className="w-full h-full px-3 pt-1 flex items-center">
                                        <span className="h-full w-full flex items-center">
                                            {/* Icon*/}
                                            <Image src="/../../public/premium" alt="premiumChip" width={20} height={20} className="mr-1"/>
                                            {/* <FaMicrochip className="w-5 h-5 mr-1 fill-[#EAA142]" /> */}
                                            <span className="w-[calc(100%-28px)] h-full text-[#8c8c8c] hover:underline hover:text-[#2c5f9d] font-medium text-sm">Retry Premium Free</span>
                                        </span>
                                    </Link>
                                </li>
                                <li className="w-full px-1 h-7 flex items-center">
                                    <Link href={"#"} className="w-full h-full px-3 py-1 flex hover:underline text-[#636363] text-sm">Settings & Privacy</Link>
                                </li>
                                <li className="w-full px-1 h-7 flex items-center">
                                    <Link href={"#"} className="w-full h-full px-3 py-1 flex hover:underline text-[#636363] text-sm">Help</Link>
                                </li>
                                <li className="w-full px-1 h-7 flex items-center">
                                    <Link href={"#"} className="w-full h-full px-3 py-1 flex hover:underline text-[#636363] text-sm">Language</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Manage */}
                        <li className="w-full px-1 h-[5.8125rem] border-b border-opacity-30 border-[#666666]">
                            <h3 className="w-full px-3 pt-3 h-5 font-semibold text-base flex items-center">Manage</h3>
                            <ul className="w-full h-14 my-1 flex flex-col">
                                <li className="w-full py-1">
                                    <Link href={"#"} className="w-full h-full px-3 py-1 hover:underline text-[#636363] text-sm">Posts & Activity</Link>
                                </li>
                                <li className="w-full py-1">
                                    <Link href={"#"} className="w-full h-full px-3 py-1 hover:underline text-[#636363] text-sm">Job Posting Account</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Signout */}
                        <li className="w-full px-1 h-8 flex items-center">
                            <Link href={"signup"} className="w- full h-full py-3 px-1 my-1 hover:underline text-[#636363] text-sm">Sign Out</Link>
                        </li>

                    </ul>

                </div>
             
            </div>     
        </div>
    )
}

