import GraphQLDateTime from 'graphql-type-datetime';

import { User } from './User';

const resolvers = {
    DateTime: GraphQLDateTime,
    User
};

export { resolvers };
