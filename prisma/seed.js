const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const axios = require('axios')
const placeholderUrl = 'https://jsonplaceholder.typicode.com'

async function main() {

    await prisma.user.deleteMany({})
    await prisma.comment.deleteMany({})
    await prisma.post.deleteMany({})

      await axios.get(`${placeholderUrl}/users`).then(async response => { //User data
        const data = response.data
          data.map( async user => {
              delete user.address
              delete user.company
              await prisma.user.create({
                  data: user
              })
          })
      }).catch(function (error) {
        // handle error
        console.log(error);
      })

    await axios.get(`${placeholderUrl}/posts`).then(async response => { //Post data
        const data = response.data
        await prisma.post.createMany({
            data,
            skipDuplicates: true
        })
    }).catch(function (error) {
        // handle error
        console.log(error);
    })

    await axios.get(`${placeholderUrl}/comments`).then(async response => { //Comment data
        const data = response.data
        await prisma.comment.createMany({
            data,
            skipDuplicates: true
        })
    }).catch(function (error) {
        // handle error
        console.log(error);
    })

}
main().catch(e => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
    process.exit()
})
