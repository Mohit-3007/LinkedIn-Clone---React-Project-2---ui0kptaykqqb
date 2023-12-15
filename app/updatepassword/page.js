'use client'
import React, { useLayoutEffect } from 'react'
import UpdatePassword from '../_components/UpdatePassword'
import { useRouter } from 'next/navigation';


const page = () => {
  const router = useRouter();

  useLayoutEffect( () => {
    if(!decodeURIComponent(document.cookie)){
        console.log("You are not logged in, re-routing to login page")
        router.replace('/')
    }
  },[])

  

  return (
    <UpdatePassword />
  )
}

export default page