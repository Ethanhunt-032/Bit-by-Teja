import express, {response} from 'express';
import {MongoClient, ServerApiVersion} from 'mongodb'

const articleInfo = [
    {name:'learn-react',upvotes : 0, comments:[]},
    {name:'learn-node',upvotes : 0, comments:[]},
    {name:'learn-mongDb',upvotes : 0, comments:[]},
];

const app = express();
app.use(express.json());

app.post('/api/articles/:name/upvote', (req, res) => {
    const article = articleInfo.find(a=>a.name ===req.params.name);
    article.upvotes += 1;
    // res.send("Success! now the article" + req.params.name + "has upvotes " + article.upvotes);
    res.json(article);
})

app.post('/api/articles/:name', async (req, res) => {
    const {name} = req.params ;
    const uri = 'mongodb://127.0.0.1:27017';
    const client  = new MongoClient(
        uri,
        { serverApi: {
            version : ServerApiVersion.v1,
            strict: true,
            deprecationErrors:true
    }})
    await client.connect();
    const db = client.db('fullstack-react-db');
    const artical = await db.collection('articles').findOne({name});

    res.json(artical);
})

app.post("/api/articles/:name/comments",(req,res)=>{
    // const name = req.params.name
    const {name} = req.params ;
    const {postedBy, text} = req.params ;
    const article = articleInfo.find(a=>a.name === name);

    article.comments.push({postedBy,text}) ;
    res.json(article);
})

app.get('/hello',(req,res)=>{
    console.log("Hello");
    res.send("Hello")
})


app.listen(8080,()=>{
    console.log("Server started on port 8080");
});