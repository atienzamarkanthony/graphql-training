## GraphQL Training
GraphQL Training using GraphQL Yoga and Node.JS

## Install Dependencies for Server
- npm init -y
- npm install prisma
- npx prisma init
- Install Prisma and Prettier Plugin from market place
- npx prisma db push / pull
- npm install @prisma/client
- npx prisma generate
- npm install graphql-yoga graphql

## GraphQL Queries
mutation SignUp($data: SignUpInput!) {
  signUp(data: $data){
    message
  }
}
{
  "data": {
    "name": "Mark Anthony Atienza",
    "age": 32,
    "email": "atienzamarkanthony@gmail.com",
    "password": "TestPassword",
    "role": "ADMIN"
  }
}

mutation SignIn ($data: SignInInput!) {
  signIn(data: $data) {
    token
  }
}
{
  "data": {
    "email": "atienzamarkanthony@gmail.com",
    "password": "TestPassword"
  }
}

mutation CreatePost ($data: CreatePostInput!) {
  createPost(data: $data) {
    id
    title
    body
    published
  }
}
{
  "data": {
    "title": "My Second Post",
    "body": "My Second Body"
  }
}

query GetPosts {
  posts {
    id
    title
    body
    published
  }
}

## Install Dependencies for Client
- npm create vite
- npm install @apollo/client graphql react
- npm install tailwindcss@latest @tailwindcss/vite@latest daisyui@latest