'use client'
import React, { createContext, useContext, useState, useEffect, useReducer } from 'react'

const AlertContext = createContext(null);

const AlertGlobalContextProvider = ({children}) => {

    const initialState = {
        alertImageUpload: "false",
        alertLinkCopied: "false",
        alertPostCreated: "false",
        alertGroupCreated: "false",
        alertGroupJoin: "false",
        alertGroupLeft: "false",
        alertReportPost: "false",
        alertReportGroup: "false",
        alertReportComment: "false",
        alertComingSoon: "false"
    }

    function reducer(state, action) {
        switch(action.type){
            case "imgAlertTrue":
                return {...state, alertImageUpload: "true"}
            case "imgAlertFalse":
                return {...state, alertImageUpload: "false"}

            case "showlinkCop":
                return {...state, alertLinkCopied: "true"}
            case "hidelinkCop":
                return {...state, alertLinkCopied: "false"}

            case "showReportPost":
                return {...state, alertReportPost: "true"}
            case "hideReportPost":
                return {...state, alertReportPost: "false"}

            case "showReportGroup":
                return {...state, alertReportGroup: "true"}
            case "hideReportGroup":
                return {...state, alertReportGroup: "false"}

            case "showReportComment":
                return {...state, alertReportComment: "true"}
            case "hideReportComment":
                return {...state, alertReportComment: "false"}

            case "showComingSoon":
                return {...state, alertComingSoon: "true"}
            case "hideComingSoon":
                return {...state, alertComingSoon: "false"}

            case "showPostCreAlert":
                return {...state, alertPostCreated: "true"}
            case "hidePostCreAlert":
                return {...state, alertPostCreated: "false"}

            case "groupAlertTrue":
                return {...state, alertGroupCreated: "true"};
            case "groupAlertFalse":
                return {...state, alertGroupCreated: "false"};

            case "showGroupJoin":
                return {...state, alertGroupJoin: "true"};
            case "hideGroupJoin":
                return {...state, alertGroupJoin: "false"};

            case "showGroupLeft":
                return {...state, alertGroupLeft: "true"};
            case "hideGroupLeft":
                return {...state, alertGroupLeft: "false"};

            default:
                return { ... state };
        }
    }

    const [alertState, alertDispatch] = useReducer(reducer, initialState);
    
    const initialValues={
        alertImageUpload: alertState.alertImageUpload,
        alertLinkCopied: alertState.alertLinkCopied,
        alertPostCreated: alertState.alertPostCreated,
        alertGroupCreated: alertState.alertGroupCreated,
        alertGroupJoin: alertState.alertGroupJoin,
        alertGroupLeft: alertState.alertGroupLeft,
        alertReportPost: alertState.alertReportPost,
        alertReportGroup: alertState.alertReportGroup,
        alertReportComment: alertState.alertReportComment,
        alertComingSoon: alertState.alertComingSoon,
        alertDispatch
    }
  
    return  <AlertContext.Provider value={initialValues}>{children}</AlertContext.Provider>
  }
  
  function useAlertContextProvider(){
    const contextProvider = useContext(AlertContext);
    return contextProvider;
  }
  
  export { AlertGlobalContextProvider, useAlertContextProvider };