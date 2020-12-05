const express = require("express");
const posts = require("../data/db");
const router = express.Router();

router.get("/posts",  (req, res) => {
    // const postsList = await posts.find()

    // res.json(postsList);
    posts.find()
    .then((users) => {
        res.status(200).json(users)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: "The posts information could not be retrieved."
        })
    })
});
router.get("/posts/:id",  (req, res) => {
    
    posts.findById(req.params.id)
    .then((post) => {
        if(post.length){
            res.status(200).json(post);
        }else{
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
        
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    })
       
    
    
});
router.get("/posts/:id/comments", async (req, res) => {
//     const post = await posts.findById(req.params.id);
// if (post){
//     const commentsByPost = await posts.findPostComments(req.params.id);
//     return res.json(commentsByPost);
// }
    posts.findById(req.params.id)
    .then((post) => {
        if(post.length){
            posts.findPostComments(req.params.id)
            .then((comments) => {
                res.status(200).json(comments)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: "The comments information could not be retrieved."
                })
            })
            
        }else{
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    })
});
router.post("/posts", async (req, res) => {
    if(!req.body.title || !req.body.contents){
       return res.status(400).json({
           message: "missing post title or contents"
       })
    }
    else if(req.body.title && req.body.contents){
        const newPost = await posts.insert({
        title: req.body.title,
        contents: req.body.contents
    });
    return res.status(201).json(newPost);

}else{
res.status(500).json({
    error: "There was an error while saving the post to the database" 
})
}
});
router.put("/posts/:id",  (req, res) => {
    posts.findById(req.params.id)
    .then((post) => {
        if(post.length){
            posts.update(req.params.id, {
                title: req.body.title,
                contents: req.body.contents
            })
            .then((updatedPost) => {
                if(!req.body.title || !req.body.contents){
                    res.status(400).json({
                        errorMessage: "Please provide title and contents for the post."
                    })
                }else{
                    res.status(200).json(updatedPost)
                }
                
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: "The post information could not be modified."
                })
            })
        }else{
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
        
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: "The post information could not be retrive." 
        })
    })
});
router.delete("/posts/:id", (req, res) => {
    posts.findById(req.params.id)
    .then((post) => {
        if(post.length){
            posts.remove(req.params.id)
            .then(() => {
                
                 res.status(204).json(post)
                
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: "The post could not be removed"
                })
            })
        }else{
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
        
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: "The post information could not be retrive." 
        })
    })
});
router.post("/posts/:id/comments", (req, res) => {
    posts.findById(req.params.id)
    .then((post) => {
        if(post.length){
            posts.insertComment({
                text:  req.body.text,
                post_id: req.params.id
            })
            .then((newComment) => {
            if(!req.body.text){
                res.status(400).json({
                    errorMessage: "Please provide text for the comment."
                })
            }else{
                res.status(201).json(newComment);
            }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ error: "There was an error while saving the comment to the database" });
            })
        }else{
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
        
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: "The post information could not be retrive." 
        })
    })

});


module.exports = router;