'use client'
import React, { useEffect, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { SlLike } from "react-icons/sl";
import { FaRegCommentDots } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import Comments, { preLoadComments } from './Comments';
import getComments from '../lib/getComments';
import upVotePost from '../lib/upVotePost';
 


const CommentReaction = ({postId}) => {
  const [showCommnent, setShowComment] = useState(false);

  preLoadComments(postId)

  async function handleCommentsFetch(postId){
    setShowComment(!showCommnent)
    // if(!showCommnent){
    //     const commentData = await getComments(postId)
    //     console.log("commentData ", commentData);
    // }
  }

  async function handleUpVotePost(postId){
    const upVote = await upVotePost(postId)
    console.log("clicked post is liked or not:- ", upVote)
  }

  return (
    <>
      {/* Button- Like, comment & others */}
      <div className='w-full h-[3.5rem] py-1 px-4 flex justify-between'>

        {/* like */}
        <span onClick={() => handleUpVotePost(postId)} className='w-[7.0313rem] h-full rounded-md hover:bg-[#EBEBEB]'>
          <button className='w-full h-full py-[10px] px-2 flex justify-center items-center'> <SlLike className='w-6 h-6 stroke-1 text-[#666666] mr-1' />
              <span className='text-sm text-[#858585] h-full flex items-center'>Like</span>
          </button>
        </span>

        {/* comment */}
        <span onClick={() => handleCommentsFetch(postId)} className='w-[9.375rem] h-full rounded-md hover:bg-[#EBEBEB]'>
          <button className='w-full h-full py-[10px] px-2 flex items-center justify-center'>
            <FaRegCommentDots className='w-6 h-6 mr-1  text-[#666666]' />
            <span className='text-sm text-[#858585] h-full flex items-center'>Comment</span>
          </button>
        </span>

        {/* repost */}
        <div className='w-[8.1875rem] h-full rounded-md hover:bg-[#EBEBEB]'>
          <button className='w-full h-full py-[10px] px-2 flex items-center justify-center'>
            <BiRepost className='w-8 h-8 mr-1 text-[#666666]' />
            <span className='text-sm text-[#858585] h-full flex items-center'>Repost</span>
          </button>
        </div>

        {/* send */} 
        <div className='w-[7.3125rem] h-full rounded-md hover:bg-[#EBEBEB]'>
          <button className='w-full h-full py-[10px] px-2 flex items-center justify-center'>
            <BsFillSendFill className='w-6 h-6 mr-1 text-[#666666]' />
            <span className='text-sm text-[#858585] h-full flex items-center'>Send</span>
          </button>
        </div>

      </div>

      {/* Posting & Viewing all comment Component */}
      {showCommnent && <div className='w-full'><Comments postId={postId} /></div>}
    </>
    )

}

export default CommentReaction