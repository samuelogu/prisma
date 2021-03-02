const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const productController = {

    async all (req, res) {
        const posts = await prisma.post.findMany()
        return res.status(200).json({
            status: true,
            message: 'All posts',
            data: posts
        })
    },

    async single(req, res) {

        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: Number(req.params.id)
                },
                include: {
                    comments: true,
                }
            })
            res.status(200).json({
                status: true,
                message: post.title,
                data: post
            })
        } catch (e) {
            res.status(404).json({
                status: false,
                message: 'Post not found',
                data: null
            })
        }

    }

}

module.exports = productController;
