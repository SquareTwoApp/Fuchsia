import React from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import {  
  Drawer,
  Toolbar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Box
} from "@mui/material";
import { Dashboard as DashboardIcon, Receipt as ReceiptIcon, Business as BusinessIcon } from '@mui/icons-material'
import { useMeQuery } from "../generated/graphql";

interface MenuItem {
  title: string;
  icon: any;
  url: string;
}

const MenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    url: "/dashboard",
  },
  {
    title: "Projects",
    icon: <ReceiptIcon />,
    url: "/projects",
  },
];


const drawerWidth = 251;

export const AuthLayout = () => {
  const { data: me } = useMeQuery()
  const activeRoute = (routeName: string) => {
    return false //history.location.pathname.startsWith(routeName);
  };

  return (
    
    <div style={{ display: 'flex'}}>
      <Drawer
        anchor="left"
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <div 
        // className={classes.drawerContainer}
        >
          <List>
            {MenuItems.map((menuItem) => (
              <ListItem
                selected={activeRoute(menuItem.url)}
                button
                component={RouterLink}
                to={menuItem.url}
                key={menuItem.title}
              >
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem
              selected={activeRoute("/organization")}
              button
              component={RouterLink}
              to="/organization"
            >
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Organization" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Box 
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      // className={classes.content}
      >
        <Toolbar />
        <div>
          {me ? (
            <Outlet />
          ) : (
            <div
              style={{
                display: "grid",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          )}
          {}
        </div>
      </Box>
    </div>
  );
};
