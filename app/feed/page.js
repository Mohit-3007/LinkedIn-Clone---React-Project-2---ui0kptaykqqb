'use client'
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Media from '../../public/media.png'
import Event from '../../public/event.png'
import Article from '../../public/article.png'
import getPosts from '../lib/getPosts';
import FeedPosts from '../components/FeedPosts';
import { usePathname } from 'next/navigation';
import AddingPost from '../components/AddingPost';
import { useContextProvider } from '../ContextApi/AppContextProvider';
import LeftTopBar from '../components/LeftTopBar';
import LeftBottomBar from '../components/LeftBottomBar';
import AsidePremium from '../components/AsidePremium';






const Feed =  () => {
  const pathName = usePathname();
  const [fetchData, setFetchData] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPostComment, setShowPostComment] = useState(false);
  const postCommentRef = useRef();
  const { userName } = useContextProvider();

  // useEffect(()=> {
  //   async function fetchPost(){
  //     const data = await getPosts({limit:10, page:1})
  //     const res = data.data;
  //     console.log("RESULT  " ,res);
  //     setFetchData(res);   
  //   }
  //   fetchPost()
  // }, [pathName])

  function handleLoading() {
    console.log("Start loading");
    setLoading(true);

    setTimeout(() => {
      console.log("Stop loading");
      setLoading(false);
      setShowPostComment(true)
    }, 1250); 
  }

  function handleWindowClick(e){

    if(showPostComment){
      if(!postCommentRef?.current?.contains(e.target)){
        setShowPostComment(false)
      }
    } 
  }

  useEffect(() => {
      document.addEventListener('mousedown', handleWindowClick);
      return () => {
          document.removeEventListener('mousedown', handleWindowClick)
      }
  },[showPostComment])

// getting the first leter of UserName
  const name = userName;
  const firstLetter = name.charAt(0);


  return (
    <div className="w-[calc(100vw-17px)] bg-[#F4F2EE] pt-[3.25rem] relative">

      <div className="w-full h-full">
        <div className="w-full h-full">
          <div className="w-[1128px] h-full mx-[calc((100%-1128px)/2)]">

            <div className="w-full h-full my-6 flex justify-between">

              {/* Left-Bar */}
              <div className="w-[14.0625rem] h-full">
                <div className="w-wull h-[43.5625rem] ">

                  {/* left-top */}
                  <div className="w-full h-fit bg-white mb-2 outline outline-1 outline-[#E8E8E8] shadow-lg overflow-hidden rounded-xl flex flex-col">
                    <LeftTopBar />
                  </div>

                  {/* right-top */}
                  <div className="w-full h-fit bg-white outline outline-1 outline-[#E8E8E8] shadow-lg overflow-hidden rounded-xl">
                    <LeftBottomBar />
                  </div>
                    
                </div>
              </div>

              {/* Center-Bar */}
              <div className="w-[34.6875rem] h-full">

                {/* center-top */}
                <div className="w-full h-[7.25rem] bg-white rounded-xl mb-2 relative">

                  <div className="w-full h-fit flex flex-col">

                    {/* profile pic & post input div */}
                    <div className="mx-4 mt-2 w-[32.6875rem] h-14 flex">

                      {/* profiile pic */}
                      <Link href={"#"} className="w-14 h-12">
                        <div className="w-12 h-12 mr-2">
                          {/* Profile Pic */}
                          <span className='w-full h-full bg-[#7A1CA4] flex justify-center items-center uppercase text-2xl font-bold text-white rounded-[50%]'>{firstLetter}</span>
                        </div>
                      </Link>

                      <button onClick={handleLoading} className="w-[29.1875rem] h-12 mt-1 py-2.5 pl-4 pr-2 border flex items-center rounded-[35px] hover:bg-[#EDEDED]">
                        <span className="w-fit h-[1.3125rem] text-sm text-[#868686] overflow-hidden">
                          Start a post
                        </span>
                      </button>

                    </div>

                    {/* Icons */}
                    <div className="w-full h-[52px] mb-1 flex justify-around">
                      {/* Media */}
                      <button className="w-[98px] px-2 h-12 flex items-center hover:bg-[#EBEBEB] justify-start">
                        {/* png */}
                        <Image
                          src={Media}
                          alt="Picture of the user"
                          width="0"
                          height="0"
                          sizes="100vw"
                          className="w-full h-auto"
                        />       
                        <span className="ml-2 h-7 text-sm text-[#868686] flex items-center">
                          Media
                        </span>
                      </button>
                      {/* Event */}
                      <button className="w-[93px] px-2 h-12 flex items-center hover:bg-[#EBEBEB]">
                        {/* png */}
                        <Image
                          src={Event}
                          alt="Picture of the user"
                          width="0"
                          height="0"
                          sizes="100vw"
                          className="w-full h-auto"
                        />
                        <span className="ml-2 h-7 text-sm text-[#868686] flex items-center">
                          Event
                        </span>
                      </button>
                      {/* Write article */}
                      <button className="w-[136px] px-2 h-12 flex items-center hover:bg-[#EBEBEB]">
                        {/* png */}
                        <Image
                          src={Article}
                          alt="Picture of the user"
                          width="0"
                          height="0"
                          sizes="100vw"
                          className="w-full h-auto"
                        />
                        <span className="ml-2 w-[calc(100%-40px)]  h-7 text-sm text-[#868686] flex items-center">
                          Write article
                        </span>
                      </button>
                    </div>

                  </div>

                  {/* for loading */}
                  {loading && (
                    <div className='absolute w-full h-[400px] rounded-xl bg-white left-10 -top-11 z-40 shadow-lg flex justify-center items-center '>
                      {/* loader class */}  
                      <div className="spinner"></div>
                    </div>
                  )}

                </div>

                {/* center-break */}
                <div className="w-full h-4 mb-2">
                  <button className="w-full h-full flex items-center">
                    <div className="w-full h-[1px] bg-[#BFBDBA]"></div>
                  </button>
                </div>

                {/* center-bottom */}
                <div className="w-full">
                  {/* Posts */}
                  <div className="w-full h-full rounded-xl">

                    {/* Posts Map Function */}
                    <FeedPosts data={fetchData} />
                
                  </div>

                  {/* Load More ??????????????? */}
                  <div className="w-full h-[72px]"></div>

                </div>
              </div>

              {/* Right-Bar Aside */}
              <div className="w-[18.75rem] h-fit flex flex-col  ">

                {/* Right aside bar- top */}
                <div className='w-full h-[321px] mb-2 bg-white outline outline-1 outline-[#E8E8E8] shadow-lg overflow-hidden rounded-xl'>

                </div>

                {/* right aside bar- bottom */}
                <div className='w-full h-[321px] '>

                    {/* section for premium */}
                    <section className='w-full h-fit bg-white outline outline-1 outline-[#E8E8E8] shadow-lg overflow-hidden rounded-xl'>
                      <AsidePremium />                     
                    </section>

                </div>

              </div>

            </div>
            
          </div>
        </div>
      </div>

      {/* post commnet popUp div */}
      {showPostComment && (<AddingPost setShowPostComment={setShowPostComment} ref={postCommentRef} />) }

    </div>
  );
}

export default Feed;