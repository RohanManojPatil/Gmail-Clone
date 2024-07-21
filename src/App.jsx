import { useEffect } from 'react';
import './App.css';
import Navbar from './components/shared/Navbar';
import Sidebar from './components/shared/Sidebar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Body from './components/Body';
import Inbox from './components/Inbox';
import Mail from './components/Mail';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from './redux/appSlice';
import Login from './components/Login'; // Make sure to import Login component if not already

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />
      },
      {
        path: "mail/:id",
        element: <Mail />
      },
    ],
  }
]);

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.app.authUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setAuthUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }));
      } else {
        dispatch(setAuthUser(null));
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [dispatch]);

  return (
    !authUser ? <Login /> :
    (
      <>
        <Navbar />
        <RouterProvider router={router} />
      </>
    )
  );
}

export default App;
