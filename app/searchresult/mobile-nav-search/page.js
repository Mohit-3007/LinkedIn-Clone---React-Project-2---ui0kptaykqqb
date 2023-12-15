'use client'
import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";

const page = () => {
  return (
    <div className='w-full h-screen'>
        {/* nav  search*/}
        <nav className='w-full h-12 flex'>
            <button className='w-12 h-12 pl-4 flex items-center justify-center'>
                <IoIosArrowRoundBack className='w-6 h-6 text-[#666666]' />
            </button>
        </nav>
    </div>
  )
}

export default page