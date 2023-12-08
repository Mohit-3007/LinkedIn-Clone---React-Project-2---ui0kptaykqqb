'use client'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { useContextProvider } from '@/app/ContextApi/AppContextProvider'
import Link from 'next/link';
import getUser from '@/app/lib/getUser'
import followUser from '@/app/lib/FollowUser'
import unfollowUser from '@/app/lib/UnfollowUser';
import backGround from '@/public/userBackGround.png'
import { IoSchoolOutline, IoLogoLinkedin, IoShieldHalf } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import { BiSolidSchool } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { BsPeopleFill, BsQuestionCircleFill } from "react-icons/bs";
import work from '@/public/work.png'
import AsidePremium from '@/app/components/AsidePremium';
import AsideUsers from '@/app/components/AsideUsers';
import Footer from '@/app/components/Footer';





const UserPage =  ({params: {id}}) => {
  const { token } = useContextProvider()
  const [userData, setUserData] = useState('');
  const [showContact, setShowContact] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const contactPopUpRef = useRef()


// fetching user details
  useEffect(() => {
    if(token){
      async function fetchUser(id, token){
        const userdata = await getUser(id, token )
        console.log("RESULT OF USER FETCH DATA ", userdata);
        setUserData(userdata?.data);
      }
      fetchUser(id, token)
    }
  },[token])

  // check user is being followed or not
  useEffect(() => {
    if(userData){
      if(userData?.isFollowed === true){
        setIsFollowing(true)
      }
    }
  },[userData])

  // follow api request
  async function handleFollow(id, token){
    const userFollowRes = await followUser(id, token)
    console.log("RESULT OF USER FOLLOWED? ", userFollowRes);
    if(userFollowRes.status === 'success') setIsFollowing(true)
  }

  // Unfollow api request
  async function handleUnFollow(id, token){
    const userUnFollowRes = await unfollowUser(id, token)
    console.log("RESULT OF USER UNFOLLOWED? ", userUnFollowRes);
    if(userUnFollowRes.status === 'success') setIsFollowing(false)
  }

  // console.log("This User is followed or not ? ", isFollowing);

// user first name & last name
  function getName(fullName){
    const nameArray = fullName?.split(" ");
    return nameArray;
  }
  const fullName = userData?.name;
  const nameArray = getName(fullName)
  var firstName
  var lastName
  if(nameArray){
    firstName = nameArray[0]
    if(nameArray[1]) lastName = nameArray[1]
  }

// formating creating at date 
  function formatDate(inputDate) {
    const dateObject = new Date(inputDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObject.toLocaleDateString('en-US', options);
  } 
  const inputDate = userData?.createdAt;
  const formattedDate = formatDate(inputDate);

  

  function handleWindowClick(e){
    if(!contactPopUpRef?.current?.contains(e.target)){
        setShowContact(false);
        // if(profileRef?.current?.contains(e.target)) return
        // else if(popUp && !profileRef?.current?.contains(e.target)) setPopUp(false)
    }    
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleWindowClick);
    return () => {
        document.removeEventListener('mousedown', handleWindowClick)
    }
  },[showContact])
  

  function handleContactPopUp(){
    setShowContact(!showContact);
  }


  return (
    
    <div className="w-[calc(100vw-17px)] bg-[#F4F2EE] pt-[3.25rem] relative h-fit">
      <div className="w-full h-fit pt-6 flex flex-col">

        {/*  */}
        <div className="w-full h-fit flex justify-center">

          {/* RESPONSIVENESS */}
          <div className="w-[720px] mx-0 res-992:w-[960px] res-992:mx-[calc((100%-960px)/2)] res-1200:w-[1128px] h-fit res-1200:mx-[calc((100%-1128px)/2)]">
            <div className='w-full h-fit flex flex-col res-768:flex-row items-center res-768:items-start justify-between'>

              {/* main */}
              <main className='w-[576px] res-768:w-[396px] res-992:w-[636px] res-1200:w-[50.25rem] mb-3 res-768:mb-0 h-fit flex flex-col'>

                {/* User Profile details, address & contact */}
                <section className='w-full h-fit'>

                  {/* background container */}
                  <div className='w-full h-[12.5625rem] '>
                    <Image src={backGround} alt='background image' height={201} objectFit='cover' className='w-full h-full rounded-t-md shadow-lg' />
                  </div>

                  {/* user profile pic & details  container */}
                  <div className='w-full h-max px-6 pb-6 bg-white rounded-b-md shadow-lg flex flex-col'>

                    {/* User profile pic */}
                    <div className='w-full h-[60px] flex flex-col'>
                      {/* pic */}
                      <div className='w-[128px] res-992:w-[160px] h-[172px] -mt-[112px]'>
                       <div className='w-full h-[160px]'>
                        {userData && (
                          <Image src={userData?.profileImage} alt='user profile pic'
                           width={152} height={152} 
                            className='border-[4px] rounded-[50%]' />
                        )}
                       </div>
                      </div>
                      <div className='w-[37.25rem] h-full'></div>

                    </div>

                    {/* User details pic */}
                    <div className='mt-2 w-full h-fit flex flex-col relative'>

                      {/* name & education & college */}
                      <div className='w-full h-fit flex items-start'>

                        {/* name & education */}
                        <div className='w-[72%] res-992:w-[66%] res-1200:w-[500px] h-full flex flex-col'>
                          {/* name */}
                          <div className='w-full h-[30px] flex items-center justify-start '>
                            <span className='text-[#191919] text-lg res-992:text-2xl h-full py-1 font-semibold rounded-sm hover:bg-[#EBEBEB] flex items-center '>{userData?.name}</span>
                            <span className='text-[#666666] ml-1 text-sm'>{userData?.gender === 'male' ? '(He/Him)' : "(She/Her)"}</span>
                          </div>
                          {/* education ul */}
                          <div className='w-full h-fit test-sm res-992:text-base text-[#595959] break-all flex'>
                            {userData?.education?.map((e, index) => {
                              return (
                                <React.Fragment key={index}>
                                  {e?.degree}
                                  {index < userData.education.length - 1 && ', '}
                                </React.Fragment>
                                
                              )
                            })}   
                          </div>

                        </div>

                        {/* college or Institute */}
                        <div className='w-[28%] res-992:w-[34%] res-1200:w-[232px] h-[43px]'>
                          <ul className='text-sm font-semibold text-[#191919] ml-5 res-992:ml-10 '>
                            {userData?.education?.map((e, index) => {
                              return(
                                <li className='mb-2 flex items-center hover:scale-105'>
                                  <IoSchoolOutline className='w-6 h-6 mr-2' />
                                  {e.schoolName}
                                </li>
                              )
                            })}
                          </ul>
                        </div>

                      </div>

                      {/* address & contact */}
                      <div className='mt-2 w-[72%] res-992:w-fit h-fit res-992:h-[18px] flex'>
                        <span className='h-full text-[#9B9B9B] text-sm'>
                           {userData?.address && userData.address[0]
                              ? `${userData.address[0].city}, ${userData.address[0].state}, ${userData.address[0].country}`
                              : ''
                          }
                        </span>
                        <span className='h-full text-[#307ECB] text-sm font-semibold'><span>. </span><span onClick={handleContactPopUp} className='hover:underline cursor-pointer'>Contact info</span></span>
                      </div>

                      {/* Contact popUp window */}
                      {showContact && (
                        <div ref={contactPopUpRef} className='-bottom-[10px] left-[266px] z-30 flex flex-col bg-white shadow-2xl rounded-md w-[552px] h-[364px] absolute'>
                          
                          {/* name & cross */}
                          <div className='w-full h-11 pl-3 py-2 flex border-b border-[#E8E8E8]'>
                            {/* name */}
                            <div className='w-[492px] h-full text-[#191919] font-semibold text-xl'>{userData?.name}</div>
                            {/* cross */}
                            <div className='w-[calc(100%-492px)] h-full flex items-center justify-center'>
                              <button className='w-8 h-8 rounded-[50%] hover:bg-[#EBEBEB] flex items-center justify-center'><RxCross1 onClick={handleContactPopUp} className='w-5 h-5 text-[#666666]' /></button>
                            </div>
                          </div>

                          {/* address */}
                          <div className='w-full h-[calc(100%-44px)] px-3 py-2'>
                            <section className='w-full h-max'>
                              <h2 className='text-xl text-[#191919] mb-4'>Contact Info</h2>
                              <div className='w-full h-full text-[#191919]'>

                                {/* user profile */}
                                <section className='w-full h-12 flex mb-4'>
                                  {/* icon */}
                                  <div className='w-10 h-6 flex justify-center'><IoLogoLinkedin className='w-6 h-6 text-[#404040]' /></div>
                                  {/* details */}
                                  <div className='w-full h-full flex flex-col ml-2'>
                                    <div className='w-full h-6 font-semibold text-base'>{firstName}'s Profile</div>
                                    <div className='w-full h-5 mt-1 text-[#307ECB] font-semibold lowercase text-sm hover:underline'>
                                      linkedin.com/in/{firstName}-{lastName && lastName}-{id}
                                    </div>
                                  </div>
                                </section>

                                {/* Phone */}
                                <section className='w-full h-12 flex mb-4'>
                                  {/* icon */}
                                  <div className='w-10 h-6 flex justify-center'><FaPhoneAlt className='w-5 h-5 text-[#404040]' /></div>
                                  {/* details */}
                                  <div className='w-full h-full flex flex-col ml-2'>
                                    <div className='w-full h-6 font-semibold text-base'>Phone</div>
                                    <div className='w-full h-5 mt-1 text-sm flex'>
                                      {userData?.phone} <span className='text-[#9B9B9B] ml-1'>(Work)</span>
                                    </div>
                                  </div>
                                </section>

                                {/* email */}
                                <section className='w-full h-12 flex mb-4'>
                                  {/* icon */}
                                  <div className='w-10 h-6 flex justify-center'><AiOutlineMail className='w-6 h-6 text-[#404040]' /></div>
                                  {/* details */}
                                  <div className='w-full h-full flex flex-col ml-2'>
                                    <div className='w-full h-6 font-semibold text-base'>Email</div>
                                    <div className='w-full h-5 mt-1 text-[#307ECB] font-semibold lowercase text-sm hover:underline'>
                                      {userData?.email}
                                    </div>
                                  </div>
                                </section>

                                {/* Joined */}
                                <section className='w-full h-12 flex mb-4'>
                                  {/* icon */}
                                  <div className='w-10 h-6 flex justify-center'><BsPeopleFill className='w-5 h-5 text-[#404040]' /></div>
                                  {/* details */}
                                  <div className='w-full h-full flex flex-col ml-2'>
                                    <div className='w-full h-6 font-semibold text-base'>Joined</div>
                                    <div className='w-full h-5 mt-1 text-sm flex'>
                                      {formattedDate}
                                    </div>
                                  </div>
                                </section>

                              </div>
                            </section>
                          </div>  

                        </div>
                      )}
                      
                    </div>

                    {/* follow / Unfollow */}
                    <div className='w-full h-8 mt-4'>
                      <div className='h-full flex'>

                        {/* folowing or not */}
                        {!isFollowing && (
                          <div onClick={() => handleFollow(id, token)} className='w-[121px] h-full bg-white outline outline-1 outline-[#0A66C2] rounded-[35px] hover:outline-2 hover:bg-[#def2fd] hover:cursor-pointer py-1.5 px-4 flex items-center justify-center'>
                            <button className='w-fit h-full text-base font-semibold text-[#0A66C2] flex items-center justify-center'>
                              <FaPlus className='w-4 h-4 mr-1 ' />Follow
                            </button>
                          </div>
                        )}

                        {isFollowing && (
                        <div onClick={() => handleUnFollow(id, token)} className='w-[121px] h-full bg-[rgb(10,102,194)] rounded-[35px] hover:bg-[#053059] hover:cursor-pointer py-1.5 px-4 flex items-center justify-center'>
                          <button className='w-fit h-full text-base font-semibold text-white flex items-center justify-center'>Following</button>
                        </div>
                        )}
                        

                        
                      </div>
                    </div>
                    
                  </div> 

                </section>

                {/* experience */}
                <section className='w-full h-fit mt-2 pb-3 text-[#191919] bg-white rounded-md shadow-lg flex flex-col'>

                    {/* heading */}
                    <div className='w-full h-[49px] px-3 py-3'>
                      <h1 className='w-full h-full px-3 pt-3 font-semibold text-xl'>Experience</h1>
                    </div>
                    
                    {/* work experience conatiner */}
                    <div className='w-full h-full'>
                        <ul className='w-full h-full'>
                          {/* map function */}
                          {userData?.workExperience && userData.workExperience.map( (e, index) => {
                            const startDate = new Date(e?.startDate)
                            const endDate = new Date(e?.endDate)   
                            const options = {month: 'short', year: 'numeric'}
                            const startTIme = startDate.toLocaleDateString("en-US", options)
                            const endTIme = endDate.toLocaleDateString("en-US", options)

                            function timeDiff(start, end){
                              const yearDiff = end.getFullYear() - start.getFullYear();
                              const monthDiff = end.getMonth() - start.getMonth();
                              
                              let result = '';

                              if (yearDiff > 0) {
                                if (monthDiff < 0) {
                                  result += `${yearDiff-1} ${yearDiff-1 === 1 ? ' yr ' : ' yrs '}`;
                                  const surplusMonth = 12 - (Math.abs(monthDiff));
                                  result += ` ${surplusMonth} ${surplusMonth === 1 ? ' mo ' : ' mos '}`;
                                }  
                                
                                if (monthDiff > 0) {
                                  result += `${yearDiff} ${yearDiff === 1 ? ' yr ' : ' yrs '}`;
                                  result += ` ${monthDiff} ${monthDiff === 1 ? ' mo ' : ' mos '}`;
                                } 
                              } else if (monthDiff > 0) {
                                result += `${monthDiff} ${monthDiff === 1 ? ' mo ' : ' mos '}`;
                              } else {
                                result = 'Less than a month';
                              }

                              return result;

                            }
                            const workTime = timeDiff(startDate, endDate)                   
                            return (
                              <li key={index} className='w-full h-max px-6 py-3 flex flex-col'>   

                                <div className='w-full h-full flex flex-row'>
                                  {/* pic */}
                                  <div className='w-[56px] h-full'>
                                    <Image src={work} alt='work pic' height={48} width={48} className='w-12 h-12' />
                                  </div>

                                  {/* work details */}
                                  <div className='w-[calc(100%-56px)] h-max'>
                                    <div className='w-full h-full flex flex-col'>
                                      {/* desigantion */}
                                      <div className='w-full h-6 flex items-center text-base font-semibold'>{e?.designation}</div>
                                      {/* co. name */}
                                      <div className='h-5 flex items-center text-sm'>{e?.companyName}</div>
                                      {/* experience in months & years */}
                                      <div className='h-5 flex items-center text-sm text-[#A4A4A4]'>{startTIme} - {endTIme} . {workTime}</div>
                                      {/* Location */}
                                      <div className='h-5 flex items-center text-sm text-[#A4A4A4]'>{e?.location}</div>

                                    </div>
                                  </div>

                                </div>

                                {index != userData?.workExperience?.length-1 && (<div className='w-full h-[1px] bg-[#E8E8E8] mt-4 rounded-sm'></div>)}

                              </li>
                            )
                          })
                          }
                        </ul>
                    </div>

                </section>

                {/* education */}
                <section className='w-full h-fit mt-2 pb-3 text-[#191919] bg-white rounded-md shadow-lg flex flex-col'>
                  
                  {/* heading */}
                  <div className='w-full h-[49px] px-3 py-3'>
                      <h1 className='w-full h-full px-3 pt-3 font-semibold text-xl'>Education</h1>
                  </div>

                  {/* education container */}
                  <div className='w-full h-full'>
                      <ul className='w-full h-full'>
                        {/* map function */}
                        {userData?.education && userData.education.map( (e, index) => {
                          const startYear = new Date(e?.startDate).getFullYear()
                          const endYear = new Date(e?.endDate).getFullYear()

                          return (
                            <li key={index} className='w-full h-max'>
                              <div className='w-full h-max px-6 py-3 flex flex-col'>

                                <div className='w-full h-full flex flex-row'>
                                  {/* icon */}
                                  <div className='w-[56px] h-full'>
                                    <BiSolidSchool className='w-12 h-12' />
                                    {/* <Image src={work} alt='work pic' height={48} objectFit='cover' className='w-12 h-12' /> */}
                                  </div>

                                  {/* education details */}
                                  <div className='w-[calc(100%-56px)] h-max'>

                                    <div className='w-full h-fit flex flex-col'>
                                      <div className='w-full h-fit flex flex-col'></div>
                                      {/* College details */}
                                      <div className='w-full h-fit flex flex-col'>
                                        {/* name */}
                                        <div className='text-base font-semibold w-full h-6 flex items-center'>{e?.schoolName}</div>
                                        {/* degree */}
                                        <div className='w-full h-5 flex items-center text-sm'>{e?.degree}</div>
                                        {/* year */}
                                        <div className='w-full h-5 flex items-center text-[#666666]'>{startYear} - {endYear}</div>
                                      </div>

                                      
                                    </div>

                                    <div className='w-full h-fit flex items-center break-words'>{e?.description}</div>

                                  </div>
                                </div>

                                {index != userData?.education?.length-1 && (<div className='w-full h-[1px] bg-[#E8E8E8] mt-4 rounded-sm'></div>)}

                              </div>

                              

                            </li>
                          )
                        })}
                      </ul>
                  </div>

                </section>

                {/* skills */}
                <section className='w-full h-fit mt-2 pb-3 text-[#191919] bg-white rounded-md shadow-lg flex flex-col'>

                  {/* heading */}
                  <div className='w-full h-[49px] px-3 py-3'>
                    <h1 className='w-full h-full px-3 pt-3 font-semibold text-xl'>Skills</h1>
                  </div>

                  {/* skills container */}
                  <div className='w-full h-full'>
                    <ul className='w-full h-full'>
                      {/* map function */}
                      {userData?.skills && userData.skills.map( (e, index) => { 
                        // console.log(userData?.skills)

                        return (
                          <li key={index} className='w-full h-max'>
                            <div className='w-full h-max px-6 py-3 flex flex-col'>

                              <div className='w-full h-full flex flex-row'>
                                {/* icon */}
                                <div className='w-[56px] h-full'>
                                  <BsPeopleFill className='w-10 h-10' />
                                  {/* <Image src={work} alt='work pic' height={48} objectFit='cover' className='w-12 h-12' /> */}
                                </div>

                                {/* skillls details */}
                                <div className='w-[calc(100%-56px)] h-max'>                             
                                  <div className='w-full h-fit flex flex-col'>
                                    {/* skill */}
                                    <div className='text-base font-semibold w-full h-6 flex items-center'>{e}</div>
                                  </div>                                       
                                </div>
                              </div>

                              {index != userData?.skills?.length-1 && (<div className='w-full h-[1px] bg-[#E8E8E8] mt-4 rounded-sm'></div>)}
  
                            </div>

                          </li>
                        )
                      })}
                    </ul>
                  </div>

                </section>

              </main>

              {/* Aside */}
              <aside className='w-[576px] res-768:w-[18.75rem] h-fit'>
                  
                  {/* aside top bar */}
                  <div className='w-full h-[250px] mb-2 bg-white outline outline-1 outline-[#E8E8E8] shadow-lg overflow-hidden rounded-xl'>
                    <AsidePremium />
                  </div>
                  {/*  */}
                  <div className='w-full h-fit mt-2 flex flex-col bg-white outline outline-1 outline-[#E8E8E8] shadow-lg overflow-hidden rounded-xl'>
                    <AsideUsers />
                  </div>

              </aside>

            </div>
          </div>

        </div>

        {/* footer */}
        <Footer />

      </div>
    </div>

  )
}

export default UserPage