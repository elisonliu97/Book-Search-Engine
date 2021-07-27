const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    me: User
}
type Auth {
    token: ID!
    user: User
}
`;

module.exports = typeDefs;