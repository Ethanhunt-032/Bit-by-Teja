import express from 'express';
const app = express();

app.use(express.json());

app.get("/teja", (req, res) =>
    {res.send("Hello Teja")})

app.get("/teja/:name", (req, res) =>{
    res.send("Hello " + req.params.name);
})

app.post("/teja", (req, res) =>{
    res.send("Hello Post request from" +req.body.name);
})
//  Req Body structure
// {
//     name : "teja dayana"
// }


app.listen(8080,()=>{
    console.log("Server started on port 8080")
});