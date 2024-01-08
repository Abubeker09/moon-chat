// import { auth } from "../firebase";
// import { useAuthState } from 'react-firebase-hooks/auth'
// import Login from "./components/Login";
// import ChatBox from "./components/ChatBox";
 
// function App() {
//   const [user] = useAuthState(auth)

//   return (
//     <>
//     {user ? (
//         <ChatBox />
//       ):(
//         <Login/>
//     )}
//     </>
//   )
// }

// export default App

import { auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from "./components/Login";
import ChatBox from "./components/ChatBox";
import React, { useState, useEffect } from 'react';
import Loader from "./components/Loader";

function App() {
  const [user, initialising] = useAuthState(auth)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialising) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [initialising]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {user ? (
        <ChatBox />
      ) : (
        <Login />
      )}
    </>
  )
}

export default App;
