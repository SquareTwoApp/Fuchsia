import { Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/square-two-logo(50x50).png";

export function NoProjects() {
  const nav = useNavigate();
  return (
    <div className='centered-box'>
      <img alt="Logo" src={logo} />
      <Typography variant="h1">Welcome!</Typography>
      <Typography>
        It looks like you have not created any projects yet. Add a project and
        begin the journey.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => nav(`/projects/new`)}
      >
        Add new project
      </Button>
    </div>
  );
}
