'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { GrLinkedin } from "react-icons/gr";
import { HiOutlineSearch } from "react-icons/hi";
import { ImHome3 } from "react-icons/im";
import { IoBagHandle } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { IoIosSearch, IoIosTimer } from "react-icons/io";
import Dots9 from '@/public/9dots.png';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Learning from '@/public/learning.png'
import Talent from '@/public/talent.png'
import Advertise from '@/public/advertise.png'
import Sell from '@/public/sell.png'
import Groups from '@/public/groups.png'
import Services from '@/public/services.png'
import Post from '@/public/post.png'
import AlertBox from '../AlertBox';
import { useContextProvider } from '@/app/ContextApi/AppContextProvider';
import { useAlertContextProvider } from '@/app/ContextApi/AlertContextProvider';




const TopBottomNav = () => {
    const { userName, handleSearchInput, isInputSlct, } = useContextProvider()
    const { alertDispatch } = useAlertContextProvider()
    const inputRef = useRef()
    const suggRef = useRef()
    const [input, setInput] = useState('')
    const [fetch, setFetch] = useState(false);


// {
//     useEffect( () => { 
//         async function handleSearchFetch(){
//             console.log("handleSearchInput function is called ")
//             const searchContent = await makeSearch(input, "content")
//             const searchTitle = await makeSearch(input, "title")
//             console.log("search result of searchContent ", searchContent);
//             console.log("search result of searchTitle ", searchTitle);
//             if(searchContent.status === 'success'){
//             checkLocalData();
//             handleSearchInput(false)
//             setSearchContent(searchContent.data)
//             }
//             else{
//             if(searchContent.message === 'No Post found') {
//                 console.log("No Content found with given input")
//                 checkLocalData()
//                 setSearchContent('')
//             }
//             }
//             if(searchTitle.status === 'success'){
//             // checkLocalData()
//             setSearchTitle(searchTitle.data)
//             handleSearchInput(false)
//             router.push('/searchresult')
//             }
//             else{
//             if(searchTitle.message === 'No Post found') {
//                 console.log('error message 2 No Title found')
//                 if(searchContent.status === 'success'){
//                 router.push('/searchresult')
//                 console.log("re-routing to serach page")
//                 handleSearchInput(false)
//                 setSearchTitle('')
//                 }
//                 else{
//                 router.push('/searchresult')
//                 console.log("re-routing to error page")
//                 handleSearchInput(false)
//                 setSearchTitle('')
//                 }
//             }
//             }
//         }
//         if(input) handleSearchFetch()
//     },[fetch])
// }

function handleClearRecent(){
    console.log('clear recent from local storage')
    localStorage.removeItem('recent')
    setRecentSearch('')
    setInput('')
  } 

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

  return (
    <div className='w-full'>

        {/* top nav */}
        <div className='w-full h-12 bg-white fixed top-0 pl-3 py-2 pr-1.5 flex items-center'>

            {/* profile */}
            <Link href={"#"} className='w-8 h-8 mr-2' >
                <span className='w-full h-full bg-[#7A1CA4] flex justify-center items-center uppercase text-base font-bold text-white rounded-[50%]'>{firstLetter}</span>
            </Link>

            {/* search bar */}
            <div ref={inputRef} className="w-[calc(100%-32px-40px)] h-full  ">
                <div 
                    // onClick={() => handleSearchInput(true)}                
                    className="w-full h-full relative">

                  <input onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                      setFetch(!fetch)
                      }
                    }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-full bg-[#EDF3F8] rounded px-10" 
                    placeholder="Search" type="text" />

                  <div className="absolute left-0 top-0 w-10 h-full pl-4 pr-2 py-2"><HiOutlineSearch className="w-full h-full" /></div>

                </div>
              </div>

            {/* messages */}
            <ol className='w-10 h-full'>
              <li onClick={handleAlert} className="w-full h-full list-none text-[#666666] hover:text-[#191919] ">
                <Link href="#" className="ml-2 w-8 h-full flex flex-col justify-center items-center ">
                  <div className="w-6 h-6"><AiFillMessage className="w-full h-full fill" /></div>
                </Link>
              </li>
            </ol>

        </div>

        {/* bottom nav */}
        <ul className='w-full h-12 pt-0.5 flex bg-white fixed bottom-0 '>
            
            {/* Home */}
            <li className="w-1/5 h-full list-none text-[#666666] hover:text-[#191919] ">
                <Link href="/feed" className="w-full h-full flex flex-col justify-center items-center ">
                    <div className="w-8 h-6"><ImHome3 className="w-full h-full fill" /></div>
                    <span className=" h-4 text-xs">Home</span>
                </Link>
            </li>

            {/* Network */}
            <li onClick={handleAlert} className="w-1/5 h-full list-none text-[#666666] hover:text-[#191919] ">
                <Link href="#" className="w-full h-full flex flex-col justify-center items-center ">
                    <div className="w-6 h-6"><BsPeopleFill className="w-full h-full fill" /></div>
                    <span className=" h-4 text-xs">My Network</span>
                </Link>
            </li>

            
            {/* Messaging */}
            <li onClick={handleAlert} className="w-1/5 h-full list-none text-[#666666] hover:text-[#191919] ">
                <Link href="#" className="w-full h-full flex flex-col justify-center items-center ">
                    <div className="w-6 h-6"><AiFillMessage className="w-full h-full fill" /></div>
                    <span className=" h-4  text-xs">Posts</span>
                </Link>
            </li>

            {/* Notification */}
            <li onClick={handleAlert} className="w-1/5 h-full list-none text-[#666666] hover:text-[#191919] ">
                <Link href="#" className="w-full h-full flex flex-col justify-center items-center ">
                    <div className="w-8 h-6"><IoMdNotifications className="w-full h-full fill " /></div>
                    <span className=" h-4  text-xs">Notification</span>
                </Link>
            </li>

            {/* Jobs */}
            <li onClick={handleAlert} className="w-1/5 h-full list-none text-[#666666] hover:text-[#191919] ">
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

// {
//     {/* Search Sugestion */}
//     {isInputSlct && (
//         <div ref={suggRef} className='absolute w-full h-fit max-h-[296px] overflow-y-auto top-9 z-40 bg-white rounded-xl pt-3 font-semibold outline outline-1 outline-[#E8E8E8] flex flex-col'>

//           {/* recent search */}
//           {recentSearch && (

//             <div className='w-full h-fit border-b border-[#E8E8E8] flex flex-col'>
//               {/*  */}
//               <div className='w-full h-6 text-sm px-4 my-1 text-[#191919] flex items-center justify-between font-semibold'>
//                 <div className='w-fit'>Recent</div>
//                 <div onClick={handleClearRecent} className='w-fit text-[#666666] cursor-pointer'>Clear all</div>
//               </div>
//               {/*  */}
//               <div className='w-full h-fit'>
//                 <ul className='w-full h-fit list-none'>

//                   {recentSearch.map( (eh, index) => {
//                     return(
//                       <li key={index} className='w-full h-11 flex items-center px-4 hover:bg-[#E8E8E8] cursor-pointer text-base'>
//                         <div className='w-6 h-full flex items-center justify-center'><IoIosTimer className='w-[20px] h-5 mr-1.5 flex justify-center items-center' /></div>
//                         <span onClick={(e) => handleSearchSuggestion(e)} className=''>{eh}</span>
//                       </li>
//                     )
//                   })}

//                 </ul>
//               </div>
//             </div>

//           )}

//           <div className='w-full h-fit flex flex-col'>

//             <div className='w-full h-6 text-sm px-4 my-1 text-[#191919] flex items-center'>
//               Try searching for :
//             </div>

//             <div className='w-full h-11 flex items-center px-4 hover:bg-[#E8E8E8] cursor-pointer text-base'>
//               <div className='w-6 h-full flex items-center justify-center'><IoIosSearch className='w-[20px] h-5 mr-1.5 flex justify-center items-center' /></div>
//               <span onClick={(e) => handleSearchSuggestion(e)} className=''>Cloud Computing</span>
//             </div>

//             <div className='w-full h-11 flex items-center px-4 hover:bg-[#E8E8E8] cursor-pointer text-base'>
//               <div className='w-6 h-full flex items-center justify-center'><IoIosSearch className='w-[20px] h-5 mr-1.5 flex justify-center items-center' /></div>
//               <span onClick={(e) => handleSearchSuggestion(e)} className=''>Python</span>
//             </div>

//             <div className='w-full h-11 flex items-center px-4 hover:bg-[#E8E8E8] cursor-pointer text-base'>
//               <div className='w-6 h-full flex items-center justify-center'><IoIosSearch className='w-[20px] h-5 mr-1.5 flex justify-center items-center' /></div>
//               <span onClick={(e) => handleSearchSuggestion(e)} className=''>Data Science</span>
//             </div>

//             <div className='w-full h-11 flex items-center px-4 hover:bg-[#E8E8E8] cursor-pointer text-base'>
//               <div className='w-6 h-full flex items-center justify-center'><IoIosSearch className='w-[20px] h-5 mr-1.5 flex justify-center items-center' /></div>
//               <span onClick={(e) => handleSearchSuggestion(e)} className=''>React</span>
//             </div>

//             <div className='w-full h-11 flex items-center px-4 hover:bg-[#E8E8E8] cursor-pointer text-base'>
//               <div className='w-6 h-full flex items-center justify-center'><IoIosSearch className='w-[20px] h-5 mr-1.5 flex justify-center items-center' /></div>
//               <span onClick={(e) => handleSearchSuggestion(e)} className=''>Machine Learning</span>
//             </div>

//           </div>

//         </div>
//       )}
// }