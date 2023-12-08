'use client'
import React, { useEffect, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { SlLike } from "react-icons/sl";
import { FaRegCommentDots } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import Comments from './Comments';
import upVotePost from '../lib/upVotePost';
import { useContextProvider } from '../ContextApi/AppContextProvider';
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';



const CommentReaction = ({each, isDataFromLocal}) => {
  const { token } = useContextProvider()
  const [showCommnent, setShowComment] = useState(false);
  const [status, setStatus] = useState(false)
  const [likeBg, setLikeBg] = useState(false)
  const [likeCount, setLikeCount] = useState(0);
  const [countCheck, setCountCheck] = useState(1)
  const [commentCount, setCommentCount] = useState(0);
  const { alertDispatch } = useAlertContextProvider()

  useEffect ( () => {
    if(!isDataFromLocal){
      const likeCountt = each?.likeCount;
      setLikeCount(likeCountt-1)
    }   
  },[])

  /////////////
  useEffect( () => {
    if(!isDataFromLocal){
      
      setCommentCount(each?.commentCount)
    }
    // if(each?.commentCount){
    // }
  },[])

  /////////////
  function checkVoteStatus(){
    if(status){
      console.log("success like");
      setLikeBg(true)
      setLikeCount((prev) => prev + 1)
    }
    else if(countCheck === 1){
      console.log("inside else if as count check is only  1")
      setLikeBg(true)
      setStatus(false)
      setLikeCount((prev) => prev + 1)
      setCountCheck((prev) => prev + 1)
    }
  }

  async function handleCommentsFetch(postId){
    // {!isDataFromLocal && (
      setShowComment(!showCommnent)
    // )}
  }

  async function handleUpVotePost(postId, token){
    console.log("handleUpVotePost ", token);
    const upVote = await upVotePost(postId, token)
    console.log("clicked post is liked or not:- ", upVote)
    if(upVote?.status === 'success'){
      setStatus(true)
      checkVoteStatus()
    } 
    else{
      if(upVote?.status === 'fail' && upVote?.message === "You already liked this post") checkVoteStatus()
    }
  }

  function handleComingSoon(){
    alertDispatch({type: 'showComingSoon'})
    setTimeout(()=>{
      alertDispatch({type: 'hideComingSoon'})
      console.log("successfull")
    }, 2500)
  }

  return (
    <>

      {/* Total number of likes & comment */}
      <div className='w-full h-[2.125rem] py-2 px-4 border-b border-[#E8E8E8]'>
        <div className='w-full h-full'>
        
          <ul className='w-full h-full flex justify-between list-none text-xs  text-[#666666]'>

              {/* likes */}
              <li className='w-[25rem] h-full'>
                <button className='h-full flex items-center'>
                  <SlLike className='w-4 h-4 mr-1 text-[#368EE7]' />
                  {likeCount != 0 && likeCount > 1 &&  (
                    <span className='hover:text-[#0A66C2] hover:underline'>Xvz and {likeCount} others</span>
                  )}
                  {likeCount != 0 && likeCount < 2 && (
                    <span className='hover:text-[#0A66C2] hover:underline'>{likeCount}</span>
                  )}
                </button>
              </li>

              {/* comment */}
              <li className='w-fit h-full'>
                <button className='w-full h-full flex items-center'>
                  {!isDataFromLocal && (
                    <span className='hover:text-[#0A66C2] hover:underline'>{commentCount} comment</span>
                  )}
                  {isDataFromLocal && (
                    <span className='hover:text-[#0A66C2] hover:underline'>{commentCount} comment</span>
                  )}
                </button>
              </li>

              {/* repost */}
              {/* <li className='w-[3rem] h-full'></li> */}

          </ul>

        </div>
      </div>

      {/* Button- Like, comment & others */}
      <div className='w-full h-[3.5rem] py-1 px-4 flex justify-between'>

        {/* like */}
        <span onClick={() => handleUpVotePost(each?._id, token)} className='w-[7.0313rem] h-full rounded-md hover:bg-[#EBEBEB]'>
          <button className='w-full h-full py-[10px] px-2 flex justify-center items-center'> 
              <BsFillHandThumbsUpFill className={'w-[26px] h-[26px] stroke-1 stroke-[#666666]  mr-1 ' + (likeBg ? "fill-[#368EE7]" : "fill-white")} />
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
        <div onClick={() => handleComingSoon()} className='w-[8.1875rem] h-full rounded-md hover:bg-[#EBEBEB]'>
          <button className='w-full h-full py-[10px] px-2 flex items-center justify-center'>
            <BiRepost className='w-8 h-8 mr-1 text-[#666666]' />
            <span className='text-sm text-[#858585] h-full flex items-center'>Repost</span>
          </button>
        </div>

        {/* send */} 
        <div onClick={() => handleComingSoon()} className='w-[7.3125rem] h-full rounded-md hover:bg-[#EBEBEB]'>
          <button className='w-full h-full py-[10px] px-2 flex items-center justify-center'>
            <BsFillSendFill className='w-6 h-6 mr-1 text-[#666666]' />
            <span className='text-sm text-[#858585] h-full flex items-center'>Send</span>
          </button>
        </div>

      </div>

      {/* Posting & Viewing all comment Component */}
      {showCommnent && <div className='w-full'><Comments postId={each?._id} setCommentCount={setCommentCount} commentCount={commentCount} /></div>}

    </>
    )

}

export default CommentReaction