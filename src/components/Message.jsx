import React from 'react';
import { CiStar } from 'react-icons/ci';
import { FaRegSquare } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFreshMail, setSelectedMail } from '../redux/appSlice';
import { isToday, format } from 'date-fns';

const Message = ({ email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { freshMail } = useSelector(store => store.app);

  // Convert the Firestore timestamp to a JavaScript Date object
  const createdAt = new Date(email?.createdAt?.seconds * 1000);

  // Check if the createdAt is a valid date
  if (isNaN(createdAt.getTime())) {
    return null; // Handle invalid date scenario gracefully
  }

  // Format the date for display
  const displayDate = isToday(createdAt) 
    ? format(createdAt, 'HH:mm') 
    : format(createdAt, 'd MMM');

  // Function to handle opening the mail
  const openMail = () => {
    dispatch(setSelectedMail(email));
    navigate(`/mail/${email?.id}`);

    // Ensure freshMail is an array before filtering
    const unread = Array.isArray(freshMail)
      ? freshMail.filter((emailUnread) => emailUnread.id !== email.id)
      : [];
    dispatch(setFreshMail(unread));
  };

  return (
    <div className='flex items-center gap-4 mt-4 hover:cursor-pointer' onClick={openMail}>
      <FaRegSquare className='mt-[0.5px]' />
      <CiStar size={20} className='mt-[1px]' />
      <div className='flex-grow flex justify-between items-center'>
        <p className={`flex-shrink-0 ${Array.isArray(freshMail) && freshMail.some(unreadEmail => unreadEmail.id === email.id) ? "font-bold" : ""}`}>
          {`${email.message.length > 130 ? `${email.message.substring(0, 130)}...` : email.message}`}
        </p>
        <span className='flex-shrink-0'>{displayDate}</span>
      </div>
    </div>
  );
};

export default Message;
