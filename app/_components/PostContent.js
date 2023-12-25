'use client'
import React, { useState, useEffect } from 'react'

const PostContent = ({content, title}) => {
    const [showMore, setShowMore] = useState(false);
    const [hideButton, setHideButton] = useState(false);
    const [displayText, setDisplayText] = useState('')

    useEffect( () => {

        const words = content?.split(' ');
        if(words?.length < 12 ) {
            setHideButton(true)
            const text = words.join(' ') 
            setDisplayText(text)
        }
        else{
            const text = showMore ? words?.join(' ') : words?.slice(0, 11).join(' ');
            setDisplayText(text)
        }

    }, [showMore])

  return (   

    <div className='w-[calc(100%-8px)] mr-2'>
        <div className='w-[calc(100%-32px)] mx-4'>
            {/* title */}
            <div className='w-full'>
                <span className='w-full text-black text-base font-semibold'>{title}</span>
            </div>
            {/* Content */}
            <div className='w-full'>
                <span className='w-full text-black text-sm'>{displayText}</span>
            </div>
            {/* See More- Button */}
            {!hideButton && (
                <button onClick={() => setShowMore(!showMore)} className='w-[4.6875rem] h-5 pl-2 flex items-center'>
                    <span className='w-full h-full text-xs flex items-center text-[#666666] hover:text-[#0A66C2] hover:underline'>
                        {showMore ? "see less" : "...see more"}
                    </span>
                </button>
            )}

        </div>
    </div>
  )
}

export default PostContent