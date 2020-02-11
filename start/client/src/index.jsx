import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: "http://localhost:4000/"
});

const client = new ApolloClient({
    cache,
    link
});

const GET_LAUNCH_STR = `query GetLaunch {
    launch(id: 56) {
        id
        mission {
            name
        }
    }
}`;

const GET_LAUNCH = gql(GET_LAUNCH_STR);

console.log("./client/src/index.js: SHEMP: Moe, runnin' query GET_LAUNCH_STR = ", GET_LAUNCH_STR );
           
console.log("./client/src/index.js: SHEMP: Moe, runnin' query GET_LAUNCH = ", JSON.stringify(GET_LAUNCH, null, ' ') );

client
    .query({
        query: GET_LAUNCH
    })
    .then( result => {
           console.log("Moe, result o' dhat GET_LAUNCH query = ", JSON.stringify(result, null, ' ' ) );
           console.log("Let off some steam, Bennett!");
        }
     );
