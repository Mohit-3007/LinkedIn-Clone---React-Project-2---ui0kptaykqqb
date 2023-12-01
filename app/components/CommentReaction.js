'use client'
import React, { useEffect, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { SlLike } from "react-icons/sl";
import { FaRegCommentDots } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import Comments, { preLoadComments } from './Comments';
import upVotePost from '../lib/upVotePost';
import { useContextProvider } from '../ContextApi/AppContextProvider';
import { BsFillHandThumbsUpFill } from "react-icons/bs";


const CommentReaction = ({each}) => {
  const { token } = useContextProvider()
  const [showCommnent, setShowComment] = useState(false);
  const [status, setStatus] = useState(false)
  const [likeBg, setLikeBg] = useState(false)
  const [likeCount, setLikeCount] = useState();
  const [countCheck, setCountCheck] = useState(1)

  useEffect ( () => {
    const likeCountt = each?.likeCount;
    setLikeCount(likeCountt-1)
  },[])

  function checkVoteStatus(){
    if(status){
      console.log("success like");
      setLikeBg(true)
      setLikeCount((prev) => prev + 1)
    }
    else if(countCheck === 1){
      console.log("inside else if as count check is only  1")
      setLikeBg(true)
      setLikeCount((prev) => prev + 1)
      setCountCheck((prev) => prev + 1)
    }
  }

  // useEffect( () => {
  //   if(status){
  //     setLikeCount((prev) => prev + 1)
  //   }
  //   else if(countCheck === 1){
  //     console.log("inside else if as count check is only  1")
  //     setLikeCount((prev) => prev + 1)
  //     setCountCheck((prev) => prev + 1)
  //   }


  // },[status])


  preLoadComments(each?._id, token)

  async function handleCommentsFetch(postId){
    setShowComment(!showCommnent)
    // if(!showCommnent){
    //     const commentData = await getComments(postId)
    //     console.log("commentData ", commentData);
    // }
  }

  async function handleUpVotePost(postId, token){
    console.log("handleUpVotePost ", token);
    const upVote = await upVotePost(postId, token)
    console.log("clicked post is liked or not:- ", upVote)
    if(upVote?.status === 'success'){
      setStatus(true)
      checkVoteStatus()
    } 
    if(upVote?.status === 'fail' && upVote?.message === "You already liked this post") checkVoteStatus()
  }

  return (
    <>

      {/* Total number of likes & comment */}
      <div className='w-full h-[2.125rem] py-2 px-4 border-b border-yellow-500'>
        <div className='w-full h-full'>
        
          <ul className='w-full h-full flex list-none text-xs  text-[#666666]'>
              {/* likes */}
              <li className='w-[25rem] h-full'>
                <button className='h-full flex items-center'>
                  <SlLike className='w-4 h-4 mr-1 text-[#368EE7]' />
                  <span className='hover:text-[#0A66C2] hover:underline'>Xvz and {likeCount} others</span>
                </button>
              </li>
              {/* comment */}
              <li className='w-fit h-full'>
                <button className='w-full h-full flex items-center'><span className='hover:text-[#0A66C2] hover:underline'>{each?.commentCount} comment</span></button>
              </li>
              {/* repost */}
              <li className='w-[3rem] h-full'></li>
          </ul>

        </div>
      </div>

      {/* Button- Like, comment & others */}
      <div className='w-full h-[3.5rem] py-1 px-4 flex justify-between'>

        {/* like */}
        <span onClick={() => handleUpVotePost(each?._id, token)} className='w-[7.0313rem] h-full rounded-md hover:bg-[#EBEBEB]'>
          <button className='w-full h-full py-[10px] px-2 flex justify-center items-center'> 
              <BsFillHandThumbsUpFill className={'w-[26px] h-[26px] stroke-1  mr-1 ' + (likeBg ? "fill-[#368EE7]" : "fill-slate-400")} />
              <span className='text-sm text-[#858585] h-full flex items-center'>Like</span>
          </button>
        </span>
        
        {/* comment */}
        <span onClick={() => handleCommentsFetch(each?._id)} className='w-[9.375rem] h-full rounded-md hover:bg-[#EBEBEB]'>
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
      {showCommnent && <div className='w-full'><Comments postId={each?._id} /></div>}

    </>
    )

}

export default CommentReaction