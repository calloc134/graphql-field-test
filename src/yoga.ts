import { getNamedType } from "graphql";
import { parseResolveInfo } from "graphql-parse-resolve-info";
import { createSchema, createYoga } from "graphql-yoga";

export const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greetings: Message!
      }

      type Message {
        text: String!
        text2: String!
        text3: String!
      }
    `,
    resolvers: {
      Query: {
        greetings: (_parent, _args, _context, _info) => {
          // クエリ情報を解析
          const parsed = parseResolveInfo(_info);
          const field =
            parsed?.fieldsByTypeName[getNamedType(_info.returnType).name];

          // フィールドが存在しない場合
          if (!field) {
            throw new Error("No fields found");
          }

          // 含まれるフィールドのキー名を取得
          const keys = Object.keys(field);

          // 表示
          console.log(keys);

          return {
            text: "Hello, World!",
            text2: "Hello, World!",
            text3: "Hello, World!",
          };
        },
      },
    },
  }),
});
