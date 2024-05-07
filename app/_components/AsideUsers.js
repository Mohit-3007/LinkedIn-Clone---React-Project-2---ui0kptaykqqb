'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import getPosts from '../_lib/getPosts';
import AsideFollowButton from './AsideFollowButton';

const AsideUsers = () => {
    const [userData, setUserData] = useState();
    const [page, setPage] = useState(0)

// random page & number for making fetch call for users data
    function generateRandomPage(){
        const pg = Math.floor(Math.random() * (100 - 5 + 1)) + 5;
        setPage(pg)
    }
    useEffect(()=>{
        generateRandomPage()
    },[])
//  fetching random posts for users
    useEffect( () => {
        async function callfetch(){
            const getUserRes = await getPosts({limit:7, page:page})
            console.log("getUserRes, ", getUserRes)
            if(getUserRes.status === 'success'){
                setUserData(getUserRes?.data)
            }
            else{
                if(getUserRes.message == 'No Post found'){
                    generateRandomPage()
                }
            }
        }
        if(page != 0){
            callfetch()
        }
    },[page])

// roles array
    const role = ['', 'HR', 'IT Recruiter', 'Connecting talent with opportunities', 'Xyz Consultancy', 'Training & Placements']

  return (
    <>
        {/* title */}
        <div className='w-full h-11 pt-3 px-3'>
            <div className='w-full h-full px-3 pt-3 font-semibold text-base dark:text-[rgba(255,255,255,0.9)] text-[#191919]'>
                <h2 className='w-fit'>People also viewed</h2>
            </div>
        </div>
        {/* users container */}
        <div className='w-full h-fit'>
            <ul className='w-full h-fit list-none'>
                {/* map function */}
                {userData && userData.map( (e, index) => {
                    const num = Math.floor(Math.random() * (5-1) + 1)
                    return (
                        <li key={index} className='w-full h-FIT'>
                            <div className='w-full h-fit px-6 py-3 flex '>
                                {/* image */}
                                <div className='w-[56px] h-full'>
                                    <Link href={`/user/${e?.author._id}`} className='w-full h-12'>
                                            <div className='w-12 h-12 mr-2'>
                                                <div className='w-full h-full'>
                                                    {/* image */}
                                                    <Image src={e?.author?.profileImage} width={48} height={48} className='w-12 h-12 rounded-[50%]' />
                                                </div>
                                            </div>
                                    </Link>
                                </div>
                                <div className='w-[calc(100%-56px)] h-full flex flex-col'>
                                    <div className='w-full h-fit'>
                                        <Link href={`/user/${e?.author._id}`} className='w-full h-fit flex flex-col'>
                                            <div className='w-full h-fit flex items-start'>
                                                <div className='w-[85%] h-full flex items-center text-base font-semibold dark:text-[rgba(255,255,255,0.9)] text-[#191919] hover:underline hover:text-[#0a66c2]'>
                                                    {e?.author?.name}
                                                </div>
                                                <span className='w-[15%] h-fit flex items-start text-xs ml-1 dark:text-[rgba(255,255,255,0.6)] text-[#666666] mr-0'>. 2nd</span>
                                            </div>
                                            <div className='w-full h-fit text-sm dark:text-[rgba(255,255,255,0.6)] text-[#666666]'>{role[num]}</div>
                                        </Link>
                                    </div>
                                    {/* follow button */}
                                    <AsideFollowButton each={e} />  
                                </div>
                            </div>
                            {/* break */}
                            {userData.length-1 != index && (
                                <div className='w-full h-[1px] rounded-sm dark:bg-[#373A3D] bg-[#E8E8E8]'></div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    </>
  )
}

export default AsideUsers;