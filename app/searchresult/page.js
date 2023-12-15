'use client'
import React, { useLayoutEffect } from 'react'
import notFound from '@/public/notfound.png'
import Image from 'next/image';
import Footer from '../_components/Footer';
import AsidePremium from '../_components/AsidePremium';
import { useContextProvider } from '../ContextApi/AppContextProvider';
import PostTopBar from '../_components/PostTopBar';
import PostContent from '../_components/PostContent';
import CommentReaction from '../_components/CommentReaction';
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';
import AlertBox from '../_components/AlertBox';
import { useRouter } from 'next/navigation';




const searchResult = () => {
    const { handleSearchInput, isInputSlct, searchContent, searchTitle } = useContextProvider()
    const { alertDispatch } = useAlertContextProvider()
    const router = useRouter();

    useLayoutEffect( () => {
        if(!decodeURIComponent(document.cookie)){
            console.log("You are not logged in, re-routing to login page")
            router.replace('/')
        }
      },[])

    function handleAlert(){
        alertDispatch({type:"showComingSoon"})
        setTimeout(()=>{
            alertDispatch({type: 'hideComingSoon'})
        }, 2500)
    }

  return (
    <div className='w-full bg-[#F4F2EE] pt-[3.25rem] z-10 relative h-fit'>

        <div className='w-[calc(100vw-17px)] h-full'>

            {/*  */}
            <section className='w-full h-[56px] py-3 fixed top-[52px] bg-white shadow-md shadow-[#A7A6A3]'>
                {/* responsiveness */}
                <div className='w-[576px] mx-[calc((100%-576px)/2)] res-768:w-[720px] res-768:mx-[calc((100%-720px)/2)] res-992:w-[960px] res-992:mx-[calc((100%-992px)/2)] res-1200:w-[1128px] res-1200:mx-[calc((100%-1128px)/2)] h-full'>
                    <nav className='w-full h-full flex'>
                        {/*  */}
                        <ul className='w-fit h-full list-none flex'>

                            <li onClick={handleAlert} className='w-fit h-8 rounded-3xl outline outline-1 hover:outline-2 outline-[#B2B2B2] 
                                flex items-center justify-center font-semibold text-base text-[#404040] hover:bg-[#E8E8E8] mr-2 px-3 py-1'>
                                Posts
                            </li>

                            <li onClick={handleAlert} className='w-fit h-8 rounded-3xl outline outline-1 hover:outline-2 outline-[#B2B2B2] 
                                flex items-center justify-center font-semibold text-base text-[#404040] hover:bg-[#E8E8E8] mr-2 px-3 py-1'>
                                Groups
                            </li>

                            <li onClick={handleAlert} className='w-fit h-8 rounded-3xl outline outline-1 hover:outline-2 outline-[#B2B2B2] 
                                flex items-center justify-center font-semibold text-base text-[#404040] hover:bg-[#E8E8E8] mr-2 px-3 py-1'>
                                Products
                            </li>

                            <li onClick={handleAlert} className='w-fit h-8 rounded-3xl outline outline-1 hover:outline-2 outline-[#B2B2B2] 
                                flex items-center justify-center font-semibold text-base text-[#404040] hover:bg-[#E8E8E8] mr-2 px-3 py-1'>
                                Events
                            </li>

                            <li onClick={handleAlert} className='w-fit h-8 rounded-3xl outline outline-1 hover:outline-2 outline-[#B2B2B2] 
                                flex items-center justify-center font-semibold text-base text-[#404040] hover:bg-[#E8E8E8] mr-2 px-3 py-1'>
                                Companies
                            </li>

                            <li onClick={handleAlert} className='hidden res-768:flex w-fit h-8 rounded-3xl outline outline-1 hover:outline-2 outline-[#B2B2B2] 
                                 items-center justify-center font-semibold text-base text-[#404040] hover:bg-[#E8E8E8] mr-2 px-3 py-1'>
                                People
                            </li>

                            <li onClick={handleAlert} className='hidden res-768:flex w-fit h-8 rounded-3xl outline outline-1 hover:outline-2 outline-[#B2B2B2] 
                                 items-center justify-center font-semibold text-base text-[#404040] hover:bg-[#E8E8E8] mr-2 px-3 py-1'>
                                Jobs
                            </li>

                            <li onClick={handleAlert} className='hidden res-992:flex w-fit h-8 rounded-3xl outline outline-1 hover:outline-2 outline-[#B2B2B2] 
                                 items-center justify-center font-semibold text-base text-[#404040] hover:bg-[#E8E8E8] mr-2 px-3 py-1'>
                                School
                            </li>

                            <li onClick={handleAlert} className='hidden res-992:flex w-fit h-8 rounded-3xl outline outline-1 hover:outline-2 outline-[#B2B2B2] 
                                 items-center justify-center font-semibold text-base text-[#404040] hover:bg-[#E8E8E8] mr-2 px-3 py-1'>
                                Courses
                            </li>

                            <li onClick={handleAlert} className='hidden res-1200:flex w-fit h-8 rounded-3xl outline outline-1 hover:outline-2 outline-[#B2B2B2] 
                                 items-center justify-center font-semibold text-base text-[#404040] hover:bg-[#E8E8E8] mr-2 px-3 py-1'>
                                Services
                            </li>

                        </ul>
                        {/*  */}
                        <div className='w-fit h-full flex'>
                            <span className='w-0 h-full mr-2 border-l border-[#B2B2B2]'></span>
                            <button onClick={handleAlert} className='w-fit h-8 rounded-3xl outline outline-1 hover:outline-2 outline-[#B2B2B2] 
                                flex items-center justify-center font-semibold text-base text-[#404040] hover:bg-[#E8E8E8] px-2 res-992:px-3 py-1'>
                                All filters
                            </button>

                        </div>
                    </nav>
                </div>
            </section>

            {/* result container */}
            <div className='res-768:w-[720px] res-768:mx-[calc((100%-720px)/2)] res-992:w-[960px] res-992:mx-[calc((100%-960px)/2)] res-1200:w-[1128px]
                 res-1200:mx-[calc((100%-1128px)/2)] h-fit mt-20 flex flex-col'>

                    {/* result container */}  
                    { (searchContent || searchTitle) &&(
                        searchContent ? <ResultContainer searchData={searchContent} /> 
                        : <ResultContainer searchData={searchTitle} />)
                    }
                    

                    {/* No result container */}
                    {!searchContent && !searchTitle &&  <NoResultContainer handleSearchInput={handleSearchInput} />}

                    {/* footer conatiner */}
                    <Footer />

            </div>

        </div>

        {/* Alert box */}
        <AlertBox />

    </div>
  )
}

function ResultContainer({searchData}){

    return (
        <>
            <div className='w-full h-full flex flex-col items-center mb-6 res-768:flex-row res-768:flex-wrap res-768:justify-between res-768:items-start'>

                {/* left aside */}
                <div className='hidden res-768:block res-768:w-[225px] h-fit bg-white rounded-md shadow-lg outline outline-1 outline-[#E8E8E8] '>
                    <section className='w-full h-fit pt-4 pb-2 flex flex-col'>
                        <h2 className='w-full h-4 px-4 pb-2 text-xs text-[#666666]'>On this page</h2>
                        <ul className='w-full h-fit list-none'>
                            <li className='w-full h-8 text-sm px-4 flex items-center hover:bg-[#E8E8E8]'>Post</li>
                            <li className='w-full h-8 text-sm px-4 flex items-center hover:bg-[#E8E8E8]'>Content</li>
                        </ul>
                    </section>
                </div>

                {/* main */}
                <main className='w-[576px] res-768:w-[471px] res-992:w-[387px] rounded-lg overflow-hidden res-1200:w-[555px] h-fit mb-8 flex flex-col '>

                    {/* heading */}
                    <div className='w-full h-[45px] pt-4 pb-1 pl-4 pr-3 bg-white rounded-t-lg]'>
                        <div className='w-full h-full flex items-center text-xl font-semibold text-[#191919]'>Posts</div>
                    </div>

                    {/*  */}
                    <ul className='w-full h-fit pl-4 list-none flex flex-wrap bg-white'>
                        <li className='w-fit h-11'>
                            <div className='w-[calc(100%-8px)] h-[calc(100%-12px)] pl-3 pr-3 mr-2 pt-1 mt-2 pb-1 mb-1 flex items-center justify-center font-semibold text-base text-[#666666]
                             hover:bg-[#E8E8E8] rounded-3xl outline outline-1 hover:outline-2 outline-[#434343]'>Past 24 hours</div>
                        </li>
                        <li className='w-fit h-11'>
                            <div className='w-[calc(100%-8px)] h-[calc(100%-12px)] pl-3 pr-3 mr-2 pt-1 mt-2 pb-1 mb-1 flex items-center justify-center font-semibold text-base text-[#666666]
                             hover:bg-[#E8E8E8] rounded-3xl outline outline-1 hover:outline-2 outline-[#434343]'>Past week</div>
                        </li>
                    </ul>

                    {searchData && searchData.map( (each, index) => {
                        return (
                            <div key={index} className='w-full bg-white rounded-b-lg mb-3'>
                                <div className='w-full'>
                                    <div className='w-full mb-3'>

                                        {/* post-top-bar */}
                                        <PostTopBar each={each} />
                                        
                                        {/* post-Content */}
                                        <PostContent content={each?.content} title={each?.title}/>

                                        {/* Content- Pic or Video */}
                                        <div className='w-full h-fit mt-2 bg-slate-300'>
                                            <div className='w-full h-full'>
                                                {/* Image Component */}
                                                <Image src={each.channel?.image} width={555} height={300} className='w-full' priority alt='pic' />
                                            </div>
                                        </div>

                                        {/* Like, Comment and Post */}
                                        <div className='w-full  flex flex-col'>
                                            <CommentReaction each={each} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </main>

                {/* aside */}
                <aside className='w-[576px] ml-0 res-768:w-[471px] res-768:ml-[249px] res-992:ml-0 res-992:w-[18.75rem] h-fit bg-white rounded-md shadow-lg outline outline-1 outline-[#E8E8E8]'>
                    <AsidePremium />
                </aside>

            </div>
        </>
    )
}

function NoResultContainer({handleSearchInput}){

    return (
        <div className='w-full h-full flex flex-col items-center mb-6 res-768:flex-row res-768:justify-between res-768:items-start'>

            <main className='w-[576px] res-768:w-[396px] res-992:w-[636px] res-1200:w-[50.25rem] mb-3 res-768:mb-0 h-fit flex 
                flex-col bg-white rounded-md shadow-lg outline outline-1 outline-[#E8E8E8]'>
                <div className='w-full h-full'>
                    {/* h1 hidden */}
                    {/* conatiner */}
                    <div className='w-full h-[360px]'>
                        <section className='w-full h-full flex flex-col items-center '>

                            <div className='w-[290px] h-[248px] flex flex-col'>
                                {/* bg image */}
                                <div className='w-full h-[160px] flex justify-center items-center'>
                                    <Image src={notFound} alt='bg-pic' height={160} width={160} className='w-[160px] h-full' />
                                </div>
                                <div className='w-full h-8 mb-2 test-[#191919] font-semibold text-2xl text-center'>No results found</div>
                                <p className='w-full h-6 mt-2 mb-6 text-sm text-[#666666] text-center'>try shortening or rephrasing your search.</p>
                            </div>
                            
                            <button onClick={() => handleSearchInput(true)} className='w-fit h-8 rounded-3xl outline outline-1 hover:outline-2 outline-[#434343] 
                                flex items-center justify-center font-semibold text-base text-[#666666] hover:bg-[#E8E8E8] px-4 py-1.5'>
                                Edit search
                            </button>

                        </section>
                    </div>
                </div>
            </main>

            
            {/* aside */}
            <aside className='w-[576px] res-768:w-[18.75rem] h-fit bg-white rounded-md shadow-lg outline outline-1 outline-[#E8E8E8]'>
                <AsidePremium />
            </aside>

        </div>

    )
}

export default searchResult