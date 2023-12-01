'use client'
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useContextProvider } from '../ContextApi/AppContextProvider';
import leftBg from '@/public/leftBg.jpg';
import chip from '@/public/chip.png';
import { FaBookmark } from "react-icons/fa";

const LeftTopBar = () => {
  const { userName } = useContextProvider();


// getting the first leter of UserName
  const name = userName;
  const fullName = name.replace(';', '');
  const firstLetter = name.charAt(0);

  let profileViewers = Math.floor(Math.random() * (30 - 7 + 1)) + 7;
  let connections = Math.floor(Math.random() * (190 - 80 + 1)) + 80;


  return (
    <>
        {/* image */}
        <div className='w-full h-fit px-3 pt-3 pb-4 border-b-[1px] border-[#E8E8E8]'>

            {/* image div */}
            <div className='w-[225px] h-[56px] -mx-3 -mt-3'>
              <Image src={leftBg} alt='background' height={68} objectFit='cover' className='w-full h-[68px] ' />
            </div>

            {/* user Link */}
            <Link href={"#"} className='w-full h-fit flex flex-col items-center'>

                {/* user pic */}
                <div className='w-full h-[3.25rem] flex justify-center'>
                    <div className='w-[68px] h-[68px] z-10 border border-0.5 -mt-[38px] mb-3 rounded-[50%]'>
                      <span className='w-full h-full  bg-[#7A1CA4] flex justify-center items-center uppercase text-2xl font-bold text-white rounded-[50%]'>{firstLetter}</span>
                    </div>
                </div>

                {/* name */}
                <div className='w-full h-6 flex justify-center text-[#191919] capitalize hover:underline font-semibold text-base'>{fullName}</div>

            </Link>

            {/* break */}
            <p className='w-full mt-1 h-4'></p>


        </div>

        {/*  */}
        <div className='w-full h-[5.5rem] py-3 border-b-[1px] border-[#E8E8E8]'>
          <div className='w-full h-full flex flex-col'>

            <div className='w-full h-6 flex items-center px-3 justify-between text-xs font-semibold'>
              <span className='text-[#6E6E6E]'>Profile viewers</span>
              <span className='text-[#0A66C2]'>{profileViewers}</span>
            </div>  

            <div className='w=full h-10 px-3 py-1'>
              <div className='w-full h-full flex justify-between text-xs font-semibold'>
                <div className='w-fit h-full flex flex-col'>
                  <div className='w-fit h-4 text-[#6E6E6E]'>Connections</div>
                  <div className='w-fit h-4 text-[#3F3F3F]'>Grow your network</div>
                </div>
                <div className='w-fit h-4 text-[#0A66C2]'>{connections}</div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <Link href={"#"} className='w-full h-fit p-3 border-b-[1px] border-[#E8E8E8]'>
          <h1 className='w-full h-fit text-[#6E6E6E] text-xs'>
            Grow your career and get ahead.
          </h1>
          <span className='w-full h-4 flex mt-1'>
            <Image src={chip} alt='chip' className='w-4 h-4 mr-1' />
            <span className='w-fit h-full text-xs font-semibold text-[#3F3F3F] hover:text-[#0A66C2] hover:underline'>Retry Premium for &#8377; 0</span>
          </span>
        </Link>

        {/*  */}
        <Link href={"#"} className='w-full h-10 p-3'>
          <span className='w-full h-full flex text-[#727272] text-xs font-semibold'>
            <FaBookmark className='w-4 h-4 mr-2' /> My items
          </span>
        </Link>

    </>
  )
}

export default LeftTopBar