import express, {response} from 'express';
import {MongoClient, ReturnDocument, ServerApiVersion} from 'mongodb'

const app = express();
app.use(express.json());

let db;

async function connectToDB(){

    const uri = 'mongodb://127.0.0.1:27017';
    const client = new MongoClient(uri,{
        serverApi:{
            version: ServerApiVersion.v1,
            strict:true,
            deprecationErrors:true,
        }
    });

    await client.connect();
    db = client.db('full-stack-react-db');

}

app.get('/api/articles/:name',async (req,res)=>{
    const {name} = req.params;
    
    const article = await db.collection('articles').findOne({ name });
    res.json(article);
})

app.post('/api/articles/:name/upvote',async (req, res) => {
    const {name} = req.params;

    const updateArticle = await db.collection('articles').findOneAndUpdate({ name },
        {$inc:{upvotes: 1}},
        {ReturnDocument: "after" }
    );
    res.json(updateArticle);
})

app.post("/api/articles/:name/comments",async (req,res)=>{
    // const name = req.params.name
    const {name} = req.params ;
    const {postedBy, text} = req.body ;
    const newComment = {postedBy, text};

    const updateArticle =  await db.collection('articles').findOneAndUpdate({name},
        {$push: {comments: newComment}},
        {ReturnDocument: 'after'}
    );

    res.json(updateArticle);
});

app.post('/api/articles/:name', async (req, res) => {
    const {name} = req.params ;

    await client.connect();
    const db = client.db('fullstack-react-db');
    const artical = await db.collection('articles').findOne({name});

    res.json(artical);
})

async function start(){
    await connectToDB();
    app.listen(8080,()=>{
        console.log("Server started on port 8080");
    });
}

// first connecting database to node and starting the server
start();


// const articleInfo = [
//     {name:'learn-react',upvotes : 0, comments:[]},
//     {name:'learn-node',upvotes : 0, comments:[]},
//     {name:'learn-mongDb',upvotes : 0, comments:[]},
// ];
