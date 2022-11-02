import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  Divider,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface ITemplate {
  name: string;
  description: string;
  basedOnId?: string;
}

const blankTemplate: ITemplate = {
  name: "",
  description: "",
  basedOnId: "none",
};

export function ProjectTemplates() {
  const [newTemplate, setNewTemplate] = useState<ITemplate>(
    {...blankTemplate}
  );
  const [openNewTemplate, setOpenNewTemplate] = useState(false);
  // const results = useAuthQuery(GetProjectTemplatesQuery, {
  //   variables: {
  //     organizationId: currentOrganization?.id,
  //   },
  // });
  const createProjectTemplate = () => null
  // const [createProjectTemplate] = useMutation(CreateProjectTemplatesMutation, {
  //   refetchQueries: [
  //     {
  //       query: GetProjectTemplatesQuery,
  //       variables: { organizationId: currentOrganization?.id },
  //     },
  //   ],
  // });
  const deleteProjectTemplate = () => null
  // const [deleteProjectTemplate] = useMutation(DeleteProjectTemplatesMutation, {
  //   refetchQueries: [
  //     {
  //       query: GetProjectTemplatesQuery,
  //       variables: { organizationId: currentOrganization?.id },
  //     },
  //   ],
  // });
  const nav = useNavigate();

  const handleClose = () => {
    setNewTemplate({...blankTemplate});
    setOpenNewTemplate(false);
  };

  const addNewTemplate = () => {
    // const basedOnId =
    //   newTemplate.basedOnId === "none" ? undefined : newTemplate.basedOnId;
    // createProjectTemplate({
    //   variables: {
    //     organizationId: currentOrganization?.id,
    //     projectDetails: {
    //       name: newTemplate.name,
    //       description: newTemplate.description,
    //     },
    //     basedOnId,
    //   },
    // });
    // handleClose();
  };

  return (
    <div>
      <div
        style={{ display: "grid", justifyContent: "end", marginBottom: "10px" }}
      >
        <Button
          onClick={(e) => setOpenNewTemplate(true)}
          color="primary"
          variant="contained"
        >
          Create Project Template
        </Button>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Processes</Typography>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {results.data.projectTemplates.map((ct: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell
                      style={{ cursor: "pointer" }}
                      onClick={(e) =>
                        nav(`/organization/templates/edit/${ct.id}`)
                      }
                    >
                      <Typography style={{ textDecoration: "underline" }}>
                        {ct.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{ct.description}</TableCell>
                    <TableCell>
                      {ct.organizationId && (
                        <IconButton
                          onClick={(e) => {
                            deleteProjectTemplate({
                              variables: {
                                organizationId: currentOrganization?.id,
                                projectTemplateId: ct.id,
                              },
                            });
                          }}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={openNewTemplate}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a new template</DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          <DialogContentText>
            A template is used to define what the workflow for building a project
            will look like.
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                autoFocus
                value={newTemplate.name}
                onChange={(e) => {
                  const name = e.currentTarget.value;
                  setNewTemplate((s) => ({
                    ...s,
                    name,
                  }));
                }}
                id="name"
                label="Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                value={newTemplate.description}
                onChange={(e) => {
                  const description = e.currentTarget.value;
                  setNewTemplate((s) => ({
                    ...s,
                    description,
                  }));
                }}
                id="name"
                label="Description"
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                id="hero-image"
                fullWidth
                variant="outlined"
                onChange={(e) => {
                  const basedOnId = e.target.value as string;
                  setNewTemplate((t) => ({
                    ...t,
                    basedOnId,
                  }));
                }}
                value={newTemplate.basedOnId}
              >
                <MenuItem value={"none"} key={"none"}>
                  <em>None</em>
                </MenuItem>
                {/* {results.data.projectTemplates.map(
                  (template: any, index: number) => (
                    <MenuItem value={template.id} key={template.id}>
                      {template.name}
                    </MenuItem>
                  )
                )} */}
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addNewTemplate} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
