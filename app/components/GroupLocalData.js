'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GroupDotOption from './GroupDotOption';
import uploadSamp from '@/public/uploadSamp.jpeg';


const GroupLocalData = ({checkLocal, setCheckLocal}) => {
    const [imgUrl, setImgUrl] = useState('')
    const [localData, setLocalData] = useState('');

    console.log('checkLocal ', checkLocal)

    useEffect( () => {

        if(localStorage.getItem('groupData')){
            const storedData = JSON.parse(localStorage.getItem('groupData'))
            console.log(storedData)
            setLocalData(storedData);
        }

    },[checkLocal])


  return (
    <div className='w-full h-fit flex flex-col'>

        {/* local group container */}
        <div className='w-full h-fit'>
            {/* map function */}
            <ul className='w-full h-fit'>

                {localData && localData.map( (e, index) => {

                    return (

                        <li key={index} className='w-full h-[73px] px-2 pt-2 pb-[9px]'>
                            <div className='w-full h-full flex justify-between'>

                                <div className='w-fit h-full pr-2 flex'>
                                    {/* image or logo */}
                                    <div className='w-[56px] h-[56px]'>
                                        <Image src={e?.image ? e.image : uploadSamp} alt='uploded image' objectFit='cover' width={88} height={88} className='w-full h-full rounded-sm' />
                                    </div>
                                    {/* group name */}
                                    <div className='w-fit pl-2 pt-2 h-full'>

                                        <div className='w-fit h-5 flex'>
                                            <div className='w-fit h-full font-semibold text-base text-[#191919] hover:underline hover:text-[#0a66c2]'>{e?.name}</div>
                                            <div className='w-[62px] h-full font-semibold text-sm ml-1 text-[#666666] bg-[#EBEBEB] rounded-sm flex items-end justify-center '>Owner</div>
                                        </div>
                                        <div className='w-full h-4 text-xs text-[#666666]'>1 member</div>
                                        
                                    </div>
                                </div>

                                {/* dots option */}
                                <GroupDotOption setCheckLocal={setCheckLocal} groupId={e?.id} />

                            </div>
                        </li>
                    )}
                )}

            </ul>

        </div>

        {/*  */}
        <p className='w-fill h-5 mt-6 mb-8 items-center justify-center text-sm text-[#666666] flex'>
            <Link href={"#"} className='text-[#0a66c2] hover:underline font-semibold mr-[5px]'>Search</Link> other trusted communities that share and support your goals 
        </p>

    </div>
  )
}

export default GroupLocalData;