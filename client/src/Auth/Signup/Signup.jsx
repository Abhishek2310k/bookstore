import {React,useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.scss'
const Signup = () => {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {
            "username":username,
            "email":email,
            "password":password,
        }
        try {
            const res = await axios.post("http://localhost:8080/user",obj);
            if(res.data.errno == 1062) alert("user or email already exists");
            else {
                navigate("/");
                alert("user added successfully");
            }
        }catch(err) {
            alert(err);
        }
    }

  return (
    <div className='signup'>
        <h1>Enter The BookStore</h1>
        <form onSubmit={handleSubmit}>
            <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
            <input type='text' onChange={(e)=>setUsername(e.target.value)} placeholder='username'/>
            <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
            <button type='submit'>Sign Up</button>
        </form>
    </div>
  )
}

export default Signup