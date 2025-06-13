const mongoose = require('./../config/dbConfig');
const Schema = mongoose.Schema;

const Comments = new Schema({
    commentDescription: {
        type: String
    },
    commentDate: {
        type: Date
    }
});

const PostSchema = new Schema({
    postTitle: {
        type: String,
        required: [true, '*Campo Obrigatório!']
    },
    postDescription: {
        type: String,
        required: [true, '*Campo Obrigatório!']
        
    },
    status: {
        type: Boolean,
        default: true
    },
    comments: {
        type: [Comments],

    },
    postDate: {
        type: Date
    },
    postType: {
        type: String
    }
});

const Post = mongoose.model('Posts', PostSchema);

module.exports = Post;