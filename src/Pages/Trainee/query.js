import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query getAll($limit: Int, $skip: Int) {
  getAll(options: { limit: $limit, skip: $skip }) {
    count
    records{
    _id
    originalId
    name
    email
    role
    createdAt
    }
  }
}
`;

export { GET_TRAINEE };
