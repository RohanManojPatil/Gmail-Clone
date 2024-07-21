import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import GoogleButton from 'react-google-button';
import { provider,auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/appSlice';
const Login = () => {
    const dispatch = useDispatch();

    const signUpWithGoogle = async() => {
        try
        {
            const result = await signInWithPopup(auth, provider);
            dispatch(setAuthUser({
            displayName : result.user.displayName,
            email : result.user.email,
            photoURL : result.user.photoURL,
            }))
        }
        catch(e)
        {
            console.error(e);
        } 
    }

  return (
    <div className='h-screen flex justify-center items-center'>
        <GoogleButton onClick={signUpWithGoogle}/>
    </div>
    
  );
}

export default Login;