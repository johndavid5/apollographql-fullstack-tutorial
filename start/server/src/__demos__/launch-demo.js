//const LaunchAPI = require('../datasources/launch');
const LaunchAPI = require('../../../../final/server/src/datasources/launch.js');

launchAPI = new LaunchAPI();

let sWhere = __filename;

console.log(`${sWhere}: LaunchAPI = `, LaunchAPI );

async function demoGetAllLaunches(){
    let sWho = `${sWhere}::demoGetAllLaunches`;
    console.log(`${sWho}(): Moe, callin' await launchAPI.getAllLaunches()...`);
    try {
        let allLaunches = await launchAPI.getAllLaunches();
        console.log(`${sWho}(): Moe, allLaunches = `, allLaunches );
    } catch (error) {
        console.log(`${sWho}(): Caught it in the derriere, Moe: error = `, error );
    }
}

demoGetAllLaunches()
