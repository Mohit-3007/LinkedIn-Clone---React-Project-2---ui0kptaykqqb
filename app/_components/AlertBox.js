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
  const { alertImageUpload, alertLinkCopied, alertPostCreated, alertReportPost, alertReportGroup, alertGroupCreated, 
    alertReportComment, alertComingSoon, alertGroupJoin, alertGroupLeft } = useAlertContextProvider()
  const [firstRender, setFirstRender] = useState(true)
  const [showAlertPost, setShowAlertPost] = useState(false)
  const [showAlertGrp, setShowAlertGrp] = useState(false)
  const [showAlertImg, setShowAlertImg] = useState(false)
  const [showAlertLink, setShowAlertLink] = useState(false)
  const [showReportComm, setShowReportComm] = useState(false)
  const [showReportPost, setShowReportPost] = useState(false)
  const [showReportGroup, setShowReportGroup] = useState(false)
  const [showComngSoon, setShowComngSoon] = useState(false)
  const [showGrpJoin, setShowGrpJoin] = useState(false)
  const [showGrpLeft, setShowGrpLeft] = useState(false)

  /////////////// showAlertPost /////////////
  useEffect( () => {
    if(firstRender) {
      setFirstRender(false)
    }
    else{
      if(showAlertPost) setShowAlertPost(false)
      else setShowAlertPost(true)
    }
  }, [alertPostCreated])

  /////////////// showAlertGroup /////////////
  useEffect( () => {
    if(firstRender) {
      setFirstRender(false)
    }   
    else{
      if(showAlertGrp) setShowAlertGrp(false)
      else setShowAlertGrp(true)
    }
  }, [alertGroupCreated])

  /////////////// showGroupJoin /////////////
  useEffect( () => {
    if(firstRender) {
      setFirstRender(false)
    }
    else{
      if(showGrpJoin) setShowGrpJoin(false)
      else setShowGrpJoin(true)
    }
  }, [alertGroupJoin])

  /////////////// showGroupLeft /////////////
  useEffect( () => {
    if(firstRender) {
      setFirstRender(false)
    }
    else{
      if(showGrpLeft) setShowGrpLeft(false)
      else setShowGrpLeft(true)
    }
  }, [alertGroupLeft])

  /////////////// showAlertImg //////////////
  useEffect( () => {
    if(firstRender) {
      setFirstRender(false)
    }
    else{
      if(showAlertImg) setShowAlertImg(false)
      else setShowAlertImg(true)
    }
  }, [alertImageUpload])

  ///////////////// showReportComm ///////////
  useEffect( () => {
    if(firstRender) {
      setFirstRender(false)
    }
    else{
      if(showReportComm) setShowReportComm(false)
      else setShowReportComm(true)
    }
  },[alertReportComment])
 
  ////////////// showReportPost //////////////
  useEffect( () => {
    if(firstRender) {
      setFirstRender(false)
    }
    else{
      if(showReportPost) setShowReportPost(false)
      else setShowReportPost(true)
    }
  },[alertReportPost])

  ////////////// showReportGroup //////////////
  useEffect( () => {
    if(firstRender) {
      setFirstRender(false)
    }
    else{
      if(showReportGroup) setShowReportGroup(false)
      else setShowReportGroup(true)
    }
  },[alertReportGroup])

  ////////////// showComngSoon //////////////
  useEffect( () => {
    if(firstRender) {
      setFirstRender(false)
    }
    else{
      if(showComngSoon) setShowComngSoon(false)
      else setShowComngSoon(true)
    }
  },[alertComingSoon])

  ////////////// showAlertLink //////////////
  useLayoutEffect(()=> {
    if(firstRender) {
      setFirstRender(false)
    }
    else{
      if(showAlertLink) setShowAlertLink(false)    
      else setShowAlertLink(true)  
    }
  },[alertLinkCopied])
  
  
  return (
  <>
    {/* alertPostCreated */}
    {showAlertPost &&  (
      <div className='w-fit h-[78px] p-4 flex fixed bottom-8 left-8 z-50 dark:bg-[rgb(27,31,35)] dark:outline-none outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
        <div className='w-fit h-full flex'>
          <div className='w-6 h-full mr-2 flex items-center '><Gi3DMeeple className='w-6 h-6 text-[#77C45F]' /></div>
          <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm dark:text-[rgb(255,255,255,0.6)] text-[#191919]'>Post Created Successfully.</p>
        </div>
      </div>
    )}

    {/* alertGroupCreated */}
    {showAlertGrp &&  (
      <div className='w-fit h-[78] p-4 flex fixed bottom-8 left-8 z-50 dark:bg-[rgb(27,31,35)] dark:outline-none outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
        <div className='w-fit h-full flex'>
          <div className='w-6 h-full mr-2'><Gi3DMeeple className='w-6 h-6 text-[#77C45F]' /></div>
          <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm dark:text-[rgb(255,255,255,0.6)] text-[#191919]'>Group Created Successfully.</p>
        </div>
      </div>
    )}

    {/* alertGroupJoin */}
    {showGrpJoin &&  (
      <div className='w-fit h-[78] p-4 flex fixed bottom-8 left-8 z-50 dark:bg-[rgb(27,31,35)] dark:outline-none outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
        <div className='w-fit h-full flex'>
          <div className='w-6 h-full mr-2'><Gi3DMeeple className='w-6 h-6 text-[#77C45F]' /></div>
          <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm dark:text-[rgb(255,255,255,0.6)] text-[#191919]'>You're in! Join the conversations with group members.</p>
        </div>
      </div>
    )}

    {/* alertGroupLeft */}
    {showGrpLeft &&  (
      <div className='w-fit h-[78] p-4 flex fixed bottom-8 left-8 z-50 dark:bg-[rgb(27,31,35)] dark:outline-none outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
        <div className='w-fit h-full flex'>
          <div className='w-6 h-full mr-2'><Gi3DMeeple className='w-6 h-6 text-[#77C45F]' /></div>
          <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm dark:text-[rgb(255,255,255,0.6)] text-[#191919]'>You have left the group.</p>
        </div>
      </div>
    )}

    {/* alertImageUpload */}
    {showAlertImg && (
      <div className='w-[23.5rem] h-[78] p-4 flex fixed bottom-8 left-8 z-50 dark:bg-[rgb(27,31,35)] dark:outline-none outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
        <div className='w-[312px]] h-full flex'>
          <div className='w-6 h-full mr-2'><PiWarningOctagonFill className='w-6 h-6 text-[#CB112D]' /></div>
          <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm dark:text-[rgb(255,255,255,0.6)] text-[#191919]'>This file type is not supported. Please choose an image.</p>
        </div>
      </div>
    )}
    
    {/* alertLinkCopied */}
    {showAlertLink &&  (
      <div className='w-fit h-fit p-4 flex fixed bottom-8 left-8 z-50 dark:bg-[rgb(27,31,35)] dark:outline-none outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
        <div className='w-fit h-full flex items-center'>
          <div className='w-6 h-full mr-2'><FaCircleCheck className='w-6 h-6 text-[#77C45F]' /></div>
          <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm dark:text-[rgb(255,255,255,0.6)] text-[#191919]'>Link copied to clipboard.</p>
        </div>
      </div>
    )} 

    {/* alertReportComment */}
    {showReportComm &&  (
      <div className='w-fit h-fit p-4 flex fixed bottom-8 left-8 z-50 dark:bg-[rgb(27,31,35)] dark:outline-none outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
        <div className='w-fit h-full flex items-center'>
          <div className='w-6 h-full mr-2'><TbMessageReport className='w-6 h-6 text-[#CB112D]' /></div>
          <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm dark:text-[rgb(255,255,255,0.6)] text-[#191919]'>Comment Reported</p>
        </div>
      </div>
    )}

    {/* alertReportPost */}
    {showReportPost &&  (
      <div className='w-fit h-fit p-4 flex fixed bottom-8 left-8 z-50 dark:bg-[rgb(27,31,35)] dark:outline-none outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
        <div className='w-fit h-full flex items-center'>
          <div className='w-6 h-full mr-2'><TbMessageReport className='w-6 h-6 text-[#CB112D]' /></div>
          <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm dark:text-[rgb(255,255,255,0.6)] text-[#191919]'>Post Reported</p>
        </div>
      </div>
    )}

    {/* alertReportGroup */}
    {showReportGroup &&  (
      <div className='w-fit h-fit p-4 flex fixed bottom-8 left-8 z-50 dark:bg-[rgb(27,31,35)] dark:outline-none outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
        <div className='w-fit h-full flex items-center'>
          <div className='w-6 h-full mr-2'><TbMessageReport className='w-6 h-6 text-[#CB112D]' /></div>
          <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm dark:text-[rgb(255,255,255,0.6)] text-[#191919]'>Group Reported</p>
        </div>
      </div>
    )}

    {/* alertComngSoon */}
    {showComngSoon &&  (
      <div className='w-fit h-fit p-4 flex fixed bottom-8 left-8 z-50 dark:bg-[rgb(27,31,35)] dark:outline-none outline outline-1
      outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
        <div className='w-fit h-full flex items-center'>
          <div className='w-6 h-full mr-2'><RxLapTimer className='w-6 h-6 text-[#77C45F]' /></div>
          <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm dark:text-[rgb(255,255,255,0.6)] text-[#191919]'>Coming soon...</p>
        </div>
      </div>
    )}
  </>
  )
}

export default AlertBox;