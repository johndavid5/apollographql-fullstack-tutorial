const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

/* Create our SQLLite database...(is that like a Pepsi Lite database...?)
* and later pass it to the UserAPI data source...
*/
const store = createStore(); 

// dataSources() function: connect LaunchAPI and UserAPI to our graph...
//
// NOTE: If you use this.context in your datasource, it's critical to create a new instance in the
// dataSources function and to not share a single instance.  Otherwise, intialize may be 
// called during the execution of asynchronous code for a specific user, and replace the
// this.context by the context of another user.
//
// => Apollo Server will automatically add the launchAPI and userAIP to our resolvers' context so
// we can easily call them...
//
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: ()=>({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store }) 
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
