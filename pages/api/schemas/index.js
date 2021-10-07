export const typeDefs = `
  type Query {
    users: [User!]!
  }
  type User {
    id: ID!
    name: String!
    number: String!
  }
`;
