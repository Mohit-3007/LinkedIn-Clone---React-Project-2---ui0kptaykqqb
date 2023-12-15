'use client'
import React, { useState, useEfect, useLayoutEffect } from 'react';
import Logo from '../../public/logo.png'
import LoginMedia from '../../public/login2.png'
import Image from 'next/image';
import Link from 'next/link';
import loginUser from '../_lib/loginUser';
import { useRouter } from 'next/navigation';
import { useContextProvider } from '../ContextApi/AppContextProvider';
import linke from '@/public/linke.png'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { login, setToken, setUserName, setUserEmail, setOwner, handleLoginState } = useContextProvider()
    const [showPass, setShowPass] = useState(false)
    const [emailErrorMess, setEmailErrorMess] = useState("");
    const [passwordErrorMess, setPasswordErrorMess] = useState("");
    const [faliureLogin, setFailureLogin] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);

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
        setFailureLogin(false)
        setEmailErrorMess("");
        setPasswordErrorMess("")
    }

    function handlePassFocusInOut(){
        setFailureLogin(false)
        if(!password) setPasswordErrorMess("Please enter your password.")
        else setPasswordErrorMess('')
    }
    

    const  handleSubmit = async (e) => {
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

        if(!password){
            setPasswordErrorMess("Please enter your password.")
            return
        }
       

        const result = await loginUser(email, password)
        console.log("Login result ",result);
        if(result.status == "success"){
            let token = result.token
            console.log("token in login page ", token)
            setToken(token)
            setUserName(result?.data.name)
            setUserEmail(result?.data.email)
            setOwner(result?.data._id)
            
            document.cookie=`token=${token}`
            document.cookie=`name=${result?.data.name}`
            document.cookie=`email=${result?.data.email}`
            document.cookie=`owner=${result?.data._id}`
            handleLoginState()
            router.push("/feed");
            setEmail('')
            setPassword('')
            setSuccessLogin(true)
        }
        else{
            setFailureLogin(true)
        }
        
    }

    function handleShowPassword(e){
        e.preventDefault()
        setShowPass(!showPass)
    }

  return (
    <div className='w-[calc(100vw-17px)] bg-white pt-[80px] flex flex-col res-1162:items-center '>

        {/* main */}
        <section className='w-full res-1128:w-[1128px] px-4 res-1162:px-0 h-max pt-10 res-768:flex res-768:flex-row flex flex-col items-center relative overflow-hidden'>

            {/* form div */}
            <div className='w-full res-768:w-[460px] res-1000::w-[550px] res-768:pr-[42px] px-1 h-full'>

                {/* h1 */}
                <h1 className='w-full h-max text-[#CE8672] text-[50px] font-extralight'>
                    Welcome to your professional community
                </h1>

                {/* form container */}
                <div className='w-full res-768:w-[408px] mt-7 h-[487px] flex flex-col'>

                    <form className='w-full h-fit flex flex-col'>

                         {/* email & passowrd */}
                         <div className='w-full h-fit flex flex-col mb-3'>

                            {/* email */}
                            <div className='w-full h-fit mt-3 mb-3'>
                                <label htmlFor='input' className='h-[21px] text-[#3F3F3F] text-sm font-semibold mb-2 block'>Email</label>
                                <input id='input' type='text' value={email} 
                                onBlur={handleFocusOut}
                                onFocus={handleFocusIn}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className={'text-[#1F1F1F] px-4 py-[14px] text-base w-full h-[55px] rounded-sm outline outline-1 hover:outline-2 ' + (
                                        emailErrorMess ? "outline-[#D11124]" : "outline-[#404040]")}
                                />
                                <div className={'w-full h-5 text-sm text-[#D11124] ' + (emailErrorMess ? 'block' : 'hidden')}>{emailErrorMess}</div>
                            </div>
                            
                            {/* password */}
                            <div className='w-full h-fit mt-3'>
                                <label htmlFor='password' className='h-[21px] text-[#3F3F3F] text-sm font-semibold mb-2 block '>Password</label>
                                <div className='w-full h-fit relative ' >
                                    <input id='password' type={showPass ? 'text' : 'password'} value={password}
                                        onBlur={handlePassFocusInOut} 
                                        onFocus={handlePassFocusInOut}
                                        onChange={(e) => setPassword(e.target.value)}  
                                        className={'w-full h-[55px] px-4 py-[14px] text-[#1F1F1F] rounded-sm text-base outline outline-1 hover:outline-2 ' + (
                                            passwordErrorMess ? "outline-[#D11124]" : "outline-[#404040]" 
                                        )} />
                                    {/* error message */}
                                    <div className={'w-full h-5 text-sm text-[#D11124] ' + (passwordErrorMess ? "block" : "hidden")}>{passwordErrorMess}</div>
                                    <button onClick={handleShowPassword} className='w-10 h-[30px] text-[#0A66C2] text-base absolute right-2 top-3 font-semibold'>{showPass ? "Hide" : "Show"}</button>
                                </div>
                            </div>
                            
                        </div>

                        {/* If Login fails */}
                        {faliureLogin == true && (
                            <div className='w-full hit px-4 mt-3 mb-1 font-semibold text-sm text-center text-[#D11124]'>
                                Wrong email or password. Try again or 
                                <Link href={"/signup"} className='font-bold underline cursor-pointer ml-1'>create an account</Link>.
                            </div>
                        )}

                        {/* If Login is Success */}
                        {successLogin == true && (
                            <div className='w-full hit px-4 mt-3 mb-1 font-semibold text-sm text-center text-[#77C45F]'>Login successful, redirecting to the Home Page.</div>
                        )}

                        {/* Button */}
                        <div className='w-full mt-5 mb-2 h-12'>
                            <button onClick={(e) => handleSubmit(e)} className='w-full h-12 py-3 px-6 rounded-[24px] hover:bg-[#004182] bg-[#0A66C2] text-white 
                            text-center text-base font-semibold '>Sign in</button>
                        </div>

                        {/* or */}
                        <div className='w-full h-[61px] pt-4 pb-6 flex items-center'>
                            <div className='w-[181.4px] h-[1px] bg-[#A6A6A6]'></div>
                            <div className='w-[45px] h-[21px] px-4 text-sm text-[#666666]'>or</div>
                            <div className='w-[181.4px] h-[1px] bg-[#A6A6A6]'></div>

                        </div>

                    </form>

                    {/* terms & condition */}
                    <p className='w-full h-8 mb-4 text-[#676767] text-xs text-center'>
                        By clicking Agree & Join, you agree to the LinkedIn
                        <Link href={"#"} className='text-[#0A66CB] text-xs font-semibold'> User Agreement</Link>
                        ,
                        <Link href={"#"} className='text-[#0A66CB] text-xs font-semibold'> Privacy Policy</Link>
                        , and 
                        <Link href={"#"} className='text-[#0A66CB] text-xs font-semibold'> Cookie Policy</Link>
                    </p>

                    <Link href={"/signup"} className='w-full mt-4 mb-2 h-12'>
                        <button className='w-full h-12 py-3 px-6 rounded-[24px] border border-black hover:bg-[#f5f5f5] bg-white text-black 
                        text-center text-base font-semibold '>New to LinkedIn? Join now </button>
                    </Link>   

                </div>
      
            </div>

            {/* image */}
            <Image src={LoginMedia} alt='Login Media Pic' className='w-[380px] h-[214px] res-768:w-[calc(100%-460px)] res-1000:w-[calc(100%-520px)] res-768:h-[560px]' />

        </section>

         {/* footer */}
        <footer className=' w-full h-fit res-992:h-[50px] bg-white'>
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

export default Login