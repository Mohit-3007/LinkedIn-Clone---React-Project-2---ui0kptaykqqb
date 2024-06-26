'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import getPosts from '../_lib/getPosts';
import CommentReaction from './CommentReaction';
import { useContextProvider } from '../ContextApi/AppContextProvider';
import PostContent from './PostContent';
import PostTopBar from './PostTopBar';


export const FeedPosts =  () => { 
    const { res, setRes} = useContextProvider();
    const [isDataFromLocal, setIsDataFromLocal] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(()=> {      
        const currentScrollY = window.scrollY;
        async function callFetch(){
            console.log(`fetch request sent with page no ${page}`)
            const data = await getPosts({limit: 10, page:page})
            console.log("DATA DATA ",Date.now(), "   " , data)
            if(data.status === 'success'){
                setRes((prev) => [...prev, ...data?.data])
            }         
        }
        // Execute only on the client side
        if (typeof window !== 'undefined') {
            console.log('calling fetch')
            callFetch();
            window.scrollTo({ top: currentScrollY, behavior: 'smooth' });
        }
        
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
        {res && res.map( (each, index ) => {;      
            return (
                <div key={index} className='w-full bg-white dark:bg-[#1B1F23] res-620:rounded-lg'>
                    <div className='w-full'>
                        <div className='w-full mb-3'>
                            {/* post-top-bar */}
                            <PostTopBar each={each} isDataFromLocal={isDataFromLocal} />           
                            {/* post-Content */}
                            <PostContent content={each?.content} title={each?.title}/>
                            {/* Content- Pic  */}
                            {each.images && Array.isArray(each.images) && each.images.length > 0 && 
                                <div className='w-full h-fit mt-2 bg-slate-300'>
                                    <div className='w-full h-full'>
                                        {/* Image Component */}
                                        <Image src={each?.images?.[0]} width={555} height={300} priority alt='pic' className='w-full' />
                                    </div>
                                </div>
                            }
                            {/* Like, Comment and Post */}
                            <div className='w-full  flex flex-col'>
                                <CommentReaction each={each} isDataFromLocal={isDataFromLocal} />
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
