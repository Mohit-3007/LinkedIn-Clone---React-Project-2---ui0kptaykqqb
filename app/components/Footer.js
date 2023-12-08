'use client'
import React from 'react';
import Link from 'next/link';
import { IoShieldHalf } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { BsQuestionCircleFill } from "react-icons/bs";

const Footer = () => {

  return (
    <footer className='w-full res-1128:w-[1128px] res-1128:mx-[calc((100%-1128px)/2)] h-fit my-6 pt-6'>
        <div className='w-full h-fit'>

            <div className='w-full h-full my-3 flex'>
            
                {/* left panel */}
                <div className='w-[50%] h-fit'>
                    <ul className='w-full h-[134px] flex flex-row flex-wrap text-[#62615F] text-xs font-semibold'>

                        <li className='w-1/3 h-4 mb-3'>
                        <Link href={"https://about.linkedin.com/"} 
                        target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2]'>About</Link>
                        </li>

                        <li className='w-1/3 h-4 mb-3'>
                        <Link href={"https://www.linkedin.com/accessibility?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B%2FsqeDHhHReySxNr7d0ZwSA%3D%3D"} 
                        target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Accessibility</Link>
                        </li>

                        <li className='w-1/3 h-4 mb-3'>
                        <Link href={"https://www.linkedin.com/uas/login-cap?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Ftalent%2Fpost-a-job%3Flipi%3Durn%253Ali%253Apage%253Ad_flagship3_profile_view_base%253B%252FsqeDHhHReySxNr7d0ZwSA%253D%253D%26src%3Dli-footer%26trk%3Dfooter_jobs_home&source_app=tsweb&trk=tsweb_signin"} 
                        target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Talent Solutions</Link>
                        </li>

                        <li className='w-1/3 h-4 mb-3'>
                        <Link href={"https://www.linkedin.com/legal/professional-community-policies"} 
                        target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Community Guidelines</Link>
                        </li>

                        <li className='w-1/3 h-4 mb-3'>
                        <Link href={"https://careers.linkedin.com/"} 
                        target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Careers</Link>
                        </li>

                        <li className='w-1/3 h-4 mb-3'>
                        <Link href={"https://business.linkedin.com/marketing-solutions?trk=n_nav_lms_f&src=li-footer"} 
                        target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Marketing Solutions</Link>
                        </li>
                        
                        <li className='w-1/3 h-4 mb-3'>
                        <Link href={"#"} 
                        target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Privacy & Terms</Link>
                        </li>
                                            
                        <li className='w-1/3 h-4 mb-3'>
                        <Link href={"https://business.linkedin.com/marketing-solutions/ads?trk=n_nav_ads_f"} 
                        target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Ad Choices</Link>
                        </li>
                                            
                        <li className='w-1/3 h-4 mb-3'>
                        <Link href={"https://www.linkedin.com/help/linkedin/answer/a1342443"} 
                        target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Advertising</Link>
                        </li>
                                            
                        <li className='w-1/3 h-4 mb-3'>
                        <Link href={"https://business.linkedin.com/sales-solutions?trk=flagship_nav&veh=li-footer-lss-control&src=li-footer"} 
                        target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Safety Solutions</Link>
                        </li>
                                            
                        <li className='w-1/3 h-4 mb-3'>
                        <Link href={"https://mobile.linkedin.com/"} 
                        target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Mobile</Link>
                        </li>
                                            
                        <li className='w-1/3 h-4 mb-3'>
                        <Link href={"https://business.linkedin.com/grow?&src=li-footer"} 
                        target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Small Buisness</Link>
                        </li>
                                            
                        <li className='w-1/3 h-4 mb-3'>
                        <Link href={"https://about.linkedin.com/transparency"} 
                        target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Safety Center</Link>
                        </li>




                    </ul>
                </div>

                {/* right panel */}
                <div className='w-[50%] h-fit'>
                    <div className='w-full h-fit flex'>
                        {/* left */}
                        <div className='w-fit h-fit flex flex-col'>

                        <li className='w-full h-fit mb-4 flex'>
                            {/* svg */}
                            <BsQuestionCircleFill className='text-[#3D3D3C] mr-2 w-5 h-5' />
                            <div className='w-[calc(100%-32px)] h-full flex flex-col'>
                            <Link href={"https://www.linkedin.com/help/linkedin?trk=d_flagship3_profile_view_base"} 
                                target='_blank' className='text-sm font-semibold text-[#7D7C7A] h-5 flex items-center hover:underline hover:text-[#0a66c2]'>Questions?
                            </Link>
                            <p className='h-fit flex items-center text-xs text-[#62615F]'>Vist our Help Center</p>
                            </div>
                        </li>
                        
                        <li className='w-full h-fit mb-4 flex'>
                            {/* svg */}
                            <IoMdSettings className='text-[#3D3D3C] mr-2 w-6 h-6' />
                            <div className='w-[calc(100%-32px)] h-full flex flex-col'>
                            <Link href={"https://www.linkedin.com/mypreferences/d/categories/account"} 
                                target='_blank' className='text-sm font-semibold text-[#7D7C7A] h-5 flex items-center hover:underline hover:text-[#0a66c2]'>Manage your account and privacy 
                            </Link>
                            <p className='h-fit flex items-center text-xs text-[#62615F]'>Go to your Settings</p>
                            </div>
                        </li>
                                                
                        <li className='w-full h-fit mb-4 flex'>
                            {/* svg */}
                            <IoShieldHalf className='text-[#3D3D3C] mr-2 w-6 h-6' />
                            <div className='w-[calc(100%-32px)] h-full flex flex-col'>
                            <Link href={"https://www.linkedin.com/help/linkedin/answer/a1339724"} 
                                target='_blank' className='text-sm font-semibold text-[#7D7C7A] h-5 flex items-center hover:underline hover:text-[#0a66c2]'>Recommendation tranparency 
                            </Link>
                            <p className='h-fit flex items-center text-xs text-[#62615F]'>Learn more about Recommended Content</p>
                            </div>
                        </li>

                        </div>
                        {/* right */}
                        <div className='w-[50%] h-[156px]'>

                        </div>
                    </div>
                </div>

            </div>

            <p className='w-full h-4 text-[#62615F] text-xs'>Linkedin Corporation &copy; 2023</p>

        </div>
    </footer>
  )
}

export default Footer