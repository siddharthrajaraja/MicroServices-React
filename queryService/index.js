const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const axios=require('axios')

const posts={};

console.log("Recent posts inside QueryService :",posts);

app.get('/posts',(req,res)=>{
  res.send(posts);
})

const handleEvent=(type,data)=>{

    
    if(type==='PostCreated'){
        const {id,title}=data;

        posts[id]={id,title,comments:[]}
    }

    if(type==='CommentCreated'){
        const {id,content,postId,status}=data;

        posts[postId].comments.push({id,content,status});
    }
    
    if(type==='CommentUpdated'){
        const {id,postId,status,content}=data
        const post=posts[postId]

        const comment=post.comments.find(comment=>{
            return comment.id===id
        })
        comment.status=status
        comment.content=content

    }


}

app.post('/events',(req,res)=>{
    const {type,data}=req.body;
    
    console.log("I have received : ",req.body)
    handleEvent(type,data);

    res.send({});

})

app.listen(4002,async () => {
    console.log('QUERY SERVICE Listening on 4002');

    const res=await axios.get('http://localhost:4005/events')
    for(let event of res.data){
        console.log("Processing event ",event.type)
        handleEvent(event.type,event.data)
    }
  });
  