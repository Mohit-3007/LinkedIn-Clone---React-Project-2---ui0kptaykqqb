'use client'
import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { RxCross1 } from "react-icons/rx";
import { useContextProvider } from '../ContextApi/AppContextProvider';

import { MdDriveFolderUpload } from "react-icons/md";
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';
import composePost from '../_lib/composePost';




const AddingPost = forwardRef(({ setShowAlertImg, setShowPostCompo, setShowAlertPost }, ref) => 
{
    const [title, setTitle] = useState('')
    const [textArea, setTextArea] = useState('')
    const { token, userName, setCheckLocal } = useContextProvider()
    const [imageFile, setImageFile] = useState()
    const inputRef = useRef()
    const { alertDispatch } = useAlertContextProvider()

    function handleCrossButton(){
        setShowPostCompo(false)
        console.log("click")
    }

    async function handleAddPost(){
        console.log(`content for adding to post is ${textArea}`)
        const postRes = await composePost(title, textArea, imageFile, token)
        if(postRes.status === 'fail'){
            // if(postRes.message === 'Channel with this name already exists') return
        }
        else{
            const postObj = postRes?.data;

            if(localStorage.getItem('postData')){
                const storedData = JSON.parse(localStorage.getItem('postData'))
                const newData = JSON.stringify([...storedData, postObj])

                console.log("Post Data already existed")
                localStorage.setItem( 'postData', newData )
                alertDispatch({ type: "showPostCreAlert" })
                // setShowAlertPost(prev => !prev)
                setShowPostCompo(false)
                setCheckLocal(prev => !prev)
                setTitle('')
                setTextArea('')
                setImageFile('')
                setTimeout( () => {
                    console.log('Close Alert')
                    alertDispatch({ type: "hidePostCreAlert" })
                }, 2500)
            }
            else{
                const stringifyObj = JSON.stringify([postObj]);
                console.log("New Post Data Created");
                localStorage.setItem( 'postData' , stringifyObj );

                alertDispatch({ type: "showPostCreAlert" })
                // setShowAlertPost(prev => !prev)
                setShowPostCompo(false)
                setCheckLocal(prev => !prev)
                setTitle('')
                setTextArea('')
                setImageFile('')
                setTimeout( () => {
                    console.log('Close Alert')
                    alertDispatch({ type: "hidePostCreAlert" })
                }, 2500)
            }
        } 

        console.log("postRes ", postRes)
    } 

// getting the first leter of UserName
    const name = userName;
    const firstLetter = name.charAt(0);

    function handleImageChange(e){
        const file = e.target.files[0];
        console.log('Selected file:', file);
        if (file) {
            if (file.type.startsWith('image/')) {
                setImageFile(file);
                // const reader = new FileReader(); 
                // reader.onload = function (e) {
                //     console.log("e.target.result ",e.target.result);
                //     setImgUrl(e.target.result)
                // };
                // reader.readAsDataURL(file);
            }
            else{
                alertDispatch({ type: "imgAlertTrue" })
                setTimeout( () => {
                    alertDispatch({ type: "imgAlertFalse" })
                }, 2500)
                // setShowAlertImg(prev => !prev)
            }       
        }   
    }

    function handleIconClick(){
        inputRef?.current.click()
    }

    return (
        <div  className='w-full h-[592px] z-30 bg-[#666666] bg-opacity-70 fixed top-[30px] flex items-center justify-center'>
            <div ref={ref} className='w-full res-748:w-[744px] h-full bg-white shadow-xl rounded-xl'>

                <div className='w-full h-full flex flex-col shadow-xl'>

                    {/* Heading */}
                    <div className='w-full h-[112px] pl-6 py-4 flex'>
                        
                        {/* user pic & Name */}
                        <div className='w-[672px] h-full'>
                            <button className='h-full p-3 flex items-center rounded-2xl hover:bg-[#EBEBEB]'>

                                {/* User pic */}
                                <div className='w-14 h-14'>
                                    {/* Image */}
                                    <span className='w-full h-full bg-[#7A1CA4] flex justify-center items-center uppercase text-3xl font-bold text-white rounded-[50%]'>{firstLetter}</span>
                                </div>

                                {/* User name */}
                                <div className='ml-1 px-2 w-[176px] h-[45px] flex flex-col'>
                                    <div className='w-full h-[25px] flex justify-between'>
                                        <span className='h-full text-[#191919] capitalize text-[20px] font-semibold'>{name}</span>
                                    </div>
                                <div className='w-full h-[20px] text-sm text-[#191919] flex items-center'>Post to connection only</div>
                                </div>

                            </button>
                        </div>

                        {/* cross button */}
                        <button onClick={handleCrossButton} className='w-10 h-10 flex rounded-[50%] items-center justify-center hover:bg-[#EBEBEB] '>
                            <RxCross1 className='w-6 h-6 text-[#666666]' />
                        </button>

                    </div>

                    {/* Post Content */}
                    <div className='w-full h-[calc(100%-112px)] flex flex-col'>

                        {/* content space */}
                        <div className='w-full h-[299px]'>
                            <div className='w-full min-h-[120px] max-h-full'>
                                <div className='w-[calc(100%-48px)] min-h-full max-h-full  mx-6 my-3 flex flex-col'>
                                    <input type='text' 
                                        placeholder='Title'
                                        value={title}
                                        className='w-full h-fit text-[#353535] text-[24px] placeholder:text-[24px] placeholder:text-[#9E9E9E]
                                         outline-none break-words whitespace-normal '
                                         onChange={(e) => setTitle(e.target.value)}
                                          />

                                         <div className='w-full h-[1px] bg-[#E8E8E8] rounded-sm my-1'></div>

                                    <textarea placeholder='What do you want to talk about?'
                                        className='w-full h-full text-[#353535] text-[20px] placeholder:text-[20px] placeholder:text-[#9E9E9E]
                                         outline-none break-words whitespace-normal resize-none ' rows={10} value={textArea} onChange={(e) => setTextArea(e.target.value)} ></textarea>
                                </div>
                            </div>
                        </div>
                        
                        {/* Icons and post button */}
                        <div className='w-full h-[calc(100%-311px)] mt-3 flex flex-col'>

                            {/* Icons upload */}
                            <div className='w-full h-[96px] mb-[9px] flex'>
                                <input ref={inputRef} type="file" accept="image/*" onChange={handleImageChange} className='w-0.5 h-0' />
                                <MdDriveFolderUpload onClick={handleIconClick} className='w-16 h-8 text-[#404040]' />
                            </div>

                            {/* button */}
                            <div className='w-full h-16 py-3 pl-4 pr-6 flex justify-end border-t border-[#E8E8E8]'>
                                <div className='w-[108px] h-full flex justify-end items-center'>
                                    <div onClick={handleAddPost} className='w-16 h-8  text-base font-semibold'>
                                        <button disabled={( textArea?.length>0 && title?.length>0 ) ? false : true} className='w-full h-full px-4 py-[6px] disabled:cursor-not-allowed disabled:bg-[#E8E8E8] disabled:text-[#AFAFAF] text-white rounded-3xl bg-[#116AC3] flex justify-end items-center'>Post</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
})

export default AddingPost;


