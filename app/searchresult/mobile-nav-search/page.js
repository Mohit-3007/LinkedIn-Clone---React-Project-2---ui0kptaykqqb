'use client'
import { useContextProvider } from "@/app/ContextApi/AppContextProvider";
import makeSearch from "@/app/_lib/makeSearch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from 'react'
import { IoIosArrowRoundBack, IoIosTimer } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";




const page = () => {
  const [input, setInput] = useState('')
  const router = useRouter();
  const [recentSearch, setRecentSearch] = useState('')
  const [fetch, setFetch] = useState(false);
  const { handleSearchInput, isInputSlct, setSearchContent, setSearchTitle } = useContextProvider()

  const logWindowWidth = () => {
    if(window?.innerWidth > 620 ){
      console.log("go back to large screen mode")
      router.push('/feed')
    }
  };
  useEffect(() => {
    logWindowWidth();
    window.addEventListener('resize', logWindowWidth);
    return () => {
      window.removeEventListener('resize', logWindowWidth);
    };
  }, []); 

  // initially checking local storage on rendering
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
        router.push('/searchresult')
      }
      else{
        if(searchTitle.message === 'No Post found') {
          console.log('error message 2 No Title found')
          if(searchContent.status === 'success'){
            router.push('/searchresult')
            console.log("re-routing to serach page")
            setSearchTitle('')
          }
          else{
            router.push('/searchresult')
            console.log("re-routing to error page")
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

  function handleSearchSuggestion(e){
    console.log("e?.target.textContent ",e?.target.textContent)
    setInput(e?.target.textContent)
    setFetch(!fetch)
    console.log("Start recent search fetching");
  }

  function handleClearRecent(){
    console.log('clear recent from local storage')
    localStorage.removeItem('recent')
    setRecentSearch('')
    setInput('')
  } 


  return (
    <div className='w-full h-screen z-20 bg-white'>

        {/* nav  search*/}
        <nav className='w-full h-12 flex items-center  '>
            <button onClick={()=> router.back()} className='w-12 h-12 pl-4 flex items-center justify-center'>
                <IoIosArrowRoundBack className='w-6 h-6 text-[#666666]' />
            </button>

            <input onKeyDown={(e) => {
              if(e.key === 'Enter'){
                setFetch(!fetch)
                console.log('start fetching')
                }
              }}
              value = {input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Search' 
              className='w-[calc(100%-48px-48px)] h-6 focus:outline outline-2 outline-[#101010] placeholder:text-[#666666]
              placeholder:text-base rounded-sm pl-6 pr-2 text-base font-semibold' 
            />

            {input &&  input.length >0 && (
              <button onClick={() => setInput('')} className='w-12 h-12 flex items-center justify-center'>
                  <RxCross1 className='w-6 h-6 text-[#666666]' />
              </button>
            )}
        </nav>
        
        {/* recent search container */}
        <div className="w-full h-[100vh-48px]">

          <div className="w-full h-fit">

            {/* recent search */}
            {recentSearch && (
              <div className='w-full h-fit border-b border-[#E8E8E8] flex flex-col'>

                {/*  */}
                <div className="w-full h-[42px] pt-2 flex items-center">
                  <div className="w-[calc(100%-66px)] h-full flex items-center">
                    <h1 className="w-full px-4 h-4 text-sm font-semibold text-[#191919]">Recent searches</h1>
                  </div>
                  <div onClick={handleClearRecent} className="w-[66px] h-full py-2 px-4 text-sm cursor-pointer text-[#0A6FCD]">Clear</div>
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

          </div>

        </div>


    </div>
  )
}

export default page