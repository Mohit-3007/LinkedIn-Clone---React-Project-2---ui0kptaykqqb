'use client'
import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import followUser from '../lib/FollowUser';
import { useContextProvider } from '../ContextApi/AppContextProvider';

const AsideFollowButton = ({each}) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const { token } = useContextProvider()

    async function handleFollowUser(){
        console.log("follow user")
        const followRes = await followUser(each?.author?._id, token)
        console.log("followRes ", followRes)
        if(followRes.status === 'success'){
            setIsFollowed(true)
        }
    }

  return (
    <div onClick={handleFollowUser} className='w-full h-12 py-2'>
        <button className='w-[121px] h-full px-4 py-1.5 flex hover:bg-[#EBEBEB] items-center justify-center rounded-3xl outline outline-1 outline-[#404040] hover:outline-2'>
            {isFollowed ? (<FaPlus className='w-4 h-4 mr-1 -ml-0.5 text-[#666666]' />)
                : (<FaCheck className='w-4 h-4 mr-1 -ml-0.5 text-[#666666]' />)
            }
            <span className='w-fit font-semibold text-base text-[#666666] '>{ isFollowed ? 'Followed' : 'Follow' }</span>
        </button>
    </div>
  )
}

export default AsideFollowButton