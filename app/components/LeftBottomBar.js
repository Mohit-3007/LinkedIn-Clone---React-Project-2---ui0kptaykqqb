'use client'
import React from 'react'
import { FaHashtag, FaPlus } from "react-icons/fa6";
import Link from 'next/link';

const LeftBottomBar = () => {
  return (
    <div className='w-full h-full pt-2 flex flex-col'>
        {/*  */}
        <div className='w-full h-20 mb-4 flex flex-col'>
            <div className='w-full h-8 flex items-center pl-3 text-xs text-[#191919]'>Recent</div>
            <ul className='w-full h-12 list-none font-semibold text-xs text-[#6E6E6E]'>

                <li className='w-full h-6 hover:bg-[#EBEBEB] cursor-pointer'>
                    <div className='w-full h-full px-3 py-1 flex'>
                        <FaHashtag className='w-4 h-4 mr-2 text-[#404040]' />
                        fresher
                    </div>
                </li>

                <li className='w-full h-6 hover:bg-[#EBEBEB] cursor-pointer'>
                    <div className='w-full h-full px-3 py-1 flex'>
                        <FaHashtag className='w-4 h-4 mr-2 text-[#404040]' />
                        india
                    </div>
                </li>

            </ul>
        </div>

        {/* Groups */}
        <Link href={"/groups"} className='w-full h-8 flex items-center text-xs text-[#0A66C2] font-semibold'>
            <div className='w-[185px] h-full pl-3 mr-2 flex items-center hover:underline'>Groups</div>
            <div className='w-8 h-8 hover:bg-[#EBEBEB] rounded-[50%] flex items-center justify-center'>
                <FaPlus className='w-4 h-4 text-[#191919]' />
            </div>
        </Link>

        {/*  */}
        <div className='w-full h-8 flex items-center text-xs text-[#0A66C2] font-semibold'>
            <div className='w-[185px] h-full pl-3 mr-2 flex items-center hover:underline'>Events</div>
        </div>

        {/*  */}
        <div className='w-full h-fit mb-4 flex flex-col'>
            <div className='w-full h-8 flex items-center text-xs text-[#0A66C2] font-semibold'>
                <div className='w-[185px] h-full pl-3 mr-2 flex items-center hover:underline'>Followed Hastags</div>
            </div>

            <ul className='w-full h-12 list-none font-semibold text-xs text-[#6E6E6E]'>

                <li className='w-full h-6 hover:bg-[#EBEBEB] cursor-pointer'>
                    <div className='w-full h-full px-3 py-1 flex'>
                        <FaHashtag className='w-4 h-4 mr-2 text-[#404040]' />
                        fresher
                    </div>
                </li>

                <li className='w-full h-6 hover:bg-[#EBEBEB] cursor-pointer'>
                    <div className='w-full h-full px-3 py-1 flex'>
                        <FaHashtag className='w-4 h-4 mr-2 text-[#404040]' />
                        india
                    </div>
                </li>

            </ul>

        </div>

        {/* Discover more */}
        <Link href={"#"} className='w-full h-11 p-3 hover:bg-[#EBEBEB] flex items-center justify-center font-semibold text-sm text-[#646464] border-t-[1px] border-[#E8E8E8]'>Discover more</Link>


    </div>
  )
}

export default LeftBottomBar;