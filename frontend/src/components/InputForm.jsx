import React, { useState } from 'react'
import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'

export default function InputForm({setIsOpen}) {
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const [name,setName]=useState("")
   const [isSignUp,setIsSignUp]=useState(false) 
   const [error,setError]=useState("")

  const handleOnSubmit=async(e)=>{
    e.preventDefault()
    let endpoint=(isSignUp) ? "signUp" : "login"
    let data = isSignUp ? {email, password, name} : {email, password}
    
    const url = isSignUp ? API_ENDPOINTS.SIGNUP : API_ENDPOINTS.LOGIN
    
    await axios.post(url, data)
    .then((res)=>{
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",JSON.stringify(res.data.user))
        setIsOpen()
    })
    .catch(data=>setError(data.response?.data?.error))
  }

  return (
    <>
        <form className='form' onSubmit={handleOnSubmit}>
            {isSignUp && (
                <div className='form-control'>
                    <label>Name</label>
                    <input type="text" className='input' onChange={(e)=>setName(e.target.value)} required={isSignUp}></input>
                </div>
            )}
            <div className='form-control'>
                <label>Email</label>
                <input type="email" className='input' onChange={(e)=>setEmail(e.target.value)} required></input>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type="password" className='input' onChange={(e)=>setPassword(e.target.value)} required></input>
            </div>
            <button type='submit'>{(isSignUp) ? "Sign Up": "Login"}</button><br></br>
          { (error!="") && <h6 className='error'>{error}</h6>}<br></br>
            <p onClick={()=>{
                setIsSignUp(pre=>!pre)
                setError("")
                setEmail("")
                setPassword("")
                setName("")
            }}>{(isSignUp) ? "Already have an account": "Create new account"}</p>
        </form>
    </>
  )
}
