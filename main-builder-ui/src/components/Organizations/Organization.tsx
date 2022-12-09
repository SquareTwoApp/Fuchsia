import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
} from "@mui/material";
import {
  ProjectTemplates,
} from "./ProjectTemplates";
import {
  OrganizationDetails,
} from "./OrganizationDetails";
import {
  OrganizationMembership,
} from "./OrganizationMembership";
import { a11yProps, TabPanel } from "../Common/TabPanel";
import { useNavigate, useParams } from "react-router-dom";
import { useInviteMemberMutation, useMeQuery } from "../../generated/graphql";

const sections = ["details", "membership", "templates", "licensing"];

export function Organization() {
  const { section } = useParams<{ section?: string }>();
  const nav = useNavigate();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [orgName, setOrgName] = useState("");
  const [open, setOpen] = useState(false);
  const { data: me } = useMeQuery()
  const [currentOrganization, setCurrentOrganization] = useState<any>()
  // const [getOrganization, organizationResults] = useLazyQuery(GetOrganization);
  // const [createNewOrganization] = useMutation(CreateOrganization);
  const [inviteUser] = useInviteMemberMutation()
  // useEffect(() => {
  //   if (currentOrganization) {
  //     getOrganization({
  //       variables: { organizationId: currentOrganization.id },
  //     });
  //   }
  // }, [currentOrganization, getOrganization]);
  useEffect(() => {
    if (section) {
      const index = sections.findIndex((s) => s === section);
      if (index !== -1) {
        setCurrentTab(index);
      } else {
        setCurrentTab(0);
      }
    } else {
      setCurrentTab(0);
    }
  }, [section]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const newPage = sections[newValue];
    if (newPage !== section) {
      if (sections[newValue]) {
        nav(`/organization/${sections[newValue]}`);
      } else {
        nav(`/organization/details`);
      }
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const createOrganization = async () => {
    // await inviteUser({
    //   variables: {
    //     name: orgName,
    //     organizationId: currentOrganization?.id,
    //   },
    // });
    setOrgName("");
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (me && me.me && me.me.organizations.length === 0) {
    return (
      <div>
        <Typography variant="h1">
          Organizations
        </Typography>
        You are not a member of an organization, either create one now, or have
        an organization owner invite you to theirs.
        <div>
          <Button onClick={handleClickOpen} variant="contained" color="primary">
            Create Organization
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Setup your new Organization</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <TextField
              autoFocus
              value={orgName}
              onChange={(e) => setOrgName(e.currentTarget.value)}
              margin="dense"
              id="name"
              label="Organization account name"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={createOrganization}
              variant="contained"
              color="primary"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  return (
    <div style={{ minHeight: "300px", minWidth: "250px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gridGap: '1em' }}>
        <Typography variant="h1">
          Organization profile
        </Typography>
        <Select
          variant="outlined"

          value={currentOrganization?._id}
          onChange={e => {
            const { value } = e.target
            const organization = me?.me?.organizations?.find(org => org._id === value)
            if (organization) {
              setCurrentOrganization(organization)
              // currenOrganizationIdVar(organization.id)
            }
          }}
        >
          {
            me && me.me && me.me.organizations?.map(organization => (
              <MenuItem value={organization._id} key={organization._id}>
                {organization.name}
              </MenuItem>
            ))
          }
        </Select>
        <Button
          onClick={(e) => {
            // createNewOrganization({
            //   variables: {
            //     name: "New Organization",
            //   },
            // });
          }}
          variant="contained"
          color="primary"
        >
          New organization{" "}
        </Button>
      </div>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Details" {...a11yProps(0)} />
        <Tab label="Membership" {...a11yProps(1)} />
        <Tab label="Project Templates" {...a11yProps(2)} />
        <Tab label="Licensing" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={currentTab} index={0}>
        <div>
          <OrganizationDetails />
        </div>
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <div>
          <OrganizationMembership
            invitees={currentOrganization.invitees}
            members={currentOrganization.members}
          />
        </div>
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <div>
          <ProjectTemplates />
        </div>
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        {/* <div>
          <Subscriptions />
        </div> */}
      </TabPanel>
    </div>
  );
}
