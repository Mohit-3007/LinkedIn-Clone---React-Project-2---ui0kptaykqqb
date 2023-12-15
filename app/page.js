`use client`
import React from 'react'
// import { useState } from "react";
import Login from "./_components/Login";
import { useContextProvider } from "./ContextApi/AppContextProvider";
import LogoutNavbar from './_components/LogoutNavbar';





export default function Home() {
 
  return (
    <>
      {/* Main Home -Content */}
      {/* <div className="w-[calc(100vw-17px)] h-[400vh] bg-[#F4F2EE]"></div> */}
      <LogoutNavbar />
      <Login />

    </>
  )    
}
