const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let CommentSchema = new Schema ({
    comment: {
        type: String,
    },
    page: {
        type: Schema.Types.ObjectId,
        ref: "post"
    }
    
})

module.exports = mongoose.model("Comment", CommentSchema)