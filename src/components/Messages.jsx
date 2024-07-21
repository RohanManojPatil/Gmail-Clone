import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import Message from './Message';
import { setEmails, selectAllEmails } from '../redux/appSlice';

const Messages = () => {
  const emails = useSelector(selectAllEmails);
  const dispatch = useDispatch();
  const searchText = useSelector(state => state.app.searchText); // Correctly use useSelector to access state

  const [filterMail, setFilterMail] = useState(emails);

  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        };
      });
      dispatch(setEmails(allEmails));
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe when component unmounts
  }, [dispatch]);

  useEffect(() => {
    const filteredEmail = emails?.filter((email) => {
      return email.subject.toLowerCase().includes(searchText.toLowerCase()) || 
             email.to.toLowerCase().includes(searchText.toLowerCase()) || 
             email.message.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilterMail(filteredEmail);
  }, [searchText, emails]);

  return (
    <div>
      {filterMail.map((email) => (
        <Message email={email} key={email.id} />
      ))}
    </div>
  );
};

export default Messages;
