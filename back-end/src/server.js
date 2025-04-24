import express, { response } from 'express';
import { MongoClient, ReturnDocument, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';

import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// setting up Node js server with firebase admin by parsing the credentials of Firebase project and initializing
const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

// starting the express server
const app = express();
app.use(express.json());

let db;

// connecting to the DB
async function connectToDB() {

    const uri = !process.env.MONGODB_USERNAME 
                ? 'mongodb://127.0.0.1:27017' 
                : `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.8gwcnai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();
    db = client.db('full-stack-react-db');
}

//middleware for frontend static files

app.use(express.static(path.join(__dirname,'../dist')));

// inorder to server the frontend static build files from dist directory which moved to back-end for url not started with '/api'
app.get(/^(?!\/api).+/,(req,res) => {
    res.sendFile(path.join(__dirname,'../dist/index.html')) ;
})


app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });
    res.json(article);
})

// anyone without authentication are allowed to see comments articles upvotes 
// but inorder to do the below operations like adding commnets, upvoting etc. they need Authentication so we add "Express Middleware"

app.use(async function (req, res, next) {  // app.use help as middleware only apply to below code not for above code
    // console.log("hello4") ;
    const { authtoken } = req.headers;   // Be careful while naming authtoken not authToken

    if (authtoken) {
        // console.log("hello5") ;
        const user = await admin.auth().verifyIdToken(authtoken);
        req.user = user;
        
        next();      // tells express that middleware has done and goon with the next processes that has to done below code
    }
    else {
        res.sendStatus(400);
    }
})

app.post('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });
    // console.log("hello1") ;

    const upvoteIds = article.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);
    // console.log("hello2") ;

    if (canUpvote) {
        // console.log("hello3") ;
        const updateArticle = await db.collection('articles').findOneAndUpdate({ name },
            {
                $inc: { upvotes: 1 },
                $push: { upvoteIds: uid }
            },
            { returnDocument: 'after' }
        );
        res.json(updateArticle);
    }
    else{
        console.log("hello123") ;
        res.sendStatus(403);  // not authorized
    }
})


app.post("/api/articles/:name/comments", async (req, res) => {
    // const name = req.params.name
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const newComment = { postedBy, text };

    const updateArticle = await db.collection('articles').findOneAndUpdate({ name },
        { $push: { comments: newComment } },
        { returnDocument: 'after'}
    );

    res.json(updateArticle);
});

app.post('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    await client.connect();
    const db = client.db('full-stack-react-db');
    const artical = await db.collection('articles').findOne({ name });

    res.json(artical);
})

const PORT = process.env.PORT || 8080 ;

async function start() {
    await connectToDB();
    app.listen(PORT, () => {
        console.log("Server started on port" + PORT);
    });
}

// first connecting database to node and starting the server
start();


// [
// {name:"learn-node",upvotes:0, comments:[]},
// {name:"learn-react",upvotes:0, comments:[]},
// {name:"learn-mongodb",upvotes:0, comments:[]}
// ]