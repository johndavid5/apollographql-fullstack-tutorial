const { gql } = require('apollo-server');

const typeDefs = gql`

    # Define Launch, Rocket, and Mission object types...
    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type User {
        id: ID!
        email: String!
        trips: [Launch]!
    }

    type Mission {
      name: String
      missionPatch(mission: String, size: PatchSize): String
    }

    enum PatchSize {
        SMALL
        LARGE
    }


    # Query is a special object type for defining our queries...
    type Query {
	    # 'launches' query to fetch all upcoming rocket launches.
	    #            returns an array of launches which will never be null.
        #            Use 'pageSize' and 'after' to paginate the launches returned.
        # launches: [Launch]!
        launches(
            """
            The number of results to show.  Must be >= 1.  Default = 20
            """
            pageSize: Int
            """
            If you add a cursor here, it will only return results _after_ this cursor.
            """
            after: String
        ): LaunchConnection!

	    # 'launch' query to fetch a launch by its ID.
	    launch(id: ID!): Launch
	
	    # Queries for the current user
	    me: User
    }

    
    """
    Simple wrapper around our list of launches that contains a cursor to the
    last item in the list.  Pass this cursor to the launches query to fetch results
    after these.
    """
    type LaunchConnection {
        cursor: String!
        hasMore: Boolean!
        launches: [Launch]!
    }


    # In a larger project, you might abstract this response
    # into an interface rather than an object type...
    type TripUpdateResponse { 
        success: Boolean!         
        message: String
        # The launches that we've updated.
        # It's always good practice to return the data that you're
        # updating in order for the Apollo Client cache to update automatically.
        launches: [Launch]
    }

    # Mutation is a special object type for defining our mutations...
    type Mutation {
        # if false, booking trips failed -- check errors
        bookTrips(launchIds: [ID]!): TripUpdateResponse!

        # if false, cancellation failed -- check errors
        cancelTrip(launchId: ID!): TripUpdateResponse!

        lindaTripp(dressId: ID!): TripUpdateResponse!

        login(email: String): String #returns login token - base64
    }
`;

module.exports = typeDefs;
