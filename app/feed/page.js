'use client'
import Link from 'next/link';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import Media from '../../public/media.png'
import Event from '../../public/event.png'
import Article from '../../public/article.png'
import getPosts from '../_lib/getPosts';
import FeedPosts from '../_components/FeedPosts';
import AddingPost from '../_components/AddingPost';
import { useContextProvider } from '../ContextApi/AppContextProvider';
import LeftTopBar from '../_components/LeftTopBar';
import LeftBottomBar from '../_components/LeftBottomBar';
import AsidePremium from '../_components/AsidePremium';
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';
import { RxCross1 } from "react-icons/rx";
import NavBar from '../_components/NavBar';
import { Gi3DMeeple } from "react-icons/gi";
import { PiWarningOctagonFill } from "react-icons/pi";
import PostTopBar from '../_components/PostTopBar';
import PostContent from '../_components/PostContent';
import CommentReaction from '../_components/CommentReaction';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import AlertBox from '../_components/AlertBox';
import alertTimeout from '../_lib/alertTimeout';
import { useRouter } from 'next/navigation';
import TopBottomNav from '../_components/MobileComponents/TopBottomNav';








const Feed =  () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPostCompo, setShowPostCompo] = useState(false);
  const postCommentRef = useRef();
  const alertDivRef = useRef()
  const { userName, owner } = useContextProvider();
  const [checkLocal, setCheckLocal] = useState(false);
  const [showAlertPost, setShowAlertPost] = useState(false)
  const [showAlertImg, setShowAlertImg] = useState(false)
  const [localData, setLocalData] = useState('');
  const { alertImageUpload, alertLinkCopied, alertPostCreated, alertReportPost, alertReportComment, alertDispatch } = useAlertContextProvider()
  const [isDataFromLocal, setIsDataFromLocal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [checkOnce, setCheckOnce] = useState(true)
  const [groupRes, setGroupRes] = useState('');
  const [firstRender, setFirstRender] = useState(true)
  const [showAlertLink, setShowAlertLink] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0);

  const logWindowWidth = () => {
    setWindowWidth(window?.innerWidth);
  };
  // console.log("window.innerWidth ",windowWidth);
  useEffect(() => {
    logWindowWidth();
    window.addEventListener('resize', logWindowWidth);
    return () => {
      window.removeEventListener('resize', logWindowWidth);
    };
  }, []);


  useLayoutEffect( () => {
    if(!decodeURIComponent(document.cookie)){
        console.log("You are not logged in, re-routing to login page")
        router.replace('/')
    }
  },[]) 

  useEffect(()=> {
    if(firstRender) {
      setFirstRender(false)
    }
    else{
      console.log("rendering second")
      if(showAlertLink){
        setShowAlertLink(false)   
      }
      else{
        setShowAlertLink(true)
      }
    }
  },[alertLinkCopied, alertReportComment])
  
  
  function handleLoading() {
    console.log("Start loading");
    setLoading(true);
    setTimeout(() => {
      console.log("Stop loading");
      setLoading(false);
      setShowPostCompo(true)
    }, 1250); 
  }

  function handleWindowClick(e){
    if(showPostCompo){
      if(!postCommentRef?.current?.contains(e.target)){
        setShowPostCompo(false)
      }
    } 
  }

  useEffect(() => {
      document.addEventListener('mousedown', handleWindowClick);
      return () => {
          document.removeEventListener('mousedown', handleWindowClick)
      }
  },[showPostCompo])

// getting the first leter of UserName
  const name = userName;
  const firstLetter = name?.charAt(0);

// checking local storage for posts
  useEffect( () => {
    if(localStorage.getItem('postData')){
        const storedData = JSON.parse(localStorage.getItem('postData'))
        // console.log(storedData)
        setLocalData(storedData);
        setIsDataFromLocal(true)
    }
  },[checkLocal])

  ///////////////////////////////////////////////////////////////
  function handleCloseImageAlert(){
      alertDispatch({ type: "imgAlertFalse" })
      setShowAlertImg(false)  
  }

  function handleClosePostAlert(){
    alertDispatch({ type: "hidePostCreAlert" })
    setShowAlertPost(false)                       
  }

  function handleCloseAlertBox(){
    alertDispatch({ type: "hidelinkCop" })
    // setShowAlertLink(false)                       
  }

  function handleCloseReport(){
    alertDispatch({ type: "hideReportComment" })
    // setShowAlertLink(false)                       
  }

  function handleAlert(){
    alertDispatch({type:"showComingSoon"})
    setTimeout(()=>{
      alertDispatch({type: 'hideComingSoon'})
    }, 2500)
  }
  ///////////////////////////////////////////////////////////////

// when screen is below 768 
  function handleShowMore(){
    console.log("Show More/ Show Less button clicked")
    setShowMore(!showMore)
  }

  /////////////////////////////////////////////////////////////
  useEffect( () => {
    function handleScreenWidth() {
      const width = window.innerWidth;
      if(width < 768){
          if(checkOnce == true){
            // console.log("setShowMore false is done");
            setCheckOnce(false)
            setShowMore(false)
        }
      }
      else{
        setCheckOnce(true)
        setShowMore(false)
      }
    }
    window.addEventListener('resize', handleScreenWidth);
    return () => {
      window.removeEventListener('resize', handleScreenWidth)
    }
  },[])

// random page & number for making fetch call for channels or groups below
  const pg = Math.floor(Math.random() * (100 - 5 + 1)) + 5;

  useEffect(() => {
    async function callFetch(){
        // console.log(`fetch request sent with page no ${page}`)
        const data = await getPosts({limit:6, page:pg})
        console.log("Channel/Groups ", data)
        if(data.status === 'success'){
            setGroupRes(data?.data)
        }         
    }
    callFetch()
  },[]);


  return (
    <>
      

      <div className='w-full bg-[#F4F2EE] h-fit '>

        {/* <NavBar /> */}

        <div className="w-full h-fit z-10  pt-[3.25rem] ">

        {/* <div className={"w-full h-[calc(100vh-52px)] z-10 scrollbar-stable fixed top-[3.25rem] " + (
          showPostCompo ? "overflow-y-hidden" : "overflow-y-scroll"
        )}> */}

          <div className='w-[calc(100vw-17px)] h-full'>

            {/* main content */}
            <div className="w-full h-full">
              <div className="w-full h-full flex justify-center">

                {/* Responsivness */}

                <div className="w-[720px] mx-0 res-992:w-[960px] res-992:mx-[calc((100%-960px)/2)] res-1200:w-[1128px] h-full res-1200:mx-[calc((100%-1128px)/2)]">

                  {/* flex-col below width 768px */}
                  <div className="flex-col items-center res-768:items-start w-full h-fit my-6 flex res-768:flex-row res-768:justify-between">   

                    {/* Left-Bar */}
                    <div className="w-[576px] res-768:w-[14.0625rem] h-fit mb-3">

                      {/* main-left bar */}
                      <div className="w-full h-fit ">

                        {/* left-top */}
                        <div className="w-full h-fit bg-white mb-2 outline outline-1 outline-[#E8E8E8] shadow-lg overflow-hidden rounded-xl flex flex-col">
                          <LeftTopBar showMore={showMore} />
                        </div>

                        {/* right-top */}
                        <div className="w-full h-fit bg-white outline outline-1 outline-[#E8E8E8] shadow-lg overflow-hidden rounded-xl">
                          <LeftBottomBar showMore={showMore} />
                        </div>
                          
                      </div>

                      {/* button for showing more when screen is below 768px */}
                      <footer onClick={() => handleShowMore()} className='block res-768:hidden w-full h-8'>
                        <button className='w-full h-6 px-2 py-0.5 mt-2 flex justify-center text-[#666666] font-semibold text-xs cursor-pointer'>
                          {showMore ? "Show less" : "Show more"} 
                          {showMore ? (
                                  <FaCaretUp className="inline w-4 h-4" />
                              )  :   (
                                  <FaCaretDown className="inline w-4 h-4" />
                              )
                          }
                        </button>
                      </footer>

                    </div>

                    {/* Center-Bar */}
                    <div className="w-[576px] res-768:w-[471px] res-992:w-[24.25rem] res-1200:w-[34.6875rem] h-fit">

                      {/* center-top */}
                      <div className="w-full h-[7.25rem] bg-white rounded-xl mb-2 relative">

                        <div className="w-full h-fit flex flex-col">

                          {/* profile pic & post input div */}
                          <div className="mx-4 mt-2 w-[calc(100%-32px)] h-14 flex">

                            {/* profiile pic */}
                            <Link href={`/user/${owner}`} className="w-14 h-12">
                              <div className="w-12 h-12 mr-2">
                                {/* Profile Pic */}
                                <span className='w-full h-full bg-[#7A1CA4] flex justify-center items-center uppercase text-2xl font-bold text-white rounded-[50%]'>{firstLetter}</span>
                              </div>
                            </Link>

                            <button onClick={handleLoading} className="w-[calc(100%-32px)] h-12 mt-1 py-2.5 pl-4 pr-2 border flex items-center rounded-[35px] hover:bg-[#EDEDED]">
                              <span className="w-fit h-[1.3125rem] text-sm text-[#868686] overflow-hidden">
                                Start a post
                              </span>
                            </button>

                          </div>

                          {/* Icons */}
                          <div className="w-full h-[52px] mb-1 flex justify-around">

                            {/* Media */}
                            <button onClick={handleAlert} className="w-[98px] px-2 h-12 flex items-center hover:bg-[#EBEBEB] justify-start">
                              {/* png */}
                              <Image
                                src={Media}
                                alt="Picture of the user"
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-6 h-5 rounded-sm"
                              />       
                              <span className="ml-2 h-7 text-sm text-[#868686] flex items-center">
                                Media
                              </span>
                            </button>

                            {/* Event */}
                            <button onClick={handleAlert} className="w-[93px] px-2 h-12 flex items-center hover:bg-[#EBEBEB]">
                              {/* png */}
                              <Image
                                src={Event}
                                alt="Picture of the user"
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-[26px] h-[26px]"
                              />
                              <span className="ml-2 h-7 text-sm text-[#868686] flex items-center">
                                Event
                              </span>
                            </button>

                            {/* Write article */}
                            <button onClick={handleAlert} className="w-[136px] px-2 h-12 flex items-center hover:bg-[#EBEBEB]">
                              {/* png */}
                              <Image
                                src={Article}
                                alt="Picture of the user"
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-5 h-5"
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
                      <div onClick={() => alertTimeout()} className="w-full h-4 mb-2">
                        <button className="w-full h-full flex items-center">
                          <div className="w-full h-[1px] bg-[#BFBDBA]"></div>
                        </button>
                      </div>

                      {/* center-bottom */}
                      <div className="w-full h-fit">
                        {/* Posts */}
                        <div className="w-full h-fit rounded-xl flex flex-col">
                          
                          {/* Posts from local data */}
                          {localData && localData.map( (each, index) => {

                              return (
                                <div key={index} className='w-full bg-white rounded-lg mb-3'>
                                  <div className='w-full'>
                                      <div className='w-full mb-3'>
              
                                          {/* post-top-bar */}
                                          <PostTopBar each={each} localData={localData} setLocalData={setLocalData} isDataFromLocal={isDataFromLocal} setCheckLocal={setCheckLocal} />
                                          
                                          {/* post-Content */}
                                          <PostContent content={each?.content} title={each?.title}/>
              
                                          {/* Content- Pic */}
                                          {each.images && each.images.length > 0 && (  

                                            <div className='w-full h-fit mt-2 bg-slate-300'>
                                                <div className='w-full h-full'>
                                                    {/* Image Component */}
                                                    <Image src={each?.images[0]} width={555} height={300} priority alt='pic' />
                                                </div>
                                            </div>

                                          )}
              
                                          {/* Like, Comment and Post */}
                                          <div className='w-full  flex flex-col'>
                                              <CommentReaction each={each} isDataFromLocal={isDataFromLocal} />  
                                          </div>
              
                                      </div>
                                  </div>
                                </div>
                              )
                          })}

                          {/* Posts Map Function */}
                          <FeedPosts />
                      
                        </div>

                        {/* Load More ??????????????? */}
                        <div className="w-full h-[72px]"></div>

                      </div>

                    </div>

                    {/* Right-Bar Aside */}
                    <div className="hidden res-992:flex w-[18.75rem] h-fit flex-col  ">

                      {/* Right aside bar- top */}
                      <section className='w-full h-fit mb-2 bg-white outline outline-1 outline-[#E8E8E8] shadow-lg overflow-hidden rounded-xl'>

                        <h3 className='w-full h-[52px] p-4 flex items-center text-base text-[#191919] font-semibold'>Groups you might be interested in</h3>

                        {/* groups ul */}
                        <ul className='w-full h-fit px-4'>

                            {/*  */}
                            {groupRes && groupRes.map( (e, index) => {
                                const members = (Math.floor(Math.random() * (1599999 - 200000 + 1)) + 200000).toLocaleString();
                              
                              return (
                                <li onClick={handleAlert} key={index} className='w-full h-fit py-4'>
                                    <Link href={'#'} className='w-full h-fit flex'>

                                        <div className='w-12 h-full'>
                                            <div className='w-full h-12 flex justify-center items-center'>
                                                <Image src={e?.channel?.image} alt='group-pic' objectFit='cover' width={48} height={48} className='w-full h-full rounded-sm' />
                                            </div>
                                        </div>

                                        <div className='w-[calc(100%-48px)] pl-2 h-fit t'>
                                            <div className='w-full h-fit ext-base font-semibold hover:underline text-[#191919] break-words'>{e?.channel?.name}</div>
                                            <div className='text-xs text-[#666666]'>{members} members</div>
                                        </div>

                                    </Link>
                                </li>
                              )
                            })}

                        </ul>
                        
                      </section>

                      {/* right aside bar- bottom */}
                      <div className='w-full h-[321px] '>

                          {/* section for premium */}
                          <section className='w-full h-fit bg-white outline outline-1 outline-[#E8E8E8] shadow-lg overflow-hidden rounded-xl'>
                            <AsidePremium />                     
                          </section>

                          {/* Footer */}
                          <div className='w-full h-fit'>
                            <footer className='w-full h-fit flex flex-col'>
                              <ul className='w-full h-fit px-6 py-4 flex flex-row justify-center flex-wrap text-[#62615F] text-xs font-semibold'>

                                  
                                <li className='w-fit h-4 my-1 mx-2'>
                                <Link href={"https://about.linkedin.com/"} 
                                target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2]'>About</Link>
                                </li>

                                <li className='w-fit h-4 my-1 mx-2'>
                                <Link href={"https://www.linkedin.com/accessibility?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B%2FsqeDHhHReySxNr7d0ZwSA%3D%3D"} 
                                target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Accessibility</Link>
                                </li>

                                <li className='w-fit h-4 my-1 mx-2'>
                                <Link href={"https://www.linkedin.com/uas/login-cap?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Ftalent%2Fpost-a-job%3Flipi%3Durn%253Ali%253Apage%253Ad_flagship3_profile_view_base%253B%252FsqeDHhHReySxNr7d0ZwSA%253D%253D%26src%3Dli-footer%26trk%3Dfooter_jobs_home&source_app=tsweb&trk=tsweb_signin"} 
                                target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Talent Solutions</Link>
                                </li>

                                <li className='w-fit h-4 my-1 mx-2'>
                                <Link href={"https://www.linkedin.com/legal/professional-community-policies"} 
                                target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Community Guidelines</Link>
                                </li>

                                <li className='w-fit h-4 my-1 mx-2'>
                                <Link href={"https://careers.linkedin.com/"} 
                                target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Careers</Link>
                                </li>

                                <li className='w-fit h-4 my-1 mx-2'>
                                <Link href={"https://business.linkedin.com/marketing-solutions?trk=n_nav_lms_f&src=li-footer"} 
                                target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Marketing Solutions</Link>
                                </li>
                                
                                <li className='w-fit h-4 my-1 mx-2'>
                                <Link href={"#"} 
                                target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Privacy & Terms</Link>
                                </li>
                                                    
                                <li className='w-fit h-4 my-1 mx-2'>
                                <Link href={"https://business.linkedin.com/marketing-solutions/ads?trk=n_nav_ads_f"} 
                                target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Ad Choices</Link>
                                </li>
                                                    
                                <li className='w-fit h-4 my-1 mx-2'>
                                <Link href={"https://www.linkedin.com/help/linkedin/answer/a1342443"} 
                                target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Advertising</Link>
                                </li>
                                                    
                                <li className='w-fit h-4 my-1 mx-2'>
                                <Link href={"https://business.linkedin.com/sales-solutions?trk=flagship_nav&veh=li-footer-lss-control&src=li-footer"} 
                                target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Safety Solutions</Link>
                                </li>
                                                    
                                <li className='w-fit h-4 my-1 mx-2'>
                                <Link href={"https://mobile.linkedin.com/"} 
                                target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Mobile</Link>
                                </li>
                                                    
                                <li className='w-fit h-4 my-1 mx-2'>
                                <Link href={"https://business.linkedin.com/grow?&src=li-footer"} 
                                target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Small Buisness</Link>
                                </li>
                                                    
                                <li className='w-fit h-4 my-1 mx-2'>
                                <Link href={"https://about.linkedin.com/transparency"} 
                                target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Safety Center</Link>
                                </li>

                              </ul>
                              <div className='w-full h-fit px-6 pb-10 text-center'><p className='w-full h-4 text-[#62615F] text-xs'>Linkedin Corporation &copy; 2023</p></div>
                            </footer>
                          </div>

                      </div>

                    </div>

                  </div>
                  
                </div>
                
              </div>
            </div>

            {/* Alert Boxes */}
            {/* alertPostCreated */}
            {showAlertPost &&  alertPostCreated && (
              <div className='w-fit h-[78px] p-4 flex fixed bottom-8 left-8 z-50 outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
                  <div className='w-fit h-full flex'>
                      <div className='w-6 h-full mr-2'><Gi3DMeeple className='w-6 h-6 text-[#77C45F]' /></div>
                      <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm text-[#191919]'>Post Created Successfully.</p>
                  </div>
                  <button className='w-8 h-full flex justify-end cursor-pointer '><RxCross1 onClick={handleClosePostAlert} className='w-4 h-4 text-[#666666] ' /></button>
              </div>
            )}

            {/* alertImageUpload */}
            {showAlertImg && alertImageUpload && (
              <div ref={alertDivRef} className='w-[23.5rem] h-[78] p-4 flex fixed bottom-8 left-8 z-50 outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
                  <div className='w-[312px]] h-full flex'>
                      <div className='w-6 h-full mr-2'><PiWarningOctagonFill className='w-6 h-6 text-[#CB112D]' /></div>
                      <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm text-[#191919]'>This file type is not supported. Please choose an image.</p>
                  </div>
                  <button className='w-8 h-full flex justify-end cursor-pointer '><RxCross1 onClick={handleCloseImageAlert} className='w-4 h-4 text-[#666666] ' /></button>
              </div>
            )}

            <AlertBox />

          </div>

        </div>

        {/* post commnet popUp div */}
        {showPostCompo && 
          (<AddingPost 
              setShowPostCompo={setShowPostCompo} 
              setCheckLocal={setCheckLocal}
              setShowAlertPost={setShowAlertPost} 
              setShowAlertImg={setShowAlertImg}
              ref={postCommentRef} 
          />)}

      </div>

      {windowWidth <= 620 && <TopBottomNav /> }

    </>

  );
}

export default Feed;