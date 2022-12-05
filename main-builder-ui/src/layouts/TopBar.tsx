import { AppBar, ClickAwayListener, Divider, FormControlLabel, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Switch, Toolbar } from "@mui/material";
import logo from "../assets/square-two-logo(50x50).png";
import { useNavigate } from 'react-router-dom'
import { useMeQuery } from "../generated/graphql";
import { AccountCircle } from "@mui/icons-material";
import avatar from "react-avatar-edit";
import { useAuth } from "../hooks/useAuth";
import React, { useRef } from "react";
import LogoAnim from "../components/Common/LogoAnim";

export function TopBar() {
  const [open, setOpen] = React.useState(false);
  const { data: me } = useMeQuery()
  const nav = useNavigate()
  const menuId = "primary-search-account-menu";
  const { logout } = useAuth();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleClose = (event: any) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: any) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const renderMenu = (
    <Popper
      style={{ zIndex: 1300 }}
      open={open}
      anchorEl={anchorRef.current}
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
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem
                  onClick={() => {
                    nav("/profile");
                    setOpen(false);
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
                <Divider />
                <Divider />
                <MenuItem>Version: {process.env.REACT_APP_VERSION}</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  return (
    <>
      <AppBar position="fixed" style={{ zIndex: 1200, backgroundColor: 'grey' }}>

        <Toolbar>
          <div style={{ position: 'absolute', left: 0 }} onClick={() => nav('/')}>
            <LogoAnim ver={5} label=' ' scale={0.5} bgColor='grey' />
          </div>
          {/* <img alt="logo" src={logo} height="30" style={{ marginRight: '15px', cursor: 'pointer' }} onClick={() => nav('/')} /> */}
          <div style={{ flexGrow: 1 }} />
          <div>{me && me.me ? me.me.email : ""}</div>
          {/* <IconButton
            ref={anchorRef}
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={}
            color="inherit"
          >
            {me && me.me && me && me.me.avatar ? (
              <img alt="avatar" height="40" src={avatar} />
            ) : (
              <AccountCircle />
            )}
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </>
  )
}