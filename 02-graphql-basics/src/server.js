import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";

// Scalar Types - ID, String, Boolean, Int, Float
// Non-scalar field - Product - title, price, qty, desc, isAvailable

let allUsers = [
  { id: "u001", name: "monica", age: 23 },
  { id: "u002", name: "ross", age: 24 },
  { id: "u003", name: "rachel", age: 22 },
];

let allPosts = [
  {
    id: "p001",
    title: "GraphQL 101",
    body: "Awesome content",
    published: true,
    creator: "u003",
  },
  {
    id: "p002",
    title: "Refresh React",
    body: "React bootcamp",
    published: false,
    creator: "u003",
  },
  {
    id: "p003",
    title: "NodeJS for Naive",
    body: "For beginners",
    published: true,
    creator: "u001",
  },
  {
    id: "p004",
    title: "Spring in Java",
    body: "Framework of Frameworks",
    published: false,
    creator: "u002",
  },
];

let allComments = [
  { id: "c001", text: "I like it", postId: "p003", author: "u002" },
  { id: "c002", text: "Luv it", postId: "p001", author: "u001" },
  { id: "c003", text: "Not bad", postId: "p001", author: "u002" },
  { id: "c004", text: "just like that", postId: "p002", author: "u001" },
];

const typeDefs = /* GraphQL */ `
  type Query {
    users(name: String): [User!]!
    posts(search: String): [Post!]!
    comments: [Comment!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
    posts: [Post!]!
    comments: [Comment!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    creator: User!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    text: String!
    post: Post!
    author: User!
  }
`;

const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      if (args.name) {
        return allUsers.filter((user) => user.name.includes(args.name));
      }
      return allUsers;
    },
    posts: (parent, args, context, info) => {
      if (args.search) {
        return allPosts.filter((post) => {
          return (
            post.title.toLowerCase().includes(args.search.toLowerCase()) ||
            post.body.toLowerCase().includes(args.search.toLowerCase())
          );
        });
      }
      return allPosts;
    },
    comments: (parent, args, context, info) => allComments,
  },
  Post: {
    creator: (parent, args, context, info) => {
      return allUsers.find((user) => user.id === parent.creator);
    },
    comments: (parent, args, context, info) => {
      return allComments.filter((comment) => comment.postId === parent.id);
    },
  },
  User: {
    posts: (parent, args, context, info) => {
      return allPosts.filter((post) => post.creator === parent.id);
    },
    comments: (parent, args, context, info) => {
      return allComments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    post: (parent, args, context, info) => {
      return allPosts.find((post) => post.id === parent.postId);
    },
    author: (parent, args, context, info) => {
      return allUsers.find((user) => user.id === parent.author);
    },
  },
};

// Create Schema
const schema = createSchema({
  typeDefs, // Structure
  resolvers, // Behaviour
});

// Create Yoga Server
const yoga = createYoga({ schema });

// Create HTTP Server
const server = createServer(yoga);

server.listen(4040, () =>
  console.log("GraphQL Server started 🚀 at PORT : 4040")
);