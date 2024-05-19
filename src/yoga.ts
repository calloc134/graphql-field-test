import { createSchema, createYoga } from "graphql-yoga";

// available when handling requests, needs to be provided by the implementor
// eslint-disable-next-line @typescript-eslint/ban-types
type ServerContext = {};

export const yoga = createYoga<ServerContext>({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greetings: Message!
      }

      type Message {
        text: String!
      }
    `,
    resolvers: {
      Query: {
        greetings: (_parent, _args, _context, _info) => {
          console.log(`${_context.params.query}`);
          // console.log(`_info: ${JSON.stringify(_info)}`);
          // console.log(`_parent: ${JSON.stringify(_parent)}`);
          // console.log(`_args: ${JSON.stringify(_args)}`);
          return { text: "Hello, World!" };
        },
      },
    },
  }),
});
