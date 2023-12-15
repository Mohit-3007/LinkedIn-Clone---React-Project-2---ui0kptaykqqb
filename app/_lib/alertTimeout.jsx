'use client'
import React from 'react'
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';


const alertTimeout = () => {
    const { alertDispatch } = useAlertContextProvider();


        console.log("alertTimeout func called");
        // alertDispatch({type:"showComingSoon"})
        // setTimeout(()=>{
        //     alertDispatch({type: 'hideComingSoon'})
        // }, 2500)

    // return "val"
    

}

export default alertTimeout;