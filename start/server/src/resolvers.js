module.exports = {
    // Resolver functions for Query type fields: launches, launch, and me.
    // resolver_function( parent, arguments, context ) 
    //  (first argument, `parent` is always blank since it refers to the root of our graph)
    //  (second argument, `arguments` are any arguments passed into our query, e.g., we destructure `id` for our `launch` query.)
    //  (third argument, `context`, we use to destructure our data sources )
    // We recommend keeping your resolvers thin as a best practice, which
    // allows you to safely refactor without worrying about breaking your API.
    Query: {
        launches: (_, __, { dataSources }) => 
            dataSources.launchAPI.getAllLaunches(),
        launch: (_, { id }, { dataSources }) => 
            dataSources.launchAPI.getLaunchById({ launchId: id }),
        me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    }
};
