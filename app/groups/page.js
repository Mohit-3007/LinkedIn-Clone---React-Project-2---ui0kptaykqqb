'use client'
import Image from 'next/image'
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useContextProvider } from '@/app/ContextApi/AppContextProvider'
import Link from 'next/link';
import disco from '@/public/disco.png';
import { RxCross1 } from "react-icons/rx";
import { BiSolidPencil } from "react-icons/bi";
import { HiCamera } from "react-icons/hi2";
import { ImCheckboxChecked } from "react-icons/im";
import uploadSamp from '@/public/uploadSamp.jpeg';
import uploadBg from '@/public/uploadBg.jpeg';
import creatingGroup from '../_lib/creatingGroup';
import { useAlertContextProvider } from '../ContextApi/AlertContextProvider';
import { PiWarningOctagonFill } from "react-icons/pi";
import NavBar from '../_components/NavBar';
import getPosts from '../_lib/getPosts';
import GroupLocalData from '../_components/GroupLocalData';
import { Gi3DMeeple } from "react-icons/gi";
import { useRouter } from 'next/navigation';
import AlertBox from '../_components/AlertBox';





const Groups = () => {
    const router = useRouter();
    const { token } = useContextProvider();
    const [showGroupPopup, setShowGroupPopup ] = useState(false);
    const groupRef = useRef()
    const crossRef = useRef()
    const inputRef = useRef()
    const uploadBtnRef = useRef()
    const uploadPopupRef = useRef()
    const alertDivRef = useRef()
    const [showUpload, setShowUpload] = useState(false);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectCheck1, setSelectCheck1] = useState(true)
    const [selectCheck2, setSelectCheck2] = useState(true)
    const [imageFile, setImageFile] = useState()
    const [imgUrl, setImgUrl] = useState('');
    const { alertImageUpload, alertGroupCreated, alertDispatch } = useAlertContextProvider()
    const [showAlertImg, setShowAlertImg] = useState(false)
    const [showAlertGrp, setShowAlertGrp] = useState(false)
    const [page, setPage] = useState(1);
    const [groupRes, setGroupRes] = useState('');
    const [islocalData, setIsLocalData] = useState(false);
    const [checkLocal, setCheckLocal] = useState(false);

    // console.log("alertImageUpload ",alertImageUpload);   
    // console.log("alertGroupCreated ",alertGroupCreated);   
    // console.log("showAlert ",showAlert); 

    useLayoutEffect( () => {
        if(!decodeURIComponent(document.cookie)){
            console.log("You are not logged in, re-routing to login page")
            router.replace('/')
        }
      },[])
    
    useEffect( () => {
        if(localStorage.getItem('groupData')){
            console.log("local data present");
            setIsLocalData(true)
        }
        else{
            console.log("local data not present");
        }
    },[checkLocal])
    
    function handleCloseAlert(){
        if(alertImageUpload == true){
            console.log("handleCloseAlert:  alertImageUpload was True")
            alertDispatch({ type: "imgAlertFalse" })
            setShowAlertImg(false)  
        }
        else if(alertGroupCreated){
            console.log("handleCloseAlert:  alertGroupUpload was True")
            alertDispatch({ type: "groupAlertFalse" })
            setShowAlertGrp(false)             
        }
        else{
            console.log("Do Nothing, Just Chill!")
        }         
    }

    async function handleCreateGroup(){
        const crtGrouppRes = await creatingGroup(title, description, imageFile, token)
        console.log("Is Group Created or not? ", crtGrouppRes)
        if(crtGrouppRes.status === 'fail'){
            if(crtGrouppRes.message === 'Channel with this name already exists') return
        }
        else{
            const groupObj = {
                name:crtGrouppRes?.data?.name,
                owner:crtGrouppRes?.data?.owner,
                id:crtGrouppRes?.data?._id,
                content:description,
                image:imgUrl
            }
            
            if(localStorage.getItem('groupData')){
                const storedData = JSON.parse(localStorage.getItem('groupData'))
                const newData = JSON.stringify([...storedData, groupObj])

                console.log("Data already existed")
                localStorage.setItem( 'groupData', newData )
                alertDispatch({ type: "groupAlertTrue" })
                setShowAlertGrp(prev => !prev)
                setShowGroupPopup(false)
                setTitle('')
                setDescription('')
                setCheckLocal(!checkLocal)
            }
            else{
                const stringifyObj = JSON.stringify([groupObj]);
                console.log("New Data Created");
                localStorage.setItem( 'groupData' , stringifyObj );
                alertDispatch({ type: "groupAlertTrue" })
                setShowAlertGrp(prev => !prev)
                setShowGroupPopup(false)
                setTitle('')
                setDescription('')
                setCheckLocal(!checkLocal)
            }     
        }
    }

    function handleGroupPopup(){
        console.log("create Group");
        setShowGroupPopup(true)
    }

    function handleImageChange(e){
        console.log("image upload preview");
        const file = e.target.files[0];
        console.log('Selected file:', file);
        if (file) {
            if (file.type.startsWith('image/')) {
                setImageFile(file);
                const reader = new FileReader(); 
                reader.onload = function (e) {
                    console.log("e.target.result ",e.target.result);
                    setImgUrl(e.target.result)
                };
                reader.readAsDataURL(file);
            }
            else{
                // alert("Only image files are accepted.");
                alertDispatch({ type: "imgAlertTrue" })
                setShowAlertImg(prev => !prev)
            }       
        }
    }

    function handleUploadIconClick(){
        inputRef?.current.click()
        setShowUpload(false)
    }

    function handleDocumentClick(e){
        if(!groupRef?.current?.contains(e?.target)){
            console.log('Outside Group ref')
            if(alertDivRef?.current?.contains(e?.target)) {
                console.log("inside alertDivRef")
                return
            }
            else if(showAlertImg == true){
                // console.log("show alert is true")
                return
            }
            else{
                console.log("showAlert is false")
                setShowUpload(false)
                setShowGroupPopup(false)
                setSelectCheck1(true)
                setSelectCheck2(true)
                setImgUrl('')
                setTitle('')
                setDescription('')
            }
            
        }
        else{
            // console.log("inside else")
            if(uploadBtnRef?.current?.contains(e.target)) return
            if(uploadPopupRef?.current?.contains(e.target)) return
            setShowUpload(false)
        }   
    }

    useEffect( () => {
        document.addEventListener('mousedown', handleDocumentClick)
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick)
        }
    }, [])

// random page & number
    const pg = Math.floor(Math.random() * (100 - 5 + 1)) + 5;
   
    useEffect(() => {
        async function callFetch(){
            // console.log(`fetch request sent with page no ${page}`)
            const data = await getPosts({limit:6, page:pg})
            console.log("Channel/Groups ", data)
            if(data.status === 'success'){
                setGroupRes(data?.data)
            }         
        }
        callFetch()
      },[]);

    function handleAlert(){
    alertDispatch({type:"showComingSoon"})
    setTimeout(()=>{
        alertDispatch({type: 'hideComingSoon'})
    }, 2500)
    }


  return (
    <>
        {/* <NavBar /> */}

        <div className="w-full h-fit z-10  pt-[3.25rem] ">

        {/* <div className={'w-full bg-[#F4F2EE] pt-[3.25rem] z-20 relative h-screen scrollbar-stable ' + (
            showGroupPopup ? "overflow-y-hidden" : "overflow-y-scroll"
        )}> */}
            <div className='w-[calc(100vw-17px)] h-full'>

                {/* main group view & Aside bar */}
                <div className='w-full h-full pt-6 flex flex-col'>
                    <div className='w-full h-full'>
                        {/* Responsiveness */}
                        <div className='w-full flex-col gap-4 res-768:gap-0 items-center res-768:items-start flex res-768:flex-row res-768:w-[720px] res-992:w-[960px] res-1200:w-[1128px] h-full res-768:mx-[calc((100%-720px)/2)] res-992:mx-[calc((100%-960px)/2)] res-1200:mx-[calc((100%-1128px)/2)] res-768:justify-between relative'>

                            {/* main */}
                            <main className='w-[576px] res-768:w-[396px] res-992:w-[636px] res-1200:w-[50.25rem] h-full '>
                                <div className='w-full h-[457px] bg-white outline outline-1 outline-[#E8E8E8] shadow-lg overflow-hidden rounded-xl flex flex-col'>

                                    {/* heading */}
                                    <div className='w-full h-[49px] pl-2 pr-6 border-b border-[#E8E8E8] flex justify-between'>

                                        <div className='w-fit h-full'>
                                            <div className='w-full h-full pt-[9px] pb-[11px] pl-6 pr-2 flex justify-center
                                                items-center text-[#037651] font-semibold text-sm hover:bg-[#EBEBEB]' >
                                                Your groups
                                            </div>
                                        </div>

                                        <button onClick={() => handleGroupPopup()} className='w-fit h-8 my-2 px-4 outline outline-1 outline-[#0a66c2] text-[#0a66c2] 
                                        text-base font-semibold hover:outline-2 flex items-center rounded-3xl hover:bg-[#def2fd]'>
                                            Create group
                                        </button>

                                    </div>

                                    {/* groups view container */}
                                    <div className='w-full h-[calc(100%-49px)] p-4'>

                                        {!islocalData &&
                                            <div className='w-full h-full'>
                                                <div className='w-[calc(100%-32px)] h-[calc(100%-8px)] mx-4 mt-2 p-4 flex flex-col justify-between'>

                                                    {/* top */}   
                                                    <section className='w-[20rem] h-[15.5rem] mx-[calc((100%-320px)/2)] flex flex-col'>
                                                        {/* pic */}
                                                        <div className='w-full h-[160px] flex items-center justify-center'>
                                                            <Image src={disco} alt='discover' height={160} className='w-[200px] h-full' objectFit='cover'/>
                                                        </div>

                                                        <h2 className='w-full h-8 flex justify-center items-center text-2xl font-semibold text-[#191919]'>Discover Groups</h2>

                                                        <p className='mt-2 mb-6 w-full h-fit text-center text-base text-[#666666]'>
                                                            Find other trusted communities that share and support your goals.
                                                        </p>

                                                    </section>

                                                    {/* bottom */}
                                                    <div onClick={handleAlert} className='w-full h-[64px] flex justify-center items-start'>
                                                        <Link href={"#"} className='h-8 py-1.5 px-4 w-fit outline outline-1 outline-[#0a66c2] text-[#0a66c2]
                                                            text-base font-semibold hover:outline-2 flex items-center rounded-3xl hover:bg-[#def2fd]'>
                                                                Discover
                                                        </Link>
                                                    </div>  

                                                </div>
                                            </div>
                                        }

                                        {islocalData && <GroupLocalData checkLocal={checkLocal} setCheckLocal={setCheckLocal} /> }

                                    </div>

                                </div>
                            </main>

                            {/* aside */}
                            <aside className='w-[576px] res-768:w-[18.75rem] h-fit overflow-hidden rounded-xl'>

                                {/* groups section */}
                                <section className='w-full h-fit bg-white outline outline-1 outline-[#E8E8E8] shadow-lg rounded-xl'>

                                    <h3 className='w-full h-[52px] p-4 flex items-center text-base text-[#191919] font-semibold'>Groups you might be interested in</h3>

                                    {/* groups ul */}
                                    <ul className='w-full h-fit px-4'>

                                        {/*  */}
                                        {groupRes && groupRes.map( (e, index) => {
                                            const members = (Math.floor(Math.random() * (1599999 - 200000 + 1)) + 200000).toLocaleString();
                                          
                                          return (
                                            <li onClick={handleAlert} key={index} className='w-full h-fit py-4'>
                                                <Link href={'#'} className='w-full h-fit flex'>

                                                    <div className='w-12 h-full'>
                                                        <div className='w-full h-12 flex justify-center items-center'>
                                                            <Image src={e?.channel?.image} alt='group-pic' objectFit='cover' width={48} height={48} className='w-full h-full rounded-sm' />
                                                        </div>
                                                    </div>

                                                    <div className='w-[calc(100%-48px)] pl-2 h-fit t'>
                                                        <div className='w-full h-fit ext-base font-semibold hover:underline text-[#191919] break-words'>{e?.channel?.name}</div>
                                                        <div className='text-xs text-[#666666]'>{members} members</div>
                                                    </div>

                                                </Link>
                                            </li>
                                          )
                                        })}

                                    </ul>

                                </section>

                                {/* Footer */}
                                <div className='w-full h-fit'>
                                    <footer className='w-full h-fit flex flex-col'>
                                        <ul className='w-full h-fit px-6 py-4 flex flex-row justify-center flex-wrap text-[#62615F] text-xs font-semibold'>

                                            
                                            <li className='w-fit h-4 my-1 mx-2'>
                                            <Link href={"https://about.linkedin.com/"} 
                                            target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2]'>About</Link>
                                            </li>

                                            <li className='w-fit h-4 my-1 mx-2'>
                                            <Link href={"https://www.linkedin.com/accessibility?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B%2FsqeDHhHReySxNr7d0ZwSA%3D%3D"} 
                                            target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Accessibility</Link>
                                            </li>

                                            <li className='w-fit h-4 my-1 mx-2'>
                                            <Link href={"https://www.linkedin.com/uas/login-cap?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Ftalent%2Fpost-a-job%3Flipi%3Durn%253Ali%253Apage%253Ad_flagship3_profile_view_base%253B%252FsqeDHhHReySxNr7d0ZwSA%253D%253D%26src%3Dli-footer%26trk%3Dfooter_jobs_home&source_app=tsweb&trk=tsweb_signin"} 
                                            target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Talent Solutions</Link>
                                            </li>

                                            <li className='w-fit h-4 my-1 mx-2'>
                                            <Link href={"https://www.linkedin.com/legal/professional-community-policies"} 
                                            target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Community Guidelines</Link>
                                            </li>

                                            <li className='w-fit h-4 my-1 mx-2'>
                                            <Link href={"https://careers.linkedin.com/"} 
                                            target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Careers</Link>
                                            </li>

                                            <li className='w-fit h-4 my-1 mx-2'>
                                            <Link href={"https://business.linkedin.com/marketing-solutions?trk=n_nav_lms_f&src=li-footer"} 
                                            target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Marketing Solutions</Link>
                                            </li>
                                            
                                            <li className='w-fit h-4 my-1 mx-2'>
                                            <Link href={"#"} 
                                            target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Privacy & Terms</Link>
                                            </li>
                                                                
                                            <li className='w-fit h-4 my-1 mx-2'>
                                            <Link href={"https://business.linkedin.com/marketing-solutions/ads?trk=n_nav_ads_f"} 
                                            target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Ad Choices</Link>
                                            </li>
                                                                
                                            <li className='w-fit h-4 my-1 mx-2'>
                                            <Link href={"https://www.linkedin.com/help/linkedin/answer/a1342443"} 
                                            target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Advertising</Link>
                                            </li>
                                                                
                                            <li className='w-fit h-4 my-1 mx-2'>
                                            <Link href={"https://business.linkedin.com/sales-solutions?trk=flagship_nav&veh=li-footer-lss-control&src=li-footer"} 
                                            target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Safety Solutions</Link>
                                            </li>
                                                                
                                            <li className='w-fit h-4 my-1 mx-2'>
                                            <Link href={"https://mobile.linkedin.com/"} 
                                            target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Mobile</Link>
                                            </li>
                                                                
                                            <li className='w-fit h-4 my-1 mx-2'>
                                            <Link href={"https://business.linkedin.com/grow?&src=li-footer"} 
                                            target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Small Buisness</Link>
                                            </li>
                                                                
                                            <li className='w-fit h-4 my-1 mx-2'>
                                            <Link href={"https://about.linkedin.com/transparency"} 
                                            target='_blank' className='h-full flex items-center hover:underline hover:text-[#0a66c2] '>Safety Center</Link>
                                            </li>

                                        </ul>
                                        <div className='w-full h-fit px-6 pb-10 text-center'><p className='w-full h-4 text-[#62615F] text-xs'>Linkedin Corporation &copy; 2023</p></div>
                                    </footer>
                                </div>

                            </aside>

                        </div>
                    </div>
                </div>    

                {/* POP Up's */}

                {/* create group div Popup on click */}
                {showGroupPopup && (
                    <div className='fixed top-8 left-0- z-30 w-full h-full bg-[#666666] bg-opacity-70 overflow-hidden flex justify-center '>
                        <div ref={groupRef} className='w-[744px] h-[500px] bg-white outline outline-1 outline-[#E8E8E8] shadow-lg rounded-xl relative'>

                            {/* top */}
                            <div className='w-full h-[52px] py-3 pl-3 flex items-center'>
                                <div className='h-full w-[684px] text-xl font-semibold text-[#191919]'>Create group</div>
                                {/* cross button */}
                                <div ref={crossRef} onClick={() => setShowGroupPopup(false)} className='w-8 h-8 rounded-[50%] hover:bg-[#EBEBEB]  cursor-pointer flex justify-center items-center'>
                                    <RxCross1 className='w-6 h-6 text-[#666666]' />
                                </div>
                            </div>

                            {/* main div */}
                            <div className='w-full h-[359px] overflow-y-scroll scrollbar-stable '>
                                <div className='w-full h-fit px-6 pb-6'>

                                    {/* bg-cover pic */}
                                    <div className='w-full h-[12.0938rem] mt-3 mb-[3px]'>
                                        <div className='w-[727px] h-[12.0938rem] -mx-6 -mt-3 bg-yellow-300'>
                                            <Image src={uploadBg} alt='bg-image' width={700} objectFit='cover' className='w-full h-full' />
                                        </div>
                                    </div>

                                    {/* uploading image and preview */}
                                    <div className='w-full h-0 relative flex'>

                                        {/*  */}
                                        <div className='w-[88px] h-[88px] absolute -top-14 border-2 border-white rounded'>
                                            {/* Image */}
                                            {/* {imgUrl ? ( */}
                                                <Image src={imgUrl ? imgUrl : uploadSamp} alt='uploded image' objectFit='cover' width={88} height={88} className='w-full h-full' />
                                            
                                        </div>  

                                        {/* icons for uploading */}
                                        <div className='w-0 h-0 absolute z-30 left-[72px] top-[14px]'>
                                            <div className='w-0 h-0'>
                                                {/* icon button */}
                                                <button ref={uploadBtnRef} onClick={() => setShowUpload(!showUpload)} className='absolute left-0 top-0 w-8 h-8 rounded-[50%] outline hover:outline-2 outline-1
                                                    outline-[#666666] z-10 flex justify-center items-center'>
                                                    <BiSolidPencil className='w-5 h-5 text-[#666666]' />
                                                </button>
                                                {/* initially hidden */}
                                                <div ref={uploadPopupRef} className={'w-[176px] h-[56px] mt-[50px] py-1 flex cursor-pointer rounded bg-white shadow-lg ' + (
                                                    showUpload ? "block" : 'hidden'
                                                )}>
                                                    <input ref={inputRef} type="file" accept="image/*" onChange={handleImageChange} className='w-0.5 h-0' />
                                                    <div onClick={() => handleUploadIconClick()} className='w-full h-full px-6 py-4 flex items-center text-[#666666]'>
                                                        <HiCamera className='w-6 h-6 mr-3' />
                                                        <div className='w-fit text-sm'>Upload Logo</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Group name */}
                                    <div className='w-full h-[98px] mt-[26px] flex justify-between items-start relative'>
                                        <div className='w-full h-[54px] mt-6 flex flex-col text-[#838383]'>
                                            <label htmlFor='groupName' className='w-full h-5 mb-0.5 text-sm'>Group name*</label>
                                            <input id='groupName' type='text' value={title} placeholder='Inspiring Enterpreneurs in DC' 
                                                className={'text-sm py-1.5 px-2 placeholder:text-[#838383] text-[#191919] outline outline-1 rounded hover:outline-2 ' 
                                                + (title.length>100 ? "outline-[#CB112D]" : "outline-[#404040]")}
                                                onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                        <div className='absolute right-0 top-1 w-fit h-5 mt-1 text-sm text-[#666666]'>* Indicates required</div>
                                        <p className='w-full h-5 absolute bottom-0 flex justify-end'>
                                            <span className={'text-xs h-full w-fit ' + (title.length>100 ? "text-[#CB112D]" : "text-[#666666]")}>{title.length}/100</span>
                                        </p>
                                    </div>

                                    {/* Description textarea */}
                                    <div className='w-full h-fit flex flex-col text-[#838383]'>

                                        <div className='w-full h-fit flex flex-col'>
                                            <label htmlFor='description' className='w-full h-5 mb-0.5 text-sm'>Description*</label>
                                            <textarea id='description' type='text' value={description} rows={5} placeholder='What is the purpose of your group?' 
                                                    className={'text-sm py-1.5 px-2 placeholder:text-[#838383] text-[#191919] outline outline-1 outline-[#404040] hover:outline-2 rounded ' 
                                                    + (description.length>2000 ? "outline-[#CB112D]" : "outline-[#404040]")}
                                                    onChange={(e) => setDescription(e.target.value)} >
                                            </textarea>
                                        </div>

                                        <p className='w-full h-5 flex justify-end'>
                                            <span className={'text-xs h-full w-fit ' + (description.length>2000 ? "text-[#CB112D]" : "text-[#666666]")}>{description.length}/2000</span>
                                        </p>

                                    </div>

                                    {/* Location */}
                                    <div className='w-full h-fit mt-4 flex justify-between items-start relative'>
                                        <div className='w-full h-[54px] flex flex-col text-[#838383]'>
                                            <label htmlFor='location' className='w-full h-5 mb-0.5 text-sm'>Location</label>
                                            <input id='location' type='text' placeholder='Add a location to your group' 
                                                className='text-sm py-1.5 px-2 placeholder:text-[#838383] text-[#191919] outline outline-1 
                                                outline-[#404040] rounded hover:outline-2'
                                                // onChange={(e) => setTitle(e.target.value)} 
                                                />
                                        </div>
                                    </div>

                                    {/* Rules textarea */}
                                    <div className='w-full h-fit mt-4 flex flex-col text-[#838383]'>

                                        <div className='w-full h-fit flex flex-col'>
                                            <label htmlFor='rules' className='w-full h-5 mb-0.5 text-sm'>Rules</label>
                                            <textarea id='rules' type='text' rows={5} placeholder='Set the tone and expectation of your group' 
                                                    className='text-sm py-1.5 px-2 placeholder:text-[#838383] text-[#191919] outline outline-1 outline-[#404040] hover:outline-2 rounded'
                                                    // onChange={(e) => setDescription(e.target.value)}
                                                    >
                                            </textarea>
                                        </div>

                                    </div>

                                    {/* permissions & type */}
                                    <div className='w-full h-fit mt-4 mb-4'>

                                        {/* permission */}
                                        <fieldset className='w-full h-fit  text-[#838383]'>
                                            <legend className='text-sm h-5 flex items-center'>Permissions</legend>
                                            <div className='w-full h-[60] mt-3 relative'>
                                                <input type='checkbox' className='w-0 h-0 absolute top-0 left-0' />
                                                <ImCheckboxChecked onClick={() => setSelectCheck1(!selectCheck1)} 
                                                    className={'w-6 h-6 outline outline-1 outline-[#01754F] absolute top-0 left-0 rounded ' + (
                                                        selectCheck1 ? " text-[#01754F]" : "text-white"
                                                    )} /> 
                                                <label className='w-full h-full pl-8 flex flex-col'>
                                                    <p className='w-full h-5 text-sm text-[#191919]'>Allow members to invite their connections</p>
                                                    <p className='w-full h-fit text-sm text-[#666666]'>Group members can invite 1st degree connections to the group. All requests to join will still require admin approval.</p>
                                                </label>
                                            </div>
                                            <div className='w-full h-[60] mt-3 relative'>
                                                <input type='checkbox' className='w-0 h-0 absolute top-0 left-0' />
                                                <ImCheckboxChecked onClick={() => setSelectCheck2(!selectCheck2)} 
                                                    className={'w-6 h-6 outline outline-1 outline-[#01754F] absolute top-0 left-0 rounded ' + (
                                                        selectCheck2 ? " text-[#01754F]" : "text-white"
                                                    )} /> 
                                                <label className='w-full h-full pl-8 flex flex-col'>
                                                    <p className='w-full h-5 text-sm text-[#191919]'>Require new posts to be reviewed by admins</p>
                                                    <p className='w-full h-fit text-sm text-[#666666]'>Members’ posts will require admin approval within 14 days before they become visible to others.</p>
                                                </label>
                                            </div>
                                        </fieldset>

                                    </div>

                                    

                                </div>
                            </div>
                            
                            {/* creating group button div */}
                            <div className='absolute bottom-0 w-full h-[49px] px-3 py-2 border-t border-[#E8E8E8] flex justify-end'>
                                <button onClick={() => handleCreateGroup()} disabled={( (description?.length>0 && title?.length>0) && (title.length <= 100 && description.length <= 2000) ) 
                                    ? false : true} 
                                    className='w-fit h-full px-4 py-1.5 text-base font-semibold disabled:cursor-not-allowed disabled:bg-[#E8E8E8] disabled:text-[#AFAFAF] text-white 
                                    cursor-pointer bg-[#116AC3] rounded-3xl flex justify-center items-center'>
                                    Create
                                </button>
                            </div>

                        </div>
                    </div>
                )}  

                {/* alertGroupCreated */}
                {showAlertGrp &&  alertGroupCreated && (
                    <div className='w-fit h-[78] p-4 flex fixed bottom-8 left-8 z-50 outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
                        <div className='w-fit h-full flex'>
                            <div className='w-6 h-full mr-2'><Gi3DMeeple className='w-6 h-6 text-[#77C45F]' /></div>
                            <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm text-[#191919]'>Group Created Successfully.</p>
                        </div>
                        <button className='w-8 h-full flex justify-end cursor-pointer '><RxCross1 onClick={handleCloseAlert} className='w-4 h-4 text-[#666666] ' /></button>
                    </div>
                )}
                
                {/* alertImageUpload */}
                {showAlertImg && alertImageUpload && (
                    <div ref={alertDivRef} className='w-[23.5rem] h-[78] p-4 flex fixed bottom-8 left-8 z-50 outline outline-1 outline-[#E8E8E8] shadow-lg bg-white rounded-lg '>
                        <div className='w-[312px]] h-full flex'>
                            <div className='w-6 h-full mr-2'><PiWarningOctagonFill className='w-6 h-6 text-[#CB112D]' /></div>
                            <p className='w-[calc(100%-32px)] h-full flex items-center break-words text-sm text-[#191919]'>This file type is not supported. Please choose an image.</p>
                        </div>
                        <button className='w-8 h-full flex justify-end cursor-pointer '><RxCross1 onClick={handleCloseAlert} className='w-4 h-4 text-[#666666] ' /></button>
                    </div>
                )}

                {/* Alert box */}
                <AlertBox />

            </div>
        </div>

    </>
  )
}

export default Groups;