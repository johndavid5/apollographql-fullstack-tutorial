const { RESTDataSource } = require('apollo-datasource-rest');

let sWhere = __filename;

/**
* The Apollo RESTDataSource also sets up an in-memory cache that caches responses from our REST resources
* with no additional setup. We call this partial query caching. What's great about this cache is that you
* can reuse existing caching logic that your REST API exposes. If you're curious to learn more about partial
* query caching with Apollo data sources, please check out our blog post at
* https://blog.apollographql.com/easy-and-performant-graphql-over-rest-e02796993b2b
*/
class LaunchAPI extends RESTDataSource {

    constructor(){
        super();
        this.baseURL = 'https://api.spacexdata.com/v2/';
    }

    async getAllLaunches(){
        let sWho = `${sWhere}::getAllLaunches`;
        console.log(`${sWho}(): SHEMP: Callin' await this.get('launches'), Moe...`);
        const response = await this.get('launches');
        console.log(`${sWho}(): SHEMP: Got response = `, response, `, Moe...` );

        // Transform the raw launches to a more friendly
        // structure corresponding to the shape that our schema
        // expects, which is the Launch data type...via this.launchReducer()...
        return Array.isArray(response)
            ? response.map(launch => this.launchReducer(launch))
              : [];
    }

    async getLaunchById({ launchId }){
        const res = await this.get('launches', { flight_number: launchId });
        return this.launchReducer(res[0]); 
    }

    async getLaunchesByIds({ launchIds }){ // ES6: { destructuring, assignment }
        return Promise.all(
            launchIds.map(launchId => this.getLaunchById({ launchId })),
        );
    }

    launchReducer(launch){
        return {
            id: launch.flight_number || 0,

            cursor: `${launch.launch_date_unix}`,

            // Basically, the Logical AND operator (&&), will return the value of the second operand if the first
            // is truthy, and it will return the value of the first operand if it is by itself falsy, for example:
            // 
            // true && "foo"; // "foo"
            // NaN && "anything"; // NaN
            // 0 && "anything";   // 0
            // Note that falsy values are those that coerce to false when used in boolean context, they are null,
            // undefined, 0, NaN, an empty string, and of course false, anything else coerces to true.
            site: launch.launch_site && launch.launch_site.site_name,

            mission: { 
                name: launch.mission_name,
                missionPatchSmall: launch.links.mission_patch_small,
                missionPatchLarge: launch.links.mission_patch,
            },

            rocket: {
                id: launch.rocket.rocket_id,
                name: launch.rocket.rocket_name,
                type: launch.rocket.rocket_type,
            },
            
        };
    }

}/* class LaunchAPI extends RESTDataSource */

module.exports = LaunchAPI;
