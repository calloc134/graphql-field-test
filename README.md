# graphql で preload の実装

## はじめに

graphql で N+1 問題を解決する際には通常 DataLoader を利用する。
しかし、DataLoader は実装が複雑になり、またある程度の待機時間が生じる。
実装も直感的でないポイントが存在する。

そのため、graphql のフィールドからデータの必要性を判別し、必要なデータを一度に取得する preload を実装する。
これは graphql を薄く使う試みの一環である。

以下のブログとやっていることとしては結構似ているかもしれない
https://techblog.exawizards.com/entry/2022/12/01/154745

## 実装

graphql-yoga のリゾルバでは、info 引数を利用することでクエリの情報を取得することができる。
そのままでは使いにくいため、提供されている`graphql-parse-resolve-info`というライブラリを利用する。
これは、Graphile プロジェクトが提供しているもので、リゾルバの info 引数を解析し、TypeScript のオブジェクトとして読みやすい形に整形してくれる。

```typescript
// クエリ情報を解析
const parsed = parseResolveInfo(_info);
```

以下のように整形される。

```json
{
  "name": "greetings",
  "alias": "greetings",
  "args": {},
  "fieldsByTypeName": {
    "Message": {
      "text": {
        "name": "text",
        "alias": "text",
        "args": {},
        "fieldsByTypeName": {}
      }
    }
  }
}
```

次に、今回の呼び出しで要求されているフィールドを取得するには、以下のようにする。

```typescript
const fields = parsed?.fieldsByTypeName[getNamedType(_info.returnType).name];
const keys = Object.keys(field);
```

keys を確認すれば、今回のクエリで要求されているフィールドがわかる。

## 参考

https://medium.com/grandstack/graphql-resolveinfo-deep-dive-1b3144075866
https://github.com/graphile/graphile-engine/tree/v4/packages/graphql-parse-resolve-info
