'use client'
import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { FaGlobeAmericas } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosLink } from "react-icons/io";
import { IoFlag } from "react-icons/io5";
import { useContextProvider } from '../ContextApi/AppContextProvider';
import followUser from '../lib/FollowUser';
import getUser from '../lib/getUser';
import { usePathname } from 'next/navigation';
import unfollowUser from '../lib/UnfollowUser';





const PostTopBar = ({each}) => {
    const { token } = useContextProvider();
    const[isFollow, setIsFollow] = useState()
    const [showFollow, setShowFollow] = useState(false);
    const [userData, setUserData] = useState('')
    const [allow, setAllow] = useState(false);
    const path = usePathname()
    const postRef = useRef()
    const dotRef = useRef()
    const [postOption, setPostOption] = useState(false)
    const [isCopied, setIsCopied] = useState(false);

    function handlePostOption(){
        if(postOption){
            setPostOption(false)
        }
        else{
            setPostOption(true)
        }
    }

    function handleIsFollow(){
        setIsFollow(!isFollow);
    }
    
    useEffect( () => {
        if(isFollow == true){
            console.log("disabling follow button")
            setShowFollow(false)
        }      
    },[isFollow])

    useEffect( () => {
        if(allow){
            console.log("enabling follow button")
            setShowFollow(true)
            handleIsFollow()
        }
    }, [allow])

    useEffect( () => {
        async function fetchUser(){
            const fetchUser = await getUser(each?.author._id, token)
            if(fetchUser.status === 'success'){
                // console.log("fetchUser result ", fetchUser)
                setUserData(fetchUser?.data);
            }
        }
        fetchUser()
    }, [])

    useEffect( () => {
        if(userData?.isFollowed === false ){
            setShowFollow(true)
        }
    }, [userData])

    async function handleFollowUnfollow(id, token){
        console.log("isFollow status ", isFollow)
        if(userData?.isFollowed || isFollow){
            const unfollRes = await unfollowUser(id, token)
            if(unfollRes?.status === 'success'){
                console.log("UNFOLLOWED");
                setAllow(true)
                setPostOption(false)
            }
        }
        else{
            console.log("call handle follow user ()")
            handleFollowUser(id, token);
            // handlePostOption()
        }
    }

    async function handleFollowUser(id, token){
        const followRes = await followUser(id, token)
        console.log("followRes user result status ", followRes);
        if(followRes?.status === 'success'){
            console.log("FOLLOWED") 
            setIsFollow(true)
            // changeFollowState()
            setPostOption(false)
        }
    }

    function handleMouseEvent(e){
        if(!postRef?.current?.contains(e.target)){
            if(dotRef?.current?.contains(e.target)) return
            else{
                setPostOption(false)
            }
        }  
    }  

    useEffect( () => {
        document.addEventListener('mousedown', handleMouseEvent)
        return () => {
            document.removeEventListener('mousedown', handleMouseEvent)
        }
    },[])

    const copyToClipboard = async () => {
        try {
          const currentPath = window.location.href;
          await navigator.clipboard.writeText(currentPath);
        //   setTimeout(() => {
        //     setIsCopied(false);
        //   }, 3000);
          setIsCopied(true);
        } catch (err) {
          console.error('Error copying to clipboard:', err);
        }
      };

  return (
    <div className='w-full h-16 mb-2 pl-4 pt-3 flex justify-between'>
                            
        {/* user pic, name & other details */}
        <div className='w-[27.1875rem] h-[3.25rem] flex'>

            {/* User-Pic */}
            <Link href={`/user/${each?.author._id}`} className='w-12 h-[3.25rem]'>
            <div className='w-12 h-12 rounded-[50%] bg-slate-300'>
                {/* Image-Component */}
                <Image src={each?.author?.profileImage} alt='user-profile-pic' width={48} height={48} priority className='rounded-[50%]'/>
            </div>
            </Link>

            {/* name & other details */}
            <div className='w-[23.6875rem] h-[3.25rem] ml-2 flex flex-col'>
                {/* name */}
                <Link href={`/user/${each?.author._id}`} className='w-full h-9 flex flex-col'>

                    <span className='w-full h-[1.25rem] flex'>
                        <span className='h-full flex items-center text-black text-sm font-semibold hover:underline hover:text-[#0A66C2]'>{each?.author?.name}</span>
                        <span className='h-full ml-1 flex items-center text-xs text-[#666666]'>
                            {( userData?.isFollowed === true || isFollow === true ) ? (
                            <>
                                <span className='h-full text-lg flex items-end mr-1'>. </span><span>following</span>
                            </>
                             ) : " "}
                        </span>
                    </span>

                    <span className='w-full h-[calc(100%-1.25rem)] flex items-center text-xs text-[#666666]'>
                        Designation and Some User Courier Info...
                    </span>
   
                </Link>
                {/* time */}
                <Link href={"#"} className='w-full h-4 flex items-center text-xs text-[#666666]'>
                    <span className='flex items-start'>4d<span className='flex items-start justify-center mx-1'>. </span></span><FaGlobeAmericas className='w-4 h-4' />
                </Link>
            </div>

        </div>

        {/* Follow & More option popUp & Cross sign */}
        <div className='w-[90px] h-full flex flex-col justify-between items-end'>

            <div className='w-[4.25rem] h-fit flex items-center'>  

                {/* dots & option Pop up */}
                <div className='w-8 h-fit relative'>

                    {/* Icon */}
                    <button ref={dotRef} onClick={() => setPostOption(!postOption)} className='w-full h-full flex items-start justify-center rounded-[50%] hover:bg-[#EBEBEB]'>
                        <BsThreeDots className='w-5 h-5 fill-[#666666]'/>
                    </button>

                    {/* Option_Popup- Div */}
                    <div ref={postRef} className={'absolute right-0 w-[335px] h-fit py-1 bg-white outline outline-1 shadow-lg outline-[#e1e1e1] rounded-sm ' + (
                        (postOption ? 'block' : 'hidden')
                    )}>
                        <div className='w-full h-full'>
                            <ul className='w-full h-full list-none text-[#404040] font-semibold text-sm'>
                                {/*  */}
                                                          
                                <li onClick={copyToClipboard} className='w-full h-[56px] hover:bg-[#e1e1e1] cursor-pointer'>
                                    <div className='w-full h-full px-4 py-2 flex items-center'>
                                        {/* icons */}
                                        <div className='w-6 h-6 mr-2 '>
                                            <IoIosLink className='w-full h-full' />
                                        </div>
                                        <div className='w-[calc(100%-32px)] h-5'>
                                            Copy link to post
                                        </div>
                                    </div>
                                </li>

                                <li onClick={() => handleFollowUnfollow(each?.author?._id, token)} className='w-full h-[56px] hover:bg-[#e1e1e1] cursor-pointer'>
                                    <div className='w-full h-full px-4 py-2 flex items-center'>
                                        {/* icons */}
                                        <div className='w-6 h-6 mr-2 '>
                                            <RxCrossCircled className='w-full h-full' />
                                        </div>
                                        <div className='w-[calc(100%-32px)] h-5'>
                                            {( userData?.isFollowed || isFollow ) ? "Unfollow" : "Follow" } {each?.author?.name}
                                        </div>
                                    </div>
                                </li>

                                <li className='w-full h-[56px] hover:bg-[#e1e1e1] cursor-pointer'>
                                    <div className='w-full h-full px-4 py-2 flex items-center'>
                                        {/* icons */}
                                        <div className='w-6 h-6 mr-2 '>
                                            <IoFlag className='w-full h-full' />
                                        </div>
                                        <div className='w-[calc(100%-32px)] h-5'>
                                            Report post
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>

                </div>

                {/* cross */}
                <button className='ml-1 w-8 h-full flex justify-center items-center rounded-[50%] hover:bg-[#EBEBEB]'>
                    <RxCross1 className='w-4 h-4 text-[#666666] font-extrabold' />
                </button>
            </div>

            {/* follow */}
            {/* {showFollow && ( */}
                <button onClick={() => handleFollowUser(each?.author?._id, token)} className={'w-fit h-7 px-1.5 py-1 mr-2 rounded-md hover:bg-[#E2F0FE] text-[#0A66C2] flex items-center justify-center ' + (
                    showFollow === true ? 'block' : 'hidden'
                )}>
                    <FaPlus className='w-3 h-3 mr-1' />
                    <span className='text-sm font-semibold'>Follow</span>
                </button>
            {/* )} */}
            
            

        </div>   
            

    </div>
  )
}

export default PostTopBar