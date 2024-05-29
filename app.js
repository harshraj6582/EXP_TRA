const express= require('express')
const cors= require('cors')
const {db}= require('./db/db');
const{readdirSync}= require('fs')
const app= express()
require('dotenv').config()
const PORT = process.env.PORT
app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"]}
))
const path = require('path')
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server =()=>{
    db()
    if(process.env.NODE_ENV==="production"){
        app.use(express.static(path.join("front_end/my-app/build")));
        app.get("*", (req, res)=>{
            res.sendFile(path.resolve(__dirname, "front_end", "my-app","build", "index.html"));
        });
    }
    app.listen(PORT, ()=>{
        console.log('Listening to PORT: ', PORT)
    })
}
server()