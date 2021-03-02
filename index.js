const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT

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

app.listen(port, () => {
    console.log(`Prisma app running at http://localhost:${port}`)
})
