const mongoose = require('mongoose');
const router = require('express').Router();
const Post = require('../models/post.model');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

const Storage = new GridFsStorage({
    url : process.env.DB_URL,
    file : (req , file) =>{
        return {
            bucketName : 'photo_db',
            filename : `${Date.now()}_${file.originalname}`
        }
    }
})

const upload = multer({
    storage : Storage
})

router.get('/posts', async(req , res) =>{
    try{
        const posts = await Post.find();
        res.status(500).send(posts);
    }catch(err){
        res.status(500).send(err.message);
    }
})
router.post('/post' ,upload.single('PostImage') ,  async(req, res)=>{
    try{
        let newPost = await new Post({
            ...req.body,
            PostImage : `images/${req.file.filename}`
        });
        const result = await newPost.save();
        res.status(200).send(result);
    }catch(err){
        res.status(500).send(err.message);
    }
})


module.exports = router;