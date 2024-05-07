'use client'
import React, { useState, useEffect } from 'react'
import { FaHashtag, FaPlus } from "react-icons/fa6";
import Link from 'next/link';
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';
import { FaPeopleGroup } from "react-icons/fa6";
import { useContextProvider } from '../ContextApi/AppContextProvider';

const LeftBottomBar = ({showMore}) => {
    const { alertDispatch } = useAlertContextProvider();
    const [islocalData, setIsLocalData] = useState(false);
    const [localData, setLocalData] = useState('')
    const { checkGroupLocal, setCheckGroupLocal } = useContextProvider()

    useEffect( () => {
        if(localStorage.getItem('groupData')){
            const data = JSON.parse(localStorage.getItem('groupData'));
            data.reverse();
            if(data?.length > 0){
                console.log("data ", data)
                setLocalData(data)
                setIsLocalData(true)
                console.log(`local data length is ${data.length} `);
            }
            else{
                setIsLocalData(false)
                console.log("local data length is zero ");
            }        
        }
        else{
            console.log("local data not present");
            setIsLocalData(false)
        }
    },[checkGroupLocal])

    function handleAlert(){
        alertDispatch({type:"showComingSoon"})
        setTimeout(()=>{
          alertDispatch({type: 'hideComingSoon'})
        }, 2500)
    }

  return (
    <div className={'res-768:block w-full h-full pt-2 flex flex-col dark:bg-[#1B1F23]  ' + (showMore ? '' : 'hidden')}>
        {/*  */}
        <div className='w-full h-20 mb-4 flex flex-col'>
            <div className='w-full h-8 flex items-center pl-3 text-xs dark:text-[rgba(255,255,255,0.9)] text-[#191919]'>Recent</div>
            <ul className='w-full h-12 list-none font-semibold dark:text-[rgba(255,255,255,0.6)] text-xs text-[#6E6E6E]'>

                <li className='w-full h-6 hover:bg-[#EBEBEB] dark:hover:bg-[rgb(68,71,75)] cursor-pointer'>
                    <div className='w-full h-full px-3 py-1 flex'>
                        <FaHashtag className='w-4 h-4 mr-2 text-[#404040] dark:text-[rgba(255,255,255,0.6)] ' />
                        fresher
                    </div>
                </li>

                <li className='w-full h-6 hover:bg-[#EBEBEB] cursor-pointer dark:hover:bg-[rgb(68,71,75)]'>
                    <div className='w-full h-full px-3 py-1 flex'>
                        <FaHashtag className='w-4 h-4 mr-2 text-[#404040] dark:text-[rgba(255,255,255,0.6)] ' />
                        india
                    </div>
                </li>

            </ul>
        </div>

        {/* Groups */}
        <Link href={"/groups"} className='w-full h-fit flex flex-col '>
            <div className='w-full h-8 flex items-center justify-between text-xs text-[#0A66C2] font-semibold'>
                <div className='w-[185px] h-full pl-3 mr-2 flex items-center hover:underline'>Groups</div>
                <div className='w-8 h-8 hover:bg-[#EBEBEB] rounded-[50%] flex items-center justify-center'><FaPlus className='w-4 h-4 text-[#191919]' /></div>
            </div>
            <ul className='w-full h-fit list-none font-semibold text-xs text-[#6E6E6E]'>
                {localData && localData.map ( (e, index) => {
                    return (
                        <Link key={index} href={`/groups/${e.id}`}>
                            <li className='w-full h-6 hover:bg-[#EBEBEB] cursor-pointer'>
                                <div className='w-full h-full px-3 py-1 flex'>
                                    <FaPeopleGroup className='w-4 h-4 mr-2 text-[#404040]' />
                                    {e?.name}
                                </div>
                            </li>                         
                        </Link>
                    )   
                })}
            </ul>
        </Link>

        {/* Events */}
        <div onClick={handleAlert} className='w-full h-8 flex items-center text-xs text-[#0A66C2] font-semibold'>
            <div className='w-[185px] h-full pl-3 mr-2 flex items-center hover:underline'>Events</div>
        </div>

        {/* Followed hashtags */}
        <div onClick={handleAlert} className='w-full h-fit mb-4 flex flex-col'>
            <div className='w-full h-8 flex items-center text-xs text-[#0A66C2] font-semibold'>
                <div className='w-[185px] h-full pl-3 mr-2 flex items-center hover:underline'>Followed Hastags</div>
            </div>

            <ul className='w-full h-12 list-none font-semibold text-xs dark:text-[rgba(255,255,255,0.6)] text-[#6E6E6E]'>

                <li className='w-full h-6 hover:bg-[#EBEBEB] cursor-pointer dark:hover:bg-[rgb(68,71,75)]'>
                    <div className='w-full h-full px-3 py-1 flex'>
                        <FaHashtag className='w-4 h-4 mr-2 dark:text-[rgba(255,255,255,0.6)] text-[#404040]' />
                        fresher
                    </div>
                </li>

                <li className='w-full h-6 hover:bg-[#EBEBEB] cursor-pointer dark:hover:bg-[rgb(68,71,75)]'>
                    <div className='w-full h-full px-3 py-1 flex'>
                        <FaHashtag className='w-4 h-4 mr-2 dark:text-[rgba(255,255,255,0.6)] text-[#404040]' />
                        india
                    </div>
                </li>

            </ul>

        </div>

        {/* Discover more */}
        <div onClick={handleAlert}>
            <Link href={"#"} className='w-full h-11 p-3 hover:bg-[#EBEBEB] dark:hover:bg-[rgb(68,71,75)] dark:text-[rgba(255,255,255,0.6)] flex items-center
             justify-center font-semibold text-sm text-[#646464] border-t-[1px] dark:border-[#373A3D] border-[#E8E8E8]'>Discover more</Link>
        </div>
    </div>
  )
}

export default LeftBottomBar;