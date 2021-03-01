const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const axios = require('axios')
const placeholderUrl = 'https://jsonplaceholder.typicode.com'

async function main() {
  const userData = await axios.get(`${placeholderUrl}/users`)
  .then(function (response) {
    const data = response.data
    console.log(data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
    /*const posts = await prisma.user.createMany({
        data: [
          { name: 'Bob', email: 'bob@prisma.io' },
          { name: 'Bobo', email: 'bob@prisma.io' }, // Duplicate unique key!
          { name: 'Yewande', email: 'yewande@prisma.io' },
          { name: 'Angelique', email: 'angelique@prisma.io' },
        ],
        skipDuplicates: true,
      })*/
}
main().catch(e => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})
