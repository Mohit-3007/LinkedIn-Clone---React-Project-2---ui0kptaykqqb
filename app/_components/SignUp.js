'use client'
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Logo from '../../public/logo.png'
import Image from 'next/image';
import Link from 'next/link';
import  signUpUser  from '../_lib/SignUpUser'
import { useRouter, usePathname } from 'next/navigation';
import { useContextProvider } from '../ContextApi/AppContextProvider';
import linke from '@/public/linke.png'




const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const pathname = usePathname()
    const { login, setToken, setUserName, setUserEmail, setOwner, handleLoginState } = useContextProvider()
    const [showPass, setShowPass] = useState(false)
    const [emailErrorMess, setEmailErrorMess] = useState("");
    const [passwordErrorMess, setPasswordErrorMess] = useState("");
    const [nameErrorMess, setNameErrorMess] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);

    // console.log("login status ", login)

    useLayoutEffect( () => {
        console.log("is login ", login)
        if(decodeURIComponent(document.cookie)){
            const allCookie = decodeURIComponent(document.cookie).split('; ')
            allCookie.forEach( each => {
                const splitVal = each.split("=")
                if(splitVal[0] == 'token') {
                    router.replace('/feed')
                    console.log("You are already login to this browser, re routing you to Home Page")
                    return
                }
            })     
        }
    },[])
    
    function handleFocusOut(){
        if(!email) setEmailErrorMess("Please enter your email address");
        else{
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!emailRegex.test(email)) setEmailErrorMess("Please enter a valid email address");  
        }
    }

    function handleFocusIn(){
        setEmailErrorMess("");
        setPasswordErrorMess("")
    }

    function handlePassFocusOut(){
        if(!password) setPasswordErrorMess("Please enter your password.")
    }

    async function handleSubmit(e){
        e.preventDefault()
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if(!email){
            setEmailErrorMess("Please enter your email address");
            if(!password) setPasswordErrorMess("Please enter your password.")
            return
        }

        if (!emailRegex.test(email)) {
            console.log("Invalid email");
            setEmailErrorMess("Please enter a valid email address");
            if(!password) setPasswordErrorMess("Please enter your password.")
            return;
        }

        
        if(password.length < 6){
            setPasswordErrorMess("Password must be 6 characters or more.")
            return
        }

        if(!name) {
            setNameErrorMess("Name is required")
            return
        }

        const result = await signUpUser(name, email, password)
        console.log("SignUp result ",result);
        if(result.status == "success"){
            let token = result.token;
            setToken(token)
            setUserName(result?.data.user.name)
            setUserEmail(result?.data.user.email)
            setOwner(result?.data.user._id)

            document.cookie=`token=${token}`
            document.cookie=`name=${result?.data.user.name}`
            document.cookie=`email=${result?.data.user.email}`
            document.cookie=`owner=${result?.data.user._id}`
            handleLoginState()
            router.push("/feed");
            setName('')
            setEmail('')
            setPassword('')
            setSuccessLogin(true)
        }
        
    }

    function handleShowPassword(e){
        e.preventDefault()
        setShowPass(!showPass)
    }

  return (
    <div className="w-[100vw] h-screen  overflow-x-hidden flex flex-col bg-[#F3F2F0] relative">

        {/* main */}
        <main className='w-full res-1128:w-[1128px] res-1128:mx-[calc((100%-1128px)/2)] px-4 py-6 h-fit  ' >

            <header className='w-full h-max'>
                {/* logo */}
                <div className='w-full h-[44px]'>
                    {/* <span className='w-[135px] h-[44px]'> */}
                        <Image
                            src={Logo}
                            alt="Logo"
                            width={135}
                            height={44}
                            
                        />  
                    {/* </span> */}
                </div>

                {/* Title */}
                <h1 className='w-full h-max px-4 pt-[14px] pb-6 text-[#1E1E61] text-[32px] text-center'>
                    Make the most of your professional life
                </h1>
            </header>

            {/* SignUp form wrapper */}
            <div className='w-[400.5px] mx-[calc((100%-400.5px)/2)] h-fit'>

                <form className='w-full h-fit bg-white shadow rounded-t '>
                    <section className='w-full h-full px-6 pt-6'>

                        {/* email & passowrd */}
                        <div className='w-full h-fit'>

                            {/* name */}
                            <label htmlFor='name' className='w- res-992:h-5 text-[#3F3F3F] text-sm font-semibold mb-1 block'>Name</label>
                            <input id='name' type='text' value={name} 
                                onFocus={()=> setNameErrorMess('')}
                                onChange={(e) => setName(e.target.value)} 
                                className={'text-[#1F1F1F] px-4 text-base w-full h-[30px] rounded-sm outline outline-1 hover:outline-2 ' + (
                                    nameErrorMess ? 'outline-[#D11124]' : 'outline-[#404040]'
                                )}
                            />
                            <div className={'w-full h-5 text-sm text-[#D11124] ' + (nameErrorMess ? 'block' : 'hidden' )}>{nameErrorMess}</div>

                            {/* email */}
                            <label htmlFor='input' className='w- res-992:h-5 text-[#3F3F3F] text-sm font-semibold mt-4 mb-1 block'>Email</label>
                            <input id='input' type='email' value={email} 
                                onBlur={handleFocusOut}
                                onFocus={handleFocusIn}
                                onChange={(e) => setEmail(e.target.value)} 
                                className={'text-[#1F1F1F] px-4 text-base w-full h-[30px] rounded-sm outline outline-1 hover:outline-2 ' + (
                                    emailErrorMess ? "outline-[#D11124]" : "outline-[#404040]"
                                ) }/>
                            <div className={'w-full h-5 text-sm text-[#D11124] ' + (emailErrorMess ? "block" : "hidden")}>{emailErrorMess}</div>

                            {/* password */}
                            <label htmlFor='password' className='w- res-992:h-5 text-[#3F3F3F] text-sm font-semibold mt-4 mb-1 block '>Password 6+ characters</label>
                            <div className='w-full h-fit rounded-sm relative ' >
                                <input id='password' type={showPass ? 'text' : 'password'} value={password} 
                                    onBlur={handlePassFocusOut}
                                    onChange={(e) => setPassword(e.target.value)}  
                                    className={'w-full h-[30px] px-4 text-[#1F1F1F] text-base outline outline-1 hover:outline-2  ' + (
                                        passwordErrorMess ? "outline-[#D11124]" : "outline-[#404040]"
                                    )} />
                                {/* error message */}
                                <div className={'w-full h-5 text-sm text-[#D11124] ' + (passwordErrorMess ? "block" : "hidden")}>{passwordErrorMess}</div>
                                <button onClick={handleShowPassword} className='w-10 h-[30px] text-[#0A66C2] text-base absolute right-2 top-0 font-semibold'>{showPass ? "Hide" : "Show"}</button>
                            </div>

                        </div>

                        {/* terms & condition */}
                        <p className='w-full h-8 my-4 text-[#676767] text-xs text-center'>
                            By clicking Agree & Join, you agree to the LinkedIn
                            <Link href={"#"} className='text-[#0A66CB] text-xs font-semibold'> User Agreement</Link>
                            ,
                            <Link href={"#"} className='text-[#0A66CB] text-xs font-semibold'> Privacy Policy</Link>
                            , and 
                            <Link href={"#"} className='text-[#0A66CB] text-xs font-semibold'> Cookie Policy</Link>
                        </p>

                        {/* submit button */}
                        <button onClick={handleSubmit} className='w-full h-12 py-3 px-6 rounded-[24px] hover:bg-[#004182] bg-[#0A66C2] text-white 
                        text-center text-base font-semibold '>Agree & Join</button>

                    </section>
                </form>     

                {/* already on linkedin */}
                <p className='w-full px-4 h-[64px] pt-4 pb-6 text-center text-base text-[#1F1F1F] bg-white rounded-b shadow'>
                    Already on Linkedin? <Link href={"/"} className='text-[#0A66CB] hover:underline text-base font-semibold'> Sign in</Link>
                </p>

                {/* succes message div */}
                <div className={'w-full h-fit my-3  py-2 px-3 text-[#77C45F] text-base font-semibold text-center ' + (successLogin == true ? 'block' : 'hidden')}>
                    Your ID has been created. Redirecting to the Home Page.
                </div>

            </div>

        </main>

        {/* footer */}
        <footer className='absolute bottom-0 w-full h-fit res-992:h-[50px] bg-white'>
            <ul className='w-full px-4 res-992:px-0 py-6 res-992:py-0 flex-wrap res-992:flex-nowrap res-992:w-[1128px] 
                res-1128:w-[1128px] h-fit res-992:mr-[calc(100%-1128px)] res-1128:mx-[calc((100%-1128px)/2)] list-none flex'>

                <li className='w-[50%] res-992:w-fit h-[34px] p-2 text-sm flex items-center text-[#666666] cursor-pointer hover:underline hover:text-[#0a66c2]'>
                    <Image src={linke} alt='logo' width={56} height={14} className='w-[56px] h-[14px] mr-2' />
                    <span className='w-fit '>&copy; 2023</span>
                </li>

                <li className='w-[50%] res-992:w-fit h-[34px] p-2 text-sm text-[#666666] cursor-pointer hover:underline hover:text-[#0a66c2]'>
                    <Link href={"https://about.linkedin.com/?trk=registration_footer-about"} className='w-fit h-full' target='_blank' >About</Link>
                </li>
                <li className='w-[50%] res-992:w-fit h-[34px] p-2 text-sm text-[#666666] cursor-pointer hover:underline hover:text-[#0a66c2]'>
                    <Link href={"https://www.linkedin.com/accessibility?trk=registration_footer-accessibility"} className='w-fit h-full' target='_blank' >Accessibility</Link>
                </li>
                <li className='w-[50%] res-992:w-fit h-[34px] p-2 text-sm text-[#666666] cursor-pointer hover:underline hover:text-[#0a66c2]'>
                    <Link href={"https://www.linkedin.com/legal/user-agreement?trk=registration_footer-user-agreement"} className='w-fit h-full' target='_blank' >User Agreement</Link>
                </li>
                <li className='w-[50%] res-992:w-fit h-[34px] p-2 text-sm text-[#666666] cursor-pointer hover:underline hover:text-[#0a66c2]'>
                    <Link href={"https://www.linkedin.com/legal/privacy-policy?trk=registration_footer-privacy-policy"} className='w-fit h-full' target='_blank' >Privacy Policy</Link>
                </li>
                <li className='w-[50%] res-992:w-fit h-[34px] p-2 text-sm text-[#666666] cursor-pointer hover:underline hover:text-[#0a66c2]'>
                    <Link href={"https://www.linkedin.com/legal/cookie-policy?trk=registration_footer-cookie-policy"} className='w-fit h-full' target='_blank' >Cookie Policy</Link>
                </li>
                <li className='w-[50%] res-992:w-fit h-[34px] p-2 text-sm text-[#666666] cursor-pointer hover:underline hover:text-[#0a66c2]'>
                    <Link href={"https://www.linkedin.com/legal/copyright-policy?trk=registration_footer-copyright-policy"} className='w-fit h-full' target='_blank' >Copyright Policy</Link>
                </li>
                <li className='w-[50%] res-992:w-fit h-[34px] p-2 text-sm text-[#666666] cursor-pointer hover:underline hover:text-[#0a66c2]'>
                    <Link href={"https://brand.linkedin.com/policies?trk=registration_footer-brand-policy"} className='w-fit h-full' target='_blank' >Brand Policy</Link>
                </li>
                <li className='w-[50%] res-992:w-fit h-[34px] p-2 text-sm text-[#666666] cursor-pointer hover:underline hover:text-[#0a66c2]'>
                    <Link href={"https://www.linkedin.com/psettings/guest-controls?trk=registration_footer-guest-controls"} className='w-fit h-full' target='_blank' >Guest Controls</Link>
                </li>
                <li className='w-[50%] res-992:w-fit h-[34px] p-2 text-sm text-[#666666] cursor-pointer hover:underline hover:text-[#0a66c2]'>
                    <Link href={"https://www.linkedin.com/legal/professional-community-policies?trk=registration_footer-community-guide"} className='w-fit h-full' target='_blank' >Coomunity Guidelines</Link>
                </li>      
               
            </ul>   
        </footer>

    </div>
  )
}

export default SignUp