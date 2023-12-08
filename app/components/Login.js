'use client'
import React, { useState, useEfect } from 'react';
import Logo from '../../public/logo.png'
import LoginMedia from '../../public/login2.png'
import Image from 'next/image';
import Link from 'next/link';
import loginUser from '../lib/loginUser';
import { useRouter } from 'next/navigation';
import { useContextProvider } from '../ContextApi/AppContextProvider';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { setToken, setUserName, setUserEmail, setOwner, handleLoginState } = useContextProvider()
    

    const  handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submit clicked");
        console.log(email, password)

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
        }
        // setEmail('')
        // setPassword('')
    }

  return (
    <div className='w-[calc(100vw-17px)] bg-white pt-[80px] flex flex-col res-1162:items-center '>
        <section className='w-full res-1128:w-[1128px] px-4 res-1162:px-0 h-max pt-10 res-768:flex res-768:flex-row flex flex-col items-center relative overflow-hidden'>

            {/* form div */}
            <div className='w-full res-768:w-[460px] res-1000::w-[550px] res-768:pr-[42px] h-full'>

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
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className='text-[#1F1F1F] border border-[#404040] px-4 py-[14px] text-base w-full h-[55px] rounded-sm outline-1 hover:bg-[#f5f5f5] hover:outline hover:outline-black'
                                />
                                <div className='w-full h-5 text-sm text-[#D11124] hidden'></div>
                            </div>
                            
                            {/* password */}
                            <div className='w-full h-fit mt-3'>
                                <label htmlFor='password' className='h-[21px] text-[#3F3F3F] text-sm font-semibold mb-2 block '>Password</label>
                                <div className='w-full h-fit border border-[#404040] rounded-sm relative outline-1 hover:outline hover:outline-black' >
                                    <input id='password' type='password' value={password} 
                                        onChange={(e) => setPassword(e.target.value)}  
                                        className='w-full h-[55px] px-4 py-[14px] text-[#1F1F1F] text-base hover:bg-[#f5f5f5]' />
                                    {/* error message */}
                                    <div className='w-full h-5 text-sm text-[#D11124] hidden'></div>
                                    <button className='w-10 h-[30px] text-[#0A66C2] text-base absolute right-2 top-3 font-semibold'>Show</button>
                                </div>
                            </div>
                            
                        </div>

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
    </div>
  )
}

export default Login