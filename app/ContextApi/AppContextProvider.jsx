'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null);

const GlobalContextProvider = ({children}) => {
  // For Login State
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [owner, setOwner] = useState('');
  const [isInputSlct, setIsInputSlct] = useState(false)

  const [res, setRes] = useState('')
  const [page, setPage] = useState(1)


  function handleLoginState(){
    setLogin(!login)
  }

  // for search input of navbar
  function handleSearchInput(val){ 
    setIsInputSlct(val)
  }

  // console.log("isLogin ",login);
  // console.log("token in contextAPI ", token);
  // console.log(userName);
  // console.log(userEmail);

  useEffect(()=>{

    if(decodeURIComponent(document.cookie)){
      setLogin(true);
      console.log("decodeURIComponent(document.cookie) ", decodeURIComponent(document.cookie))
      const owner = decodeURIComponent(document.cookie).split('; ')[0]?.split("=")[1]
      const token = decodeURIComponent(document.cookie).split('; ')[1]?.split("=")[1]
      const name = decodeURIComponent(document.cookie).split('; ')[2]?.split("=")[1]
      const email = decodeURIComponent(document.cookie).split('; ')[3]?.split("=")[1]
      console.log('token:- ',token,)
      // console.log('name:- ',name,)
      // console.log('email:- ',email,)
      // console.log('owner:- ',owner,)
      setToken(token)
      setUserName(name)
      setUserEmail(email)
      setOwner(owner)
    }
  },[])



  const initialValues={
    login: login,
    token: token,
    res: res,
    page: page,
    userName: userName,
    userEmail: userEmail,
    owner: owner,
    isInputSlct:isInputSlct,
    setRes,
    setPage,
    setToken,
    setUserName,
    setUserEmail,
    setOwner,
    handleLoginState,
    handleSearchInput,
  }

  return  <AppContext.Provider value={initialValues}>{children}</AppContext.Provider>
}

function useContextProvider(){
  const contextProvider = useContext(AppContext);
  return contextProvider;
}

export { GlobalContextProvider, useContextProvider };