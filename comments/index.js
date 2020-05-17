// require imports ------------------------
const express =require('express')
const bodyParser =require('body-parser')
var cors=require('cors')
const {randomBytes}=require('crypto')

const app=express()

// Middle-wares ------------------------>>> 
app.use(bodyParser.json())
app.use(cors());
// ----------------------------------------

// GET ROUTES ----------------------------
const commentByPostID={}

app.get('/posts/:id/comments',(req,res)=>{
        res.send(commentByPostID[req.params.id] || [])
})
//-----------------------------------------

// Post Routes  ----------------------------
app.post('/posts/:id/comments',(req,res)=>{
    const commentID=randomBytes(4).toString('hex')
    const {content}=req.body

    const comments=commentByPostID[req.params.id] || []
    
    comments.push({id:commentID,content})

    commentByPostID[req.params.id]=comments

    res.status(201).send(comments)
})

// Server Listening !! ----------------------
app.listen(process.env.PORT || 4001,()=>{
    console.log("COMMMENTS SERVICE 4001")
})