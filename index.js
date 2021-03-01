const express = require('express')
require('dotenv').config()

const app = express()
const router = express.Router();
const port = process.env.PORT

// load controllers
const postController = require('./controllers/postController')

router.get('/posts', postController.all);

app.listen(port, () => {
    console.log(`Prisma app running at http://localhost:${port}`)
})
