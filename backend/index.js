import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const app = express();
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"store" 
})
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json("hello this is backend");
})

app.get("/books",(req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post("/books",(req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUE(?)"
    const values = [req.body.title,req.body.desc,req.body.price,req.body.cover];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    db.query(q,[bookId],(err,date)=>{
        if(err) return res.json(err);
        return res.json("book deleted successfully")
    })
})

app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?,`desc` = ?,`price` = ?,`cover` = ? WHERE `id` = ?";
    const values = [req.body.title,req.body.desc,req.body.price,req.body.cover];

    db.query(q,[...values,bookId],(err,date)=>{
        if(err) return res.json(err);
        return res.json("book updated successfully")
    })
})

app.post("/user",async (req,res)=>{
    const q = "INSERT INTO user (`username`,`email`,`password`,`admin`) VALUE(?)";
    const password = req.body.password;
    const hashPassword = await bcrypt.hash(password,10);
    const values = [req.body.username,req.body.email,hashPassword,0];
    db.query(q,[values],(err,data)=>{
        if(err) {
            return res.json(err);
        }
        return res.json("user added");
    })
})

app.post("/user/login",async (req,res)=>{
    const q = "SELECT * FROM user WHERE email = ?";
    const password = req.body.password;
    const values = [req.body.email];
    db.query(q,values,async (err,data)=>{
        if(err) {
            return res.json(err);
        }
        if (data.length === 0) return res.json("user does not exist");
        const password_user = data[0].password;
        const compare = await bcrypt.compare(password,password_user)
        if (compare == false) return res.json("password wrong");
        const token = jwt.sign({username:req.body.username},process.env.KEY,{expiresIn:'12h'});
        res.cookie('token',token,{httpOnly:true,maxAge:4320000});
        return res.json(data);
    })
})

app.listen(8080, ()=>{
    console.log("server running");
})