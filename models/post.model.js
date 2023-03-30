const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    PostImage: {
        type: String,
        required: true
    },
    cloudinary_id :{
        type : String
    },
    author: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Post", PostSchema);