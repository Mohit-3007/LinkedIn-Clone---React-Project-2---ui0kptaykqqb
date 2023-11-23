'use client'
import React from 'react'
import Link from 'next/link'
import { BsThreeDots } from "react-icons/bs";

const SingleComment = ({data, key}) => {

    function getRelativeTime(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date(timestamp);
        const timeDifference = currentDate - targetDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      
        if (daysDifference >= 1 && daysDifference <= 6) {
          return `${daysDifference}d`;
        } else if (daysDifference >= 7 && daysDifference <= 14) {
          return '1w';
        } else if (daysDifference > 14 && daysDifference <= 21) {
          return '3w';
        } else if (daysDifference > 21 && daysDifference <= 28) {
            return '4w';
        } else if (daysDifference > 28 && daysDifference <= 60) {
            return '1m';
        } else if (daysDifference > 60 && daysDifference <= 90) {
            return '2m';
        } else if (daysDifference > 90 && daysDifference <= 120) {
            return '3m';
        } else if (daysDifference > 120 && daysDifference <= 150) {
            return '4m';
        } else if (daysDifference > 150 && daysDifference <= 180) {
            return '5m';
        } else if (daysDifference > 180 && daysDifference <= 210) {
            return '6m';
        } else if (daysDifference > 240 && daysDifference <= 270) {
            return '7m';
        } else if (daysDifference > 270 && daysDifference <= 300) {
            return '8m';
        } else if (daysDifference > 300 && daysDifference <= 330) {
            return '9m';
        } else if (daysDifference > 330 && daysDifference <= 360) {
            return '10m';
        } else if (daysDifference > 360 && daysDifference <= 370) {
            return '11m';
        } else {
          return '1y';
        }
    }
      
    const timestamp = data?.createdAt;
    const relativeTime = getRelativeTime(timestamp);
    console.log(relativeTime);

  return (
    <article key={key} className='w-[calc(100%-32px)] mx-4 mb-3 h-[6.5625rem]'>

        {/* comment user profile pic & name & other details & option PopUp */}
        <div className='w-full h-[53px] flex'>

            {/* pic div */}
            <Link href={"#"} className='mt-[5px] w-10 h-10 rounded-[50%] bg-purple-500'>
                {/* image-????? */}
            </Link>

            {/* name & other details & option PopUp div */}
            <div className='ml-1 w-[calc(100%-44px)] h-full py-2 pl-3 bg-[#F2F2F2] rounded-tr-lg flex'>

                {/* name & other details */}
                <Link href={"#"} className='w-[calc(100%-64px)] h-full flex flex-col'>

                    {/* name */}
                    <span className='w-full h-[21px] flex'>
                        <span className='h-full mr-1 flex items-center text-[#181818] text-sm font-medium hover:underline hover:text-[#0A66C2]'>Abhay Pandey</span>
                        <span className='h-full flex items-center text-[#A3A3A3] text-xs'>He/Him . 3rd+</span>
                    </span>

                    {/* other details */}
                    <span className='w-full h-[calc(1000%-21px)] text-[#A3A3A3] truncate text-xs flex items-center'>
                        Do you want more meetings? Close larger deals? Listen to the Brutal Truth a Do you want more meetings? Close larger deals? Listen to the Brutal Truth a
                    </span>

                </Link>

                {/* comment time option PopUp */}
                <div className='w-[64px] pr-2 h-6 flex items-center justify-end'>

                    {/* comment time */}
                    <div className=' h-4 text-xs text-[#A3A3A3] '>{relativeTime}</div>
                    {/* option dots */}
                    
                    <div className='w-4 h-full ml-1 flex items-center cursor-pointer'>
                        <BsThreeDots className='w-4 h-4 text-[#616161]' />
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