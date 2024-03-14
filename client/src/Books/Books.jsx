import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './Books.scss';
import Navbar from '../Navbar/Navbar';
const Book = () => {

  const [books,setBooks] = useState([]);

  useEffect(()=>{

    const fetchAllBooks = async () => {
      try{
        const res = await axios.get("http://localhost:8080/books")
        setBooks(res.data);
      }catch(err) {
        console.log(err);
      }
    }
    fetchAllBooks();
  },[])

  const handleDelete = async (id) => {
    try{
      await axios.delete("http://localhost:8080/books/" + id);
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  } 

  return (
    <div className='home'>
      <Navbar/>
      <div className='books'>
        {
          books.map((book,index)=><div className='book' key={book.id}>
            {book.cover && <img src={book.cover} alt='/'/>}
            <h1>{book.title}</h1>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
            <button className='update'><Link to={`/update/${book.id}`} style={{textDecoration:"none"}}>Update</Link></button>
            </div>
          )
        }
      </div>
      <button className='add_book'><Link to="/add" style={{textDecoration:"none"}}>Add Book</Link></button>
    </div>
  )
}

export default Book