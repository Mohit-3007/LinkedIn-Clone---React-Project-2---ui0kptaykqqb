'use client'
import React, { useEffect, useState } from 'react'
import { FaRegSmile } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { FaSortDown } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Link from 'next/link';
import postComment from '../lib/postComment';
import getComments from '../lib/getComments';
import { comment } from 'postcss';
import SingleComment from './SingleComment';



export const preLoadComments = (postId) => {
  void getComments(postId);
}


export const Comments = ({postId}) => {
  const [input, setInput] = useState('')
  const [commentData, setCommentData] = useState(null);

  useEffect(() => {
    async function fetchComments(){
      const commentData = await getComments(postId)
      console.log("commentData ", commentData.data);
      setCommentData(commentData.data);
    }
    fetchComments()
  },[postId])

  async function handlePostComment(postId){
    // console.log(input, postId)
    const postRes = await postComment(input, postId);
    console.log("is Comment added to post or not ?? ", postRes);
    // setInput('');
  }

  return (
    <>
        {/* Type and post a comment */}
        <div className='w-full px-4 h-max pt-1 pb-2 border-t-[1px] border-transparent flex items-start'>

            {/* user-profile pic */}
            <div className='w-10 h-10 mt-1 mr-1'>
              {/* user letter */}
              <span className='w-full h-full bg-[#7A1CA4] flex justify-center items-center text-xl font-bold text-white rounded-[50%]'>M</span>
            </div>

            {/* input div for typing comment */}
            <div className='w-[calc(100%-44px)] h-full border-y-[3px] border-transparent'>
              <form className='w-full h-full flex flex-col'>

                {/* input field div */}
                <div className='w-full h-10 border-[1px] border-[#B2B2B2] rounded-[20px]'>
                  <div className='w-full h-full flex'>
                    {/* input area */}
                    <div className='w-[calc(100%-80px)] h-full p-[9.5px]'>
                      <div className='w-full h-full flex items-center'>
                        <input type='text' placeholder='Add a comment...' value={input} onChange={(e) => setInput(e.target.value)}
                          className='w-full h-full text-sm outline-none text-black placeholder:text-[#666666] placeholder:text-sm' />
                      </div>
                    </div>
                    {/* emoji's & upload icon */}
                    <div className='w-20 h-full flex'>

                      {/* smile */}
                      <div className='w-10 h-10 rounded-[50%] hover:bg-[#EBEBEB]'>
                        <span className='w-full h-full flex items-center justify-center'>
                          <FaRegSmile className='w-5 h-5 text-[#666666]' />
                        </span>
                        {/* Icons component */}
                        <div className='hidden'></div>

                      </div>
                      {/* Upload */}
                      <div className='w-10 h-10 rounded-[50%] hover:bg-[#EBEBEB]'>
                        <span className='w-full h-full flex items-center justify-center'>
                          <RiGalleryFill className='w-5 h-5 fill-[#666666] ' />
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Button Div for Post comment */}
                {input && input.length && ( 
                   <div className='w-full h-9'>
                      <button onClick={() => handlePostComment(postId)} className='w-[51px] h-6 mt-3 bg-[#0A66C2] rounded-[35px] text-sm text-white font-medium flex items-center justify-center'>
                        <span>Post</span>
                      </button>
                   </div> 
                 )}
                
              </form>
            </div>

        </div>

        {/* div for dropdown - commnet sort by  */}
        {/* pending???????????????????????  */}
        <div className='ml-3 mr-2 w-[calc(100%-20px)] h-6 mb-2'>
          <div className='w-full h-full flex items-center'>

            {/* drop down Button */}
            <div className='h-[17px] cursor-pointer'>
              <span className='h-full flex items-center text-[13.33px] text-[#838383] font-medium relative' >
                Most relevant<FaSortDown className='w-4 h-4 absolute -right-4 bottom-1 text-[#666666]' />
              </span>
            </div>
            {/* drop down PopUp div */}
            <div className='hidden'>

            </div>

          </div>
        </div>

        {/* view comments */}
        {/* h-[16.625rem] */}
        <div className='w-full  flex flex-col'>   

          {/* comments div- MAP FUNCTION */}
          <div className='w-full'>

            {commentData  && commentData.map((each, key) => {
              return <SingleComment data={each} key={key} />            
            })}

          </div>

          {/* load more div */}
          <div className='w-full h-8'>
            <button className='w-[calc(100%-16px)] ml-4 px-2 h-[calc(100%-8px)] mb-2 py-0.5 rounded-md hover:bg-[#EBEBEB] flex justify-start '>
              <span className='text-sm font-medium text-[#666666]'>Load more comments</span>
            </button>

          </div>

        </div>

    </>
  )
}

export default Comments;

