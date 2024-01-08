import { addDoc, collection, deleteDoc, doc, documentId, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { auth, db } from '../../firebase'
import { updateProfile } from 'firebase/auth'

const ChatBox = () => {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [room, setRoom] = useState('')
  const [updatedImage, setUpdatedImage] = useState(null);
  const [updatedDisplayName, setUpdatedDisplayName] = useState('');


  const roomInputRef = useRef(null)

  const messagesRef = collection(db, 'messages')

  useEffect(()=> {
    const queryMessages = query(messagesRef, where('room', '==', room), orderBy('timestamp'))
    const unsubscribe = onSnapshot(queryMessages, (snapshot)=> {
      let messages = []
      snapshot.forEach((doc)=> {
        messages.push({id: doc.id, ...doc.data()})
      })
      setMessages(messages)
    })
    return () => unsubscribe()
  }, [room])

  const handleSend = async (e)=> {
    e.preventDefault()
    if (newMessage === '') return;

    await addDoc(messagesRef, {
      room,
      text: newMessage,
      timestamp: serverTimestamp(),
      user: auth.currentUser.displayName || 'no name',
      imageUrl: auth.currentUser.photoURL || '',
      email: auth.currentUser.email
    })
    setNewMessage('')
  }
  const handleSideX = ()=>{
    document.querySelector('.rooms').style.left = '-600px'
  }
  const handleSideH = ()=>{
    document.querySelector('.rooms').style.left = '0px'
  }

  const handleDelete = async (messageId) => {
    try {
      await deleteDoc(doc(messagesRef, messageId));
    } catch (error) {
      console.log(error);
    }
  };
  let pro = false
  const handleProfile = ()=> {
    if(pro === false){
      document.querySelector('.profile').style.visibility = 'visible';
      pro = true
    }else if(pro === true){
      document.querySelector('.profile').style.visibility = 'hidden';
      pro = false
    }
  }

  
const handleProfileUpdate = async () => {
  if(updatedImage && updatedDisplayName){

      await updateProfile(auth.currentUser, {
        photoURL: updatedImage,
        displayName: updatedDisplayName,
      });

    alert('seccessfuly updated')

  }else{
    alert("Please enter a valid information")
  }
};

 const pip = auth.currentUser.photoURL || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC'


  return (
    <div className='chat-cont'>

      <section className='rooms custom-scrollbar'>
        <form onSubmit={ (e)=>{
          e.preventDefault()

          setRoom(roomInputRef.current.value)
        }} className='rooms-search'>
          <input type='text' ref={roomInputRef} placeholder="Enter Room"/>
          <button>search</button>
        </form>
        <span onClick={handleSideX}>X</span>

        <button className='logout' onClick={()=> auth.signOut(auth)}>Logout</button>
      </section>

        <div className='profile'>
          <img src={ updatedImage || pip } alt="profile" width={100} height={100} style={{borderRadius: '50%'}} />
          <input value={updatedImage} onChange={e=> setUpdatedImage(e.target.value)} placeholder='past the image URL' />
          <input value={updatedDisplayName} onChange={(e) => setUpdatedDisplayName(e.target.value)} placeholder='Name' />
          <button onClick={handleProfileUpdate}>update</button>
        </div>

      <section className='chat-box'>
        <div className='custom-scrollbar'>
          <h2>
            <small onClick={handleSideH}>≡</small>
            {room}
            <img onClick={handleProfile} src={pip || updatedImage} alt="profile" width={50} height={50} style={{borderRadius: '50%'}} />
          </h2>

          {room ? messages.map((message)=>(
            <>
              <p key={message.id} className={message.email === auth.currentUser.email ? 'current-user-message' : 'other-user-message'}>
                <span><img src={message.imageUrl || pip} alt="user profile" width={20} height={20} style={{borderRadius: '50%'}} /> {message.user}</span>
                {message.text}
                <h6 onClick={handleDelete}>🗑</h6>
              </p>
            </>

          )):(
             <h1 style={{textAlign: 'center', fontSize: 40, color: 'gray', opacity: 0.5}}>search for room</h1>
           )}
        </div>
        <form onSubmit={handleSend}>
          <input value={newMessage} placeholder='Message...' onChange={(e)=>setNewMessage(e.target.value)}/>
          <button type='submit'>Send</button>
        </form>
      </section>

    </div>
  )
}

export default ChatBox