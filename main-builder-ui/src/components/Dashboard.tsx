import { Typography, Grid, Card, CardHeader, CardContent, Button } from '@mui/material';
import React from 'react'
import { useMeQuery } from '../generated/graphql'
import { useAuth } from '../hooks/useAuth'
import { NoProjects } from './Projects/NoProjects';

export function Dashboard() {
  const { data: me } = useMeQuery()
  const courseSummary = [] as any[]
  return ( <NoProjects />)
    return (
      <div> 
        <Typography variant="h1">
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Grid container spacing={3}>
          {
              courseSummary.map(cs => (
                <Grid key={cs.courseCode} item xs={12}>
                <Card>
                  <CardHeader title={`${cs.courseCode}:${cs.courseName}`} subheader={`Stage: ${cs.currentInProgress || 'Nothing in progress'}`} />
                  <CardContent>
                    <svg viewBox="0 0 300 20">
                      {/* {stackedBar(cs.status)} */}
                    </svg>
                </CardContent>
                </Card>
                </Grid>
              ))
            }
            </Grid>
          </Grid>
          <Grid item xs={4}>
            {/* <DeliverablesWidget /> */}
          </Grid> 
          <Grid item xs={4}>
            {/* <MeetingsWidget /> */}
          </Grid>
        </Grid>
        <div>
          {
            // me && me.invites.length > 0 ? (
            //   <Card>
            //     <CardHeader>You're invited</CardHeader>
            //     <CardContent>
            //     {
            //       me.invites.map(invite => (
            //         <div>
            //           <span>{invite.organization.name}</span>
            //           <span><Button onClick={e => {
            //             acceptInvitation({
            //               variables: {
            //                 invitationId: invite.id
            //               }
            //             })
            //           }}>Accept</Button></span>
            //           </div>
            //       ))
            //     }
            //     </CardContent>
            //   </Card>
            // ): (
            //   <></>
            // )
          }
        </div>
      </div>
    );
}