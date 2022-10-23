const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let CommentSchema = new Schema ({
    comment: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    page: {
        type: Schema.Types.ObjectId,
        ref: "post",
        required: true
    }
    
})

module.exports = mongoose.model("Comment", CommentSchema)