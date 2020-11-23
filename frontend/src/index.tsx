import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {} from "./generated/graphql";

export const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getJobs: {
            keyArgs: [],
            merge(_, incoming) {
              return {
                ...incoming,
                jobs: incoming.jobs,
                hasMore: incoming.hasMore,
              };
            },
          },
          purchases: {
            keyArgs: [],
            merge(_, incoming) {
              return {
                ...incoming,
                purchases: incoming.purchases,
                hasMore: incoming.hasMore,
              };
            },
          },
          getEmployeePayments: {
            keyArgs: [],
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
