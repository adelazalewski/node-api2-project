require('dotenv').config();
const express = require("express");
const posts = require("./data/db");
const postsRouter = require("./posts/posts-router");
const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
server.use(postsRouter);

server.get("/", (req, res) => {
    res.send("welcome to a new api by adela zalewski!")
})
server.listen(port, () => {
    console.log(`server listenig at http://localhost:${port}`)
})