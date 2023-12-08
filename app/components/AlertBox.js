'use Client'
import Link from 'next/link';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';
import { RxCross1 } from "react-icons/rx";
import { Gi3DMeeple } from "react-icons/gi";
import { PiWarningOctagonFill } from "react-icons/pi";
import { FaCircleCheck } from "react-icons/fa6";
import { TbMessageReport } from "react-icons/tb";
import { RxLapTimer } from "react-icons/rx";

const AlertBox = () => {
  const { alertImageUpload, alertLinkCopied, alertPostCreated, alertReportPost, alertReportComment, alertComingSoon, alertDispatch } = useAlertContextProvider()
  const [firstRender, setFirstRender] = useState(true)
  const [showAlertLink, setShowAlertLink] = useState(true)
  const [showReportComm, setShowReportComm] = useState(true)
  const [showReportPost, setShowReportPost] = useState(true)
  const [showComngSoon, setShowComngSoon] = useState(true)

  // console.log(`Alert boxes alertImageUpload status is ${alertImageUpload}`)
  // console.log(`Alert boxes alertLinkCopied status is ${alertLinkCopied}`)
  // console.log(`Alert boxes alertPostCreated status is ${alertPostCreated}`)
  // console.log(`Alert boxes alertReportPost status is ${alertReportPost}`)
  // console.log(`Alert boxes alertReportComment status is ${alertReportComment}`)

  useLayoutEffect( () => {
    if(showReportComm) setShowReportComm(false)
    else setShowReportComm(true)
  },[alertReportComment])

  function handleCommReport(){
    alertDispatch({ type: "hideReportComment" })                     
  }
  ////////////

  useLayoutEffect( () => {
    if(showReportPost) setShowReportPost(false)
    else setShowReportPost(true)
  },[alertReportPost])

  function handlePostReport(){
    alertDispatch({ type: "hideReportPost" })                     
  }
  ////////////

  useLayoutEffect( () => {
    if(showComngSoon) setShowComngSoon(false)
    else setShowComngSoon(true)
  },[alertComingSoon])

  function handlePostReport(){
    alertDispatch({ type: "hideComingSoon" })                     
  }
  ////////////

  useLayoutEffect(()=> {
    // if(firstRender) {
    //   setFirstRender(false)
    // }
      if(showAlertLink) setShowAlertLink(false)    
      else setShowAlertLink(true)  
  },[alertLinkCopied])
   
  function handleLinkBox(){
    alertDispatch({ type: "hidelinkCop" })                      
  }
  ///////////
  
  
  return (
    <>
      
      {/* alertLinkCopied */}
      {showAlertLink &&  (
        <div className='w-fit h-fit p-4 flex fixed bottom-8 left-8 z-50 outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
            <div className='w-fit h-full flex items-center'>
                <div className='w-6 h-full mr-2'><FaCircleCheck className='w-6 h-6 text-[#77C45F]' /></div>
                <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm text-[#191919]'>Link copied to clipboard.</p>
            </div>
            <button className='w-8 h-full flex justify-end cursor-pointer '><RxCross1 onClick={handleLinkBox} className='w-4 h-4 text-[#666666] ' /></button>
        </div>
      )} 

      {/* alertReportComment */}
      {showReportComm &&  (
        <div className='w-fit h-fit p-4 flex fixed bottom-8 left-8 z-50 outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
            <div className='w-fit h-full flex items-center'>
                <div className='w-6 h-full mr-2'><TbMessageReport className='w-6 h-6 text-[#77C45F]' /></div>
                <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm text-[#191919]'>Comment Reported</p>
            </div>
            <button className='w-8 h-full flex justify-end cursor-pointer '><RxCross1 onClick={handleCommReport} className='w-4 h-4 text-[#666666] ' /></button>
        </div>
      )}

      {/* alertReportPost */}
      {showReportPost &&  (
        <div className='w-fit h-fit p-4 flex fixed bottom-8 left-8 z-50 outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
            <div className='w-fit h-full flex items-center'>
                <div className='w-6 h-full mr-2'><TbMessageReport className='w-6 h-6 text-[#77C45F]' /></div>
                <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm text-[#191919]'>Post Reported</p>
            </div>
            <button className='w-8 h-full flex justify-end cursor-pointer '><RxCross1 onClick={handlePostReport} className='w-4 h-4 text-[#666666] ' /></button>
        </div>
      )}

      {/* alertComngSoon */}
      {showComngSoon &&  (
        <div className='w-fit h-fit p-4 flex fixed bottom-8 left-8 z-50 outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
            <div className='w-fit h-full flex items-center'>
                <div className='w-6 h-full mr-2'><RxLapTimer className='w-6 h-6 text-[#77C45F]' /></div>
                <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm text-[#191919]'>Coming soon...</p>
            </div>
            <button className='w-8 h-full flex justify-end cursor-pointer '><RxCross1 onClick={handlePostReport} className='w-4 h-4 text-[#666666] ' /></button>
        </div>
      )}

    </>
  )
}

export default AlertBox