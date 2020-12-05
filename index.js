const express = require("express");

const server = express();

server.get("/", (req, res) => {
    res.send("welcome to a new api by adela zalewsk!")
})
server.listen(4000, () => {
    console.log("server listenig at http://localhost:4000")
})