'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { HiOutlineSearch } from "react-icons/hi";
import { ImHome3 } from "react-icons/im";
import { IoBagHandle } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import ProfilePopUp from './ProfilePopUp';
import { useRouter, usePathname } from 'next/navigation';
import makeSearch from '../_lib/makeSearch';
import { IoIosSearch, IoIosTimer } from "react-icons/io";
import { useContextProvider } from '../ContextApi/AppContextProvider';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Learning from '@/public/learning.png';
import Talent from '@/public/talent.png';
import Advertise from '@/public/advertise.png';
import Sell from '@/public/sell.png';
import Groups from '@/public/groups.png';
import Services from '@/public/services.png';
import AlertBox from './AlertBox';
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';
import { useTheme } from 'next-themes';


const NavBar = ({popUp, setPopUp}) => {
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef();
  const searchIconsRef = useRef();
  const suggRef = useRef();
  const searchSuggRef = useRef();
  const [input, setInput] = useState('');
  const [fetch, setFetch] = useState(false);
  const [recentSearch, setRecentSearch] = useState('');
  const { handleSearchInput, isInputSlct, setSearchContent, setSearchTitle } = useContextProvider();
  const { alertDispatch } = useAlertContextProvider();
  const [windowWidth, setWindowWidth] = useState(0);
  const {theme} = useTheme()
 

  const logWindowWidth = () => {
    setWindowWidth(window?.innerWidth);
  };

  useEffect( () => {
    logWindowWidth();
    window.addEventListener('resize', logWindowWidth);

    return () => {
      window.removeEventListener('resize', logWindowWidth);
    };
  }, [windowWidth]);

  useEffect( () => {
    if(localStorage.getItem('recent')){
      setRecentSearch(JSON.parse(localStorage.getItem('recent')));
    }
  },[])

  useEffect( () => { 
    async function handleSearchFetch(){
      console.log("handleSearchInput function is called ")
      const searchContent = await makeSearch(input, "content")
      const searchTitle = await makeSearch(input, "title")
      console.log("search result of searchContent ", searchContent);
      console.log("search result of searchTitle ", searchTitle);
      if(searchContent.status === 'success'){
        checkLocalData();
        handleSearchInput(false)
        setSearchContent(searchContent.data)
      }
      else{
        if(searchContent.message === 'No Post found') {
          console.log("No Content found with given input")
          checkLocalData()
          setSearchContent('')
        }
      }
      if(searchTitle.status === 'success'){
        // checkLocalData()
        setSearchTitle(searchTitle.data)
        handleSearchInput(false)
        router.push('/searchresult')
      }
      else{
        if(searchTitle.message === 'No Post found') {
          console.log('error message 2 No Title found')
          if(searchContent.status === 'success'){
            router.push('/searchresult')
            console.log("re-routing to serach page")
            handleSearchInput(false)
            setSearchTitle('')
          }
          else{
            router.push('/searchresult')
            console.log("re-routing to error page")
            handleSearchInput(false)
            setSearchTitle('')
          }
        }
      }
    }
    if(input) handleSearchFetch()
  },[fetch])

// checking in local data
  function checkLocalData(){
    if(localStorage.getItem('recent')){
      console.log('recent searches is presnt in local storage')
      let keyWord = JSON.parse(localStorage.getItem('recent'));
      // console.log("keyWord ", keyWord)
      const isPresnt = keyWord.find( e => {
        return e === input
      } )
      if(isPresnt) {
        // console.log("isPresnt ", isPresnt)
        const newArr = keyWord.filter( e => {
          return e != isPresnt
        })
        newArr.unshift(isPresnt)
        const stringifyData = JSON.stringify(newArr)
        localStorage.setItem('recent', stringifyData)
        setRecentSearch(newArr)
        setInput('')  
      }
      else{
        if(keyWord.length === 3){
          keyWord.pop()
          keyWord.unshift(input)
        }
        else{
          keyWord.unshift(input)
        }
        const stringifyData = JSON.stringify(keyWord)
        localStorage.setItem('recent', stringifyData)
        setRecentSearch(keyWord)
        setInput('')
      }
    }
    else{
      console.log('recent searches is not presnt in local storage')
      const stringifyData = JSON.stringify([input])
      localStorage.setItem('recent', stringifyData)
      setRecentSearch([input])
      setInput('')
    }
  }

  function handleWindowClick(e){
    if(inputRef.current && !inputRef?.current?.contains(e.target)) {
      if(suggRef?.current?.contains(e.target)) return
      else{
        handleSearchInput(false)
      } 
    } 
    else if(searchIconsRef.current && !searchIconsRef?.current?.contains(e.target)) {
      if(searchSuggRef?.current?.contains(e.target)) return
      else{
        handleSearchInput(false)
      } 
    }       
  }

  useEffect( () => {
    window.addEventListener('mousedown', handleWindowClick)
    return () => window.removeEventListener('mousedown', handleWindowClick)
  },[])

  function handleSearchSuggestion(e){
    console.log(e.target.textContent)
    setInput(e.target.textContent)
    setFetch(!fetch)
  }

  function handleClearRecent(){
    console.log('clear recent from local storage')
    localStorage.removeItem('recent')
    setRecentSearch('')
    setInput('')
  } 

  function handleBusinessPopUP(){
    setPopUp(!popUp);
  }

  function handleAlert(){
    console.log("handleAlert ")
    alertDispatch({type:"showComingSoon"})
    setTimeout(()=>{
      alertDispatch({type: 'hideComingSoon'})
    }, 2500)
  }

  return (
    <header className="w-screen fixed top-0 left-0 right-[-17px] px-6 h-[3.25rem] z-20 dark:bg-[#1B1F23] bg-white
     border-b border-opacity-30 border-[#666666] outline-none shadow-sm">
      {/* main navbar */}
      <div className="w-full res-1176:w-[1128px] res-1176:mx-[calc((100%-1128px)/2)] h-full flex items-center relative">
        {/* Logo */}
        <Link href="/" className="w-[41px] h-[41px] mr-1.5 flex items-center">
          {theme === 'light' ? (
            <li-icon type="app-linkedin-bug-color-icon" class="ivm-view-attr__icon  " size="large" role="img" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" 
              fill="#0A66C2" class="mercado-match" width="42" height="42" focusable="false">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
              </svg>
            </li-icon>)
            : (
            <li-icon type="app-linkedin-bug-color-icon" class="ivm-view-attr__icon  " size="large" role="img" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" 
              fill="currentColor" class="mercado-match" width="42" height="42" focusable="false">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
              </svg>
            </li-icon>)
          }
        </Link>
        {/* Search */}
        <div className="res-1024:w-[36.76%] h-[34px]">
          {/* for screen above 1024 */}
          {windowWidth >= 1024 && (
            <div ref={inputRef} className={"hidden res-1024:block res-1024:w-full h-full transition-all ease-out duration-700 " + ( isInputSlct ? 'res-1036:w-[380px]' : 'res-1036:w-[280px]' )}>
              {/* for lg-screen */}
              <div onClick={() => handleSearchInput(true)} className="w-full h-full relative">   
                <input onKeyDown={(e) => {
                  if(e.key === 'Enter'){
                    setFetch(!fetch)}
                  }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-full dark:bg-[#38434F] dark:placeholder:text-[rgb(205,208,211)] bg-[#EDF3F8] rounded px-10" 
                  placeholder="Search" type="text" />
                <div className="absolute res-1056:left-0 top-0 dark:text-[rgb(205,208,211)] w-10 h-full pl-4 pr-2 py-2"><HiOutlineSearch className="w-full h-full" /></div>
                {/* Search Sugestion */}
                {isInputSlct && (
                  <div ref={suggRef} className='absolute w-full h-fit max-h-[296px] overflow-y-auto top-9 z-40 bg-white 
                    rounded-xl pt-3 font-semibold outline outline-1 dark:outline-none outline-[#E8E8E8] dark:bg-[rgb(27,31,35)] flex flex-col'>
                    {recentSearch && <RecentSearchCompo handleClearRecent={handleClearRecent} handleSearchSuggestion={handleSearchSuggestion} recentSearch={recentSearch} />}
                    <SearchSuggestion handleSearchSuggestion={handleSearchSuggestion} />
                  </div>
                )}
              </div>
            </div>  
          )}
          {/* for screen below 1024  */}
          <button onClick={() => handleSearchInput(true)} 
            className={'res-1024:hidden res-856:w-[35px] w-6 mx-4 h-full flex flex-col justify-center dark:hover:text-white dark:text-[#BBBCBD] text-[#666666] hover:text-[#191919] ' + (
              isInputSlct ? 'hidden' : 'block'
            )}>
            <span className='w-full h-6'><HiOutlineSearch className="w-full h-full" /></span>
            <span className='hidden res-856:block text-xs'>Search</span>
          </button>
          {/* for screen below 1024 */}
          {windowWidth < 1024 && (
            <div ref={searchIconsRef} className={"res-1024:hidden absolute left-[49px] h-[34px] transition-all ease-out duration-700 " + ( isInputSlct ? 'w-[calc(100%-50px)] block' : 'hidden' )}>
              {/* for lg-screen */}
              <div onClick={() => handleSearchInput(true)} className="w-full h-full relative">              
                <input onKeyDown={(e) => {
                  if(e.key === 'Enter'){
                    setFetch(!fetch)
                    }
                  }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-full dark:bg-[#38434F] dark:placeholder:text-[rgb(205,208,211)] bg-[#EDF3F8] rounded px-10" 
                  placeholder="Search" type="text" />
                <div className="absolute res-1056:left-0 top-0 w-10 h-full pl-4 pr-2 py-2"><HiOutlineSearch className="w-full h-full" /></div>
                {/* Search Sugestion */}
                {isInputSlct && (
                  <div ref={searchSuggRef} className='absolute w-full h-fit max-h-[296px] overflow-y-auto top-9 z-40 dark:bg-[rgb(27,31,35)]
                   bg-white rounded-xl pt-3 font-semibold outline outline-1 dark:outline-none outline-[#E8E8E8] flex flex-col'>
                    {recentSearch && <RecentSearchCompo handleClearRecent={handleClearRecent} handleSearchSuggestion={handleSearchSuggestion} recentSearch={recentSearch} />}
                    <SearchSuggestion handleSearchSuggestion={handleSearchSuggestion} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Nav Icons */}
        <nav className={"res-1024:block w-[417px] res-748:w-[577px] res-856:w-[666px] h-full " + ( isInputSlct ? 'hidden' : '' )}>
          <ul className="w-full h-full flex">
            {/* Home */}
            <li className={"w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] " 
              + ((pathname == '/feed') ? 'text-[#191919] dark:text-white' : 'text-[#666666] dark:text-[#BBBCBD] dark:hover:text-white')}>
              <Link href="/feed" className={"w-full h-full flex flex-col justify-center items-center dark:border-white border-[#191919] " + ((pathname == '/feed') ? 'border-b-2' : '' )}>
                <div className="w-6 h-6"><ImHome3 className="w-full h-full" /></div>
                <span className="hidden res-856:block h-4 text-xs">Home</span>
              </Link>
            </li>
            {/* Network */}
            <li onClick={handleAlert} className={"w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] " 
              + ((pathname == '/mynetwork') ? 'text-[#191919] dark:text-white' : 'text-[#666666] dark:text-[#BBBCBD] dark:hover:text-white')}>
              <Link href="#" className={"w-full h-full flex flex-col justify-center items-center dark:border-white border-[#191919] " + ((pathname == '/mynetwork') ? 'border-b-2' : '' )}>
                <div className="w-6 h-6"><BsPeopleFill className="w-full h-full" /></div>
                <span className="hidden res-856:block h-4 text-xs">My Network</span>
              </Link>
            </li>
            {/* Jobs */}
            <li onClick={handleAlert} className={"w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] " 
              + ((pathname == '/jobs') ? 'text-[#191919] dark:text-white' : 'text-[#666666] dark:text-[#BBBCBD] dark:hover:text-white')}>
              <Link href="#" className={"w-full h-full flex flex-col justify-center items-center dark:border-white border-[#191919] " + ((pathname == '/jobs') ? 'border-b-2' : '' )}>
                <div className="w-6 h-6"><IoBagHandle className="w-full h-full fill" /></div>
                <span className="hidden res-856:block h-4  text-xs">Jobs</span>
              </Link>
            </li>
            {/* Messaging */}
            <li onClick={handleAlert} className={"w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] " 
              + ((pathname == '/messaging') ? 'text-[#191919] dark:text-white' : 'text-[#666666] dark:text-[#BBBCBD] dark:hover:text-white')}>
              <Link href="#" className={"w-full h-full flex flex-col justify-center items-center dark:border-white border-[#191919] " + ((pathname == '/messaging') ? 'border-b-2' : '' )}>
                <div className="w-6 h-6"><AiFillMessage className="w-full h-full fill" /></div>
                <span className="hidden res-856:block h-4  text-xs">Messaging</span>
              </Link>
            </li>
            {/* Notification */}
            <li onClick={handleAlert} className={"w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] " 
              + ((pathname == '/notification') ? 'text-[#191919] dark:text-white' : 'text-[#666666] dark:text-[#BBBCBD] dark:hover:text-white')}>
              <Link href="#" className={"w-full h-full flex flex-col justify-center items-center dark:border-white border-[#191919] " + ((pathname == '/notification') ? 'border-b-2' : '' )}>
                <div className="w-8 h-6"><IoMdNotifications className="w-full h-full fill" /></div>
                <span className="hidden res-856:block h-4  text-xs">Notification</span>
              </Link>
            </li>
            {/* Profile-component */}
            <li className={"w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191916] " + ((pathname == '/path') ? 'text-[#191919] dark:text-white' : 'text-[#666666] dark:text-[#BBBCBD] dark:hover:text-white')}>
              <ProfilePopUp />
            </li>
            {/* break */}
            <div className='hidden mx-0.5 res-856:block w-[1px] dark:bg-opacity-30 dark:bg-[#666666] h-full bg-[#E8E8E8]  '></div>
            {/* For Business */}
            <li className="w-[50px] res-748:mx-3 res-856:mx-0 res-856:w-[6.625rem] border-l border-[#E8E8E8] res-856:border-none h-full">
              <button onClick={handleBusinessPopUP} 
              className='w-full h-full flex flex-col items-center justify-center dark:hover:text-white text-[#666666] dark:text-[#BBBCBD] gap-1'>
                <li-icon aria-hidden="true" type="grid" class="ivm-view-attr__icon  " size="large">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" class="mercado-match" width="24" height="24" focusable="false"
                  className='fill-[#666666] dark:fill-[#BBBCBD] dark:hover:fill-white'>
                    <path d="M3 3h4v4H3zm7 4h4V3h-4zm7-4v4h4V3zM3 14h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4zM3 21h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4z"></path>
                  </svg>
                </li-icon>
                <span className="hidden h-4 res-856:flex items-end text-xs">For Business 
                  {popUp ? (
                    <FaCaretUp className="inline w-4 h-4 ml-1" />
                  )  :  (
                    <FaCaretDown className="inline w-4 h-4 ml-1" />
                  )
                  }
                </span>
              </button> 
            </li>          
            {/* Post a Job */}
            <li onClick={handleAlert} className="w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full z-20 dark:hover:text-white text-[#666666] dark:text-[#BBBCBD]">
              <Link href={"#"} className="w-full h-full flex mt-[-2px] flex-col gap-1 justify-center items-center ">
                {/* <Image src={Post} alt='post' width={24} height={24} className="w-[22px] h-[22px]" /> */}
                <li-icon aria-hidden="true" type="nav-small-job-posting-icon" active="true" class="ivm-view-attr__icon  " size="large">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" width="24" height="24" focusable="false"
                  className='fill-[#666666] dark:fill-[#BBBCBD] dark:hover:fill-white'>
                    <circle cx="12" cy="4" r="2" opacity=".75"></circle>
                    <path d="M21 10H3a1 1 0 00-1 1v10a1 1 0 001 1h18a1 1 0 001-1V11a1 1 0 00-1-1zm-5 9H8v-2h8v2zm2-4H6v-2h12v2z"></path>
                    <g opacity=".6"><path d="M9.57 5.75l-2.41 4.83 1.68.84 2.28-4.57a3 3 0 01-1.55-1.1zM14.43 5.75a3 3 0 01-1.55 1.1l2.28 4.57 1.68-.84z" opacity=".55">
                      </path></g>    
                  </svg>
                </li-icon>
                <span className="hidden res-856:block h-4  text-xs">Post a job</span>        
              </Link> 
            </li>
          </ul>
        </nav>
      </div>             
      {/* Right Side Pop up */}
      <RightSidePopup popUp={popUp} setPopUp={setPopUp} />
      {/* AlertBox */}
      <AlertBox />    
    </header> 
  )
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SearchSuggestion({handleSearchSuggestion}){
  const suggestArr = ['Cloud Computing', 'Python', 'Data Science', 'React', 'Machine Learning'];
  return(
    <div className='w-full h-fit flex flex-col'>
      <div className='w-full h-6 text-sm px-4 my-1 text-[#191919] dark:text-[rgb(222,222,223)] flex items-center'>
        Try searching for :
      </div>
      {suggestArr.map((eh ,idx) => {
        return (
          <div key={idx} onClick={(e) => handleSearchSuggestion(e)} className='w-full h-11 flex items-center px-4
           dark:hover:bg-[rgb(78,71,75)] hover:bg-[#E8E8E8] cursor-pointer text-base'>
            <div className='w-6 h-full flex items-center justify-center'><IoIosSearch className='w-[20px] h-5 mr-1.5 flex justify-center items-center' /></div>
            <span className=''>{eh}</span>
          </div>
        )
      })}
    </div>
  )
}

function RecentSearchCompo(props){
  return (
    <div className='w-full h-fit border-b border-[#E8E8E8] flex flex-col'>
      <div className='w-full h-6 text-sm px-4 my-1 dark:text-[rgb(222,222,223)] text-[#191919] flex items-center justify-between font-semibold'>
        <div className='w-fit'>Recent</div>
        <div onClick={props.handleClearRecent} className='w-fit dark:text-[rgb(222,222,223)] text-[#666666] cursor-pointer'>Clear all</div>
      </div>
      <div className='w-full h-fit'>
        <ul className='w-full h-fit list-none'>
          {props.recentSearch.map( (eh, index) => {
            return(
              <li key={index} onClick={(e) => props.handleSearchSuggestion(e)} className='w-full h-11 flex items-center px-4 dark:text-[rgb(222,222,223)] dark:hover:bg-[rgb(78,71,75)] hover:bg-[#E8E8E8] cursor-pointer text-base'>
                <div className='w-6 h-full flex items-center justify-center'><IoIosTimer className='w-[20px] h-5 mr-1.5 flex justify-center items-center' /></div>
                <span>{eh}</span>
              </li>)
          })}
        </ul>
      </div>
    </div>
  )
}

function RightSidePopup({popUp, setPopUp}){
  return (
    <div className={'w-0 h-[calc(100vh-52px)] bg-[#666666] bg-opacity-60 absolute top-[52px] flex justify-end transition-all duration-75 right-0 ' + (popUp == true ? 'w-screen ' : '')}>
      <div className={'w-0 h-full dark:bg-[rgb(27,31,35)] bg-white rounded-lg shadow-lg transition-all duration-300 ' + (popUp == true ? 'w-[380px]' : '') }>
        {/* Heading & cross */}
        <div className='w-full h-[60px] py-4 pl-6 flex '>
          {/* heading */}
          <div className='w-[308px] h-full font-semibold text-xl dark:text-[rgb(255,255,255,0.9)] text-[#191919] '>For Business</div>
          {/* cross */}
          <div className='w-10 h-full flex items-center justify-center '>
            <button onClick={() => setPopUp(false)} className='w-10 h-10 flex items-center justify-center rounded-[50%] dark:hover:bg-[#2C2F33] hover:bg-[#EBEBEB] ' >
              <RxCross1 className='w-6 h-6 dark:text-[rgb(255,255,255,0.6)] text-[#666666]'/>
            </button>
          </div>
        </div>
        {/* More Linkeding Products div & Explore for business */}
        <div className='w-full h-full max-h-[737px] overflow-y-auto  px-6 pt-4 pb-8 flex flex-col '>
          {/* More Linkedin Products */}
          <section className='w-full h-[261px] outline outline-1 dark:outline-[rgb(255,255,255,0.6)] outline-[#E8E8E8] rounded-md'>
            {/* header */}
            <header className='w-full h-[56px] px-6 py-4 text-base text-[#191919] dark:text-[rgb(255,255,255,0.9)]
             font-semibold border-b dark:border-[rgb(255,255,255,0.6)] border-[#E8E8E8] '>Visit More LinkedIn Products</header>
            {/* Products ul div */}
            <ul className='w-full p-2 list-none h-[204px] dark:text-[rgb(255,255,255,0.6)] text-[#666666] flex grid-cols-4 gap-[6.31px] flex-wrap'>       
              <li className='w-[70px] h-fit pt-1 mb-2'>
                <Link href={"https://www.linkedin.com/learning/?trk=nav_neptune_learning&"} target='_blank'
                  className='w-full h-full flex flex-col items-center justify-between gap-1.5 '>
                  <div className='w-10 h-10'>
                    <Image src={Learning} alt='learning' width={40} height={40} className='w-full h-full rounded-sm' />
                  </div>
                  <span className='w-full h-fit text-center text-xs  '>Learning</span>
                </Link>
              </li>
              <li className='w-[70px] h-fit pt-1 mb-2'>
                <Link href={"https://www.linkedin.com/insights?trk=nav_app_launcher_insights_nept&src=li-nav&"} target='_blank'
                  className='w-full h-full flex flex-col items-center justify-between gap-1.5 '>
                  <div className='w-10 h-10'>
                    <Image src={Talent} alt='talent' width={40} height={40} className='w-full h-full rounded-sm' />
                  </div>
                  <span className='w-full h-fit text-center text-xs '>Talent Insights</span>
                </Link>
              </li>
              <li className='w-[70px] h-fit pt-1 mb-2'>
                <Link href={"https://www.linkedin.com/campaignmanager/new-advertiser"} target='_blank'
                  className='w-full h-full flex flex-col items-center justify-between gap-1.5 '>
                  <div className='w-10 h-10'>
                    <Image src={Advertise} alt='advertise' width={40} height={40} className='w-full h-full rounded-sm' />
                  </div>
                  <span className='w-full h-fit text-center text-xs '>Advertise</span>
                </Link>
              </li>
              <li className='w-[70px] h-fit pt-1 mb-2'>
                <Link href={"https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Fpremium%2Fproducts%2F%3FintentType%3DFIND_LEADS%26upsellOrderOrigin%3Dpremium_nav_more_products_panel%26utype%3Dsales%26%26lipi%3Durn%253Ali%253Apage%253Ad_flagship3_feed%253BJjEslfjQTp6EmnXPGlVO4g%253D%253D"} 
                  target='_blank'
                  className='w-full h-full flex flex-col items-center justify-between gap-1.5 '>
                  <div className='w-10 h-10'>
                    <Image src={Sell} alt='sell' width={40} height={40} className='w-full h-full rounded-sm' />
                  </div>
                  <span className='w-full h-fit text-center text-xs '>Sell</span>
                </Link>
              </li>
              <li className='w-[70px] h-fit pt-1 mb-2'>
                <Link href={"/groups"} 
                  className='w-full h-full flex flex-col items-center justify-between gap-1.5 '>
                  <div className='w-10 h-10'>
                    <Image src={Groups} alt='groups' width={40} height={40} className='w-full h-full rounded-sm' />
                  </div>
                  <span className='w-full h-fit text-center text-xs '>Groups</span>
                </Link>
              </li>
              <li className='w-[70px] h-fit pt-1 mb-2'>
                <Link href={"https://www.linkedin.com/services?trk=d_flagship3_nav&&lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3Bhh8CnATURaexyGuqeQQqOg%3D%3D"} 
                  target='_blank'
                  className='w-full h-full flex flex-col items-center justify-between gap-1.5 '>
                  <div className='w-10 h-10'>
                    <Image src={Services} alt='services' width={40} height={40} className='w-full h-full rounded-sm' />                    
                  </div>
                  <span className='w-full h-fit text-center text-xs '>Services Marketplace</span>
                </Link>
              </li>
            </ul>
          </section>
          {/* Explore more for business */}
          <section className='w-full min-h-[328px] mb-14 outline dark:outline-[rgb(255,255,255,0.6)] outline-1 outline-[#E8E8E8] rounded-md'>
            {/* header */}
            <header className='w-full h-[56px] px-6 py-4 text-base text-[#191919] dark:text-[rgb(255,255,255,0.9)] font-semibold dark:border-[rgb(255,255,255,0.6)] border-b border-[#E8E8E8] '>Explore more for business</header>
            {/* conatiner of ul */}
            <div className='w-full h-[272px] px-6 flex flex-col '>
              <ul className='w-full h-full list-none pb-2 dark:text-[rgb(255,255,255,0.9)]'>
                <li className='w-full h-11'>
                  <Link href={"https://www.linkedin.com/uas/login-cap?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Ftalent%2Fpost-a-job%3Flipi%3Durn%253Ali%253Apage%253Ad_flagship3_feed%253Bhh8CnATURaexyGuqeQQqOg%253D%253D%26src%3Dli-nav%26trk%3Dnav_nine_dot_biz_serv&source_app=tsweb&trk=tsweb_signin"} 
                    target='_blank'
                    className='hover:underline flex flex-col py-1'>
                      <h1 className='w-full h-5 text-sm font-semibold'>Hire on Linkedin</h1>
                      <span className='w-full h-4 text-xs dark:text-[rgb(255,255,255,0.6)] text-[#666666]'>Find, attract and recruit talent</span>
                  </Link>
                </li>
                <li className='w-full h-11'>
                  <Link href={"https://business.linkedin.com/sales-solutions?trk=flagship_nav&veh=li-header-dropdown-lss-control&src=li-nav"} 
                    target='_blank'
                    className='hover:underline flex flex-col py-1'>
                      <h1 className='w-full h-5 text-sm font-semibold'>Sell with LinkedIn</h1>
                      <span className='w-full h-4 text-xs dark:text-[rgb(255,255,255,0.6)] text-[#666666]'>Build relationships with buyers</span>
                  </Link>
                </li>
                <li className='w-full h-11'>
                  <Link href={"https://www.linkedin.com/uas/login-cap?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Ftalent%2Fjob-posting-redirect%2F%3Ftrk%3Dnav_biz_serv_job_post_nept%26lipi%3Durn%253Ali%253Apage%253Ad_flagship3_feed%253Bhh8CnATURaexyGuqeQQqOg%253D%253D&source_app=tsweb&trk=tsweb_signin"} 
                    target='_blank'
                    className='hover:underline flex flex-col py-1'>
                      <h1 className='w-full h-5 text-sm font-semibold'>Post a job for free</h1>
                      <span className='w-full h-4 text-xs dark:text-[rgb(255,255,255,0.6)] text-[#666666]'>Find quality candidates</span>
                  </Link>
                </li>
                <li className='w-full h-11'>
                  <Link href={"https://business.linkedin.com/marketing-solutions/ads?trk=n_nav_ads_rr_b&src=li-nav"} 
                    target='_blank'
                    className='hover:underline flex flex-col py-1'>
                      <h1 className='w-full h-5 text-sm font-semibold'>Advertise on LinkedIn</h1>
                      <span className='w-full h-4 text-xs dark:text-[rgb(255,255,255,0.6)] text-[#666666]'>Acquire customers and grow your business</span>
                  </Link>
                </li>
                <li className='w-full h-11'>
                  <Link href={"https://learning.linkedin.com/?trk=d_flagship3_nav&veh=learning_solutions&src=li-nav"} 
                    target='_blank'
                    className='hover:underline flex flex-col py-1'>
                      <h1 className='w-full h-5 text-sm font-semibold'>Learn with LinkedIn</h1>
                      <span className='w-full h-4 text-xs dark:text-[rgb(255,255,255,0.6)] text-[#666666]'>Courses to develop your employees</span>
                  </Link>
                </li>
                <li className='w-full h-11'>
                  <Link href={"https://business.linkedin.com/talent-solutions/customer/admin-center"} 
                    target='_blank'
                    className='hover:underline flex flex-col py-1'>
                      <h1 className='w-full h-5 text-sm font-semibold'>Admin Center</h1>
                      <span className='w-full h-4 text-xs dark:text-[rgb(255,255,255,0.6)] text-[#666666]'>Manage billing and account details</span>
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default NavBar