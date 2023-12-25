'use client'
import Link from 'next/link';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import { RxCross1 } from "react-icons/rx";
import { Gi3DMeeple } from "react-icons/gi";
import { PiWarningOctagonFill } from "react-icons/pi";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { usePathname, useRouter } from 'next/navigation';
import getPosts from '@/app/_lib/getPosts';
import FeedPosts from '@/app/_components/FeedPosts';
import AddingPost from '@/app/_components/AddingPost';
import { useContextProvider } from '@/app/ContextApi/AppContextProvider';
import LeftTopBar from '@/app/_components/LeftTopBar';
import LeftBottomBar from '@/app/_components/LeftBottomBar';
import AsidePremium from '@/app/_components/AsidePremium';
import { useAlertContextProvider } from '@/app/ContextApi/AlertContextProvider';
import PostTopBar from '@/app/_components/PostTopBar';
import PostContent from '@/app/_components/PostContent';
import CommentReaction from '@/app/_components/CommentReaction';
import AlertBox from '@/app/_components/AlertBox';
import TopBottomNav from '@/app/_components/MobileComponents/TopBottomNav';
import fetchSinglePost from '../_lib/fetchSinglePost';


const GroupPostContainer = ({key, data}) => {
    const [postData, setPostData] = useState('')
    const { token, userName, owner, checkLocal, setCheckLocal } = useContextProvider();
    const [localData, setLocalData] = useState('');
    const { alertImageUpload, alertLinkCopied, alertPostCreated, alertReportPost, alertReportComment, alertDispatch } = useAlertContextProvider()
    const [isDataFromLocal, setIsDataFromLocal] = useState(false);
    const [isGroupPost, setIsGroupPost] = useState(true) 

    useEffect( () => {
        async function fetchPost(id, token){
            const postRes = await fetchSinglePost(id, token)
            console.log("Fetch Result of SINGLE post is :- ", postRes)
            if(postRes.status === "success"){
                setPostData(postRes?.data)
            }
        }
        fetchPost(data?._id, token) 
    },[])


    return (  
        <div key={key} className='w-full bg-white rounded-lg mb-3'>
            <div className='w-full'>
                <div className='w-full mb-3'>
                    {/* post-top-bar */}
                    <PostTopBar each={postData} 
                                localData={localData}
                                setLocalData={setLocalData} 
                                isDataFromLocal={isDataFromLocal} 
                                setCheckLocal={setCheckLocal}
                                isGroupPost={isGroupPost} />            
                    {/* post-Content */}
                    <PostContent content={postData?.content} title={data?.title}/>
                    {/* Content- Pic */}
                    {data?.images && data.images.length > 0 && (  
                        <div className='w-full h-fit mt-2 bg-slate-300'>
                            <div className='w-full h-full'>
                                {/* Image Component */}
                                <Image src={data?.images[0]} width={555} height={300} priority alt='pic' />
                            </div>
                        </div>
                    )}
                    {/* Like, Comment and Post */}
                    <div className='w-full  flex flex-col'>
                        <CommentReaction each={postData} isDataFromLocal={isDataFromLocal} />  
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default GroupPostContainer