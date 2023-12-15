'use client'
import React, { useEffect, useState } from 'react'
import SignUp from '../_components/SignUp';
import { redirect, useRouter } from 'next/navigation';
import { useContextProvider } from '../ContextApi/AppContextProvider';
import session from '@/utils/session';




const Signup =  () => {
  // const [hey, setHey] = useState(false)
  // console.log("hey,", hey)
  const { userName, login } = useContextProvider();
  const router = useRouter()
  // const isLogin =  session()

  // console.log("isLogin isLogin isLogin ", isLogin)

  // if()

  // console.log("login status ", login)

  return (
    <SignUp />
  )
}

export default Signup;