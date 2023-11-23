'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { FaGlobeAmericas } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { SlLike } from "react-icons/sl";
import getPosts from '../lib/getPosts';
import CommentReaction from './CommentReaction';



export const FeedPosts =  ({data}) => {
    const [res, setRes] = useState(data)
    const [page, setPage] = useState(2)

    // const data = await getPosts({limit:20, page:1})

    useEffect(()=> {      
       async function callFetch(){
        console.log(`fetch request sent with page no ${page}`)
            const data = await getPosts({limit:2, page:page})
            setRes((prev) => [...prev, ...data.data])
        }
        callFetch()
    }, [page])

    useEffect(() => {
        const handleScroll = async () => {
        //   console.log("Scrolling");    
          if(
            window.innerHeight + Math.round(window.scrollY) >=
            document.body.offsetHeight
          ){
            setPage((prev) => prev + 1)
            // setFetch(fetch);
            console.log("FETCH AGAIN");   
          }    
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

  
  return (
    <div>
        {res && res.map(each => {

            return (
                <div key={each._id} className='w-full bg-white rounded-lg'>
                    <div className='w-full'>
                        <div className='w-full mb-3'>

                            {/* post-top-bar */}
                            <div className='w-full h-16 mb-2 pl-4 pt-3 flex'>
                            
                                {/* user pic, name & other details */}
                                <div className='w-[27.1875rem] h-[3.25rem] mr-8 flex'>

                                    {/* User-Pic */}
                                    <Link href={"#"} className='w-12 h-[3.25rem]'>
                                    <div className='w-12 h-12 rounded-[50%] bg-slate-300'>
                                        {/* Image-Component */}
                                        <Image src={each?.author?.profileImage} alt='user-profile-pic' width={48} height={48} priority className='rounded-[50%]'/>
                                    </div>
                                    </Link>

                                    {/* name & other details */}
                                    <div className='w-[23.6875rem] h-[3.25rem] ml-2 flex flex-col'>
                                        {/* name */}
                                        <Link href={"#"} className='w-full h-9 flex flex-col'>

                                            <span className='w-full h-[1.25rem] flex'>
                                                <span className='h-full flex items-center text-black text-sm font-semibold hover:underline hover:text-[#0A66C2]'>{each?.author?.name}</span>
                                                <span className='h-full ml-1 flex items-center text-xs text-[#666666]'><span className='h-full text-lg flex items-end mr-1'>. </span>  Following</span>
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

                                {/* More option popUp & Cross sign */}
                                <div className='w-[4.25rem] h-8 flex'>  
                                    {/* dots */}
                                    <div className='w-8 h-8'>
                                        {/* Icon */}
                                        <button className='w-full h-full flex items-center justify-center rounded-[50%] hover:bg-[#EBEBEB]'><BsThreeDots className='w-6 h-6 fill-[#666666]'/></button>
                                        {/* Option_Popup- Div */}
                                        <div className='hidden'></div>
                                    </div>
                                    {/* cross */}
                                    <button className='ml-1 w-8 h-8 flex justify-center items-center rounded-[50%] hover:bg-[#EBEBEB]'>
                                    <RxCross1 className='w-5 h-5 text-[#666666] font-extrabold' />
                                    </button>
                                </div>

                            </div>

                            {/* post-Content */}
                            <div className='w-[calc(100%-8px)] mr-2'>
                                <div className='w-[calc(100%-32px)] mx-4'>
                                    {/* Content */}
                                    <div className='w-full'>
                                        <span className='w-full text-black text-sm'>{each.content}</span>
                                    </div>
                                    {/* See More- Button */}
                                    <button className='w-[4.6875rem] h-5 pl-2 flex items-center'><span className='w-full h-full text-xs flex items-center text-[#666666] hover:text-[#0A66C2] hover:underline'>...see more</span></button>
                                </div>
                            </div>

                            {/* Content- Pic or Video */}
                            <div className='w-full h-[555px] mt-2 bg-slate-300'>
                                <div className='w-full h-full'>
                                    {/* Image Component */}
                                    <Image src={each.channel?.image} width={555} height={300} priority alt='pic' />
                                </div>
                            </div>

                            {/* Like, Comment and Post */}
                            <div className='w-full  flex flex-col'>

                                {/* Total number of likes & comment */}
                                <div className='w-full h-[2.125rem] py-2 px-4 border-b border-yellow-500'>
                                    <div className='w-full h-full'>
                                    
                                    <ul className='w-full h-full flex list-none text-xs  text-[#666666]'>
                                        {/* likes */}
                                        <li className='w-[25rem] h-full'>
                                        <button className='h-full flex items-center'>
                                            <SlLike className='w-4 h-4 mr-1 fill-[#368EE7]' />
                                            <span className='hover:text-[#0A66C2] hover:underline'>Xvz and {each.likeCount} others</span>
                                        </button>
                                        </li>
                                        {/* comment */}
                                        <li className='w-fit h-full'>
                                        <button className='w-full h-full flex items-center'><span className='hover:text-[#0A66C2] hover:underline'>{each.commentCount} comment</span></button>
                                        </li>
                                        {/* repost */}
                                        <li className='w-[3rem] h-full'></li>
                                    </ul>

                                    </div>
                                </div>

                                <CommentReaction postId={each?._id} />

                       
                            </div>

                        </div>
                    </div>
                </div>
            )
        })}

    </div>
  )
}

export default FeedPosts;
