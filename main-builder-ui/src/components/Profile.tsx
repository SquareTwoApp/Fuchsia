import { IconButton, Breadcrumbs, Typography, Link, Grid, CardActions, Card, CardContent, CardHeader, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AvatarLoader from 'react-avatar-edit'
import { AccountCircle } from '@mui/icons-material'
import { useMutation } from "@apollo/client"
import { User } from '../generated/graphql'

export function Profile() { 
  const [showImageModal, setShowImageModal] = useState(false)
  const [preview, setPreview] = useState<string>('')
  const [myInfo, setMyInfo] = useState<User>()
  
  const handleClose = () => {
    setShowImageModal(false)
  }
  if (!myInfo) { return <div>Loading</div> }
  return (
    <div>
      <Breadcrumbs>
        <Link>Dashboard</Link>
        <Link>Settings</Link>
      </Breadcrumbs>
      <Typography variant="h1">Profile</Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card>
              <CardContent>
              <IconButton onClick={() => setShowImageModal(true)}>
                <AccountCircle style={{ height: '250px', width: '250px' }} />
              </IconButton>
            </CardContent>
            <CardActions>
              <Button>Remove Photo</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
          <Card>
            <CardHeader
            title="Profile" />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField />
                </Grid>
                <Grid item xs={8}>
                  <TextField />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  InputProps={{ readOnly: true }}
                  fullWidth
                  variant="outlined"
                  label="Email Address"
                  value={myInfo.email}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          </Grid>
          <Grid item xs={12}>
        <Card style={{ minHeight: '250px'}}>
        </Card>
      </Grid>
      </Grid>
        </Grid>
      </Grid>
      <Dialog maxWidth="md" open={showImageModal} onClose={handleClose}>
        <DialogTitle>Edit Avatar</DialogTitle>
        <DialogContent>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '1em' }}>
            <AvatarLoader
              width={390}
              height={295}
              onCrop={e => setPreview(e)}
              onClose={() => setPreview('')} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}