import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  Button,
  Typography,
  Box,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material"
import {
  Search as SearchIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material'
import { NoProjects } from "./NoProjects";
import { ProjectCard } from "./ProjectCard";
import { useDeleteProjectMutation, useListProjectsQuery, useMeQuery } from "../../generated/graphql";

interface ProjectTableRowProps {
  id: string;
  project: any;
  onDelete: (id: string) => void;
}

function ProjectRow({ project, id, onDelete }: ProjectTableRowProps) {
  const [open, setOpen] = React.useState(false);
  const nav = useNavigate();

  if (!project) {
    return <div />;
  }
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{project.projectName}</TableCell>
        <TableCell>{project.projectCode}</TableCell>
        <TableCell>
          {new Date(project.createdAt).toLocaleDateString("en-US")}
        </TableCell>
        <TableCell>
          {new Date(project.updatedAt).toLocaleDateString("en-US")}
        </TableCell>
        <TableCell
          style={{ cursor: "pointer" }}
          onClick={() => {
            nav(`/projects/${id}`);
          }}
        >
          <IconButton>
            <ReceiptIcon />
          </IconButton>
        </TableCell>
        <TableCell
          style={{ cursor: "pointer" }}
          onClick={() => {
            onDelete(id);
          }}
        >
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                color="secondary"
                variant="h6"
                gutterBottom
                component="div"
              >
                Project Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  Details: Add some stuff here
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface IProjectViewProp {
  viewType: string | null;
  projectAccesses: any[];
  onDelete: (id: string) => void;
}

function ProjectView({ viewType, projectAccesses, onDelete }: IProjectViewProp) {

  switch (viewType) {
    case "grid": {
      return (
        <Grid container spacing={2}>
          {/* <div className='project-card-wrapper'> */}
          {projectAccesses.map((projectAccess, index) => (
            <Grid item sm={12} md={6} lg={5} xl={4}>
              <ProjectCard
                key={index}
                project={projectAccess}
                onDelete={onDelete}
              />
            </Grid>
          ))}
          {/* </div> */}
        </Grid>
      );
    }
    case "list": {
      return (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Project code</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Open</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectAccesses.map((projectAccess) => (
                <ProjectRow
                  key={projectAccess._id}
                  project={projectAccess}
                  onDelete={onDelete}
                  id={projectAccess._id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  }
  return <div></div>;
}

export function Projects() {
  const { data: me } = useMeQuery()
  const [viewType, setViewType] = useState<string | null>();
  const [filter, setFilter] = useState("");
  const [organizationFilter, setOrganizationFilter] = useState("all");
  const [showHidden, setShowHidden] = useState(false);
  const [deleteProjectConfirmation, setDeleteProjectConfirmation] = useState("");
  const [projectToDelete, setProjectToDelete] = useState<any>();
  const [
    deleteProjectComfirmationError,
    setDeleteProjectConfirmationError,
  ] = useState(false);
  const [openDeleteProjectDialog, setOpenDeleteProjectDialog] = useState(false);
  const nav = useNavigate();
  const [deleteProject] = useDeleteProjectMutation()
  const { data: projectsData } = useListProjectsQuery()
  useEffect(() => {
    const viewType = localStorage.getItem("projectViewType");
    if (viewType) {
      if (viewType === "list" || viewType === "grid") {
        setViewType(viewType);
      } else {
        localStorage.setItem("projectViewType", "grid");
        setViewType("grid");
      }
    } else {
      localStorage.setItem("projectViewType", "grid");
      setViewType("grid");
    }
  }, []);

  // const filterProjects = useCallback(() => {
  //   if (projectsResults.data) {
  //     let projectAccesss = clone(
  //       projectsResults.data.me!.projectAccesses
  //     ) as ProjectAccess[];
  //     if (!showHidden) {
  //       projectAccesss = projectAccesss.filter((c) => !c.hide);
  //     }
  //     if (organizationFilter !== "all") {
  //       projectAccesss = projectAccesss.filter(
  //         (c) => c.organizationId === organizationFilter
  //       );
  //     }
  //     if (filter) {
  //       projectAccesss = projectAccesss.filter((c) => {
  //         const parts = filter.split(" ");
  //         if (
  //           parts.find(
  //             (p) =>
  //               c.project.name.toLowerCase().includes(p.toLowerCase()) ||
  //               c.project.projectCode.toLowerCase().includes(p.toLowerCase())
  //           )
  //         ) {
  //           return true;
  //         }
  //         return false;
  //       });
  //     }

  //     setFilteredProjects(projectAccesss);
  //   }
  // }, [projectsResults, filter, organizationFilter, showHidden])

  // useEffect(() => {
  //   if (projectsResults.data && projectsResults.data.me) {
  //     filterProjects();
  //     // setFilteredProjects(projectsResults.data.me.projectAccesses);
  //   }
  // }, [projectsResults, filterProjects]);

  // useEffect(() => {
  //   filterProjects();
  // }, [showHidden, organizationFilter, filter, filterProjects]);


  const handleViewType = (
    event: React.MouseEvent<HTMLElement>,
    newViewType: string | null
  ) => {
    if (newViewType === null) return;
    setViewType(newViewType);
    localStorage.setItem("projectViewType", newViewType);
  };

  function handleDeleteClose() {
    setProjectToDelete(undefined);
    setDeleteProjectConfirmationError(false);
    setDeleteProjectConfirmation("");
    setOpenDeleteProjectDialog(false);
  }

  // if (!projectsResults.data || !organizations) {
  //   return <div>Loading...</div>;
  // }

  // if (projectsResults.data.me?.projectAccesses.length === 0) {
  //   return <NoProjects />;
  // }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridAutoFlow: "column",
          alignItems: "center",
          marginBottom: 24
        }}
      >
        <Typography variant="h1">
          Projects
        </Typography>

        <div
          style={{
            textAlign: "right",
            display: "grid",
            alignItems: "center",
            justifyContent: "end",
            gridGap: "1em",
            gridAutoFlow: "column",
          }}
        >
          {me && me.me && me.me.organizations && me.me.organizations.length > 1 ? (
            <div>
              <FormControl variant="outlined">
                <InputLabel htmlFor="organization-filter">
                  Organization
                </InputLabel>
                <Select
                  style={{ width: "200px" }}
                  label="Organization"
                  variant="outlined"
                  value={organizationFilter}
                  onChange={(e) => {
                    const org = e.target.value as string;
                    setOrganizationFilter(org);
                  }}
                  inputProps={{
                    id: "organization-filter",
                  }}
                >
                  {me && me.me && me.me.organizations && me.me.organizations.map((organization) => (
                    <MenuItem value={organization._id} key={organization._id}>
                      {organization.name}
                    </MenuItem>
                  ))}
                  <MenuItem value="all">All</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : (
            <></>
          )}
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            label="Search"
            value={filter}
            onChange={(e) => {
              const newFilter = e.currentTarget.value;
              setFilter(newFilter);
            }}
          />
          <IconButton onClick={() => setShowHidden((h) => !h)}>
            {showHidden ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          <ToggleButtonGroup
            value={viewType}
            exclusive
            onChange={handleViewType}
            aria-label="text alignment"
          >
            <ToggleButton size="small" value="list" aria-label="list view">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton size="small" value="grid" aria-label="grid view">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>

          <Button
            color="primary"
            variant="contained"
            onClick={() => nav(`/projects/new`)}
          >
            + New Project
          </Button>
        </div>
      </div>
      <Box>
        {!projectsData?.listProjects ||
          projectsData.listProjects.length === 0 ? (
          <div>Currently no projects to diplay</div>
        ) : (
          viewType && (
            <ProjectView
              viewType={viewType}
              projectAccesses={projectsData!.listProjects}
              onDelete={(key) => {
                const project = projectsData!.listProjects.find(
                  (fc) => fc._id === key
                );
                setProjectToDelete(project);
                setOpenDeleteProjectDialog(true);
              }}
            />
          )
        )}
      </Box>

      <Dialog
        open={openDeleteProjectDialog}
        onClose={handleDeleteClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Confirmation to Delete Project with Code: {projectToDelete?.projectCode}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              If you are sure, please enter the project code into the textbox and
              click on Delete.
            </Typography>
          </DialogContentText>
          <TextField
            autoFocus
            value={deleteProjectConfirmation}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setDeleteProjectConfirmation(value);
            }}
            onBlur={(e) => {
              const value = e.currentTarget.value;
              setDeleteProjectConfirmationError(
                value !== projectToDelete?.projectCode
              );
            }}
            error={deleteProjectComfirmationError}
            helperText={
              deleteProjectComfirmationError
                ? "The project codes do not match."
                : ""
            }
            margin="dense"
            id="name"
            label="Project code confirmation"
            fullWidth
          />

          <Typography color="error">
            WARNING: This action is permenant and cannot be undone. Please make
            sure this action is what you want
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!deleteProjectComfirmationError) {
                deleteProject({
                  variables: {
                    projectId: projectToDelete?.id,
                  },
                });
                handleDeleteClose();
              }
            }}
            variant="contained"
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
