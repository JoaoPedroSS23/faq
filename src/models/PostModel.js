const mongoose = require('mongoose');
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
    postName: {
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
        type: Comments,

    }
});

const Post = mongoose.model('Posts', PostSchema);

module.exports = Post;