import { IconButton, Breadcrumbs, Typography, Link, Grid, CardActions, Card, CardContent, CardHeader, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AvatarLoader from 'react-avatar-edit'
import { AccountCircle } from '@mui/icons-material'
import { useMutation } from "@apollo/client"
import { useMeQuery, User, UserInput, useUpdateMeMutation } from '../generated/graphql'

import { PasswordField } from './Common/PasswordField';

import * as Yup from 'yup';
import { Formik } from 'formik';

interface ProfileFormFields {
  email: string,
  displayName: string,
  password: string,
  confirmPassword: string
}

const profileValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label("Email"),
  displayName: Yup.string()
    .required()
    .label("Display Name"),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters')
    .label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must match Password')
});

export function Profile() {
  const { data: me } = useMeQuery();
  const [updateMe, { data: updateResponse, error: updateError, loading: updateLoading }] = useUpdateMeMutation();

  const [showImageModal, setShowImageModal] = useState(false);
  const [preview, setPreview] = useState<string>('');
  const [newImage, setNewImage] = useState<string>('');
  const [removeImage, setRemoveImage] = useState<boolean>(false);

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  useEffect(() => {
    if (me && me.me) {
      if (me.me.avatar) {
        setNewImage(me.me.avatar);
      }
    }
  }, [me]);

  const handleClose = () => {
    setShowImageModal(false)
  }

  const handleRemoveImage = () => {
    setRemoveImage(true);
  }

  const handleSavePreview = () => {
    setNewImage(preview);
    setShowImageModal(false);
  }

  const onBeforeFileLoad = (elem: any) => {
    console.log('elem', elem);
    if (elem.target.files[0].size > 128000) {
      alert("Use Notistack: File is too large.");
      return false;
    }
    if (!["image/png", "image/jpeg", "image/gif"].includes(elem.target.files[0].type)) {
      alert("Use notistack: File is invalid type");
      return false;
    }
  }

  const handleSubmit = (values: ProfileFormFields) => {
    console.log('formfields', values);
    const item: UserInput = {
      displayName: values.displayName,
      email: values.email,
      avatar: preview,
      removeAvatar: removeImage
    }

    updateMe({
      variables: {
        userInput: item
      }
    }).then(resp => {
      console.log('resp', resp);
      alert('Use Notistack: resp');
    }).catch(error => {
      alert('Use Notistack: ' + error.message);
    });
  }

  if (!me || !me.me) { return <div>Loading</div> }

  return (
    <div>
      <Breadcrumbs>
        <Link>Dashboard</Link>
        <Link>Settings</Link>
      </Breadcrumbs>
      <Typography variant="h1">Profile</Typography>
      <Grid container spacing={3}>
        <Formik<ProfileFormFields>
          initialValues={{
            email: me.me!.email,
            displayName: me.me!.displayName || "",
            password: "",
            confirmPassword: ""
          }}
          validationSchema={profileValidationSchema}
          onSubmit={values => handleSubmit(values)}
        >
          {({ values, setFieldValue, errors, handleSubmit }) =>
            <>
              <Grid item xs={4}>
                <Card>
                  <CardContent style={{}}>
                    <IconButton onClick={() => setShowImageModal(true)}>
                      <div style={{ position: "relative" }}>
                        {preview ?
                          <img src={newImage} alt="Avatar" style={{ height: 250, width: 250 }} />
                          :
                          (me.me?.avatar ? 
                            <img src={me.me.avatar} alt="Avatar" style={{ height: 250, width: 250 }} />
                            :
                            <AccountCircle style={{ height: '250px', width: '250px' }} />
                          )
                        }
                        {
                          removeImage && <div style={{ position: "absolute", border:"1px solid rgba(0,0,0,0.5)", borderRadius:150, color:"white", zIndex: 5, background: "rgba(0,0,0,0.5)", top: 0, left: 0, width: "100%", height: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <div style={{textAlign:"center", width: "100%"}}>Image Removed</div>
                          </div>
                        }
                      </div>
                    </IconButton>
                  </CardContent>
                  <CardActions>
                    <Button onClick={handleRemoveImage}>Remove Photo</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title="Profile" />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              name="displayName"
                              value={values.displayName}
                              onChange={e => setFieldValue("displayName", e.currentTarget.value)}
                              label="Display Name"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              name="email"
                              fullWidth
                              variant="outlined"
                              label="Email Address"
                              onChange={e => setFieldValue("email", e.currentTarget.value)}
                              value={values.email}
                            />
                          </Grid>
                          <Grid container item xs={12} spacing={3}>
                            <Grid item xs={12}>
                              <h3 style={{ marginBottom: 0 }}>Change Password</h3>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <PasswordField
                                value={values.password}
                                label="New Password"
                                name="newPassword"
                                error={errors.password!!}
                                helperText={errors.password}
                                onChange={(e: any) => setFieldValue("password", e.currentTarget.value)}
                                showPassword={showNewPassword}
                                setShowPassword={setShowNewPassword}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <PasswordField
                                value={values.confirmPassword}
                                label="Confirm New Password"
                                name="confirmPassword"
                                error={errors.confirmPassword!!}
                                helperText={errors.confirmPassword}
                                onChange={(e: any) => setFieldValue("confirmPassword", e.currentTarget.value)}
                                showPassword={showPasswordConfirmation}
                                setShowPassword={setShowPasswordConfirmation}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Card style={{ minHeight: '250px' }}>
                    </Card>
                  </Grid> */}
                </Grid>
                <Grid>
                  <Button variant="contained" color="primary" style={{ margin: 12 }} onClick={() => handleSubmit()}>Submit</Button>
                </Grid>
              </Grid>
            </>
          }
        </Formik>
      </Grid>
      <Dialog maxWidth="md" open={showImageModal} onClose={handleClose}>
        <DialogTitle>Edit Avatar</DialogTitle>
        <DialogContent>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '1em' }}>
            <AvatarLoader
              width={390}
              height={295}
              onCrop={setPreview}
              onClose={() => setPreview('')}
              onBeforeFileLoad={onBeforeFileLoad}
            />
            <img src={preview} alt="Preview" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSavePreview} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}