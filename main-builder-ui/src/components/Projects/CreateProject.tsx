import React, { useMemo, useState } from "react";
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
import { useCreateProjectMutation, useListOrganizationsQuery, ListProjectsDocument } from '../../generated/graphql'
import * as Yup from "yup";
import { HeroImages } from "../Common/HeroImages";

export function CreateProject() {
  const nav = useNavigate();
  const [createProject] = useCreateProjectMutation({
    refetchQueries: [ListProjectsDocument]
  })
  const { data: organizationData } = useListOrganizationsQuery()
  const [images, setImages] = useState<Array<{ id: string; image: string }>>([]);
  const [templates, setTemplates] = useState<Array<{ id: string; name: string; description: string }>>([]);
  const suggestedName = useMemo(() => {
    return uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      length: 2,
      separator: '-',
      style: "lowerCase"
    })
  }, []);

  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      template: "undefined",
      ownerId: "",
      heroImageId: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required()
    }),
    onSubmit: (values) => {
      createProject({
        variables: {
          project: {
            organizationId: values.ownerId,
            projectDescription: values.description,
            projectName: values.name,
            heroImageId: values.heroImageId
          },
        },
      }).then(resp => {
        if (resp) {
          nav(`/projects`);
        }
      }).catch(error => {
        alert('Use Notistack: Error:' + error.message);
      })
    }
  });

  // const templateResults = useAuthQuery(getProjectTemplates, {
  //   variables: { organizationId: currentOrganization?.id },
  // });

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
                organizationData && organizationData.listOrganizations ? (
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="select-owner-label">Owner</InputLabel>
                      <Select
                        variant="outlined"
                        fullWidth
                        id="ownerId"
                        labelId="select-owner-label"
                        label="Owner"
                        onChange={e => {
                          formik.handleChange(e)
                          const newValue = (e.target as HTMLInputElement).value
                          setFieldValue('ownerId', newValue)
                        }}
                        value={formik.values.ownerId}
                      >
                        {
                          organizationData.listOrganizations.map(organization => (
                            <MenuItem data-type="organization" value={organization._id} key={organization._id}>
                              {organization.name}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                ) : (
                  <></>
                )
              }
              <Grid item xs={9} md={8}>
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
                  <HeroImages onSelect={imageId => setFieldValue("heroImageId", imageId)} />
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
                    onChange={e => {
                      formik.handleChange(e)
                      const newValue = (e.target as HTMLInputElement).value
                      setFieldValue('template', newValue)
                    }}
                    value={formik.values.template}
                  >
                    <MenuItem value={"undefined"}>
                      None
                    </MenuItem>
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
                formik.submitForm()
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
