import {React,useState} from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
const Update = () => {

    const navigate = useNavigate();
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [price,setPrice] = useState('');
  const [cover,setCover] = useState('');
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  console.log(bookId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
        "title":title,
        "desc":desc,
        "price":price,
        "cover":cover
    }
    try {
        await axios.put("http://localhost:8080/books/" + bookId,obj);
        navigate("/");
    }catch(err) {
        console.log(err);
    }
  }  

  return (
    <div className='add'>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='title' onChange={(e)=>setTitle(e.target.value)}/>
            <input type='text' placeholder='desc' onChange={(e)=>setDesc(e.target.value)}/>
            <input type='number' placeholder='price' onChange={(e)=>setPrice(e.target.value)}/>
            <input type='text' placeholder='cover' onChange={(e)=>setCover(e.target.value)}/>
            <button type='submit'>Add Book</button>
        </form>
    </div>
  )
}

export default Update