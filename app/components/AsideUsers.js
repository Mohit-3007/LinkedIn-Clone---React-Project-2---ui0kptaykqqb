'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import getUser from '../lib/getUser';
import getPosts from '../lib/getPosts';
import followUser from '../lib/FollowUser';
import AsideFollowButton from './AsideFollowButton';





const AsideUsers = () => {
    const [userData, setUserData] = useState();

// random page & number for making fetch call for users data
  const pg = Math.floor(Math.random() * (100 - 5 + 1)) + 5;
//  fetching random posts for users
    useEffect( () => {
        async function callfetch(){
            const getUserRes = await getPosts({limit:7, page:pg})
            console.log("getUserRes, ", getUserRes)
            if(getUserRes.status === 'success'){
                setUserData(getUserRes?.data)
            }
        }
        callfetch()
    },[])

// roles array
    const role = ['', 'HR', 'IT Recruiter', 'Connecting talent with opportunities', 'Xyz Consultancy', 'Training & Placements']

  return (
    <>
        {/* title */}
        <div className='w-full h-11 pt-3 px-3'>
            <div className='w-full h-full px-3 pt-3 font-semibold text-base text-[#191919]'>
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
                                                <div className='w-[85%] h-full flex items-center text-base font-semibold text-[#191919] hover:underline hover:text-[#0a66c2]'>
                                                    {e?.author?.name}
                                                </div>
                                                <span className='w-[15%] h-fit flex items-start text-xs ml-1 text-[#666666] mr-0'>. 2nd</span>
                                            </div>
                                            <div className='w-full h-fit text-sm text-[#666666]'>{role[num]}</div>

                                        </Link>
                                    </div>
                                    {/* follow button */}
                                    <AsideFollowButton each={e} />
                                    
                                </div>

                            </div>
                            {/* break */}
                            {userData.length-1 != index && (
                                <div className='w-full h-[1px] rounded-sm bg-[#E8E8E8]'></div>
                            )}
                        </li>
                    )
                })}
                

            </ul>
        </div>

    </>
  )
}

export default AsideUsers