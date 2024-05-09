'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { MdDriveFolderUpload } from "react-icons/md";
import { useAlertContextProvider } from '@/app/ContextApi/AlertContextProvider';
import { useContextProvider } from '@/app/ContextApi/AppContextProvider';
import composePost from '@/app/_lib/composePost';


const MobilePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState('')
  const [textArea, setTextArea] = useState('')
  const { token, userName, setCheckLocal } = useContextProvider()
  const inputRef = useRef();
  const [imageFile, setImageFile] = useState();
  const { alertDispatch } = useAlertContextProvider();

  async function handleAddPost(){
    console.log(`content for adding to post is ${textArea}`)
    const postRes = await composePost(title, textArea, imageFile, token)
    if(postRes.status === 'fail'){
      if(postRes.message === 'Channel with this name already exists') return
    }
    else{
      const postObj = postRes?.data;
      if(localStorage.getItem('postData')){
        const storedData = JSON.parse(localStorage.getItem('postData'))
        const newData = JSON.stringify([...storedData, postObj])
        console.log("Post Data already existed")
        localStorage.setItem( 'postData', newData )
        setCheckLocal(prev => !prev)
        setTitle('')
        setTextArea('')
        setImageFile('')
        router.push('/feed')
      }
      else{
        const stringifyObj = JSON.stringify([postObj]);
        console.log("New Post Data Created");
        localStorage.setItem( 'postData' , stringifyObj );
        setCheckLocal(prev => !prev)
        setTitle('')
        setTextArea('')
        setImageFile('')
        router.push('/feed')
      }
    } 
    console.log("postRes ", postRes)
} 

  const logWindowWidth = () => {
    if(window?.innerWidth > 620 ){
      console.log("go back to large screen mode")
      router.push('/feed')
    }
  };

  useEffect(() => {
    logWindowWidth();
    window.addEventListener('resize', logWindowWidth);
    return () => {
      window.removeEventListener('resize', logWindowWidth);
    };
  }, []);

  function handleImageChange(e){
    const file = e.target.files[0];
    console.log('Selected file:', file);
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
      }
      else{
        console.log("only Image file are accepted")
        alertDispatch({ type: "imgAlertTrue" })
        setTimeout( () => {
          alertDispatch({ type: "imgAlertFalse" })
        }, 2500)
      }       
    }   
  }

  function handleIconClick(){
    inputRef?.current.click()
  }

// getting the first leter of UserName
  const name = userName;
  const firstLetter = name.charAt(0);

  return (
    <div className='bg-white dark:bg-[rgb(27,31,35)] w-screen z-20 h-screen'>
      {/* header */}
      <header className='w-full h-[50px] z-20 border-b dark:border-[rgb(255,255,255,0.6)] border-[#E8E8E8] flex items-center'>
        <div onClick={() => router.back()} className='w-12 h-[35px]'>
          <button className='w-full h-full p-1 flex items-center rounded-[50%] justify-center text-[#666666] dark:text-[rgb(255,255,255,0.6)] dark:hover:bg-[#2C2F33] '>
            <RxCross1 className='w-6 h-6' />
          </button>
        </div>
        <div className='w-[calc(100%-35px-32px-62px-16px-4px)] dark:text-[rgb(255,255,255,0.9)] h-[25px] mx-4 text-[20px]
         font-medium text-[#191919] flex items-center '>Share</div>    
        <span className='w-[62px] h-[34px] my-2 ml-4 mr-1 flex items-center justify-center'>
          <div className='w-full h-full flex justify-end items-center'>
            <div onClick={handleAddPost} className='w-full h-full  text-base font-semibold'>
              <button disabled={( textArea?.length>0 && title?.length>0 ) ? false : true} className='w-full h-full px-4 py-[7px]
              border disabled:cursor-not-allowed text-sm font-semibold disabled:bg-[#E8E8E8] disabled:text-[#AFAFAF] text-white
              rounded-3xl dark:border-none bg-[#116AC3] flex justify-end items-center dark:disabled:bg-[#373A3D] dark:disabled:text-[rgb(255,255,255,0.5)]'>Post</button>
            </div>
          </div>
        </span>
      </header>
      {/* typing post container */}
      <div className='w-full h-fit z-20 flex flex-col'>
        {/* post container space */}
        <div className='w-full h-fit p-4'>
          {/* heading */}
          <div classname='w-full h-[56px]'>
            <div className='w-full h-full py-2 flex items-center '>
              {/* User pic */}
              <div className='w-14 h-10'>
                {/* Image */}
                <span className='w-12 h-12 bg-[#7A1CA4] flex justify-center items-center uppercase text-3xl font-bold text-white rounded-[50%]'>{firstLetter}</span>
              </div>
              {/* User name */}
              <div className='w-[calc(100%-56px)] h-[37px] flex flex-col'>
                <div className='w-full h-fit flex'>
                  <span className='h-full dark:text-[rgb(255,255,255,0.9)] text-[#191919] capitalize text-sm font-medium'>{name}</span>
                </div>
                <div className='w-full h-fit text-xs dark:text-[rgb(255,255,255,0.6)] text-[#666666] flex items-center'>Post to connection only</div>
              </div>
            </div>
          </div>
          {/* space */}
          <div className='w-full min-h-[50px] mt-2 mb-4 max-h-fit'>
            <input type='text' 
              placeholder='Title'
              value={title}
              className='w-full h-fit dark:text-[rgb(255,255,255,0.9)] dark:placeholder:text-[rgb(255,255,255,0.6)] text-[#353535] text-base placeholder:text-base placeholder:text-[#9E9E9E]
                outline-none break-words whitespace-normal '
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className='w-full h-[1px] bg-[#E8E8E8] rounded-sm '></div>
            <textarea placeholder='What do you want to talk about?'
              className='w-full h-fit dark:text-[rgb(255,255,255,0.9)] dark:placeholder:text-[rgb(255,255,255,0.6)] text-[#353535] text-base placeholder:text-base placeholder:text-[#9E9E9E]
              outline-none break-words whitespace-normal resize-none 'rows={3} value={textArea} onChange={(e) => setTextArea(e.target.value)} >          
            </textarea>
          </div>
        </div>
        {/* Icon */}
        <div className='w-full h-[54px] mt-2 border-t dark:border-[rgb(255,255,255,0.6)] border-[#E8E8E8] flex '>
          <div className='w-full h-[96px] mb-[9px] flex'>
            <input ref={inputRef} type="file" accept="image/*" onChange={handleImageChange} className='w-0.5 h-0' />
            <MdDriveFolderUpload onClick={handleIconClick} className='w-16 h-8 dark:text-[rgb(255,255,255,0.6)] text-[#404040]' />
          </div>
        </div> 
      </div>
    </div>
  )
}

export default MobilePost;