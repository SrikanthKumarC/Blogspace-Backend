const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cors = require('cors')
mongoose.connect('mongodb+srv://blogspace:blogspace@blogspace.q2wx0rx.mongodb.net/?retryWrites=true&w=majority')
app.use(cors())

const db = mongoose.connection
db.once('open', () => console.log('connected to database'))
app.use(express.json())

const postsRouter = require('./routes/posts')

app.use('/posts', postsRouter)
app.listen('9191', () => console.log('listening on 9191') )