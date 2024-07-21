import React from 'react'
import { IoIosArrowRoundBack, IoMdMore } from 'react-icons/io';
import { RiInboxArchiveLine, RiSpam2Line, RiDeleteBin6Line } from 'react-icons/ri';
import { MdCancel, MdDriveFileMoveOutline } from 'react-icons/md';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { FaCaretDown } from 'react-icons/fa';
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {format, formatDistanceToNow, isToday} from 'date-fns';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const Mail = () => {
  const navigate = useNavigate();
  const {selectedMail} = useSelector(store => store.app);
  const createdAt = selectedMail?.createdAt?.seconds ? new Date(selectedMail?.createdAt?.seconds*1000) : new Date();
  const displayDate = isToday(createdAt) ? format(createdAt, "HH:mm") : format(createdAt, "EEE, d MMM, HH:mm");
  const param = useParams();
  const timeago = formatDistanceToNow(createdAt, {addSuffix : true});

  const deleteMail = async (id) => {
    try
    {
      await deleteDoc(doc(db, "emails", id));
      navigate("/");
    }
    catch(e)
    {
      console.log(e)
    }
    
  }
  return (
    <div className='mt-5 ml-20'>
      <div className="flex gap-8 cursor-pointer">
          <IoIosArrowRoundBack size={25} onClick={()=>navigate("/")}/>
          <RiInboxArchiveLine size={20}/>
          <RiSpam2Line size={20}/>
          <RiDeleteBin6Line size={20} onClick={()=>deleteMail(param.id)}/>
          <IoMailUnreadOutline size={20}/>
          <MdDriveFileMoveOutline size={20}/>
          <IoMdMore />
      </div>
      <div className='flex gap-3'>
          <p className='text-2xl mt-5 ml-12'>{selectedMail?.subject}</p>
          <button className='flex gap-1 mt-8 bg-[#dddddd] rounded-sm text-xs'>Inbox<MdCancel /></button>
      </div>
      
      <div className='mt-6 ml-12 flex-col'>
          <div className='flex'>
          <div>
              <p className='font-bold'>{selectedMail?.to}</p>
              <p className='flex text-sm'>to me <FaCaretDown /></p>
          </div>
          <div>
              <p className='ml-[700px]'>{displayDate} ({timeago})</p>
          </div>
          </div>
              <p className='mt-5 whitespace-pre-wrap'>{selectedMail?.message}</p>
      </div>
    </div>
  )
}

export default Mail