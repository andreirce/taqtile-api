import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import { ruruHTML } from "ruru/server";


const schema = buildSchema(`
    type Query {
      hello: String
    }
  `)


const rootValue = {
    hello: () => "Hello world!"
}

const app = express()

app.all(
    "/graphql",
    createHandler({
        schema,
        rootValue
    })
)

app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(4000, () => console.log("Server running at http://localhost:4000"))