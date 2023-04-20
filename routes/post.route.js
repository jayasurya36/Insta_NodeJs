const router = require('express').Router();
const Post = require('../models/post.model');
const cloudinary = require('../config/cloudinary');
const multer = require('../config/multer');

router.post('/post', multer.single('PostImage'), async (req, res) => {
    try {
        let result = await cloudinary.uploader.upload(req.file.path);
        let post = new Post({
            PostImage: result.secure_url,
            cloudinary_id: result.public_id,
            author: req.body.author,
            location: req.body.location,
            description: req.body.description
        })
        let val = await post.save()
        res.send({ status : "Success", value : post});
    }catch(err){
        res.status(500).send(err.message)
    }
})
router.get('/posts' , async(req , res) =>{
    try{
        let posts = await Post.find();
        res.send(posts)
    }catch(err){
        res.send(err.message);
    }
})
module.exports = router;
