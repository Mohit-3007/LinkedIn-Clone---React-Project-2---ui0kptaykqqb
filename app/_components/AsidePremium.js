'use client'
import React from 'react'
import { useContextProvider } from '../ContextApi/AppContextProvider';
import In from '@/public/IN.png';
import Image from 'next/image';
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';


const AsidePremium = () => {
    const { userName } = useContextProvider();
    const { alertDispatch } = useAlertContextProvider();

// getting the first leter of UserName
    const name = userName;
    const fullName = name?.replace(';', '');
    const firstLetter = name?.charAt(0);

    function handleAlert(){
        alertDispatch({type:"showComingSoon"})
        setTimeout(()=>{
          alertDispatch({type: 'hideComingSoon'})
        }, 2500)
      }

  return (
    <>
    <div onClick={handleAlert} className='w-full h-[250px] p-3 flex flex-col'>
        {/* header */}
        <header className='w-full h-8 mt-2 mb-1 flex items-center justify-center dark:text-[rgba(255,255,255,0.6)] text-[#6E6E6E] text-[11px] capitalize tracking-wide'>
        {fullName}, restart your premium free trial today!
        </header>
        {/* main */}
        <div className='w-full h-[76px] flex justify-center items-center'>
            <div className='w-[70px] h-[70px] mr-4'>
                <span className='w-full h-full bg-[#7A1CA4] flex justify-center items-center uppercase text-4xl font-bold text-white rounded-[50%]'>{firstLetter}</span>
            </div>
            <Image src={In} alt='In' height={70} objectFit='cover' className='w-[70px] h-[70px] rounded-md'></Image>
        </div>
        {/*  */}
        <div className='w-full h-fit'>
            <section className='w-full h-12 mt-1 mb-2'>
                <div className='w-full h-full text-center dark:text-[rgba(255,255,255,0.9)] text-[#6E6E6E] text-sm tracking-wide'>
                    See who's viewed your profile in the last 365 days
                </div>
            </section>
            {/* button */}
            <section className='w-full h-[34px] flex items-center justify-center'>
                <button className='w-fit h-[34px] px-4 border border-[#0a66c2] rounded-2xl text-[#0a66c2] flex items-center text-base font-semibold '>
                    Restart Trial
                </button>
            </section>
        </div>
    </div>
    </>
  )
}

export default AsidePremium;