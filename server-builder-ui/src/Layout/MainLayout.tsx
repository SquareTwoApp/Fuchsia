import React from "react";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
// import { TopBar } from '@fuchsia/shared-components'
import {
  Drawer,
  Box,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import ScheduleIcon from "@mui/icons-material/Schedule";
import logo from "../assets/square-two-logo(50x50).png";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import ExtensionIcon from '@mui/icons-material/Extension';

const drawerWidth = 251;

const navItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    location: "/dashboard",
  },
  {
    label: "Database",
    icon: <StorageIcon />,
    location: "/database",
  },
  {
    label: "Tasks",
    icon: <ScheduleIcon />,
    location: "/tasks",
  },
  {
    label: "Email Editor",
    icon: <EmailIcon />,
    location: "/email-editor",
  },
  {
    label: "Plug-ins",
    icon: <ExtensionIcon />,
    location: "/plug-ins",
  },
];

const secondaryItems = [
  {
    label: "Settings",
    icon: <SettingsIcon />,
    location: "/settings",
  }
];

const navigation = [navItems, secondaryItems];

function TopBar() {
  const nav = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "grey",
      }}
    >
      <Toolbar>
        <img
          alt="logo"
          src={logo}
          height="30"
          style={{ marginRight: "15px", cursor: "pointer" }}
          onClick={() => nav("/")}
        />
      </Toolbar>
    </AppBar>
  );
}

export function MainLayout() {
  const nav = useNavigate();
  const { data: meData } = useMeQuery();
  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {navigation.map((navItems, index) => (
            <React.Fragment key={index}>
              <List>
                {navItems.map((item) => (
                  <ListItem key={item.label} disablePadding>
                    <ListItemButton onClick={() => nav(item.location)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </React.Fragment>
          ))}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
