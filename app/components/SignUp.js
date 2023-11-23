'use client'
import React, { useState, useEfect } from 'react';
import Logo from '../../public/logo.png'
import Image from 'next/image';
import Link from 'next/link';
import loginUser from '../lib/loginUser';
import { useRouter } from 'next/navigation';



const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    async function handleSubmit(e){
        e.preventDefault()
        console.log("submit clicked");
        console.log(email, password)

        const result = await loginUser(email, password)
        console.log("Login result ",result);
        if(result.status == "success"){
            let token = result.token;
            router.push("/feed");
        }
        // setEmail('')
        // setPassword('')
    }

  return (
    <div className="w-[calc(100vw-17px)] h-screen bg-[#F3F2F0]">

        {/* main */}
        <main className='w-full res-1128:w-[1128px] res-1128:mx-[calc((100%-1128px)/2)] px-4 py-6 h-max ' >

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
            <div className='w-[400.5px] mx-[calc((100%-400.5px)/2)] h-fit bg-white rounded-md shadow'>

                <form className='w-full h-fit '>
                    <section className='w-full h-full px-6 pt-6'>

                        {/* email & passowrd */}
                        <div className='w-full h-fit'>

                            {/* email */}
                            <label htmlFor='input' className='h-5 text-[#3F3F3F] text-sm font-semibold mb-1 block'>Email or phone number</label>
                            <input id='input' type='text' value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className='text-[#1F1F1F] border border-[#404040] px-4 text-base w-full h-[30px] rounded-sm outline-1 hover:outline hover:outline-black'
                            />
                            <div className='w-full h-5 text-sm text-[#D11124] hidden'></div>

                            {/* passoword */}
                            <label htmlFor='password' className='h-5 text-[#3F3F3F] text-sm font-semibold mt-4 mb-1 block '>Password 6+ characters</label>
                            <div className='w-full h-fit border border-[#404040] rounded-sm relative outline-1 hover:outline hover:outline-black' >
                                <input id='password' type='password' value={password} 
                                    onChange={(e) => setPassword(e.target.value)}  
                                    className='w-full h-[30px] px-4 text-[#1F1F1F] text-base ' />
                                {/* error message */}
                                <div className='w-full h-5 text-sm text-[#D11124] hidden'></div>
                                <button className='w-10 h-[30px] text-[#0A66C2] text-base absolute right-2 top-0 font-semibold'>Show</button>
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
                <p className='w-full px-4 h-[64px] pt-4 pb-6 text-center text-base text-[#1F1F1F]'>
                    Already on Linkedin? <Link href={"#"} className='text-[#0A66CB] hover:underline text-base font-semibold'> Sign in</Link>
                </p>
            </div>

        </main>

        {/* footer */}
        <footer>

        </footer>

    </div>
  )
}

export default SignUp