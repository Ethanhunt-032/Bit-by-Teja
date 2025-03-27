import express from 'express';
const app = express();

app.get("/teja", (req, res) => {res.send("Hello Teja")})

app.listen(8080,()=>{
    console.log("Server started on port 8080")
});