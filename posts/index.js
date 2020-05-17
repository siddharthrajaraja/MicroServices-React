// require imports ------------------------
const express =require('express')
const bodyParser =require('body-parser')
const cors=require('cors')
const {randomBytes}=require('crypto')

const app=express()

// Middle-wares ------------------------>>> 
app.use(bodyParser.json())
app.use(cors());
// ----------------------------------------

// GET ROUTES ----------------------------
const posts={}
app.get('/posts',(req,res)=>{
        res.send(posts)
})
//-----------------------------------------

// Post Routes  ----------------------------
app.post('/posts',(req,res)=>{
    const id=randomBytes(4).toString('hex')
    const {title}=req.body
    posts[id]={id,title}
    res.status(201).send(posts[id])
})

// Server Listening !! ----------------------
app.listen(process.env.PORT || 4000,()=>{
    console.log("POST SERVICE 4000")
})