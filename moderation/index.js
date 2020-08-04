const express=require('express')
const bodyParser=require('body-parser')
const axios=require('axios')
var cors=require('cors')
const app=express()
app.use(bodyParser.json())
app.unsubscribe(cors())


app.post('/events',async(req,res)=>{
    const {type,data}=req.body
    console.log(req.body)
    if(type==='CommentCreated'){
        const status=data.content.includes('orange')?'rejected':'approved';
        await axios.post('http://localhost:4005/events',{
            type:'CommentModerated',
            data:{
                id:data.id,
                postId:data.postId,
                status,
                content:data.content

            }
        })

    }
    res.send({});
})

app.listen(4003,()=>{
    console.log("MODERATION SERVICE AT PORT 4003")
})