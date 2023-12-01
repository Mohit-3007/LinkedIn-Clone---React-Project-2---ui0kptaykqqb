'use client'
import React, { createContext, useContext, useState, useEffect, useReducer } from 'react'

const AlertContext = createContext(null);

const AlertGlobalContextProvider = ({children}) => {

    const initialState = {
        alertImageUpload: "false",
        alertLinkCopied: "false",
        alertPostCreated: "false",
    }

    function reducer(state, action) {
        switch(action.type){
            case "imageErr":
                return {...state, alertImageUpload: "true"}
            case "linkCop":
                return {...state, alertLinkCopied: "true"}
            case "postCre":
                return {...state, alertPostCreated: "true"}
            case "setMusicId":
                return {...state, musicId: action.payload, musicPlayer: "active"};
            default:
                return { ... state };
        }
    }

    const [alertState, alertDispatch] = useReducer(reducer, initialState);
    
    
    const initialValues={
        alertImageUpload: alertState.alertImageUpload,
        alertLinkCopied: alertState.alertLinkCopied,
        alertPostCreated: alertState.alertPostCreated,
    }
  
    return  <AlertContext.Provider value={initialValues}>{children}</AlertContext.Provider>
  }
  
  function useAlertContextProvider(){
    const contextProvider = useContext(AlertContext);
    return contextProvider;
  }
  
  export { AlertGlobalContextProvider, useAlertContextProvider };