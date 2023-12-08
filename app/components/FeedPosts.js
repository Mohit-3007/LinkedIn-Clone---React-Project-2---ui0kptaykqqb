'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import getPosts from '../lib/getPosts';
import CommentReaction from './CommentReaction';
import { useContextProvider } from '../ContextApi/AppContextProvider';
import PostContent from './PostContent';
import PostTopBar from './PostTopBar';


export const FeedPosts =  () => { 
    const { res, page, setRes, setPage } = useContextProvider();
    const [isDataFromLocal, setIsDataFromLocal] = useState(false);
    
    useEffect(()=> {      
        async function callFetch(){
            console.log(`fetch request sent with page no ${page}`)
            const data = await getPosts({limit:10, page:page})
            console.log("DATA DATA ", data)
            if(data.status === 'success'){
                setRes((prev) => [...prev, ...data?.data])
            }         
        }
        callFetch()
    }, [page])
    
    useEffect(() => {
        const handleScroll = async () => {

          if(
            window.innerHeight + Math.round(window.scrollY) >=
            document.body.offsetHeight
          ){
            setPage((prev) => prev + 1)
            console.log("FETCH AGAIN");   
          }    
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);



  return (
    <div>

        {res && res.map( (each, index ) => {
            
            return (
                <div key={index} className='w-full bg-white rounded-lg'>
                    <div className='w-full'>
                        <div className='w-full mb-3'>

                            {/* post-top-bar */}
                            <PostTopBar each={each} isDataFromLocal={isDataFromLocal} />
                            
                            {/* post-Content */}
                            <PostContent content={each?.content} title={each?.title}/>

                            {/* Content- Pic or Video */}
                            <div className='w-full h-fit mt-2 bg-slate-300'>
                                <div className='w-full h-full'>
                                    {/* Image Component */}
                                    <Image src={each.channel?.image} width={555} height={300} priority alt='pic' />
                                </div>
                            </div>

                            {/* Like, Comment and Post */}
                            <div className='w-full  flex flex-col'>
                                <CommentReaction each={each} />
                            </div>

                        </div>
                    </div>
                </div>
            )
        })}

    </div>
  )
}

export default FeedPosts;
