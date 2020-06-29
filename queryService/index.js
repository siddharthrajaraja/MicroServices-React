const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts={};

console.log("Recent posts inside QueryService :",posts);

app.get('/posts',(req,res)=>{
  res.send(posts);
})



app.post('/events',(req,res)=>{
    const {type,data}=req.body;
    
    console.log("I have received : ",req.body)

    if(type==='PostCreated'){
        const {id,title}=data;

        posts[id]={id,title,comments:[]}
    }

    if(type==='CommentCreated'){
        const {id,content,postId}=data;

        posts[postId].comments.push({id,content});
    }
    
    console.log("From Query Service : ",posts)
    res.send({});

})

app.listen(4002, () => {
    console.log('QUERY SERVICE Listening on 4002');
  });
  