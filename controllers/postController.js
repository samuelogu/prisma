const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const productController = {

    async all (req, res) {
        return await prisma.product.findMany()
    }

}

module.exports = productController;
