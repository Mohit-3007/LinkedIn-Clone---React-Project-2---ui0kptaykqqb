'use client'
import Link from 'next/link';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import Media from '@/public/media.png'
import Poll from '@/public/poll.png'
import GroupPosts from '@/public/groupPost.png'
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { usePathname, useRouter } from 'next/navigation';
import getPosts from '@/app/_lib/getPosts';
import AddingPost from '@/app/_components/AddingPost';
import { useContextProvider } from '@/app/ContextApi/AppContextProvider';
import LeftTopBar from '@/app/_components/LeftTopBar';
import LeftBottomBar from '@/app/_components/LeftBottomBar';
import AsidePremium from '@/app/_components/AsidePremium';
import { useAlertContextProvider } from '@/app/ContextApi/AlertContextProvider';
import AlertBox from '@/app/_components/AlertBox';
import backGround from '@/public/userBackGround.png'
import fetchGroup from '@/app/_lib/fetchGroup';
import fetchGroupPosts from '@/app/_lib/fetchGroupPosts';
import { FaPeopleGroup } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import GroupPostContainer from '@/app/_components/GroupPostContainer';
import uploadSamp from '@/public/uploadSamp.jpeg';
import { RxExit } from "react-icons/rx";
import { IoIosLink } from "react-icons/io";
import { IoFlag } from "react-icons/io5";


const GroupPage = ({params: {id}}) => {
  const pathName = usePathname()
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [showOptionDiv, setShowOptionDiv] = useState(false);
  const optiosRef = useRef();
  const dotRef = useRef()
  const postCompoRef = useRef()
  const { token, owner, checkGroupLocal, setCheckGroupLocal, groupPosts, setGroupPosts } = useContextProvider();
  // const [localData, setLocalData] = useState('');
  const { alertDispatch } = useAlertContextProvider()
  // const [isDataFromLocal, setIsDataFromLocal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [checkOnce, setCheckOnce] = useState(true)
  const [groupRes, setGroupRes] = useState('');
  const [groupData, setGroupData] = useState('')
  // const [groupPosts, setGroupPosts] = useState('')
  const [joinGroup, setJoinGroup] = useState(false);
  const [members, setMembers] = useState('');
  const [showPostCompo, setShowPostCompo] = useState(false)
  const [tooManyReq, setTooManyReq] = useState(false)
  const [page, setPage] = useState(0)
  const [num, setNum] = useState(0);
  const [isLocalGroup, setIsLocalGroup] = useState(false);

  useLayoutEffect( () => {
    if(!decodeURIComponent(document.cookie)){
      console.log("You are not logged in, re-routing to login page")
      router.replace('/')
    }
  },[])

  // fetching group details ///////////////////////////////////
  useEffect(() => {
    if(token){
      async function fetchGroupDetails(id, token){
        const groupDataa = await fetchGroup(id, token )
        console.log("RESULT OF GROUP DATA ", groupDataa);
        if(groupDataa?.status === 'success'){
          setGroupData(groupDataa?.data);
        }
      }
      fetchGroupDetails(id, token)
    }
  },[token])

  // random page & number for making fetch call for channels or groups below
  function generateRandomPage(){
    const pg = Math.floor(Math.random() * (100 - 5 + 1)) + 5;
    setPage(pg)
  }
  useEffect(()=>{
    generateRandomPage()
  },[])
  useEffect(() => {
    async function callFetch(){
      console.log(`fetch request sent with page no ${page}`)
      const data = await getPosts({limit:6, page:page})
      console.log("Channel/Groups ", data)
      if(data.status === 'success'){
        setGroupRes(data?.data)
      }
      else{
        if(data.message == 'No Post found'){
          generateRandomPage()
        }
      }         
    }
    if(page != 0){
      callFetch()
    }
  },[page]);

  useEffect( () => {
    if(groupData != undefined){
      if(groupData?.owner?._id == owner){
        console.log('its local data horrey')
        setIsLocalGroup(true)
      }
      else{
        checkLocalStorage()
      }
    }
  },[groupData])

  // checking Group in local storage
  function checkLocalStorage(){
    console.log("checkLocalStorage FUNCTION IS CALLED ")
    if(localStorage.getItem('groupData')){
      console.log("checkLocalStorage FUNCTION IS CALLED ")
      const data = JSON.parse(localStorage.getItem('groupData'));
      if(data?.length > 0){
        console.log("data ", data)
        console.log("groupData?._id ", id)
        const isPresent = data.find((e)=> {
          return e.id == id
        })
        console.log("isPresent outside if ", isPresent)
        if(isPresent != null){
          console.log("isPresent inside if ", isPresent)
          console.log("it is true");
          setJoinGroup(true)
          setLoading(true);
          groupPostsFetch(id, token)
        }
      }     
    }
  }

  // making fetch call for group posts
  async function groupPostsFetch (id, token) {
    const postData = await fetchGroupPosts(id, token)
    console.log("Result of Group Posts fetch:- ", postData);
    if(postData.status === 'success'){
      setGroupPosts(postData?.data)
      setLoading(false);
    }
    else{
      if(postData?.message === 'Too many requests from this project id, please try again in a minute!'){
        setLoading(false)
        setTooManyReq(true)
        setJoinGroup(false)
      }
      else{
        setLoading(false)
        setTooManyReq(true)
        setJoinGroup(false)
      }
    }
  }

  // joining group 
  function handleJoinGroup(){
    setJoinGroup(true)
    setLoading(true);
    groupPostsFetch(id, token)
    const groupObj = {
      name:groupData?.name,
      owner:groupData?.owner?._id,
      id:groupData?._id,
      content:groupData?.description,
      image:groupData?.image
    }
    const existingData = JSON.parse(localStorage.getItem('groupData')) || [];
    existingData.push(groupObj)
    const stringifyData = JSON.stringify(existingData);
    localStorage.setItem( 'groupData', stringifyData )
    alertDispatch({ type: "showGroupJoin" })
    setCheckGroupLocal(!checkGroupLocal)
    setTimeout( () => {
      alertDispatch({ type: "hideGroupJoin" })
    }, 2500) 
  }

  // handle delete group function
  async function handleDeleteGroup(groupId){
    const storedData = JSON.parse(localStorage.getItem('groupData'))
    const newData = storedData.filter(e => e.id !== groupId)
    const stringifyData = JSON.stringify(newData);
    localStorage.setItem('groupData', stringifyData);
    setCheckGroupLocal(prev => !prev);
    setJoinGroup(false)
    setGroupPosts('')
    setShowOptionDiv(false)
    alertDispatch({type:'showGroupLeft'})
    setTimeout(()=> {
      alertDispatch({type:'hideGroupLeft'})
    },2500)
  }

  // when screen is below 768 
    function handleShowMore(){
      console.log("Show More/ Show Less button clicked")
      setShowMore(!showMore)
  }

  function handleWindowClick(e){
    // console.log("showPostCompo 1 ", showPostCompo);
    if(showPostCompo === true ){
      console.log("showPostCompo ", showPostCompo);
      if(!postCompoRef?.current?.contains(e.target)){
        setShowPostCompo(false)
        console.log('i am inside')
      }
    }
    else{
      if(!optiosRef?.current?.contains(e.target)){
        if(dotRef?.current?.contains(e.target)) return
        setShowOptionDiv(false);  
      }    
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleWindowClick);
    return () => {
      document.removeEventListener('mousedown', handleWindowClick)
    }
  },[])

  /////////////////// Screen Width //////////////////////////////////////////
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

  // random members 
  useEffect(()=> {
    const members = (Math.floor(Math.random() * (1599999 - 200000 + 1)) + 200000).toLocaleString();
    setMembers(members)
  },[pathName])

  function copyToClipboard(){
    const currentPath = window.location.href;
    navigator.clipboard.writeText(currentPath);
    setShowOptionDiv(false)
    alertDispatch({type: 'showlinkCop'})
    setTimeout(()=> {
    alertDispatch({type: 'hidelinkCop'})
    },2500)
  };

// post loading handler
  function handlePostLoading() {
    setPostLoading(true);
    setTimeout(() => {
      console.log("Stop Post loading");
      setPostLoading(false);
      setShowPostCompo(true)
    }, 1250); 
  }

  function handleAlert(){
    alertDispatch({type:"showComingSoon"})
    setTimeout(()=>{
      alertDispatch({type: 'hideComingSoon'})
    }, 2500)
  }

  function handleReportGroup(){
    setShowOptionDiv(false)
    alertDispatch({type:'showReportGroup'})
    setTimeout(()=>{
      alertDispatch({type: 'hideReportGroup'})
    }, 2500)
  }

// roles array
  const role = ['', 'HR', 'IT Recruiter', 'Connecting talent with opportunities', 'Xyz Consultancy', 'Training & Placements']
  useEffect(()=> {
    const numb = Math.floor(Math.random() * (5-1) + 1)
    setNum(numb)
  },[])
 
  return (
    <div className='w-full dark:bg-[rgb(27,31,35)] bg-[#F4F2EE] h-fit '>
      <div className="w-full h-fit z-10 pt-12 res-620:pt-[3.25rem] ">
        <div className='w-[calc(100vw-17px)] h-full'>
          {/* main content */}
          <div className="w-full h-full">
            <div className="w-full h-full flex justify-center">
              {/* Responsivness */}
              <div className="w-full res-620:w-[720px] mx-0 res-992:w-[960px] res-992:mx-[calc((100%-960px)/2)] res-1200:w-[1128px] h-full res-1200:mx-[calc((100%-1128px)/2)]">
                {/* flex-col below width 768px */}
                <div className="flex-col items-center res-768:items-start w-full h-fit res-620:my-6 flex res-768:flex-row res-768:justify-between">   
                  {/* Left-Content */}
                  <div className="hidden res-620:block w-[576px] res-768:w-[14.0625rem] h-fit mb-3">
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
                  {/* Center-Content */}
                  <main className="w-full res-620:w-[576px] res-768:w-[471px] res-992:w-[24.25rem] res-1200:w-[34.6875rem] h-fit">
                    <div className='w-full h-fit'>
                      <div className='w-full h-fit mb-4'>
                        {/* group details- pic & name other */}
                        <section className='w-full h-fit bg-white'>
                          {/* background container */}
                          <div className='w-full h-[8.6875rem] '>
                            <Image src={backGround} alt='background image' height={201} objectFit='cover' className='w-full h-full res-620:rounded-t-md' />
                          </div>
                          {/* group profile pic & details */}
                          <div className='w-full h-max my-4 px-4 pb-4 pt-8 relative res-620:rounded-b-md shadow-lg flex flex-col'>
                            {/* pic */}
                            <div className='w-[88px] h-[88px] border-2 absolute left-4 top-[-56px]'>
                              <div className='w-full h-full'>
                                {/* {userData && userData.profileImage && ( */}
                                <Image src={groupData?.image ? groupData.image : uploadSamp} alt='group profile pic'
                                  width={84} height={84} 
                                  className='w-full h-full' />                             
                              </div>     
                            </div>
                              {/* name */}
                              <h1 className='w-full h-fit mt-2 mb-1'>
                                <span className='text-[#191919] text-lg res-992:text-2xl h-full py-1 font-semibold rounded-sm
                                hover:bg-[#EBEBEB] flex items-center capitalize '>
                                  {groupData?.name}
                                </span>
                              </h1>
                              {/* public group */}
                              <div className='w-full h-fit'>
                                <button className='w-fit h-fit pl-1 py-0.5 pr-2 flex items-center text-sm text-[#666666] font-semibold hover:bg-[#E8E8E8] rounded'>
                                  <FaPeopleGroup className='w-4 h-4 mr-1' />
                                  <span className=''>Public group </span>
                                </button>
                              </div>
                              {/* active group */}
                              <section className='w-full h-8 flex items-center'>
                                <div className='w-fit h-fit px-2 py-[1px] text-sm font-semibold text-white bg-[#01754F] rounded'>Active group</div>
                              </section>
                              {/* random members */}
                              <div className='w-full h-5 mt-1 flex items-center text-[#666666] text-sm'>{members} members </div>
                              {/* join button */}
                              {!joinGroup && (
                                <button onClick={handleJoinGroup} className='w-fit h-fit mt-4 px-4 py-1 font-semibold text-base text-white bg-[#0A66C2] rounded-3xl hover:bg-[#004182]' >
                                  <span className=''>Join</span>
                                </button>
                              )}
                              {/* option drop down div */}
                              <div className='w-10 h-10 absolute top-0 right-2  '>
                                <div ref={dotRef} 
                                  onClick={()=> setShowOptionDiv(!showOptionDiv)}
                                  className='w-full h-full cursor-pointer flex items-center justify-center rounded-[50%] hover:bg-[#E8E8E8]'>
                                  <BsThreeDots className='w-6 h-6 text-[#666666]' />  
                                </div>
                                {/* drop down- initially hidden */}
                                {showOptionDiv && (
                                  <div ref={optiosRef} className='w-[12.0625rem] h-fit py-1 absolute right-0 top-12 bg-white rounded-tl-md rounded-b-md shadow-md'>
                                    <div className='w-fit h-fit'>
                                      <ul className='w-fit h-fit list-none'>
                                        <li onClick={copyToClipboard} className='w-fit h-10 cursor-pointer '>
                                          <div className='w-fit h-full px-4 py-2 flex items-center hover:bg-[#E8E8E8] hover:text-[#000000bf] text-[#666666] font-semibold text-sm'>
                                            <IoIosLink className='w-6 h-6 mr-1 text-[#666666]' />Copy link to group
                                          </div>
                                        </li>
                                        <li onClick={handleReportGroup} className='w-fit h-10 cursor-pointer '>
                                          <div className='w-fit h-full px-4 py-2 flex items-center hover:bg-[#E8E8E8] hover:text-[#000000bf] text-[#666666] font-semibold text-sm'>
                                            <IoFlag className='w-6 h-6 mr-1 text-[#666666]' />Report this group
                                          </div>
                                        </li>
                                        {joinGroup && (
                                          <li onClick={()=> handleDeleteGroup(id)} className='w-fit h-10 cursor-pointer '>
                                            <div className='w-fit h-full px-4 py-2 flex items-center hover:bg-[#E8E8E8] hover:text-[#000000bf] text-[#666666] font-semibold text-sm'>
                                              <RxExit className='w-6 h-6 mr-1 text-[#666666]' />Leave the group
                                            </div>
                                          </li>
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </div>
                          </div>                                 
                        </section>
                        {/* About group */}
                        {!joinGroup && (
                          <section className='w-full h-fit p-4 bg-white res-620:rounded-md shadow-lg flex flex-col'>
                            {!tooManyReq ? (
                              <>
                                {/* heading */}
                                <h2 className='w-full h-fit text-xl font-semibold text-[#191919] '>About this group</h2>
                                <div className='w-full h-fit mt-4 text-[#191919] text-sm'>
                                  {groupData?.description}
                                </div>
                              </>
                            ) : (
                              <h2 className='w-full h-fit text-xl font-semibold text-[#191919] '>Too many requests from this Id, please try again in a minute! </h2>
                            )}
                          </section>
                        )}
                        {/* loading */}
                        {loading && (
                          <div className='w-full h-fit flex justify-center'>
                            {/* loader class */}  
                            <div className="spinner"></div>
                          </div>
                        )}
                        {/* ////////////    Groups Posts    //////////// */}
                        {groupPosts && groupPosts?.length > 0 && (
                          <>
                            {/* Create Groups Posts */}
                            <div className="hidden res-620:block w-full h-[7.25rem] bg-white rounded-xl mb-2 relative">
                              <div className="w-full h-fit flex flex-col">
                                {/* profile pic & post input div */}
                                <div className="mx-4 mt-2 w-[calc(100%-32px)] h-14 flex">
                                  {/* profiile pic */}
                                  <Link href={`/user/${owner}`} className="w-14 h-12">
                                    <div className="w-12 h-12 mr-2">
                                      {/* Group Pic */}
                                      <Image src={GroupPosts} alt='Group post cover pic' width={48} height={48} className='w-full h-full' />
                                    </div>
                                  </Link>
                                  <button onClick={handlePostLoading} className="w-[calc(100%-32px)] h-12 mt-1 py-2.5 pl-4 pr-2 border flex items-center rounded-[35px] hover:bg-[#EDEDED]">
                                    <span className="w-fit h-[1.3125rem] text-sm text-[#868686] overflow-hidden">
                                      Start a post in this group
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
                                  {/* Poll */}
                                  <button onClick={handleAlert} className="w-[93px] px-2 h-12 flex items-center hover:bg-[#EBEBEB]">
                                    {/* png */}
                                    <Image
                                      src={Poll}
                                      alt="poll picture"
                                      width="0"
                                      height="0"
                                      sizes="100vw"
                                      className="w-[26px] h-[26px]"
                                    />
                                    <span className="ml-2 h-7 text-sm text-[#868686] flex items-center">
                                      Poll
                                    </span>
                                  </button>
                                </div>
                              </div>
                              {/* for Post loading */}
                              {postLoading && (
                                <div className='absolute w-full h-[400px] rounded-xl bg-white left-10 -top-11 z-40 shadow-lg flex justify-center items-center '>
                                  <div className="spinner"></div>
                                </div>
                              )}
                            </div>
                            {/* Groups posts-break */}
                            <div className="hidden res-620:block w-full h-4 mb-2">
                              <button className="w-full h-full flex items-center">
                                <div className="w-full h-[1px] bg-[#BFBDBA]"></div>
                              </button>
                            </div>
                             {/* groups posts container */}
                            <div className="w-full h-fit">
                              {/* Posts */}
                              <div className="w-full h-fit rounded-xl flex flex-col">                             
                                {/* Posts from local data */}
                                {groupPosts.map( (each, index) => {
                                return (
                                  <GroupPostContainer key={index} data={each} />
                                )
                                })}
                              </div>
                            </div>
                          </>
                        )}
                      </div>          
                    </div>
                  </main>
                  {/* Right-Content Aside */}
                  <div className="hidden res-992:flex w-[18.75rem] h-fit flex-col  ">
                    {/* Right aside bar- Admin */}
                    {groupData?.owner && (
                      <section className='w-full h-fit mb-2 bg-white outline outline-1 outline-[#E8E8E8] shadow-lg overflow-hidden rounded-xl'>
                        <h3 className='w-full h-[52px] p-4 flex items-center text-base text-[#191919] font-semibold'>Admin</h3>
                        <div className='w-full h-fit flex px-4 pb-4 '>
                          {/* image */}
                          <div className='w-[56px] h-full '>
                            <Link href={`/user/${groupData.owner._id}`} className='w-full h-12'>
                              <div className='w-12 h-12 mr-2'>
                                <div className='w-full h-full'>
                                  {/* image */}
                                  <Image src={groupData.owner.profileImage} width={48} height={48} className='w-12 h-12 rounded-[50%]' />
                                </div>
                              </div>
                            </Link>
                          </div>
                          {/* name */}
                          <div className='w-[calc(100%-56px)] h-full flex flex-col'>
                            <div className='w-full h-fit'>
                              <Link href={`/user/${groupData.owner._id}`} className='w-full h-fit flex flex-col'>
                                <div className='w-full h-fit flex items-start'>
                                  <div className='w-[85%] h-full flex items-center text-base font-semibold text-[#191919] hover:underline hover:text-[#0a66c2]'>
                                    {groupData.owner.name}
                                  </div>
                                  <span className='w-[15%] h-fit flex items-start text-xs ml-1 text-[#666666] mr-0'>. 2nd</span>
                                </div>
                                <div className='w-full h-fit text-sm text-[#666666]'>{role[num]}</div>
                              </Link>
                            </div>                         
                          </div>
                        </div>                           
                      </section>
                    )}
                    {/* Right aside bar- Group Container */}
                    <section className='w-full h-fit mb-2 bg-white outline outline-1 outline-[#E8E8E8] shadow-lg overflow-hidden rounded-xl'>
                      <h3 className='w-full h-[52px] p-4 flex items-center text-base text-[#191919] font-semibold'>Groups you might be interested in</h3>
                      {/* groups ul */}
                      <ul className='w-full h-fit px-4'>
                        {/* GroupContainer */}
                        {groupRes && groupRes.map( (e, index) => {                                                     
                          return <GroupContainer key={index} index={index} e={e} />                              
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
          <AlertBox />
        </div>
      </div>
      {showPostCompo && 
      (<AddingPost 
        setShowPostCompo={setShowPostCompo} 
        ref={postCompoRef} 
      />)}
    </div>
  )
}

function GroupContainer({index, e}){
  const [members, setMembers] = useState('');
  useEffect( () => {
    const member = (Math.floor(Math.random() * (1599999 - 200000 + 1)) + 200000).toLocaleString();
    setMembers(member)
  },[])

  return (
    <li key={index} className='w-full h-fit py-4'>
      <Link href={`/groups/${e.channel._id}`} className='w-full h-fit flex'>
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
}

export default GroupPage;
