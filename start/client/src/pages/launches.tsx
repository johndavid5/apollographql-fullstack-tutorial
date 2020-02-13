import React, { Fragment }  from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { LaunchTile, Header, Button, Loading } from '../components';
import { RouteComponentProps } from '@reach/router';
import * as GetLaunchListTypes from './__generated__/GetLaunchList';

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        id
        isBooked
        rocket {
          id
          name
        }
        mission {
          name
          missionPatch
        }
      }
    }
  }
`;

interface LaunchesProps extends RouteComponentProps {}

const Launches: React.FC<LaunchesProps> = () => {
  const { 
    data, 
    loading, 
    error
  } = useQuery<
    GetLaunchListTypes.GetLaunchList, 
    GetLaunchListTypes.GetLaunchListVariables
  >(GET_LAUNCHES);

  let sWho = "./pages/launches:Launches";

  console.log(`${sWho}(): Moe, loading = `, loading );
  console.log(`${sWho}(): Moe, error = `, error );
  console.log(`${sWho}(): Moe, data = `, data );

  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header />
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map((launch: any) => {
          console.log(`${sWho}(): Moe, launch = `, launch );
          return <LaunchTile key={launch.id} launch={launch} />
          }
        )}
    </Fragment>
  );
}

//const Launches: React.FC<LaunchesProps> = () => {
//  return <div />;
//}

export default Launches;

