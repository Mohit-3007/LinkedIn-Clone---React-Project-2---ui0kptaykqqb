import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import linke from '@/public/linke.png'

const LogSignInFooter = ({style}) => {
    
  return (
    <footer style={style} className='w-full h-fit res-992:h-[50px] bg-white'>
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
  )
}

export default LogSignInFooter