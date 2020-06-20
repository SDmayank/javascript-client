import { gql } from 'apollo-boost';

const CREATE_TRAINEE = gql`
mutation CreateTrainee( $name: String!, $email: String!, $password: String!){
  createTrainee(user:{name: $name, email: $email, password: $password}){
    name
    email
    role
  }
}
`;

const EDIT_TRAINEE = gql`
mutation EditTrainee($id: ID!, $name: String!, $email: String!) {
  updateTrainee(user: { id: $id, name: $name, email: $email })
}
`;

const DELETE_TRAINEE = gql`
mutation DeleteTrainee($id: ID!) {
  deleteTrainee( id: $id )
}
`;

export { CREATE_TRAINEE, EDIT_TRAINEE, DELETE_TRAINEE };
