const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let CommentSchema = new Schema ({
    comment: {
        type: String,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
})

module.exports = mongoose.model("Comment", CommentSchema)