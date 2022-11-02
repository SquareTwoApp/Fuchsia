import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
  IconButton,
  Popper,
  MenuItem,
  MenuList,
  Grow,
  ClickAwayListener,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  Grid,
  Select,
  Tooltip,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { useDeleteInvitationMutation, useInviteMemberMutation, User } from "../../generated/graphql";
import { DisplayUsername } from "../Common/DisplayUsername";

export function OrganizationMembership({
  members,
  invitees,
}: {
  members: User[];
  invitees: Array<{ userEmail: string; expires: number }>;
}) {
  const [showAddPeople, setShowAddPeople] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [editUser, setEditUser] = useState<{
    email: string;
    firstName: string;
    lastName: string;
    membershipTypeId: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    membershipTypeId: "",
  });
  const [showMemberRowMenu, setShowMemberRowMenu] = useState(false);
  const [showInviteeRowMenu, setShowInviteeRowMenu] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [notifyByEmail, setNotifyByEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [selectedMemberRow, setSelectedMemberRow] = useState(0);
  const [selectedInviteeRow, setSelectedInviteeRow] = useState(0);
  const [membershipTypes, setMembershipTypes] = useState<
    Array<{ id: string; name: string; description: string }>
  >([]);
  const [memberships, setMemberships] = useState<
    Array<{ userEmail: string; membershipTypesId: string }>
  >([]);
  // const { currentOrganization } = useMe();
  // const membershipTypesResults = useAuthQuery(GetMembershipTypes);
  // const organizationalMemberships = useAuthQuery(GetOrganizationalMembership, {
  //   variables: { organizationId: currentOrganization?.id },
  // });
  
  const [inviteUser] = useInviteMemberMutation()
  const [deleteInvitation] = useDeleteInvitationMutation()

  const memberAnchorRef = useRef(
    members.map((u, idx) => React.createRef<HTMLButtonElement>())
  );
  const inviteeAnchorRef = useRef(
    invitees.map((u, idx) => React.createRef<HTMLButtonElement>())
  );

  const handleClose = () => {
    setShowAddPeople(false);
  };

  // useEffect(() => {
  //   if (membershipTypesResults.data) {
  //     setMembershipTypes(membershipTypesResults.data.getMembershipTypes);
  //   }
  // }, [membershipTypesResults]);

  // useEffect(() => {
  //   if (organizationalMemberships.data) {
  //     setMemberships(organizationalMemberships.data.organizationMemberships);
  //   }
  // }, [organizationalMemberships]);

  useEffect(() => {
    inviteeAnchorRef.current = inviteeAnchorRef.current.splice(
      0,
      invitees.length
    );
    for (let i = 0; i < invitees.length; i++) {
      inviteeAnchorRef.current[i] =
        inviteeAnchorRef.current[i] || React.createRef();
    }
  }, [invitees]);

  useEffect(() => {
    memberAnchorRef.current = memberAnchorRef.current.splice(0, members.length);
    for (let i = 0; i < members.length; i++) {
      memberAnchorRef.current[i] =
        memberAnchorRef.current[i] || React.createRef();
    }
  }, [members]);

  const invitePeople = () => {
    // // TODO
    // inviteUser({
    //   variables: {
    //     organizationId: currentOrganization?.id,
    //     email: addEmail,
    //     sendInvite: notifyByEmail,
    //   },
    // });
    // setAddEmail("");
  };
  const handleMemberMenuOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.currentTarget.dataset.id) {
      setSelectedMemberRow(+e.currentTarget.dataset.id);
    }
    setShowMemberRowMenu(true);
  };

  const handleInviteeMenuOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.currentTarget.dataset.id) {
      setSelectedInviteeRow(+e.currentTarget.dataset.id);
    }
    setShowInviteeRowMenu(true);
  };

  const handleMemberMenuClose = (event: MouseEvent | TouchEvent) => {
    if (
      memberAnchorRef.current &&
      memberAnchorRef.current[selectedMemberRow].current!.contains(
        event.target as HTMLElement
      )
    ) {
      return;
    }

    setShowMemberRowMenu(false);
  };

  const handleInviteeMenuClose = (event: MouseEvent | TouchEvent) => {
    if (
      inviteeAnchorRef.current &&
      inviteeAnchorRef.current[selectedInviteeRow].current!.contains(
        event.target as HTMLElement
      )
    ) {
      return;
    }

    setShowInviteeRowMenu(false);
  };

  function handleMemberListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setShowMemberRowMenu(false);
    }
  }

  function handleInviteeListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setShowInviteeRowMenu(false);
    }
  }

  function handleEditUserClose() {
    setEditUser({
      firstName: "",
      lastName: "",
      email: "",
      membershipTypeId: "",
    });
    setShowEditUser(false);
  }

  function updateUser() {
    // TODO
    handleEditUserClose();
  }

  function getUserAccountType(email: string) {
    const membership = memberships.find((m) => m.userEmail === email);
    if (membership) {
      return membershipTypes.find(
        (mt) => mt.id === membership.membershipTypesId
      );
    }
    return {
      name: "",
      description: "",
      id: "",
    };
  }

  // return focus to the button when we transitioned from !open -> open
  const prevMemberOpen = React.useRef(showMemberRowMenu);
  useEffect(() => {
    if (prevMemberOpen.current === true && showMemberRowMenu === false) {
      memberAnchorRef.current[selectedMemberRow].current!.focus();
    }

    prevMemberOpen.current = showMemberRowMenu;
  }, [showMemberRowMenu, selectedMemberRow]);

  // return focus to the button when we transitioned from !open -> open
  const prevInviteeOpen = React.useRef(showInviteeRowMenu);
  useEffect(() => {
    if (prevInviteeOpen.current === true && showInviteeRowMenu === false) {
      inviteeAnchorRef.current[selectedInviteeRow].current!.focus();
    }

    prevInviteeOpen.current = showInviteeRowMenu;
  }, [showInviteeRowMenu, selectedInviteeRow]);

  return (
    <div>
      <div
        style={{ display: "grid", justifyContent: "end", marginBottom: "10px" }}
      >
        <Button
          onClick={(e) => setShowAddPeople(true)}
          color="primary"
          variant="contained"
        >
          Add People
        </Button>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Members</Typography>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Account Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((u, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <DisplayUsername user={u} />
                    </TableCell>
                    <TableCell>{getUserAccountType(u.email!)?.name}</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>
                      <IconButton
                        data-id={idx}
                        ref={memberAnchorRef.current[idx]}
                        onClick={handleMemberMenuOpen}
                      >
                        <MoreHoriz />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography>Waiting on acceptance</Typography>
          <Divider />
        </Grid>

       {
         invitees.length === 0 ? (
          <Grid item xs={12}>
            <Typography>You do not have any outstanding invites</Typography>
          </Grid> 
         ) : (
         <Grid item xs={12}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invitees.map((u, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{u.userEmail}</TableCell>
                    <TableCell>
                      {Date.now() > u.expires ? "Expired" : "Pending"}
                    </TableCell>
                    <TableCell>
                      <Button onClick={e => {
                        // inviteUser({
                        //   variables: {
                        //     organizationId: currentOrganization?.id,
                        //     email: u.userEmail,
                        //     sendInvite: true,
                        //   },
                        // });
                      }} variant="contained" color="primary">
                        Resend Invitation
                      </Button>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        data-id={idx}
                        ref={inviteeAnchorRef.current[idx]}
                        onClick={handleInviteeMenuOpen}
                      >
                        <MoreHoriz />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        )
        }
      </Grid>
      <Popper
        style={{ zIndex: 1300 }}
        open={showMemberRowMenu}
        anchorEl={memberAnchorRef.current[selectedMemberRow].current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleMemberMenuClose}>
                <MenuList
                  autoFocusItem={showMemberRowMenu}
                  id="menu-list-grow"
                  onKeyDown={handleMemberListKeyDown}
                >
                  <MenuItem
                    onClick={(e) => {
                      // const member = members[selectedMemberRow];
                      // setEditUser({
                      //   firstName: member.firstName || "",
                      //   lastName: member.lastName || "",
                      //   email: member.email!,
                      //   membershipTypeId: getUserAccountType(member.email!)
                      //     ?.id!,
                      // });
                      // setShowEditUser(true);
                    }}
                  >
                    Edit info
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      // handleMemberMenuClose(e);
                    }}
                  >
                    Delete account
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Popper
        style={{ zIndex: 1300 }}
        open={showInviteeRowMenu}
        anchorEl={inviteeAnchorRef.current[selectedInviteeRow]?.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }} 
          >
            <Paper>
              <ClickAwayListener onClickAway={handleInviteeMenuClose}>
                <MenuList
                  autoFocusItem={showInviteeRowMenu}
                  id="menu-list-grow"
                  onKeyDown={handleInviteeListKeyDown}
                >
                  <MenuItem
                    onClick={async (e) => {
                      // await deleteInvitation({
                      //   variables: {
                      //     organizationId: currentOrganization?.id,
                      //     email: invitees[selectedInviteeRow].userEmail
                      //   }
                      // })
                      // handleInviteeMenuClose(e);
                    }}
                  >
                    Delete invitation
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Dialog
        open={showAddPeople}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Invite people to your organization
        </DialogTitle>
        <DialogContent>
          <TextField
            value={addEmail}
            onChange={(e) => {
              const email = e.currentTarget.value.trim().toLowerCase();
              setAddEmail(email);
            }}
            onBlur={(e) => { 
              // setIsValidEmail(isEmail(addEmail))
            }}
            error={!isValidEmail}
            helperText={isValidEmail ? "" : "Invalid email format"}
            autoFocus
            id="email"
            label="Email"
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={notifyByEmail}
                onChange={(e) => {
                  const state = e.target.checked;
                  setNotifyByEmail(state);
                }}
                name="checkedA"
              />
            }
            label="Notify user by email"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={invitePeople} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditUser}
        onClose={handleEditUserClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Edit user {editUser.email!}
        </DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={editUser.firstName}
                onChange={(e) => {
                  const firstName = e.currentTarget.value;
                  setEditUser((eu) => ({
                    ...eu,
                    firstName,
                  }));
                }}
                autoFocus
                label="First name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={editUser.lastName}
                onChange={(e) => {
                  const lastName = e.currentTarget.value;
                  setEditUser((eu) => ({
                    ...eu,
                    lastName,
                  }));
                }}
                autoFocus
                label="Last name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Membership type"
                fullWidth
                variant="outlined"
                value={editUser.membershipTypeId}
                onChange={(e) => {
                  const membershipTypeId = e.target.value as string;
                  setEditUser((eu) => ({
                    ...eu,
                    membershipTypeId,
                  }));
                }}
                onClose={e => {
                  
                }}
                renderValue={(selected) => {
                  const membership = membershipTypes.find(
                    (mt) => mt.id === selected
                  );
                  if (membership) {
                    return (
                      <Tooltip title={membership.description}>
                        <Typography>{membership.name}</Typography>
                      </Tooltip>
                    );
                  }
                  return <div />;
                }}
              >
                {membershipTypes.map((mt) => (
                  <MenuItem key={mt.id} value={mt.id}>
                    <div>
                      <Typography>{mt.name}</Typography>
                      <Typography variant="caption">
                        {mt.description}
                      </Typography>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditUserClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateUser} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
