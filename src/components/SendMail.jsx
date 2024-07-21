import React, { useState } from 'react';
import { FiMinus } from 'react-icons/fi';
import { TbArrowsDiagonal } from 'react-icons/tb';
import { IoMdClose } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { setFreshMail, setOpen } from '../redux/appSlice';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { sendEmail } from '../api';

const SendMail = () => {
  const { open, authUser } = useSelector(store => store.app);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
    password : "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();

    const mail = await addDoc(collection(db, "emails"), {
      to: formData.to,
      subject: formData.subject,
      message: formData.body,
      createdAt: serverTimestamp(),
    });
    try
    {
      await sendEmail({
        from : authUser.email,
        to: formData.to,
        subject: formData.subject,
        message: formData.body,
        pass : formData.password,
      });
    }
    catch(e)
    {
        console.log("Error Occured While Sending Mail in React");
    }

    dispatch(setOpen(false));
    dispatch(setFreshMail(mail.id));
    
    setFormData({
      to: "",
      subject: "",
      body: "",
      password : "",
    });
  };

  return (
    <div className={`${open ? "block" : "hidden"} flex-col mt-[160px] w-[25rem]`}>
      <div className='flex justify-between bg-[#f2f5fc] p-2'>
        <div className='text-[#3e4c63]'>New Message</div>
        <div className='flex gap-2 mr-4'>
          <FiMinus />
          <TbArrowsDiagonal />
          <IoMdClose onClick={() => dispatch(setOpen(false))} className='cursor-pointer' />
        </div>
      </div>
      <form className='flex-col' onSubmit={submitData}>
        <input type="text" name="to" value={formData.to} placeholder='Recipients' className='w-[25rem] mt-2 border-b-2 p-2' onChange={changeHandler} /><br />
        <input type='text' name="subject" value={formData.subject} placeholder='Subject' className='w-[25rem] mt-2 p-2 border-b-2' onChange={changeHandler} />
        <input type='password' name="password" value={formData.password} placeholder='Enter Password' className='w-[25rem] mt-2 p-2 border-b-2' onChange={changeHandler} />
        <textarea name="body" value={formData.body} cols="53" rows="11" className='mt-2 focus:border-none p-1' onChange={changeHandler}></textarea>
        <button className='bg-[#0b57cf] rounded-full p-2 w-20 text-white'>Send</button>
      </form>
    </div>
  );
};

export default SendMail;
