const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const commentController = {

    async post (req, res) {
        const posts = await prisma.post.findMany()
        return res.status(200).json({
            status: true,
            message: 'All posts',
            data: posts
        })
    }

}

module.exports = commentController;
