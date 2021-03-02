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

    },

    async comments(req, res) {

        try {
            const comments = await prisma.comment.findMany({
                where: {
                    postId: Number(req.params.id)
                }
            })
            res.status(200).json({
                status: true,
                message: 'Post comment',
                data: comments
            })
        } catch (e) {
            res.status(404).json({
                status: false,
                message: 'Post does not have any comment',
                data: null
            })
        }

    },

    async add(req, res) {
        if (!req.body.title) {
            return res.status(400).json({
                status: false,
                message: 'Post title is required!',
                data: null
            })
        }

        try {

            const data = {
                title: req.body.title,
                body: req.body.body
            }

            const post = await prisma.post.create({
                data
            })

            res.status(200).json({
                status: true,
                message: 'Post successfully created',
                data: post
            })

        } catch (e) {
            res.status(400).json({
                status: false,
                message: 'Unable to create post',
                data: null
            })
        }
    },

    async update(req, res) {
        if (!req.body.title) {
            return res.status(400).json({
                status: false,
                message: 'Post title is required!',
                data: null
            })
        }

        try {

            const data = {
                title: req.body.title,
                body: req.body.body
            }

            const id = Number(req.params.id)

            const post = await prisma.post.update({
                where: { id },
                data
            })

            res.status(200).json({
                status: true,
                message: 'Post successfully updated',
                data: post
            })

        } catch (e) {
            res.status(400).json({
                status: false,
                message: 'Unable to update post',
                data: null
            })
        }
    },

    async remove(req, res) {

        const id = Number(req.params.id)

        const post = await prisma.post.findFirst({
            where: { id }
        })

        if (!post) {
            return res.status(404).json({
                status: false,
                message: 'Post not found!',
                data: null
            })
        }

        try {

            await prisma.post.delete({
                where: { id }
            })

            res.status(200).json({
                status: true,
                message: 'Post successfully removed',
                data: null
            })

        } catch (e) {
            res.status(400).json({
                status: false,
                message: 'Unable to remove post',
                data: null
            })
        }
    }

}

module.exports = productController;
