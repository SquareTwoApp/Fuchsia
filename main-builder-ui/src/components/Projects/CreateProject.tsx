import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close as CloseIcon } from "@mui/icons-material";
import { useFormik } from "formik";
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator'
import * as Yup from "yup";
const organizations = [] as any[]
export function CreateProject() {
  const nav = useNavigate();

  const [images, setImages] = useState<Array<{ id: string; image: string }>>(
    []
  );
  const [templates, setTemplates] = useState<
    Array<{ id: string; name: string; description: string }>
  >([]);
  const suggestedName = useMemo(() => {
    return uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      length: 2,
      separator: '-',
      style: "lowerCase"
    })
  }, [])
  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      template: "",
      proprietorId: "ME",
      proprietorType: "USER"
    },
    validationSchema: Yup.object({
      name: Yup.string().required()
    }),
    onSubmit: (values) => {
      console.log(values)
    }
  })
  // const imageResults = useAuthQuery(getImages, {
  //   variables: { organizationId: currentOrganization?.id },
  // });
  // const templateResults = useAuthQuery(getProjectTemplates, {
  //   variables: { organizationId: currentOrganization?.id },
  // });
  // const [createProject] = useMutation(createProjectMutation, {
  //   refetchQueries: [
  //     {
  //       query: getMyProject,
  //     },
  //   ],
  // });

  // useEffect(() => {
  //   if (imageResults.data) {
  //     setImages(imageResults.data.images);
  //   }
  // }, [imageResults]);

  // useEffect(() => {
  //   if (templateResults.data) {
  //     setTemplates(templateResults.data.projectTemplates);
  //   }
  // }, [templateResults]);
  // if (!organizations || !currentOrganization) { return <div /> }
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gridGap: "1em",
          alignItems: "center",
        }}
      >
        <Typography variant="h1">
          New Project
        </Typography>
        <IconButton
          onClick={() => {
            nav(`/projects`);
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <form>
        <Card>
          <CardHeader title="Project Information" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              {
                organizations.length > 1 ? (
                  <Grid item xs={12}>
                    <Select<string>
                      variant="outlined"

                      value={formik.values.proprietorId}
                      onChange={e => {
                        formik.handleChange(e)
                        setFieldValue('proprietorType', (e.target as HTMLInputElement).dataset.type)
                      }}
                    >
                      <MenuItem data-type="user" value={1} key={1}>
                        ME
                      </MenuItem>
                      {
                        organizations.map(organization => (
                          <MenuItem data-type="organization" value={organization.id} key={organization.id}>
                            {organization.name}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </Grid>
                ) : (
                  <></>
                )
              }
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={!!formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography>Consider a memorable name that is not associated with the final product, you might change your product name before launch! Perhaps <span style={{ textDecoration: 'underline', color: "var(--primary)", cursor: 'pointer' }} onClick={() => setFieldValue('name', suggestedName)}>{suggestedName}</span> would be good.</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="select-img-label">Image</InputLabel>
                  <Select
                    variant="outlined"
                    fullWidth
                    id="image"
                    labelId="select-img-label"
                    label="Image"
                    onChange={formik.handleChange}
                    value={formik.values.image}
                    renderValue={(selected) => (
                      <img
                        alt="Hero"
                        src={`data:image/jpeg;base64,${images.find((img) => img.id === selected)?.image
                          }`}
                        style={{
                          height: "50px",
                          width: "75px",
                          objectFit: "contain",
                        }}
                      />
                    )}
                  >
                    {images.map(
                      (img: { id: string; image: string }) => (
                        <MenuItem key={img.id} value={img.id}>
                          <img
                            alt=""
                            src={`data:image/jpeg;base64,${img.image}`}
                            style={{
                              height: "50px",
                              width: "75px",
                              objectFit: "contain",
                            }}
                          />
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="select-template-label">Template</InputLabel>
                  <Select
                    variant="outlined"
                    fullWidth
                    id="template"
                    labelId="select-template-label"
                    label="Template"
                    onChange={formik.handleChange}
                    value={formik.values.template}
                  >
                    {templates.map(
                      (template: {
                        id: string;
                        name: string;
                        description: string;
                      }) => (
                        <MenuItem key={template.id} value={template.id}>
                          {template.name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button variant="contained" onClick={() => nav(-1)}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // createProject({
                //   variables: {
                //     organizationId: currentOrganization?.id,
                //     projectDetails: {
                //       name: projectName,
                //       projectCode,
                //       imageId: projectImage,
                //     },
                //     templateId: projectTemplate,
                //   },
                // });
                nav(`/projects`);
              }}
            >
              Create
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}
