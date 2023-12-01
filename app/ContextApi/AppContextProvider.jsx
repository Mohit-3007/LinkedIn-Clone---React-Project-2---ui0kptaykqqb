'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null);

const GlobalContextProvider = ({children}) => {
  // For Login State
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [res, setRes] = useState('')
  const [page, setPage] = useState(1)


  function handleLoginState(){
    setLogin(!login)
  }

  // console.log("isLogin ",login);
  // console.log("token in contextAPI ", token);
  // console.log(userName);
  // console.log(userEmail);

  useEffect(()=>{

    if(decodeURIComponent(document.cookie)){
      setLogin(true);
      console.log("decodeURIComponent(document.cookie) ", decodeURIComponent(document.cookie))
      const token = decodeURIComponent(document.cookie).split(' ')[0].split("=")[1]
      const name = decodeURIComponent(document.cookie).split(' ')[1].split("=")[1]
      const email = decodeURIComponent(document.cookie).split(' ')[2].split("=")[1]
      console.log(token, name, email);  
      setToken(token)
      setUserName(name)
      setUserEmail(email)
    }
  },[])



  const initialValues={
    login: login,
    token: token,
    res: res,
    page: page,
    userName: userName,
    userEmail: userEmail,
    setRes,
    setPage,
    setToken,
    setUserName,
    setUserEmail,
    handleLoginState,
  }

  return  <AppContext.Provider value={initialValues}>{children}</AppContext.Provider>
}

function useContextProvider(){
  const contextProvider = useContext(AppContext);
  return contextProvider;
}

export { GlobalContextProvider, useContextProvider };