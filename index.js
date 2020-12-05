const express = require("express");
const posts = require("./data/db");
const postsRouter = require("./posts/posts-router");
const server = express();

server.use(express.json());
server.use(postsRouter);

server.get("/", (req, res) => {
    res.send("welcome to a new api by adela zalewski!")
})
server.listen(4000, () => {
    console.log("server listenig at http://localhost:4000")
})