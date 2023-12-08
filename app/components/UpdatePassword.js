'use client'
import React, { useState, useEffect, useRef, Component } from 'react';
import Logo from '../../public/logo.png'
import Image from 'next/image';
import Link from 'next/link';
import  signUpUser  from '../lib/SignUpUser'
import { useRouter } from 'next/navigation';
import { useContextProvider } from '../ContextApi/AppContextProvider';
import updatePassword from '../lib/updatePassword';
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
updatePassword

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypeNewPassword, setRetypeNewPassword] = useState('');
  const router = useRouter();
  const { userName, userEmail, token, handleLoginState } = useContextProvider()
  const newPassRef = useRef()
  const retypeRef = useRef()
  const [errorOutline, setErrorOutline] = useState(false);
  const [showGreen, setShowGreen] = useState(false)
  const [isPassEmpty, setIsPassEmpty] = useState(false)
  const [wrongPass, setWrongPass] = useState(false)


  useEffect( () => {
    if(newPassword == retypeNewPassword){
      setErrorOutline(false)
      if(newPassword == '') return
      setShowGreen(true)
    }
    else {
      setErrorOutline(true)
      setShowGreen(false)
    }
  },[retypeNewPassword])

  const handleBlur = () => {
    if (newPassword !== retypeNewPassword) {
      console.log('New and Retype passwords do not match');
      setErrorOutline(true)
      setShowGreen(false)
    }
  };

  async function handleSubmit(e){
      e.preventDefault()
      if(password == ''){
        setIsPassEmpty(true)
        return
      }

      const result = await updatePassword(userName, userEmail, password, newPassword, token)
      console.log("Update password result ",result);
      if(result.status == "success"){
          router.push("/feed");
      } 
      else{
        setWrongPass(true)
      }
      
  }

  return (
    <div className="w-[calc(100vw-17px)] h-screen bg-[#F3F2F0]">

      {/* main */}
      <main className='w-full res-1128:w-[1128px] res-1128:mx-[calc((100%-1128px)/2)] px-4 py-6 h-max ' >

          <header className='w-full h-max'>
              {/* logo */}
              <Link href={"/feed"} className='w-full h-[44px]'>
                  {/* <span className='w-[135px] h-[44px]'> */}
                      <Image
                          src={Logo}
                          alt="Logo"
                          width={135}
                          height={44}
                          
                      />  
                  {/* </span> */}
              </Link>

              {/* Title */}
              <h1 className='w-full h-max px-4 pt-[14px] pb-6 text-[#1E1E61] text-[32px] text-center'>
                  Change your current password
              </h1>
          </header>

          {/* SignUp form wrapper */}
          <div className='w-[400.5px] mx-[calc((100%-400.5px)/2)] h-fit bg-white shadow-lg rounded-md'>

              <p className='w-full px-6 h-[48px] pt-4 pb-3 text-sm text-[#191919] font-semibold'>
                  Create a password that is at least 6 characters long. 
              </p>

              <form className='w-full h-fit '>
                  <section className='w-full h-fit px-6 pt-2'>

                      {/* current password & New Passowrd */}
                      <div className='w-full h-fit flex flex-col'>

                          {/* Current pass */}
                          <label htmlFor='pass' className='h-5 text-[#666666] text-sm mb-1 block'>Type your current password*</label>
                          <input id='pass' type='password' value={password} 
                              onFocus={() => setIsPassEmpty(false)}
                              placeholder='Current password'
                              onChange={(e) => setPassword(e.target.value)} 
                              className='text-[#191919] focus:outline-[#404040] mb-3 outline-1 hover:outline-2 outline outline-[#404040] px-4 text-sm w-full h-[30px] rounded-sm '
                          />
                          {/* error */}
                          {isPassEmpty && (
                            <div className='w-full h-5 text-sm text-[#D11124]'>Current password is required</div>
                          )}
                          {wrongPass && (
                            <div className='w-full h-5 text-sm text-[#D11124]'>Your current password is wrong</div>
                          )}

                          {/* New pass */}
                          <label htmlFor='newPass' className='h-5 text-[#666666] text-sm mt-4 mb-1 block'>Type your new password*</label>
                          <div className='relative w-full h-fit mb-3'>

                            <input ref={newPassRef} id='newPass' type='password' value={newPassword} 
                                placeholder='New password' 
                                onBlur={handleBlur}
                                onFocus={() => setErrorOutline(false)}
                                onChange={(e) => setNewPassword(e.target.value)}  
                                className={'w-full h-[30px] px-4 rounded-sm text-sm outline outline-1 hover:outline-2  ' 
                                  + ( ( newPassword.length < 6 && newPassword.length != 0 && 'outline-[#D11124] focus:outline-[#D11124]' ) 
                                    || ( newPassword.length >= 6 && 'outline-[#057642] focus:outline-[#057642]' )
                                    || ( newPassword == '' && 'outline-[#404040] focus:outline-[#404040]' )
                                  ) } />

                            {/* error message */}
                            {newPassword.length < 6 && newPassword.length != 0 && (
                              <div className='w-full h-5 text-sm text-[#D11124]'>Your password is too short. It should be at least 6 characters long.</div>
                            )}

                            {newPassword.length >= 6 && (
                              <div className='w-7 h-[30px] flex items-center justify-center text-[#057642] absolute right-1 top-0 '><FaCheck className='w-5 h-5' /></div>
                            )}

                          </div>

                          {/* Retype new pass */}
                          <label htmlFor='password' className='h-5 text-[#666666] text-sm mt-4 mb-1 block '>Retype your new password*</label>
                          <div className='relative w-full h-fit mb-3'>

                            <input ref={retypeRef} id='password' type='password' value={retypeNewPassword}
                                placeholder='Retype password' 
                                onChange={(e) => setRetypeNewPassword(e.target.value)}  
                                className={'w-full h-[30px] px-4 rounded-sm text-sm outline outline-1 hover:outline-2 ' 
                                  + ( ( errorOutline && 'outline-[#D11124] focus:outline-[#D11124]' ) 
                                    || ( showGreen ? 'outline-[#057642] focus:outline-[#057642]' : 'outline-[#404040] focus:outline-[#404040]'  )
                                  ) }/>

                            {/* error message */}
                            {errorOutline && (
                              <div className='w-full h-5 text-sm text-[#D11124]'>Password do not match</div>
                            )}

                            {errorOutline && (
                              <div className='w-7 h-[30px] flex items-center justify-center text-[#D11124] absolute right-1 top-0 '><RxCross1 className='w-[18px] h-[18px]' /></div>
                              )}
                            {showGreen && (    
                              <div className='w-7 h-[30px] flex items-center justify-center text-[#057642] absolute right-1 top-0 '><FaCheck className='w-5 h-5' /></div>
                            )}


                          </div>
                        
                      </div>

                      {/* terms & condition */}
                      {/* <p className='w-full h-8 my-4 text-[#676767] text-xs text-center'>
                          By clicking Agree & Join, you agree to the LinkedIn
                          <Link href={"#"} className='text-[#0A66CB] text-xs font-semibold'> User Agreement</Link>
                          ,
                          <Link href={"#"} className='text-[#0A66CB] text-xs font-semibold'> Privacy Policy</Link>
                          , and 
                          <Link href={"#"} className='text-[#0A66CB] text-xs font-semibold'> Cookie Policy</Link>
                      </p> */}

                      {/* submit button */}
                      <button onClick={handleSubmit} 
                        disabled={showGreen ? false : true}
                        className='w-full h-12 py-3 mt-4 mb-7 px-6 rounded-[24px] disabled:cursor-not-allowed disabled:bg-[#EBEBEB] hover:bg-[#004182] bg-[#0A66C2] disabled:text-[#A4A4A4] text-white text-center text-base font-semibold '>
                          Save Password 
                      </button>

                  </section>
              </form>

              {/* already on linkedin */}
              {/* <p className='w-full px-4 h-[64px] pt-4 pb-6 text-center text-base text-[#1F1F1F]'>
                  Already on Linkedin? <Link href={"/"} className='text-[#0A66CB] hover:underline text-base font-semibold'> Sign in</Link>
              </p> */}

          </div>

      </main>

      {/* footer */}
      <footer>

      </footer>

    </div>
  )
}

export default UpdatePassword

{/* <label htmlFor='newPass' className='h-5 text-[#666666] text-sm mt-4 mb-1 block'>Type your new passowrd*</label>
                          <input ref={newPassRef} id='newPass' type='password' value={newPassword} 
                              placeholder='New password'
                              onBlur={handleBlur}
                              onChange={(e) => setNewPassword(e.target.value)} 
                              className='outline outline-1 hover:outline-2 px-4 text-sm w-full h-[30px] rounded-sm outline-[#404040]'
                          />
                          <div className='w-full h-5 text-sm text-[#D11124] hidden'></div> */}


{/* Retype New pass */}
                          {/* <label htmlFor='password' className='h-5 text-[#666666] text-sm mt-4 mb-1 block '>Retype your new password</label>
                          <input ref={retypeRef} id='password' type='password' value={retypeNewPassword} 
                              placeholder='Retype password'
                              onChange={(e) => setRetypeNewPassword(e.target.value)}  
                              className='text-[#191919] border border-[#404040] px-4 text-sm w-full h-[30px] rounded-sm outline-1 hover:outline hover:outline-black ' 
                            />
                          <div className='w-full h-5 text-sm text-[#D11124] hidden'></div> */}