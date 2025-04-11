import { gql } from "@apollo/client";

export const GET_POSTS = gql`
    query GetPosts {
        posts {
            id
            title
            body
            published
            author {
                name
                age
                email
                role
            }
        }
    }
`;