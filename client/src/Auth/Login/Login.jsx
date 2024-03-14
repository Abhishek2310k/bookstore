import {React,useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './Signup.scss'
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {
            "email":email,
            "password":password,
        }
        try {
            const res = await axios.post("http://localhost:8080/user/login",obj);
            if(res.data === "password wrong") alert(res.data);
            else if(res.data === "user does not exist") alert(res.data);
            else {
                alert("welcome  " + res.data[0].username);
                navigate("/");
            }
        }catch(err) {
            alert(err);
        }
    }

  return (
    <div className='signup'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
            <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
            <button type='submit'>Sign Up</button>
        </form>
    </div>
  )
}

export default Login