'use client'
import React from 'react'
import loading from '@/public/loading.png';
import darkLogo from '@/public/darkLogo.png';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export const Loader = () => {
  const {theme} = useTheme();
  return (
    <div className='w-[200px] h-fit flex flex-col items-center'>
      <Image src={theme === 'light' ? loading : darkLogo} alt='loading' width={200} height={57} className='w-[200px] h-[57px]' />
      <div class="progress-loader">
        <div class="progress"></div>   
      </div>
    </div>
  )
}
