import React from 'react'
import loading from '@/public/loading.png';
import Image from 'next/image';

export const Loader = () => {
  return (
        <div className='w-[200px] h-fit flex flex-col items-center'>
            <Image src={loading} alt='loading' width={200} height={57} className='w-[200px] h-[57px]' />
            <div class="progress-loader">
                <div class="progress"></div>
            </div>
        </div>
  )
}
