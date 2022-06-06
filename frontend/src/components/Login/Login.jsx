import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../Actions/User'

const Login = () => {

    const [formData, setFormData]=useState({
        email:"",
        password:""
    })
    const { email, password}=formData

    const dispatch =useDispatch()
    
    const handleChange=(e)=>{
        setFormData(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const handleClick=(e)=>{
        e.preventDefault()

        dispatch(loginUser(email, password))
    }
    console.log(formData)

  return (
    <div>
        <form onSubmit={handleClick}>
            <input type="email" name="email" placeholder="Email" value={email} id="email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={password} id="password" onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Login