1. https://www.apollographql.com/docs/tutorial/introduction/ Introduction
2. https://www.apollographql.com/docs/tutorial/schema/ Build a schema
3. https://www.apollographql.com/docs/tutorial/data-source/ Hook up your data sources
4. https://www.apollographql.com/docs/tutorial/resolvers/ Write your graph's resolvers

git clone https://github.com/apollographql/fullstack-tutorial.git

> From https://www.apollographql.com/docs/tutorial/introduction/
> 
> Building your frontend with React is not a requirement for using the Apollo platform,
> but it is the primary view layer supported by Apollo. If you use another view layer
> (such as Angular or Vue), you can still apply this tutorial's concepts to it.

> From https://www.apollographql.com/docs/tutorial/schema/ 
>
> Every graph API is centered around its schema.  You can think of a schema as a bluepring that
> describes all of your data's types and their relationships.  A schema also defines what data we can
> fetch through queries and what data we can update through mutations.  It is strongly typed, which
> unlocks powerful developer tooling.
>
> Schemas are at their best when they are designed around the needs of the clients that are
> consuming them.  Since a schema sits between your clients and your underlying services, it
> serves as a perfect middle ground for frontend and backend teams to collaborate.  We recommend
> that teams practics *Schema First Development* and agree upon the schema first before any API
> development begins.
>

> From https://www.apollographql.com/docs/tutorial/data-source
>
> **Hook up your data sources**
>
> Now that we've constructed our schema, we need to hook up our data sources to our GraphQL API.
> GraphQL APIs are extremely flexible because you can layer them on top of any service, including
> any business logic, REST APIs, databases, or gRPC services.
>
> Apollo makes connecting these services to your graph simple with our data source API. An **Apollo
> data source** is a class that encapsulates all of the data fetching logic, as well as caching and
> deduplication, for a particular service.  By using Apollo data sources to hook up your services to
> your graph API, you're also following best practices for organizing your code.
>
> In the next sections, we'll build data sources for a REST API and a SQL database and connect them
> to Apollo Server.  Don't worry if you're not familiar with either of those technologies, you won't
> need to understand them deeply in order to follow the examples.
>
