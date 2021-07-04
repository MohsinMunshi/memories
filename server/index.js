import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRouts from './routes/user.js'
const app = express()

app.use(express.json({limit: '50mb',extended: true}))
app.use(express.urlencoded({limit: '50mb',extended: true}))
app.use(cors())

app.use('/posts', postRoutes);
app.use('/user', userRouts)

app.get('/', (req,res) => {
    res.send("Welcome to Memroies app")
})

 const CONNECTION_URL = 'mongodb+srv://admin:admin123@server1.keqd9.mongodb.net/memories?retryWrites=true&w=majority'
 const PORT = process.env.PORT || 5000
 mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        app.listen(PORT,()=>{
            console.log("Server Running on port " + PORT)
        })
    })
    .catch((error)=>{
        console.log(error.message)
    })

mongoose.set('useFindAndModify',false)