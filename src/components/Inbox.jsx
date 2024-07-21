import React, { useState} from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { CiStar } from 'react-icons/ci'
import { FaRegSquare } from 'react-icons/fa'
import { GoTag } from 'react-icons/go'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import { RiInboxFill } from 'react-icons/ri'
import { RxReload } from 'react-icons/rx'
import {useNavigate} from 'react-router-dom'
import Messages from './Messages'

const Inbox = () => {
    const [emailType, setEmailType] = useState(0);

    const filterBox = [{
        icon : <RiInboxFill size={18} style={ emailType === 0 ? { color: 'blue' } : {} } className={`mt-1`}/>,
        text : "Primary",
    },
        {
            icon : <GoTag size={18} style={ emailType === 1 ? { color: 'blue' } : {} } className={`mt-1`}/>,
            text : "Promotions",
        },
        {
            icon : <MdOutlinePeopleAlt size={18} style={ emailType === 2 ? { color: 'blue' } : {} } className={`mt-1`}/>,
            text : "Social",
        },];

  return (
    <div className='flex-col w-[1100px] h-full ml-[120px] '>
            <div className='flex gap-7 ml-30 mt-8'>
                <FaRegSquare />
                <RxReload />
                <BsThreeDotsVertical />
            </div>

            <div className="flex justify-between mt-7">
                {
                    filterBox.map((item, index)  => {
                        return(<div className='flex-col'>
                        <div key= {index} className= "flex gap-4 cursor-pointer hover:bg-[#f2f5fc]" onClick={() => {
                            setEmailType(index);
                        }}> 
                                {item.icon}
                                <p className='mb-2 text-md'>{item.text}</p>
                                
                            </div>
                            <div className={` ${emailType === index ? "w-full h-1 bg-[#1955e8] mt-2" : "" }`}></div>
                            </div>
                        )
                    })
                }
            </div>
            <Messages/>
    </div>
  )
}

export default Inbox