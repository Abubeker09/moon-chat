import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, provider } from '../../firebase'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signinWithGoogle = async ()=> {
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='login-home'>
      <div className='login-cont'>
        <h2>Login to use <span>Moon chat!</span></h2>
        <div>
          <button onClick={signinWithGoogle}> <img src={'data:image/png;base64,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'} width={40} height={40} alt='google icon' /> Signin with Google</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required onChange={(e)=> setEmail(e.target.value)}/><br/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required onChange={(e)=> setPassword(e.target.value)}/><br/>
          <button type="submit">Log in</button><br />
        </form>
      </div>
    </section>
  )
}

export default Login