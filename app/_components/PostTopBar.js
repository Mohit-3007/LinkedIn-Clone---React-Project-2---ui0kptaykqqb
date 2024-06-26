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
import followUser from '../_lib/FollowUser';
import getUser from '../_lib/getUser';
import deletePost from '../_lib/deletePost';
import { usePathname } from 'next/navigation';
import unfollowUser from '../_lib/UnfollowUser';
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';

const PostTopBar = ({each, localData, setLocalData, isDataFromLocal = false, isGroupPost = false, isSearchPost = false, dataType }) => {
    const { userName, token, res, setRes, owner, setCheckLocal, groupPosts, setGroupPosts, setSearchContent, setSearchTitle, searchContent, searchTitle } = useContextProvider();
    const [isFollow, setIsFollow] = useState(false)
    const [showFollow, setShowFollow] = useState(false);
    const [allow, setAllow] = useState(false);
    const path = usePathname()
    const postRef = useRef()
    const dotRef = useRef()
    const [postOption, setPostOption] = useState(false)
    const [isCopied, setIsCopied] = useState(false);
    const { alertDispatch } = useAlertContextProvider()
    const [postDays, setpostDays] = useState('')

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
            // console.log("disabling follow button")
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
            const fetchUser = await getUser(each?.author?._id, token)
            if(fetchUser.status === 'success'){
                // console.log("fetchUser result ", fetchUser)
                if(fetchUser?.data?.isFollowed === true){
                    // console.log('inside checking isFollowed? ', isFollow)
                    setIsFollow(true);
                }
            }
        }
        fetchUser()
    }, [each])

    async function handleFollowUnfollow(id, token){
        console.log("isFollow status ", isFollow)
        if(isFollow){
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

   async function handleDeletePost(id, token){
        console.log("Delete The Post");
        const deletePostRes = await deletePost(id, token)

        if(deletePostRes.status === 204){
            // console.log("204 204 204")
            const storedData = JSON.parse(localStorage.getItem('postData'))
            const newData = storedData.filter(e => e._id !== id)
            const stringifyData = JSON.stringify(newData);
            localStorage.setItem('postData', stringifyData);
            setCheckLocal(prev => !prev);
            setPostOption(false)
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

// handle Report post
    function handleReport(){
        console.log("report post")
        setPostOption(false)
        alertDispatch({type: 'showReportPost'})
        setTimeout(()=> {
            alertDispatch({type: 'hideReportPost'})
        },2500)
    }

// hiding the post
    function handleHidePost(){
        if(isGroupPost){
            console.log("isGroupPost ", isGroupPost);
            console.log("isGroupPost ", each?._id);

            const newData = groupPosts.filter( e => {
                return e?._id != each?._id
            })
            setGroupPosts(newData);
        }
        else{
            if(isDataFromLocal){
                const newData = localData.filter( e => {
                    return e?._id != each?._id
                })
                setLocalData(newData);
            }
            if(isSearchPost){
                if(dataType == 'content'){
                    const newData = searchContent.filter( e => {
                        return e?._id != each?._id
                    })
                    setSearchContent(newData);
                }else{
                    console.log("one ",searchTitle)
                    const newData = searchTitle.filter( e => {
                        return e?._id != each?._id
                    })
                    setSearchTitle(newData);
                }
            }
            else{
                const newData = res.filter( e => {
                    return e?._id != each?._id
                })
                setRes(newData);
            }
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

    function copyToClipboard(){
        const currentPath = window.location.href;
        navigator.clipboard.writeText(currentPath);
        setIsCopied(true);
        setPostOption(false)
        alertDispatch({type: 'showlinkCop'})
        setTimeout(()=> {
        alertDispatch({type: 'hidelinkCop'})
        },2500)
    };

// getting the first leter of UserName & random post created date
    const name = userName;
    const firstLetter = name?.charAt(0);
    useEffect( () => {
        const day = Math.floor(Math.random() * (30 - 2 + 1)) + 2;
        setpostDays(day)
    },[path])

  return (
    <div className='w-full min-h-16 max-h-fit mb-2 pl-4 pt-3 flex justify-between'>                          
        {/* user pic, name & other details */}
        <div className='w-[80.70%] h-fit flex'>
            {isDataFromLocal && (
                <>
                {/* User-Pic */}
                <Link href={`/user/${owner}`} className='w-12 h-[3.25rem]'>
                    <div className='w-12 h-12 rounded-[50%]'>
                        <span className='w-full h-full dark:bg-[rgb(27,31,35)] dark:text-[rgb(255,255,255,0.9)] bg-[#7A1CA4] flex justify-center
                            items-center uppercase text-[26px] font-semibold dark:shadow-sm dark:shadow-[rgb(139,141,143)] text-white rounded-[50%] outline outline-1
                            dark:outline-[rgb(96,99,101)]'>{firstLetter}</span>
                    </div>
                </Link>
                {/* name & other details */}
                <div className='w-[87.12%] h-[3.25rem] ml-2 flex flex-col'>
                    {/* name */}
                    <Link href={`/user/${owner}`} className='w-full h-9 flex flex-col'>
                        <span className='w-full h-[1.25rem] flex'>
                            <span className='h-full flex items-center text-black text-sm font-semibold hover:underline capitalize dark:text-[rgba(255,255,255,0.9)] dark:hover:text-[#0A66C2] hover:text-[#0A66C2]'>{name}</span>
                            <span className='h-full ml-1 flex items-center text-xs dark:text-[rgba(255,255,255,0.6)] text-[#666666]'>
                                {( isFollow == true ) ? (
                                <>
                                    <span className='h-full text-lg flex items-end mr-1'>. </span><span>following</span>
                                </>
                                ) : " "}
                            </span>
                        </span>

                        <span className='w-full h-[calc(100%-1.25rem)] flex items-center text-xs dark:text-[rgba(255,255,255,0.6)] text-[#666666]'>
                            Designation and Some User Courier Info...
                        </span>

                    </Link>
                    {/* time */}
                    <Link href={"#"} className='w-full h-4 flex items-center text-xs dark:text-[rgba(255,255,255,0.6)] text-[#666666]'>
                        <span className='flex items-start'>1d<span className='flex items-start justify-center mx-1'>. </span></span><FaGlobeAmericas className='w-4 h-4' />
                    </Link>
                </div>
                </>
            )}
            {!isDataFromLocal && (
                <>
                {/* User-Pic */}
                <Link href={`/user/${each?.author?._id}`} className='w-12 h-[3.25rem]'>
                    <div className='w-12 h-12 rounded-[50%] flex justify-center items-center bg-slate-300 dark:bg-[rgb(56,67,79)]'>
                        {each?.author?.profileImage != null ? (
                            <Image src={each.author.profileImage} alt='user-profile-pic' width={48} height={48} priority className='rounded-[50%]'/>)
                        : (<div className="w-12 h-12">
                                <span className='w-full h-full dark:bg-[rgb(27,31,35)] dark:text-[rgb(255,255,255,0.9)] bg-[#7A1CA4] flex justify-center
                                 items-center uppercase text-[26px] font-semibold dark:shadow-sm dark:shadow-[rgb(139,141,143)] text-white rounded-[50%] outline outline-1
                                dark:outline-[rgb(96,99,101)]'>{firstLetter}</span>
                            </div>) 
                        }
                    </div>
                </Link>
                {/* name & other details */}
                <div className='w-[87.12%] h-fit ml-2 flex flex-col'>
                    {/* name */}
                    <Link href={`/user/${each?.author?._id}`} className='w-full h-fit flex flex-col'>
                        <span className='w-full h-fit flex items-center'>
                            <span className='h-full flex items-center text-black text-sm font-semibold hover:underline dark:text-[rgba(255,255,255,0.9)] dark:hover:text-[#0A66C2] hover:text-[#0A66C2]'>{each?.author?.name}</span>
                            <span className='h-full ml-1 flex items-center text-xs dark:text-[rgba(255,255,255,0.6)] text-[#666666]'>
                                {( isFollow == true ) ? (
                                <>
                                    <span className='h-full text-lg flex items-end mr-1'>. </span><span>following</span>
                                </>
                                ) : " "}
                            </span>
                        </span>

                        <span className='w-full h-fit flex items-center text-xs dark:text-[rgba(255,255,255,0.6)] text-[#666666]'>
                            Designation and Some User Courier Info...
                        </span>
                    </Link>
                    {/* time */}
                    <Link href={"#"} className='w-full h-4 flex items-center text-xs dark:text-[rgba(255,255,255,0.6)] text-[#666666]'>
                        <span className='flex items-start'>{postDays}d<span className='flex items-start justify-center mx-1'>. </span></span><FaGlobeAmericas className='w-4 h-4' />
                    </Link>
                </div>
                </>         
            )}
        </div>
        {/* Follow & More option popUp & Cross sign */}
        <div className='w-[calc(100%-80.70%)] h-full flex flex-col justify-between items-end'>
            <div className='w-[4.25rem] h-fit flex items-center'>  
                {/* dots & option Pop up */}
                <div className='w-8 h-fit relative'>
                    {/* Icon */}
                    <button ref={dotRef} onClick={() => setPostOption(!postOption)} className='w-full h-7 flex items-center
                     justify-center rounded-[50%] dark:hover:bg-[rgb(43,47,50)] hover:bg-[#EBEBEB]'>
                        <BsThreeDots className='w-5 h-5 dark:text-[rgba(255,255,255,0.6)] dark:hover:text-[rgba(255,255,255,0.9)] text-[#666666]'/>
                    </button>
                    {/* Option_Popup- Div */}
                    <div ref={postRef} className={'absolute right-0 w-[200px] res-620:w-[335px] h-fit py-1 dark:bg-[#1B1F23] bg-white outline outline-1 shadow-lg dark:outline-[#1B1F23] outline-[#e1e1e1] rounded-sm ' + (
                        (postOption ? 'block' : 'hidden')
                    )}>
                        <div className='w-full h-full'>
                            <ul className='w-full h-full list-none text-[#404040] font-semibold text-sm'>                            
                                {/* 1 */}                                                         
                                <li onClick={copyToClipboard} className='w-full h-[56px] dark:hover:bg-[rgb(43,47,50)] hover:bg-[#e1e1e1] cursor-pointer'>
                                    <div className='w-full h-full px-4 py-2 flex items-center dark:text-[rgba(255,255,255,0.9)]'>
                                        {/* icons */}
                                        <div className='w-6 h-6 mr-2 '>
                                            <IoIosLink className='w-full h-full' />
                                        </div>
                                        <div className='w-[calc(100%-32px)] h-5'>
                                            Copy link to post
                                        </div>
                                    </div>
                                </li>
                                {/* 2 */}
                                {isDataFromLocal && (
                                    <li className='hidden w-full h-[56px] dark:hover:bg-[rgb(43,47,50)] hover:bg-[#e1e1e1] cursor-pointer'>
                                        <div className='w-full h-full px-4 py-2 flex items-center dark:text-[rgba(255,255,255,0.9)]'>
                                            {/* icons */}
                                            <div className='w-6 h-6 mr-2 '>
                                                <MdModeEditOutline className='w-full h-full' />
                                            </div>
                                            <div className='w-[calc(100%-32px)] h-5'>
                                                Edit the Post
                                            </div>
                                        </div>
                                    </li>

                                )}
                                {!isDataFromLocal && (
                                    <li onClick={() => handleFollowUnfollow(each?.author?._id, token)} className='w-full h-[56px] dark:hover:bg-[rgb(43,47,50)] hover:bg-[#e1e1e1] cursor-pointer'>
                                        <div className='w-full h-full px-4 py-2 flex items-center dark:text-[rgba(255,255,255,0.9)]'>
                                            {/* icons */}
                                            <div className='w-6 h-6 mr-2 '>
                                                <RxCrossCircled className='w-full h-full' />
                                            </div>
                                            <div className='w-[calc(100%-32px)] h-5'>
                                                {( isFollow ) ? "Unfollow" : "Follow" } {each?.author?.name}
                                            </div>
                                        </div>
                                    </li>
                                )}
                                {/* 3 */}
                                {isDataFromLocal && (
                                    <li onClick={() => handleDeletePost(each?._id, token)} className='w-full h-[56px] dark:hover:bg-[rgb(43,47,50)] hover:bg-[#e1e1e1] cursor-pointer'>
                                        <div className='w-full h-full px-4 py-2 flex items-center dark:text-[rgba(255,255,255,0.9)]'>
                                            {/* icons */}
                                            <div className='w-6 h-6 mr-2 '>
                                                <MdDeleteForever className='w-full h-full' />
                                            </div>
                                            <div className='w-[calc(100%-32px)] h-5'>
                                                Delete post
                                            </div>
                                        </div>
                                    </li>
                                )}
                                {!isDataFromLocal && (
                                    <li onClick={() => handleReport()} className='w-full h-[56px] dark:hover:bg-[rgb(43,47,50)] hover:bg-[#e1e1e1] cursor-pointer'>
                                        <div className='w-full h-full px-4 py-2 flex items-center dark:text-[rgba(255,255,255,0.9)]'>
                                            {/* icons */}
                                            <div className='w-6 h-6 mr-2 '>
                                                <IoFlag className='w-full h-full' />
                                            </div>
                                            <div className='w-[calc(100%-32px)] h-5'>
                                                Report post
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* cross */}
                <button onClick={handleHidePost} className='ml-1 w-8 h-7 flex justify-center
                 items-center rounded-[50%] dark:hover:bg-[rgb(43,47,50)] hover:bg-[#EBEBEB]'>
                    <RxCross1 className='w-4 h-4 dark:text-[rgba(255,255,255,0.6)] dark:hover:text-[rgba(255,255,255,0.9)] text-[#666666] font-extrabold' />
                </button>
            </div>
            {/* follow */}
            {!isDataFromLocal && (
                <button onClick={() => handleFollowUser(each?.author?._id, token)} className={'w-fit h-7 px-1.5 py-1 mr-2 rounded-md hover:bg-[#E2F0FE] dark:hover:bg-[rgb(43,47,50)] text-[#0A66C2] flex items-center justify-center ' 
                + ( isFollow === false ? 'block' : 'hidden'
                )}>
                    <FaPlus className='w-3 h-3 mr-1' />
                    <span className='text-sm font-semibold'>Follow</span>
                </button>
            )}
        </div>              
    </div>
  )
}
export default PostTopBar;