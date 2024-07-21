import React, { useContext, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { RiInboxFill } from 'react-icons/ri';
import { IoStarOutline } from 'react-icons/io5';
import { FiClock } from 'react-icons/fi';
import { AiOutlineSend } from 'react-icons/ai';
import { MdDrafts, MdKeyboardArrowDown } from 'react-icons/md';
import {useDispatch} from "react-redux";
import { setOpen } from '../../redux/appSlice';

const items = [
    { icon: <RiInboxFill />, text: 'Inbox'},
    { icon: <IoStarOutline />, text: 'Starred'},
    { icon: <FiClock />, text: 'Snoozed' },
    { icon: <AiOutlineSend />, text: 'Sent' },
    { icon: <MdDrafts />, text: 'Drafts' },
    { icon: <MdKeyboardArrowDown />, text: 'More' }
];

const Sidebar = () => {
    const [visible, setVisible] = useState(0);
    const dispatch = useDispatch();
    
    return (
        <div className='w-[10%] flex flex-col'>
            <button className='flex bg-[#c3e7ff] h-12 justify-center items-center gap-3 rounded-2xl mt-4 ml-2' onClick={() => {
                dispatch(setOpen(true))
            }}>
                <BiPencil size={25} />
                Compose
            </button>

            <div>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`${visible == index ? 'bg-[#d3e3fd] rounded-r-2xl ' : 'bg-[#f7f8fc] border-none rounded-none'} flex h-7 w-[220px] justify-start pl-8 items-center gap-3  mt-4 cursor-pointer`}
                        onClick={() => {
                        setVisible(index);
                     }}>
                        {item.icon}
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
