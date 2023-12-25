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
  const [searchContent, setSearchContent] = useState('')
  const [searchTitle, setSearchTitle] = useState('')
// for checking post in local storage
  const [checkLocal, setCheckLocal] = useState(false);
  const [checkGroupLocal, setCheckGroupLocal] = useState(false);
  const [res, setRes] = useState('')
  const [page, setPage] = useState(1)
  const [groupPosts, setGroupPosts] = useState('')

  // console.log("1st line ,", login);
  function handleLoginState(){
    if(login){
      console.log("Now user is not login")
      setLogin(false)
    }
    else{
      console.log("User is Login now")
      setLogin(true)
    }
  }

  // for search input of navbar
  function handleSearchInput(val){ 
    setIsInputSlct(val)
  }

  useEffect(()=>{
    if(decodeURIComponent(document.cookie)){
      console.log("decodeURIComponent(document.cookie) ", decodeURIComponent(document.cookie))
      const allCookie = decodeURIComponent(document.cookie).split('; ')
      allCookie.forEach( (each, index) => {
        const splitVal = each.split("=")
        if(splitVal[0] == 'token') {
          setToken(splitVal[1])
          setLogin(true)
        }
        else if(splitVal[0] == 'name') setUserName(splitVal[1])
        else if(splitVal[0] == 'email') setUserEmail(splitVal[1])
        else if(splitVal[0] == 'owner') setOwner(splitVal[1])
      })
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
    searchContent: searchContent,
    searchTitle: searchTitle,
    checkLocal: checkLocal,
    checkGroupLocal: checkGroupLocal,
    groupPosts: groupPosts,
    setRes,
    setPage,
    setToken,
    setUserName,
    setUserEmail,
    setOwner,
    handleLoginState,
    handleSearchInput,
    setSearchContent,
    setSearchTitle,
    setCheckLocal,
    setCheckGroupLocal,
    setGroupPosts,
  }
  return  <AppContext.Provider value={initialValues}>{children}</AppContext.Provider>
}

function useContextProvider(){
  const contextProvider = useContext(AppContext);
  return contextProvider;
}

export { GlobalContextProvider, useContextProvider };