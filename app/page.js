`use client`
import React from 'react'
// import { useState } from "react";
import Login from "./components/Login";
import { useContextProvider } from "./ContextApi/AppContextProvider";




export default function Home() {
//   const { userName, login } = useContextProvider();
//   const [hey, setHey] = React.useState(false)
//   console.log("hey,", hey)
//    console.log("MAIN PAGE && LOGIN STATUS IS :- ", login)
//   const isClient = typeof window;
//   console.log("isClient ", isClient)
 
  return (
    <>
      {/* Main Home -Content */}
      {/* <div className="w-[calc(100vw-17px)] h-[400vh] bg-[#F4F2EE]"></div> */}
      <Login />

    </>
  )    
}
