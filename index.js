const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser')
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer().array());

// parse application/json
app.use(bodyParser.json())

// load controllers
const postController = require('./controllers/postController')

app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'Prisma API',
        data: null
    })
})

app.get('/posts', postController.all)
app.get('/posts/:id', postController.single)
app.put('/posts/:id', postController.update)
app.delete('/posts/:id', postController.remove)
app.get('/posts/:id/comments', postController.comments)
app.post('/posts', postController.add)

app.listen(port, () => {
    console.log(`Prisma app running at http://localhost:${port}`)
})
