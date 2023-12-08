'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { BsThreeDots } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import deleteGroup from '../lib/deleteGroup';
import { useContextProvider } from '../ContextApi/AppContextProvider';



const GroupDotOption = ({setCheckLocal, groupId}) => {
    const [showOpt, setShowOpt] = useState(false);
    const { token } = useContextProvider();

    async function handleDeleteGroup(groupId){
      console.log("delete group function called")
      const deleteGrpRes = await deleteGroup(groupId, token)
      console.log("deleteGrpRes. ", deleteGrpRes)

      if(deleteGrpRes.status === 'success'){
        const storedData = JSON.parse(localStorage.getItem('groupData'))
        const newData = storedData.filter(e => e.id !== groupId)
        const stringifyData = JSON.stringify(newData);
        localStorage.setItem('groupData', stringifyData);
        setCheckLocal(prev => !prev);
        setShowOpt(false)
      }

    }

    // 656ad9073cf637c946ad4e4a
    // 656ad9073cf637c946ad4e4a


    // 656adbe73cf637c946ad4e8e


  return (
    <div className='w-10 h-10 relative'>
        {/* dots */}
        <div onClick={()=> setShowOpt(!showOpt)} className='w-full h-full flex justify-center cursor-pointer items-center text-[#666666] rounded-[50%] hover:bg-[#E8E8E8]'>
            <BsThreeDots className='w-6 h-6' />
        </div>

        {/* option initiatlly hidden */}
        <div className={'w-[12.0625rem] h-fit py-1 bg-white rounded-lg shadow-xl z-20 absolute right-0 -bottom-24 ' + (showOpt ? "block" : "hidden")}>
          <ul className='w-full h-fit list-none text-sm font-semibold text-[#666666]'>
            <li className='w-full h-10 rounded-sm hover:bg-[#E8E8E8] cursor-pointer'>
              <div className='w-full h-full px-4 py-2 flex items-center'>
                <IoIosLink className='w-6 h-6 mr-1 text-[#666666]' />Copy link to group
              </div>
            </li>
            <li onClick={() => handleDeleteGroup(groupId)} className='w-full h-10 rounded-sm hover:bg-[#E8E8E8] cursor-pointer'>
              <div className='w-full h-full px-4 py-2 flex items-center'>
                <RxExit className='w-6 h-6 mr-1 text-[#666666]' />Leave this Group
              </div>
            </li>
          </ul>
        </div>

    </div>
  )
}

export default GroupDotOption