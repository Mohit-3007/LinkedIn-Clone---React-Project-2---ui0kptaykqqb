'use client'
import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { BsThreeDots } from "react-icons/bs";
import getUser from '../lib/getUser';
import { IoIosLink } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { IoFlag } from "react-icons/io5";
import { useContextProvider } from '../ContextApi/AppContextProvider';
import { usePathname } from 'next/navigation';
import updatingComment from '../lib/updatingComment';
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';





const SingleComment = ({data, key, setInput, input, setCommentId}) => {
    const [userData, setUserData] = useState('')
    const [firstLetter, setFirstLetter] = useState('')
    const [showOpt, setShowOpt] = useState(false)
    const { owner, token } = useContextProvider()
    const optRef = useRef()
    const dotRef = useRef()
    const { alertDispatch } = useAlertContextProvider()

    useEffect( () => {
        async function fetchUser(){
            const result = await getUser(data?.author, token)
            console.log("result ", result);
            if(result.status === 'success') setUserData(result?.data)
        }

        fetchUser()
    },[data])

    function handleMouseEvent(e){
        if(!optRef?.current?.contains(e.target)){
            if(dotRef?.current?.contains(e.target)) return
            else{
                setShowOpt(false)
            }
        }     
    } 

    useEffect( () => {
        document.addEventListener('mousedown', handleMouseEvent)
        return () => {
            document.removeEventListener('mousedown', handleMouseEvent)
        }
    },[])

    useEffect(()=>{
        if(userData){
            const name = userData?.name.charAt(0)
            setFirstLetter(name);
        }
    },[userData])

// formatting comment date
    function getRelativeTime(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date(timestamp);
        const timeDifference = currentDate - targetDate;
        const secondsDifference = Math.floor(timeDifference / (1000));
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        /////////////////////////////////////
        if (secondsDifference < 60) {
            return 'Just now';
          } else if (secondsDifference < 120) {
            return '1m';
          } else if (secondsDifference < 180) {
            return '2m';
          } else if (secondsDifference < 240) {
            return '3m';
          } else if (secondsDifference < 300) {
            return '4m';
          } else if (secondsDifference < 360) {
            return '5m';
          } else if (secondsDifference < 420) {
            return '6m';
          } else if (secondsDifference < 480) {
            return '7m';
          } else if (secondsDifference < 540) {
            return '8m';
          } else if (secondsDifference < 600) {
            return '9m';
          } else if (secondsDifference < 660) {
            return '10m';
          } else if (secondsDifference < 720) {
            return '11m';
          } else if (secondsDifference < 780) {
            return '12m';
          } else if (secondsDifference < 840) {
            return '13m';
          } else if (secondsDifference < 900) {
            return '14m';
          } else if (secondsDifference < 960) {
            return '15m';
          } else if (secondsDifference < 1020) {
            return '16m';
          } else if (secondsDifference < 1080) {
            return '17m';
          } else if (secondsDifference < 1140) {
            return '18m';
          } else if (secondsDifference < 1200) {
            return '19m';
          } else if (secondsDifference < 1260) {
            return '20m';
          } else if (secondsDifference < 1320) {
            return '21m';
          } else if (secondsDifference < 1380) {
            return '22m';
          } else if (secondsDifference < 1440) {
            return '23m';
          } else if (secondsDifference < 1500) {
            return '24m';
          } else if (secondsDifference < 1560) {
            return '25m';
          } else if (secondsDifference < 1620) {
            return '26m';
          } else if (secondsDifference < 1680) {
            return '27m';
          } else if (secondsDifference < 1740) {
            return '28m';
          } else if (secondsDifference < 1800) {
            return '29m';
          } else if (secondsDifference < 1860) {
            return '30m';
          } else if (secondsDifference < 1920) {
            return '31m';
          } else if (secondsDifference < 1980) {
            return '32m';
          } else if (secondsDifference < 2040) {
            return '33m';
          } else if (secondsDifference < 2100) {
            return '34m';
          } else if (secondsDifference < 2160) {
            return '35m';
          } else if (secondsDifference < 2220) {
            return '36m';
          } else if (secondsDifference < 2280) {
            return '37m';
          } else if (secondsDifference < 2340) {
            return '38m';
          } else if (secondsDifference < 2400) {
            return '39m';
          } else if (secondsDifference < 2460) {
            return '40m';
          } else if (secondsDifference < 2520) {
            return '41m';
          } else if (secondsDifference < 2580) {
            return '42m';
          } else if (secondsDifference < 2640) {
            return '43m';
          } else if (secondsDifference < 2700) {
            return '44m';
          } else if (secondsDifference < 2760) {
            return '45m';
          } else if (secondsDifference < 2820) {
            return '46m';
          } else if (secondsDifference < 2880) {
            return '47m';
          } else if (secondsDifference < 2940) {
            return '48m';
          } else if (secondsDifference < 3000) {
            return '49m';
          } else if (secondsDifference < 3060) {
            return '50m';
          } else if (secondsDifference < 3120) {
            return '51m';
          } else if (secondsDifference < 3180) {
            return '52m';
          } else if (secondsDifference < 3240) {
            return '53m';
          } else if (secondsDifference < 3300) {
            return '54m';
          } else if (secondsDifference < 3360) {
            return '55m';
          } else if (secondsDifference < 3420) {
            return '56m';
          } else if (secondsDifference < 3480) {
            return '57m';
          } else if (secondsDifference < 3540) {
            return '58m';
          } else if (secondsDifference < 3600) {
            return '59m';
          } else {
            
          }


        ////////////////////////////////////
        const minutesDifference = Math.floor(secondsDifference / 60);

        if (minutesDifference < 60) {
            return `${minutesDifference} m`;
          } else if (minutesDifference < 120) {
            return '1h';
          } else if (minutesDifference < 180) {
            return '2h';
          } else if (minutesDifference < 240) {
            return '3h';
          } else if (minutesDifference < 300) {
            return '4h';
          } else if (minutesDifference < 360) {
            return '5h';
          } else if (minutesDifference < 420) {
            return '6h';
          } else if (minutesDifference < 480) {
            return '7h';
          } else if (minutesDifference < 540) {
            return '8h';
          } else if (minutesDifference < 600) {
            return '9h';
          } else if (minutesDifference < 660) {
            return '10h';
          } else if (minutesDifference < 720) {
            return '11h';
          } else if (minutesDifference < 780) {
            return '12h';
          } else if (minutesDifference < 840) {
            return '13h';
          } else if (minutesDifference < 900) {
            return '14h';
          } else if (minutesDifference < 960) {
            return '15h';
          } else if (minutesDifference < 1020) {
            return '16h';
          } else if (minutesDifference < 1080) {
            return '17h';
          } else if (minutesDifference < 1140) {
            return '18h';
          } else if (minutesDifference < 1200) {
            return '19h';
          } else if (minutesDifference < 1260) {
            return '20h';
          } else if (minutesDifference < 1320) {
            return '21h';
          } else if (minutesDifference < 1380) {
            return '22h';
          } else if (minutesDifference < 1440) {
            return '23h';
          } else {
            
          }

          ////////////////////////////////////////////////////////////
      
        if (daysDifference >= 1 && daysDifference <= 6) {
          return `${daysDifference}d`;
        } else if (daysDifference >= 7 && daysDifference <= 14) {
          return '1w';
        } else if (daysDifference > 14 && daysDifference <= 21) {
          return '3w';
        } else if (daysDifference > 21 && daysDifference <= 28) {
            return '4w';
        } else if (daysDifference > 28 && daysDifference <= 60) {
            return '1mo';
        } else if (daysDifference > 60 && daysDifference <= 90) {
            return '2mo';
        } else if (daysDifference > 90 && daysDifference <= 120) {
            return '3mo';
        } else if (daysDifference > 120 && daysDifference <= 150) {
            return '4mo';
        } else if (daysDifference > 150 && daysDifference <= 180) {
            return '5mo';
        } else if (daysDifference > 180 && daysDifference <= 210) {
            return '6mo';
        } else if (daysDifference > 240 && daysDifference <= 270) {
            return '7mo';
        } else if (daysDifference > 270 && daysDifference <= 300) {
            return '8mo';
        } else if (daysDifference > 300 && daysDifference <= 330) {
            return '9mo';
        } else if (daysDifference > 330 && daysDifference <= 360) {
            return '10mo';
        } else if (daysDifference > 360 && daysDifference <= 370) {
            return '11mo';
        } else {
          return '1y';
        }
    }   
    const timestamp = data?.isEdited == true ? data?.updatedAt : data?.createdAt;
    const relativeTime = getRelativeTime(timestamp);
    // console.log(relativeTime);


    function copyToClipboard(){
        // try {
          const currentPath = window.location.href;
          navigator.clipboard.writeText(currentPath);
        //   setTimeout(() => {
        //     setIsCopied(false);
        //   }, 3000);
          alertDispatch({type: 'showlinkCop'})
          setShowOpt(false)

          setTimeout(()=>{
            alertDispatch({type: 'hidelinkCop'})
            console.log("successfull")
          }, 2500)

        // } catch (err) {
        //   console.error('Error copying to clipboard:', err);
        // }
      };

      function handleReportComment(){
        alertDispatch({type: 'showReportComment'})
        setShowOpt(false)
        setTimeout(()=> {
          alertDispatch({type: 'hideReportComment'})    
        },2500)
      }


  function handleEditComment(){
    console.log("Edit the comment");
    setInput(data?.content)
    setCommentId(data?._id)
    setShowOpt(false)
  }


  return (
    <article key={key} className='w-[calc(100%-32px)] mx-4 mb-3 h-[6.5625rem]'>

        {/* comment user profile pic & name & other details & option PopUp */}
        <div className='w-full h-[53px] flex'>

            {/* pic div */}
            <Link href={"#"} className='mt-[5px] w-10 h-10'>
                {/* image-????? */}
                <span className='w-full h-full bg-[#7A1CA4] flex justify-center items-center uppercase text-xl font-bold text-white rounded-[50%]'>{firstLetter}</span>
            </Link>

            {/* name & other details & option PopUp div */}
            <div className='ml-1 w-[calc(100%-44px)] h-full py-2 pl-3 bg-[#F2F2F2] rounded-tr-lg flex'>

                {/* name & other details */}
                <Link href={"#"} className='w-[calc(100%-64px)] h-full flex flex-col'>

                    {/* name */}
                    <span className='w-full h-[21px] flex'>
                        <span className='h-full mr-1 flex items-center text-[#181818] text-sm font-medium hover:underline hover:text-[#0A66C2]'>{userData?.name}</span>
                        <span className='h-full flex items-center text-[#A3A3A3] text-xs'>He/Him . 3rd+</span>
                    </span>

                    {/* other details */}
                    <span className='w-full h-[calc(1000%-21px)] text-[#A3A3A3] truncate text-xs flex items-center'>
                        Do you want more meetings? Close larger deals? Listen to the Brutal Truth a Do you want more meetings? Close larger deals? Listen to the Brutal Truth a
                    </span>

                </Link>

                {/* isEditied or not comment time option PopUp */}
                <div className='w-[64px] pr-2 h-6 flex items-center justify-end relative'>

                    {/* isEdited or not */}
                    <div className='w-fit h-4 flex items-center text-xs text-[#A3A3A3] mr-1 '>{data?.isEdited == true ? 'Edited' : ''}</div>

                    {/* comment time */}
                    <div className=' h-4 text-xs text-[#A3A3A3] '>{relativeTime}</div>

                    {/* option dots */}                  
                    <div ref={dotRef} onClick={() => setShowOpt(!showOpt) } className='w-4 h-full ml-1 flex items-center cursor-pointer'>
                        <BsThreeDots className='w-4 h-4 text-[#616161]' />
                    </div>

                    <div ref={optRef} className={'w-[204px] h-20 py-1ab absolute -bottom-20 bg-white outline outline-1 shadow-xl outline-[#e1e1e1] rounded-sm ' 
                        + (showOpt ? 'block' : 'hidden')}>
                        <ul className='w-full h-full list-none flex flex-col justify-center'>

                            <li onClick={copyToClipboard} className='w-full h-[36px] hover:bg-[#e1e1e1] cursor-pointer'>
                                <div className='w-full h-full px-4 py-2 flex items-center'>
                                    {/* icons */}
                                    <div className='w-5 h-5 mr-2 '>
                                        <IoIosLink className='w-full h-full' />
                                    </div>
                                    <div className='w-[calc(100%-32px)] text-sm h-5'>
                                        Copy link to post
                                    </div>
                                </div>
                            </li>

                            {owner === userData?._id && (

                                <li onClick={handleEditComment} className='w-full h-[36px] hover:bg-[#e1e1e1] cursor-pointer'>
                                    <div className='w-full h-full px-4 py-2 flex items-center'>
                                        {/* icons */}
                                        <div className='w-5 h-5 mr-2 '>
                                            <MdModeEditOutline className='w-full h-full' />
                                        </div>
                                        <div className='w-[calc(100%-32px)] text-sm h-5'>
                                            Edit the comment
                                        </div>
                                    </div>
                                </li>

                            ) }

                            {owner != userData?._id && (

                                <li onClick={handleReportComment} className='w-full h-[36px] hover:bg-[#e1e1e1] cursor-pointer'>
                                    <div className='w-full h-full px-4 py-2 flex items-center'>
                                        {/* icons */}
                                        <div className='w-5 h-5 mr-2 '>
                                            <IoFlag className='w-full h-full' />
                                        </div>
                                        <div className='w-[calc(100%-32px)] text-sm h-5'>
                                            Report comment
                                        </div>
                                    </div>
                                </li>

                            )}


                        </ul>
                    </div>

                </div>

            </div>

        </div>

        {/* User Comment DIv */}
        <div className='ml-11 w-[calc(100%-44px)] pl-3 pr-4 pb-3 min-h-8 h-fit bg-[#F2F2F2] rounded-b-lg'>
            <span className='h-fit text-[#181818] text-sm'>{data.content}</span>
        </div>

        {/* like & reply */}
        <div className='w-full h-4'>
            <div className='ml-11 w-[calc(100%-44px)] pl-2 h-full'>
                <div className='w-full h-full mt-1 flex'>

                    {/* like div */}
                    <div className='pr-2 h-full '>
                        <div className='w-full h-full hover:bg-[#EBEBEB] flex items-center justify-center cursor-pointer'>
                        <span className='text-[#666666] text-xs font-medium'>Like</span>
                        </div>
                        
                    </div>

                    {/* break line */}
                    <div className='w-0 border-l h-4 border-[#B2B2B2]'></div>

                    {/* reply div */}
                    <div className='px-2 h-full'>
                        <div className='w-full h-full hover:bg-[#EBEBEB] flex items-center justify-center cursor-pointer'>
                        <span className='text-[#666666] text-xs font-medium'>Reply</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    
    </article>

  )
}

export default SingleComment;