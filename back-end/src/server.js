import express, {response} from 'express';

const articleInfo = [
    {name:'learn-react',upvotes : 0},
    {name:'learn-node',upvotes : 0},
    {name:'learn-mongDb',upvotes : 0},
];

const app = express();
app.use(express.json());

app.post('/api/articles/:name/upvote', (req, res) => {
    const article = articleInfo.find(a=>a.name ===req.params.name);
    article.upvotes += 1;
    res.send("Success! now the article" + req.params.name + "has upvotes " + article.upvotes);
})
app.get('/hello',(req,res)=>{
    console.log("Hello");
    res.send("Hello")
})


app.listen(8080,()=>{
    console.log("Server started on port 8080");
});