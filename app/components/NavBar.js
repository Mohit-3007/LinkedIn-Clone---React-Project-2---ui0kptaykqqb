'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from "next/link";
import { GrLinkedin } from "react-icons/gr";
import { HiOutlineSearch } from "react-icons/hi";
import { ImHome3 } from "react-icons/im";
import { IoBagHandle } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import ProfilePopUp from './ProfilePopUp';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import makeSearch from '../lib/makeSearch';
import { IoIosSearch, IoIosTimer } from "react-icons/io";
import { useContextProvider } from '../ContextApi/AppContextProvider';





const NavBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const inputRef = useRef()
  const suggRef = useRef()
  const [input, setInput] = useState('')
  const [fetch, setFetch] = useState(false);
  const [recentSearch, setRecentSearch] = useState('')
  const { handleSearchInput, isInputSlct } = useContextProvider()

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
      }
      else{
        if(searchContent.message === 'No Post found') {
          console.log("No Content found with given input")
          checkLocalData()
        }
      }
  
      if(searchTitle.status === 'success'){
        checkLocalData()
      }
      else{
        if(searchTitle.message === 'No Post found') {
          console.log('error message 2 No Title found')
          if(searchContent.message === 'No Post found'){
            console.log("re-routing")
            router.push('searchresult')
          }
        }
      }

    }

    if(input) handleSearchFetch()

  },[fetch])

// checking in local data
  function checkLocalData(){
    if(localStorage.getItem('recent')){
      console.log('local storage of recent search is present')
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
      console.log('local storage of recent search is not present')
      const stringifyData = JSON.stringify([input])
      localStorage.setItem('recent', stringifyData)
      setRecentSearch([input])
      setInput('')
    }
  }

  function handleWindowClick(e){
    if(inputRef.current && !inputRef?.current?.contains(e.target)) {
      if(suggRef.current && suggRef?.current?.contains(e.target)) return
      handleSearchInput(false)
    }   
  }
  useEffect( () => {
    window.addEventListener('mousedown', handleWindowClick)
    return () => window.removeEventListener('mousedown', handleWindowClick)
  },[])

  function handleSearchSuggestion(e){
    console.log(e?.target.textContent)
    setInput(e?.target.textContent)
    setFetch(!fetch)
  }

  function handleClearRecent(){
    console.log('clear recent from local storage')
    localStorage.removeItem('recent')
    setRecentSearch('')
    setInput('')
  }

  return (
    <header className="w-screen fixed top-0 left-0 right-[-17px] px-6 h-[3.25rem] z-20 bg-white border-b border-opacity-30 border-[#666666] outline-none shadow-sm">
       
        <div className="w-full res-1176:w-[1128px] res-1176:mx-[calc((100%-1128px)/2)] h-full flex items-center">

          {/* Logo */}
          <Link href="/" className="w-[41px] h-[41px] mr-1.5 flex items-center"><GrLinkedin className="w-9 h-9 text-[#0A66C2] rounded" /></Link>

          {/* Search */}
          <div className="res-1024:w-[36.76%] h-[34px]">

            {/* for screen above 1024 */}
            <div ref={inputRef} className={"hidden res-1024:block res-1024:w-full h-full transition-all ease-out duration-700 " + ( isInputSlct ? 'res-1036:w-[380px]' : 'res-1036:w-[280px]' )}>
              {/* for lg-screen */}
              <div onClick={() => handleSearchInput(true)} className="w-full h-full relative">
                
                <input onKeyDown={(e) => {
                  if(e.key === 'Enter'){
                    setFetch(!fetch)
                    }
                  }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-full bg-[#EDF3F8] rounded px-10" 
                  placeholder="Search" type="text" />

                <div className="absolute res-1056:left-0 top-0 w-10 h-full pl-4 pr-2 py-2"><HiOutlineSearch className="w-full h-full" /></div>

                {/* Search Sugestion */}
                {isInputSlct && (
                  <div ref={suggRef} className='absolute w-full h-fit max-h-[296px] overflow-y-auto top-9 z-40 bg-white rounded-xl pt-3 font-semibold outline outline-1 outline-[#E8E8E8] flex flex-col'>

                    {/* recent search */}
                    {recentSearch && (

                      <div className='w-full h-fit border-b border-[#E8E8E8] flex flex-col'>
                        {/*  */}
                        <div className='w-full h-6 text-sm px-4 my-1 text-[#191919] flex items-center justify-between font-semibold'>
                          <div className='w-fit'>Recent</div>
                          <div onClick={handleClearRecent} className='w-fit text-[#666666] cursor-pointer'>Clear all</div>
                        </div>
                        {/*  */}
                        <div className='w-full h-fit'>
                          <ul className='w-full h-fit list-none'>

                            {recentSearch.map( (eh, index) => {
                              return(
                                <li key={index} className='w-full h-11 flex items-center px-4 hover:bg-[#E8E8E8] cursor-pointer text-base'>
                                  <div className='w-6 h-full flex items-center justify-center'><IoIosTimer className='w-[20px] h-5 mr-1.5 flex justify-center items-center' /></div>
                                  <span onClick={(e) => handleSearchSuggestion(e)} className=''>{eh}</span>
                                </li>
                              )
                            })}

                          </ul>
                        </div>
                      </div>

                    )}

                    <div className='w-full h-fit flex flex-col'>

                      <div className='w-full h-6 text-sm px-4 my-1 text-[#191919] flex items-center'>
                        Try searching for :
                      </div>

                      <div className='w-full h-11 flex items-center px-4 hover:bg-[#E8E8E8] cursor-pointer text-base'>
                        <div className='w-6 h-full flex items-center justify-center'><IoIosSearch className='w-[20px] h-5 mr-1.5 flex justify-center items-center' /></div>
                        <span onClick={(e) => handleSearchSuggestion(e)} className=''>Cloud Computing</span>
                      </div>

                      <div className='w-full h-11 flex items-center px-4 hover:bg-[#E8E8E8] cursor-pointer text-base'>
                        <div className='w-6 h-full flex items-center justify-center'><IoIosSearch className='w-[20px] h-5 mr-1.5 flex justify-center items-center' /></div>
                        <span onClick={(e) => handleSearchSuggestion(e)} className=''>Python</span>
                      </div>

                      <div className='w-full h-11 flex items-center px-4 hover:bg-[#E8E8E8] cursor-pointer text-base'>
                        <div className='w-6 h-full flex items-center justify-center'><IoIosSearch className='w-[20px] h-5 mr-1.5 flex justify-center items-center' /></div>
                        <span onClick={(e) => handleSearchSuggestion(e)} className=''>Data Science</span>
                      </div>

                      <div className='w-full h-11 flex items-center px-4 hover:bg-[#E8E8E8] cursor-pointer text-base'>
                        <div className='w-6 h-full flex items-center justify-center'><IoIosSearch className='w-[20px] h-5 mr-1.5 flex justify-center items-center' /></div>
                        <span onClick={(e) => handleSearchSuggestion(e)} className=''>React</span>
                      </div>

                    </div>

                  </div>
                )}

              </div>
            </div>

            {/* for screen below 1024  */}
            <button className='res-1024:hidden res-856:w-[35px] w-6 mx-4 h-full flex flex-col justify-center text-[#666666] hover:text-[#191919]'>
              <span className='w-full h-6'><HiOutlineSearch className="w-full h-full" /></span>
              <span className='hidden res-856:block text-xs'>Search</span>
            </button>


          </div>

          {/* Nav Icons */}
          {/* min 856px___w-686px--?? */}
          <nav className="w-[417px] res-748:w-[577px] res-856:w-[666px] h-full dark:bg-black">
            <ul className="w-full h-full flex">

              {/* Home */}
              <li className={"w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] " 
                + ((pathname == '/feed') ? 'text-[#191919]' : 'text-[#666666]')}>
                <Link href="/feed" className={"w-full h-full flex flex-col justify-center items-center border-[#191919] " + ((pathname == '/feed') ? 'border-b-2' : '' )}>
                  <div className="w-6 h-6"><ImHome3 className="w-full h-full" /></div>
                  <span className="hidden res-856:block h-4 text-xs">Home</span>
                </Link>
              </li>

              {/* Network */}
              <li className={"w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] " 
                + ((pathname == '/mynetwork') ? 'text-[#191919]' : 'text-[#666666]')}>
                <Link href="/mynetwork" className={"w-full h-full flex flex-col justify-center items-center border-[#191919] " + ((pathname == '/mynetwork') ? 'border-b-2' : '' )}>
                  <div className="w-6 h-6"><BsPeopleFill className="w-full h-full" /></div>
                  <span className="hidden res-856:block h-4 text-xs">My Network</span>
                </Link>
              </li>

              {/* Jobs */}
              <li className={"w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] " 
                + ((pathname == '/jobs') ? 'text-[#191919]' : 'text-[#666666]')}>
                <Link href="/jobs" className={"w-full h-full flex flex-col justify-center items-center border-[#191919] " + ((pathname == '/jobs') ? 'border-b-2' : '' )}>
                  <div className="w-6 h-6"><IoBagHandle className="w-full h-full fill" /></div>
                  <span className="hidden res-856:block h-4  text-xs">Jobs</span>
                </Link>
              </li>

              {/* Messaging */}
              <li className={"w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] " 
                + ((pathname == '/messaging') ? 'text-[#191919]' : 'text-[#666666]')}>
                <Link href="/messaging" className={"w-full h-full flex flex-col justify-center items-center border-[#191919] " + ((pathname == '/messaging') ? 'border-b-2' : '' )}>
                  <div className="w-6 h-6"><AiFillMessage className="w-full h-full fill" /></div>
                  <span className="hidden res-856:block h-4  text-xs">Messaging</span>
                </Link>
              </li>

              {/* Notification */}
              <li className={"w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191919] " 
                + ((pathname == '/notification') ? 'text-[#191919]' : 'text-[#666666]')}>
                <Link href="/notification" className={"w-full h-full flex flex-col justify-center items-center border-[#191919] " + ((pathname == '/notification') ? 'border-b-2' : '' )}>
                  <div className="w-8 h-6"><IoMdNotifications className="w-full h-full fill" /></div>
                  <span className="hidden res-856:block h-4  text-xs">Notification</span>
                </Link>
              </li>

              {/* Profile-component */}
              <li className={"w-12 mx-0.5 res-748:mx-3 res-856:w-20 res-856:mx-0 h-full list-none hover:text-[#191916] border-r border-opacity-30 border-[#666666] " + ((pathname == '/path') ? 'text-[#191919]' : 'text-[#666666]')}>
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