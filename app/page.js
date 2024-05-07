'use client'
import React from 'react'
import Login from "./_components/Login";
import LogoutNavbar from './_components/LogoutNavbar';

export default function Home() {
  return (
    <>
      <LogoutNavbar />
      <Login />
    </>
  )    
}
