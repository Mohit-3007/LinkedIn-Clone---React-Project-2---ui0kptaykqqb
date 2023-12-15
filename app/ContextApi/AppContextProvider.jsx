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

  const [res, setRes] = useState('')
  const [page, setPage] = useState(1)


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

  // console.log("isLogin ",login);
  // console.log("token in contextAPI ", token);
  // console.log(userName);
  // console.log(userEmail);

  useEffect(()=>{

    if(decodeURIComponent(document.cookie)){
      console.log("decodeURIComponent(document.cookie) ", decodeURIComponent(document.cookie))
      const allCookie = decodeURIComponent(document.cookie).split('; ')
      
      // const owner = decodeURIComponent(document.cookie).split('; ')[0]?.split("=")[1]
      // const token = decodeURIComponent(document.cookie).split('; ')[1]?.split("=")[1]
      // const name = decodeURIComponent(document.cookie).split('; ')[2]?.split("=")[1]
      // const email = decodeURIComponent(document.cookie).split('; ')[3]?.split("=")[1]
      // var owner 
      // var token 
      // var name 
      // var email;
      allCookie.forEach( (each, index) => {
        // console.log("INDEX INDEX ", index )
        const splitVal = each.split("=")
        if(splitVal[0] == 'token') {
          setToken(splitVal[1])
          // console.log("before before")
          setLogin(true)
        }
        else if(splitVal[0] == 'name') setUserName(splitVal[1])
        else if(splitVal[0] == 'email') setUserEmail(splitVal[1])
        else if(splitVal[0] == 'owner') setOwner(splitVal[1])
      })

      // console.log("allCookie ", allCookie)
      // console.log('token:- ',token,)
      // console.log('name:- ',name,)
      // console.log('email:- ',email,)
      // console.log('owner:- ',owner,)
      // setToken(token)
      // setUserName(name)
      // setUserEmail(email)
      // setOwner(owner)
    }
  },[])

  // console.log("2nd line ,", login);



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
  }

  return  <AppContext.Provider value={initialValues}>{children}</AppContext.Provider>
}

function useContextProvider(){
  const contextProvider = useContext(AppContext);
  return contextProvider;
}

export { GlobalContextProvider, useContextProvider };