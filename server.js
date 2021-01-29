var express = require('express');
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Initialize a GraphQL schema
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Root resolver
var root = {
  hello: () => 'Hello world!'
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema, // Must be provided
  rootValue: root,
  graphiql: true, // Enable GraphiQL when server endpoint is accessed in browser
}));
app.listen(3000, () => console.log('Now browse to localhost:4000/graphiql'));
