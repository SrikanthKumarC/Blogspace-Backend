const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cors = require('cors')
var multer  = require('multer')
//mongodb+srv://srikanth:CKjiU8pBgJk5t8fi@blogspace.q2wx0rx.mongodb.net/?retryWrites=true&w=majority?directConnection=true
mongoose.connect('mongodb+srv://srikanth:CKjiU8pBgJk5t8fi@blogspace.q2wx0rx.mongodb.net/?retryWrites=true?directConnection=true')
app.use(cors())

const db = mongoose.connection
db.once('open', () => console.log('connected to database'))
app.use(express.json())

const postsRouter = require('./routes/posts')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('here in images')
      cb(null, 'Images')
    },
    filename: function (req, file, cb) {
      cb(null, 'wallpaper.jpg')
    }
})
var upload = multer({ storage: storage })
app.post('/upload', upload.single('bro'), (req, res) => {
    res.json({message: 'image uploaded'})
})

  
app.use('/posts', postsRouter)
app.listen('9191', () => console.log('listening on 9191') )
