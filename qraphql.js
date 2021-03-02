const { PrismaClient } = require('@prisma/client')
const { queryType, objectType, makeSchema } = require('nexus')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const prisma = new PrismaClient()

const User = objectType({
    name: 'User',
    definition(t) {
        t.string('email');
        t.string('name');
    }
});
const Query = queryType({
    definition(t) {
        t.list.field('allUsers', {
            type: 'User',
            resolve: () => prisma.user.findMany()
        });
    }
});
const schema = makeSchema({
    types: [User, Query]
});
const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
}));

app.listen(4000);
