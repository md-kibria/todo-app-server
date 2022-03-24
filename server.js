const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotEnv = require('dotenv')

const todoRouter = require('./routes/todo')

const app = express()

dotEnv.config()
app.use(cors())
app.use(bodyParser.json())

app.use('/', todoRouter)

// 404 - not found route handler
app.use((req, res) => {
    res.status(404).json({
        status: 404,
        msg: 'Not Found',
        available: {
            '__method__': '__path__',
            'get': '/',
            'post': '/add',
            'delete': '/delete/:id'
        }
    })
})

// error handler
app.use((err, req, res, next) => {
    if(res.headerSent) {
        next('There was a problem')
    } else {
        if(err.message) {
            res.status(500).json({
                status: 500,
                msg: 'Error occured',
                error: err.message
            })
        } else {
            res.status(500).json({
                status: 500,
                msg: 'Error occured'
            })
        }
    }
})

mongoose.connect(
    // `mongodb://localhost:27017/todo-app`,
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fgyzv.mongodb.net/todo-app`,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => {
        console.log('Database connected🍃')
    }
)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT} 🍀`)
})