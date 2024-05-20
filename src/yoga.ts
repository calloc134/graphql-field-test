import { Kind, parse } from "graphql";
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
          const parsedQuery = parse(
            _context.params.query?.replace("\n", "") || "{}"
          );

          // console.dir(parsedQuery, { depth: null });

          const thisQueryDefinition = parsedQuery.definitions.find(
            (definition) => {
              if (definition.kind === Kind.OPERATION_DEFINITION) {
                return definition;
              }
            }
          );

          console.dir(thisQueryDefinition, { depth: null });

          // const queryAST = getOperationAST(parsedQuery.definitions, "query");

          // console.dir(document, { depth: null });

          // console.log(`_info: ${JSON.stringify(_info)}`);
          // console.log(`_parent: ${JSON.stringify(_parent)}`);
          // console.log(`_args: ${JSON.stringify(_args)}`);
          return { text: "Hello, World!" };
        },
      },
    },
  }),
});
