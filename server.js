var express = require('express');
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Initialize a GraphQL schema
var schema = buildSchema(`
  type Query {
    hello: String
    user(id: Int!): Person
    users(shark: String): [Person]
  },
  type Person {
    id: Int
    name: String
    age: Int
    shark: String
  }
  type Mutation {
    updateUser(id: Int!, name: String!, age: String): Person
  }
`);

// Sample users
var users = [
  {
    id: 1,
    name: 'Brian',
    age: '21',
    shark: 'Great White Shark'
  },
  {
    id: 2,
    name: 'Kim',
    age: '22',
    shark: 'Whale Shark'
  },
  {
    id: 3,
    name: 'Faith',
    age: '23',
    shark: 'Hammerhead Shark'
  },
  {
    id: 4,
    name: 'Joseph',
    age: '23',
    shark: 'Tiger Shark'
  },
  {
    id: 5,
    name: 'Joy',
    age: '25',
    shark: 'Hammerhead Shark'
  }
];

// Return a single user
var getUser = function(args) {
  var userID = args.id;
  return users.filter(user => user.id == userID)[0];
};

// Return a list of users
var retrieveUsers = function(args) {
  if (args.shark) {
    var shark = args.shark;
    return users.filter(user => user.shark === shark);
  }
  else {
    return users;
  }
};

// Update a user and return new user details
var updateUser = function({id, name, age}) {
  users.map(user => {
    if(user.id === id) {
      user.name = name;
      user.age = age;
      return user;
    }
  });
  return users.filter(user => user.id === id)[0];
};

// Root resolver
var root = {
  hello: () => 'Hello world!',
  user: getUser, // Resolver function to return user with specific id
  users: retrieveUsers,
  updateUser: updateUser // Include mutation dunction in root resolver
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema, // Must be provided
  rootValue: root,
  graphiql: true, // Enable GraphiQL when server endpoint is accessed in browser
}));

app.listen(3000, () => console.log('Now browse to localhost:3000/graphiql'));
