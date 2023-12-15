import React from 'react'
import { Loader } from './_components/Loader'


const Loading = () => {
    return (
        <div className='w-screen h-screen pt-[190px] flex justify-center'>
          <Loader />
        </div>
    )
      
}

export default Loading